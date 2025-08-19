const serviceModal = require('../models/AccountModel');
const  moment = require('moment/moment')

module.exports = {
    getMaster :  (req, res)=>{
        serviceModal.getAllMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Account data";
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

        serviceModal.getById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Account data";
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
    addMaster :  (req, res)=>{

        const params = {
            name      : req.body.name,
            created_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }

        serviceModal.addMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Account record created successfully";
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
    updateMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            name      : req.body.name,
            updated_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }
        
        serviceModal.updateMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Account record updated successfully";
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
    deleteMaster :  (req, res)=>{

        const id  = req.params.id

        serviceModal.deleteMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Account record deleted successfully";
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