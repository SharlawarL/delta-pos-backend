const model = require('../models/PurchaseOrderModel');
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
                return sendResponse(res, 200, "Purchase Order entry data", result);
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
            const purchaseOrder = await model.getPurchaseOrderById(id);

            let data = {};
            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Purchase Order data by ID";
                data["data"] = result[0];
                data["purchase-order-items"] = purchaseOrder;

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
                bill_no         : mysql.escape(req.body.bill_no),
                supplier_id     : mysql.escape(req.body.supplier),

                sub_total       : mysql.escape(req.body.sub_total),
                discount        : mysql.escape(req.body.discount || 0),
                other           : mysql.escape(req.body.other || 0),
                net_total       : mysql.escape(req.body.net_total || 0),
                pby             : mysql.escape(req.body.pby),

                remarks         : mysql.escape(req.body.remarks),

                created_by      : mysql.escape(req.body.created_by),
                created_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss')),
                updated_by      : mysql.escape(req.body.created_by),
                updated_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'))
            };
            console.log("params", req.body, params)

            let purchaseOrder = req.body.purchase_order_items;
            let purchaseOrderData = JSON.parse(purchaseOrder);
            
            let responce = await model.addMaster(params);
            console.log("responce", responce)
            const lastInsertedId = responce.insertId;
            console.log("lastInsertedId", lastInsertedId)

            let responceItems = false;
            purchaseOrderData.forEach(async(element) => {

                let params = {
                    bill_no         : mysql.escape(lastInsertedId),
                    in_id           : mysql.escape(element.in_id),
                    menu_code       : mysql.escape(element.menu_code),
                    name            : mysql.escape(element.name),
                    cost_per_pkg    : mysql.escape(element.cost_per_pkg),
                    cost_per_unit   : mysql.escape(element.cost_per_unit),
                    pkg_size        : mysql.escape(element.pkg_size),
                    pkg_stock       : mysql.escape(element.pkg_stock),
                    pkg_unit        : mysql.escape(element.pkg_unit.value),
                    quantity        : mysql.escape(element.quantity)
                }
                responceItems = await model.addItemsMaster(params);
            })
            
            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Purchase Order record created successfully";
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
                bill_no         : mysql.escape(req.body.bill_no),
                supplier_id     : mysql.escape(req.body.supplier),

                sub_total       : mysql.escape(req.body.sub_total),
                discount        : mysql.escape(req.body.discount || 0),
                other           : mysql.escape(req.body.other || 0),
                net_total       : mysql.escape(req.body.net_total || 0),
                pby             : mysql.escape(req.body.pby),

                remarks         : mysql.escape(req.body.remarks),

                updated_by      : mysql.escape(req.body.created_by),
                updated_on      : mysql.escape(req.body.created_on || moment().format('YYYY-MM-DD HH:mm:ss'))
            };

            
            const responce  = await model.updateMaster(id, params);
            
            // First delete from existing
            const purchaseOrderData = await model.getPurchaseOrderById(id);

            let responceItems = false;
            purchaseOrderData.forEach(async(element) => {

                let params = {
                    bill_no         : mysql.escape(id),
                    in_id           : mysql.escape(element.in_id),
                    menu_code       : mysql.escape(element.menu_code),
                    name            : mysql.escape(element.name),
                    cost_per_pkg    : mysql.escape(element.cost_per_pkg),
                    cost_per_unit   : mysql.escape(element.cost_per_unit),
                    pkg_size        : mysql.escape(element.pkg_size),
                    pkg_stock       : mysql.escape(element.pkg_stock),
                    pkg_unit        : mysql.escape(element.pkg_unit.value),
                    quantity        : mysql.escape(element.quantity)
                }
                responceItems = await model.deleteItemsMaster(params);
            })

            let purchaseOrder = req.body.purchase_order_items;
            let purchaseOrderDataNew = JSON.parse(purchaseOrder);

            let responceItemsNew = false;
            purchaseOrderDataNew.forEach(async(element) => {

                let params = {
                    bill_no         : mysql.escape(id),
                    in_id           : mysql.escape(element.in_id),
                    menu_code       : mysql.escape(element.menu_code),
                    name            : mysql.escape(element.name),
                    cost_per_pkg    : mysql.escape(element.cost_per_pkg),
                    cost_per_unit   : mysql.escape(element.cost_per_unit),
                    pkg_size        : mysql.escape(element.pkg_size),
                    pkg_stock       : mysql.escape(element.pkg_stock),
                    pkg_unit        : mysql.escape(element.pkg_unit.value),
                    quantity        : mysql.escape(element.quantity)
                }
                responceItemsNew = await model.addItemsMaster(params);
            })

            let data = {};
            if(responce)
            {
                data["status"] = 200;
                data["message"] = "Purchase Order record updated successfully";
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
            const responce = await model.deleteMaster(id);
            const purchaseOrderData = await model.getPurchaseOrderById(id);

            let responceItems = false;
            purchaseOrderData.forEach(async(element) => {

                let params = {
                    bill_no         : mysql.escape(id),
                    in_id           : mysql.escape(element.in_id),
                    menu_code       : mysql.escape(element.menu_code),
                    name            : mysql.escape(element.name),
                    cost_per_pkg    : mysql.escape(element.cost_per_pkg),
                    cost_per_unit   : mysql.escape(element.cost_per_unit),
                    pkg_size        : mysql.escape(element.pkg_size),
                    pkg_stock       : mysql.escape(element.pkg_stock),
                    pkg_unit        : mysql.escape(element.pkg_unit.value),
                    quantity        : mysql.escape(element.quantity)
                }
                responceItems = await model.deleteItemsMaster(params);
            })
            
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
