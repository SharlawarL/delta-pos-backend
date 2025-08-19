
const serviceModel = require('../models/BranchModel');
const moment = require('moment/moment')

const NotificationController = require('./NotificationController');

module.exports = {
    getMaster :  async (req, res)=>{
        try {
            let data = {};

            let responce = await serviceModel.getAllBranchMaster();

            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Branch data";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(500).json(data);
            }
            
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    getById :  async (req, res)=>{
        try {
            let data = {};
            
            const id  = req.params.id

            let responce = await serviceModel.getById(id);

            if(responce.length > 0)
            {
                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Branch";
                req.body.noti_desc = "Branch data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Branch by ID data";
                data["data"] = responce[0] || {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(500).json(data);
            }
            
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    addMaster :  async (req, res)=>{
        try {
            let data = {};
            
            const params = {
                "prefix"      : req.body.prefix,
                "name"      : req.body.name,
                "address1"  : req.body.address1,
                "address2"  : req.body.address2,
                "address3"  : req.body.address3,
                "contact"   : req.body.contact,
              	"contact_person"   : req.body.contact_person,
                "website"   : req.body.website,
                "email"     : req.body.email,
                "company"     : req.body.company,
                "geo_lat"     : req.body.geo_lat,
                "geo_long"     : req.body.geo_long,
                "created_by": req.body.created_by,
                "created_on": moment().format('YYYY-MM-DD h:mm:ss a'),
            }

            let responce = await serviceModel.addMaster(params);

            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Branch record created successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
            
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }        
    },
    updateMaster :  async (req, res)=>{
        try {
            const id  = req.params.id 

            let data = {};
            
            const params = {
                "prefix"      : req.body.prefix,
                "name"      : req.body.name,
                "address1"  : req.body.address1,
                "address2"  : req.body.address2,
                "address3"  : req.body.address3,
                "contact"   : req.body.contact,
              	"contact_person"   : req.body.contact_person,
                "website"   : req.body.website,
                "email"     : req.body.email,
                "company"     : req.body.company,
              	"geo_lat"     : req.body.geo_lat,
                "geo_long"     : req.body.geo_long,
                "updated_by": req.body.updated_by,
                "updated_on": moment().format('YYYY-MM-DD h:mm:ss a'),
            }

            let responce = await serviceModel.updateMaster(id, params);

            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Branch record updated successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
            
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    deleteMaster :  async (req, res)=>{
        try {
            const id  = req.params.id 

            let responce = await serviceModel.deleteMaster(id);

            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Branch record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
            
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    }
}


