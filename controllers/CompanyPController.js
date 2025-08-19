
const serviceModel = require('../models/CompanyPModel');
const moment = require('moment/moment')

// const NotificationController = require('./NotificationController');

module.exports = {
    getCompanyMaster: async (req, res) => {
        try {
            let data = {};

            let responce = await serviceModel.getAllCompanyMaster();

            if (responce.length > 0) {
                data["status"] = 200;
                data["message"] = "Company Parent data";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];

                res.status(500).json(data);
            }

        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    getCompanyById: async (req, res) => {
        try {
            let data = {};

            const id = req.params.id

            let responce = await serviceModel.getById(id);

            if (responce.length > 0) {
                // Notification content setup
                req.body.noti_sub = "Company";
                req.body.noti_desc = "Company Parent data record fetched successfully at " + moment().format('YYYY-MM-DD h:mm:ss a');

                // let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Company Parent by ID data";
                data["data"] = responce[0] || {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];

                res.status(500).json(data);
            }

        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    addCompanyMaster: async (req, res) => {
        try {
            let data = {};

            const params = {
                "company_name"  : req.body.company_name,
                "address"  : req.body.address,
                "status"        : "active"
            }

            // console.log(req, res)
            console.log("params", params)

            let responce = await serviceModel.addCompanyMaster(params);

            if (responce) {
                data["status"] = 200;
                data["message"] = "Company Parent record created successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    updateCompanyMaster: async (req, res) => {
        try {
            const id = req.params.id

            let data = {};

            const params = {
                "company_id"    : req.body.company_id,
                "company_name"  : req.body.company_name,
                "address"       : req.body.address,
                "status"        : req.body.status

                // "name": req.body.name,
                // "address1": req.body.address1,
                // "address2": req.body.address2,
                // "address3": req.body.address3,
                // "contact": req.body.contact,
                // "website": req.body.website,
                // "email": req.body.email,
                // "updated_by": req.body.updated_by,
                // "updated_on": moment().format('YYYY-MM-DD h:mm:ss a'),
            }

            let responce = await serviceModel.updateCompanyMaster(id, params);

            if (responce) {
                data["status"] = 200;
                data["message"] = "Company Parent record updated successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    deleteCompanyMaster: async (req, res) => {
        try {
            const id = req.params.id

            let responce = await serviceModel.deleteCompanyMaster(id);

            if (responce) {
                data["status"] = 200;
                data["message"] = "Company Parent record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    }
}


