const model = require('../models/PosIngredientsModel');
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
                return sendResponse(res, 200, "Ingredients entry data", result);
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
                data["message"] = "Ingredients data by ID";
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
                menu_code       : mysql.escape(req.body.menu_code),
                name            : mysql.escape(req.body.name),
                unit            : mysql.escape(req.body.unit),
                current_stock   : mysql.escape(req.body.current_stock),
                reorder_level   : mysql.escape(req.body.reorder_level),
                cost_per_unit   : mysql.escape(req.body.cost_per_unit),
                created_by      : mysql.escape(req.body.created_by),
                created_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mmysql.escape(m:smysql.escape(s')),
                updated_by      : mysql.escape(req.body.created_by),
                updated_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'))
            };
            
            
            const result = await model.getCheckById(params);

            let data = {};
            if(result.length == 0){
                let responce = await model.addMaster(params);
            
                if(responce)
                {
                    data["status"] = 200;
                    data["message"] = "Ingredients record created successfully";
                    data["data"] = [];

                    res.status(200).json(data);
                } else {
                    data["status"] = 500;
                    data["message"] = "Samething went wrong!";
                    data["data"] = [];

                    res.status(500).json(data);
                }
            } else {
                    data["status"] = 500;
                    data["message"] = "Ingredients already exits";
                    data["data"] = [];

                    res.status(200).json(data);
            }

            

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    },

    updateMaster: async (req, res) => {
        try {
            const id = req.params.id;

            const params = {
                menu_code       : mysql.escape(req.body.menu_code),
                name            : mysql.escape(req.body.name),
                unit            : mysql.escape(req.body.unit),
                current_stock   : mysql.escape(req.body.current_stock),
                reorder_level   : mysql.escape(req.body.reorder_level),
                cost_per_unit   : mysql.escape(req.body.cost_per_unit),
                updated_by      : mysql.escape(req.body.created_by),
                updated_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'))
            };

            const responce  = await model.updateMaster(id, params);

            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Ingredients record updated successfully";
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
