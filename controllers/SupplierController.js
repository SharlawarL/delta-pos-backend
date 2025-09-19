const model = require('../models/SupplierModel');
const moment = require('moment');

const mysql = require('mysql2');

function sendResponse(res, status, message, data = []) {
    res.status(status).json({ status, message, data });
}

module.exports = {
    getMaster: async (req, res) => {
        try {
            const result = await model.getAllMaster();

            if (result.length > 0) {
                return sendResponse(res, 200, "Supplier entry data", result);
            } 
            return sendResponse(res, 404, "Data not found");

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await model.getById(id);

            let data = {};
            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Supplier data by ID";
                data["data"] = result[0];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    },

    addMaster: async (req, res) => {
        try {
            const params = {
                firstname   : mysql.escape(req.body.firstname),
                lastname    : mysql.escape(req.body.lastname),
                email       : mysql.escape(req.body.email),
                mobile       : mysql.escape(req.body.mobile),
                status       : mysql.escape(req.body.status)
            };

            let filename = req.body.filename
                        
            if(filename != null && filename != '' && filename != undefined)
            {
                params.filename =  mysql.escape(filename)
            }

            console.log("params", req.body, params)

            let responce = await model.addMaster(params);
            
            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Supplier record created successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    },

    updateMaster: async (req, res) => {
        try {
            const id = req.params.id;
            const params = {
                firstname   : mysql.escape(req.body.firstname),
                lastname    : mysql.escape(req.body.lastname),
                email       : mysql.escape(req.body.email),
                mobile       : mysql.escape(req.body.mobile),
                // status       : mysql.escape(req.body.status)
            };

             console.log("params 1", req.body, params)
             let filename = req.body.filename

            if(filename != null && filename != '' && filename != undefined)
            {
                params.filename =  mysql.escape(filename)
            }

            console.log("params 2", req.body, params)

            const responce  = await model.updateMaster(id, params);

            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Supplier record updated successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    },

    deleteMaster: async (req, res) => {
        try {
            const id = req.params.id;
            const result = await model.deleteMaster(id);
            
            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    }
};
