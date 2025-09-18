const model = require('../models/PosCategoryModel');
const moment = require('moment');

function sendResponse(res, status, message, data = []) {
    res.status(status).json({ status, message, data });
}

module.exports = {
    getMaster: async (req, res) => {
        try {
            const result = await model.getAllMaster();

            if (result.length > 0) {
                return sendResponse(res, 200, "Category entry data", result);
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
                data["message"] = "Category data by ID";
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
                cat_name    : req.body.cat_name,
                icon        : req.body.icon,
                created_by  : req.body.created_by,
                created_on  : req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'),
                updated_by  : req.body.created_by,
                updated_on  : req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss')
            };
            console.log("params", req.body, params)

            let responce = await model.addMaster(params);
            
            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Category record created successfully";
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
                cat_name    : req.body.cat_name,
                icon        : req.body.icon,
                updated_by  : req.body.updated_by,
                updated_on  : req.body.updated_on || moment().format('YYYY-MM-DD HH:mm:ss')
            };

            const responce  = await model.updateMaster(id, params);

            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Category record updated successfully";
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
