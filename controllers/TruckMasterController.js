const TruckModal = require('../models/TruckMasterModel');
const  moment = require('moment/moment')

module.exports = {
    getTruckMaster :  (req, res)=>{
        TruckModal.getTruckMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Truck Master Entry data";
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
    getById :  (req, res)=>{
        const id  = req.params.id

        TruckModal.getById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Truck Master Data by ID data";
                data["data"] = result[0] || {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    addTruckMaster :  (req, res)=>{

        const params = {
            id         : req.body.id ,
            truck_no   : req.body.truck_no,
            created_by : req.body.created_by,
            created_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            updated_by : req.body.updated_by,
            updated_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            status     : req.body.status,
            // created_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }

        TruckModal.addTruckMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "VouchTruck Master entry record created successfully";
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
    updateTruckMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            id         : req.body.id ,
            truck_no   : req.body.truck_no,
            created_by : req.body.created_by,
            created_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            updated_by : req.body.updated_by,
            updated_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            status     : req.body.status,
            // created_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }
        
        TruckModal.updateTruckMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Truck Master record updated successfully";
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
    deleteTruckMaster :  (req, res)=>{

        const id  = req.params.id

        TruckModal.deleteTruckMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Truck Master record deleted successfully";
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