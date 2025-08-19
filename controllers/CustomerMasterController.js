
const cm = require('../models/CustomerMasterModel');

module.exports = {
    getCustomerMaster :  (req, res)=>{
        cm.getAllCustomerMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Customer data";
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
    getCustomerById :  (req, res)=>{
        const id  = req.params.id

        cm.getCustomerById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Customer data";
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
    addCustomerMaster :  (req, res)=>{

        const params = {
            name: req.body.name,
            address: req.body.address,
            mobile: req.body.mobile,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            remarks: req.body.remarks,
        }

        console.log("params", params)

        cm.addCustomerMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Customer record created successfully";
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
    updateCustomerMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            name: req.body.name,
            address: req.body.address,
            mobile: req.body.mobile,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            remarks: req.body.remarks,
        }
        
        cm.updateCustomerMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Customer record updated successfully";
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
    deleteCustomerMaster :  (req, res)=>{

        const id  = req.params.id

        cm.deleteCustomerMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Customer record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    }
}