const db = require('../connection/dbConnection');
const moment = require('moment/moment')

module.exports = {
    getAllMaster: () => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `
                    SELECT 
                    poi.id, poi.bill_no, poi.supplier_id, tss.firstname as supplier_firstname, tss.lastname as supplier_lastname, poi.sub_total, poi.discount, poi.other, poi.pby, poi.net_total, poi.remarks, poi.created_by, poi.created_on, poi.updated_by, poi.updated_on
                    FROM purchase_order as poi 
                    left join tbl_setting_supplier as tss on tss.id = poi.supplier_id
                    order by id desc
                `;

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    getById: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `SELECT 
                    poi.id, poi.bill_no, poi.supplier_id, tss.firstname as supplier_firstname, tss.lastname as supplier_lastname, poi.sub_total, poi.discount, poi.other, poi.pby, poi.net_total, poi.remarks, poi.created_by, poi.created_on, poi.updated_by, poi.updated_on
                    FROM purchase_order as poi 
                    left join tbl_setting_supplier as tss on tss.id = poi.supplier_id
                    Where poi.id='${id}' `;

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    getPurchaseOrderById: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `SELECT  * from purchase_order_items 
                    Where bill_no='${id}' `;

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    addMaster:async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into purchase_order(" + keys.join(",") + ") values (" + values.join(",") + ") ";

                let result = await db.queryData(sql);

                const sqlDayBook = `INSERT into accounts_daybook
                ( date, billno, entry, part, debit, credit, pby, page) values 
                 ('${moment().format('YYYY-MM-DD HH:mm:ss')}', '${result.insertId}', 'Debit', 'Purchase', ${params?.net_total}, '0', ${params?.pby}, 'purchase') `;

                let resultDayBook = await db.queryData(sqlDayBook);

                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    addItemsMaster:async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into purchase_order_items(" + keys.join(",") + ") values (" + values.join(",") + ") ";

                console.log("sql", sql)
                let result = await db.queryData(sql);

                const sqlUpdate = `UPDATE tbl_pos_ingredients SET current_stock = current_stock + ${params.pkg_stock}, cost_per_unit = ${params.cost_per_unit}  WHERE menu_code = ${params.menu_code} and name=${params.name}`;
                console.log("sqlUpdate", sqlUpdate)

                let resultUpdate = await db.queryData(sqlUpdate);

                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    updateMaster: (id, params) => {
        return new Promise(async(resolve, reject) => {
            try {
                let param = [];

                // Rearrange paramas for set
                for (let key of Object.keys(params)) {
                    param.push(" " + key + "=" + params[key] + " ")
                }

                let sql = "UPDATE purchase_order SET " + param.join(",") + " where id='" + id + "' ";


                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    deleteMaster: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM purchase_order WHERE id='${id}' `;

                let result = await db.queryData(sql);

                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    
    deleteItemsMaster:async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = `DELETE FROM purchase_order_items WHERE bill_no=${params?.bill_no}`;

                console.log("sql", sql)
                let result = await db.queryData(sql);

                const sqlUpdate = `UPDATE tbl_pos_ingredients SET current_stock = current_stock - ${params.pkg_stock}  WHERE menu_code = ${params.menu_code} and name=${params.name}`;
                console.log("sqlUpdate", sqlUpdate)

                let resultUpdate = await db.queryData(sqlUpdate);

                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

};
