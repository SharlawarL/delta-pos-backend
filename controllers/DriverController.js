
const cm = require('../models/DriverModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const NotificationController = require('./NotificationController');
const moment = require('moment/moment')

module.exports = {
    driverLogin :  (req, res)=>{
        const params = {
            email : req.body.email,
            password : req.body.password,
        }

        console.log("params", params)

        cm.driverLogin(params, async (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            console.log("result", result)
            
            let data = {};

            if(result.length > 0)
            {
                //Var init
                let empData = result.length > 0 ? result[0] : {};

                // Check password
                let passCheck = await bcrypt.compare(params.password, empData.password);

                // Token generation
                var token = jwt.sign({ email: empData.email }, "lalitsharlawar2024", { expiresIn: '7d' });

                if(empData.password && passCheck)
                {
                    data["status"] = 200;
                    data["message"] = "Driver login successfully!";
                    data["data"] = result;
                    data["token"] = token;

                    res.status(200).json(data);
                } else {
                    data["status"] = 500;
                    data["message"] = "Invalid email and password";
                    data["data"] = [];

                    res.status(500).json(data);
                }
            } else {
                data["status"] = 500;
                data["message"] = "Driver not exits. Please connect Administrator";
                data["data"] = [];

                res.status(500).json(data);
            }
            
        });
    },
    getDriverMaster :  (req, res)=>{
        cm.getAllDriverMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Driver";
                req.body.noti_desc = "Driver data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Driver data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    getPendingJobs :  (req, res)=>{
        cm.getPendingJobs((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Pending Jobs data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    getJobsByDriverId :  (req, res)=>{
        const id  = req.params.id

        cm.getJobsByDriverId(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Driver Job data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    getDriverById :  (req, res)=>{
        const id  = req.params.id

        cm.getDriverById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Driver data";
                data["data"] = result[0] || {};;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    getDriverAssignedById :  async (req, res)=>{
      
      	let data = {};
        const id  = req.params.id
        
        let result = await cm.getDriverAssignedById(id);
      
        if(result.length > 0)
        {
          data["status"] = 200;
          data["message"] = "Driver assinged data";
          data["data"] = result;

          res.status(200).json(data);
        } else {
          data["status"] = 500;
          data["message"] = "Data not found";
          data["data"] = [];

          res.status(500).json(data);
        }
    },
    getDriverAssignedByIdComp :  async (req, res)=>{
      
        let data = {};
      const id  = req.params.id
      
      let result = await cm.getDriverAssignedByIdComp(id);
    
      if(result.length > 0)
      {
        data["status"] = 200;
        data["message"] = "Driver assinged data";
        data["data"] = result;

        res.status(200).json(data);
      } else {
        data["status"] = 500;
        data["message"] = "Data not found";
        data["data"] = [];

        res.status(500).json(data);
      }
  },
    getDriverPendingById :  (req, res)=>{
        const id  = req.params.id

        cm.getDriverPendingById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Driver Pending data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    addDriverMaster :  async (req, res)=>{

        const encPass = await bcrypt.hash(req.body.password, 10);

        const params = {
            name: req.body.name,
            mobile: req.body.mobile,
            dob: req.body.dob,
            licence_no : req.body.licence_no,
            licence_expiry : req.body.licence_expiry,
            exp : req.body.exp,
            doj : req.body.doj,
            password : encPass,
            email: req.body.email,
            address: req.body.address,
            remarks: req.body.remarks,
            status : req.body.status
        }

        console.log("params", params)

        cm.addDriverMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Driver record created successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    updateDriverMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            name: req.body.name,
            mobile: req.body.mobile,
            dob: req.body.dob,
            licence_no : req.body.licence_no,
            licence_expiry : req.body.licence_expiry,
            exp : req.body.exp,
            doj : req.body.doj,
            email: req.body.email,
            address: req.body.address,
            remarks: req.body.remarks,
            status : req.body.status
        }
        
        cm.updateDriverMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Driver record updated successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    deleteDriverMaster :  (req, res)=>{

        const id  = req.params.id

        cm.deleteDriverMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Driver record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    assignJobToDriver :  (req, res)=>{

        const params = {
            job_id: req.body.job_id,
            driver_id: req.body.driver_id,
            status: req.body.status
        }
        
        cm.assignJobToDriver(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Driver assigned to Job successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
}