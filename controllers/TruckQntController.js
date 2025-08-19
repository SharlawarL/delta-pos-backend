const TruckModal = require('../models/TruckQntModel');
const  moment = require('moment/moment')

module.exports = {
    getTruckQnt :  (req, res)=>{
        TruckModal.getTruckQnt((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Truck Quantity Entry data";
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
                data["message"] = "Truck Quantity Data by ID data";
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
    addTruckQnt :  (req, res)=>{

        const params = {
            id         : req.body.id ,
            unit       : req.body.unit,
            created_by : req.body.created_by,
            created_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            updated_by : req.body.updated_by,
            updated_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
        
            // created_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }

        TruckModal.addTruckQnt(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Truck Quantity entry record created successfully";
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
    updateTruckQnt :  (req, res)=>{

        const id  = req.params.id

        const params = {
            id         : req.body.id ,
            unit       : req.body.unit,
            created_by : req.body.created_by,
            created_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            updated_by : req.body.updated_by,
            updated_on : moment(new Date()).format('YYYY-MM-DD h:mm:ss'),
            
            // created_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }
        
        TruckModal.updateTruckQnt(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Truck Quantity record updated successfully";
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
    deleteTruckQnt :  (req, res)=>{

        const id  = req.params.id

        TruckModal.deleteTruckQnt(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Truck Quantity record deleted successfully";
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