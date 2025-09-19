const model = require('../models/PosMenuItemsModel');
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
                return sendResponse(res, 200, "Menu Items entry data", result);
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
            const recipes = await model.getRecipesById(id);
            

            let data = {};
            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Menu Items data by ID";
                data["data"] = result[0];
                data["recipes"] = recipes

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
                category_id     : mysql.escape(req.body.category_id),
                name            : mysql.escape(req.body.name),
                spanish_name    : mysql.escape(req.body.spanish_name),
                description     : mysql.escape(req.body.description),
                price           : mysql.escape(req.body.price),
                is_active       : mysql.escape(req.body.is_active),
                created_by      : mysql.escape(req.body.created_by),
                created_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mmysql.escape(m:smysql.escape(s')),
                updated_by      : mysql.escape(req.body.created_by),
                updated_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'))
            };
            
            let filename = req.body.filename
            
            if(filename != null && filename != '' && filename != undefined)
            {
                params.image_url =  mysql.escape(filename)
            }

            console.log("params", req.body, params)

            let responce = await model.addMaster(params);
            
            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Menu Items record created successfully";
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
                category_id     : mysql.escape(req.body.category_id),
                name            : mysql.escape(req.body.name),
                spanish_name    : mysql.escape(req.body.spanish_name),
                description     : mysql.escape(req.body.description),
                price           : mysql.escape(req.body.price),
                is_active       : mysql.escape(req.body.is_active),
                updated_by      : mysql.escape(req.body.created_by),
                updated_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'))
            };
            
            let filename = req.body.filename
            
            if(filename != null && filename != '' && filename != undefined)
            {
                params.image_url =  mysql.escape(filename)
            }

            const responce  = await model.updateMaster(id, params);

            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Menu Items record updated successfully";
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
    },
    addRecipesMaster: async (req, res) => {
        try {

            const id = req.params.id;
            const recipes = req.body.recipes;

            let recipesData = JSON.parse(recipes);

            let deleteRes = await model.deleteRecipesMaster(id);

            let responce = false;
            recipesData.forEach(async(element) => {

                let params = {
                    menu_item_id: mysql.escape(id),
                    ingredient_id : mysql.escape(element.in_id),
                    quantity : mysql.escape(element.quntity)
                }
                responce = await model.addRecipesMaster(params);
            })
            
            let data = {};

            data["status"] = 200;
            data["message"] = "Menu Recipe record created successfully";
            data["data"] = [];

            res.status(200).json(data);

        } catch (err) {
            return sendResponse(res, 500, err.message || "Database error");
        }
    },
};
