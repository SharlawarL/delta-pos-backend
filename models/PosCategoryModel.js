const db = require('../connection/dbConnection');

module.exports = {
    getAllMaster: () => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `
                    SELECT id, icon, cat_name, status, created_by, created_on, updated_by, updated_on 
                    FROM tbl_pos_category order by id desc
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
                const sql = "SELECT * FROM tbl_pos_category where id='" + id + "' ";

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

                const sql = "INSERT into tbl_pos_category(" + keys.join(",") + ") values ('" + values.join("','") + "') ";

                let result = await db.queryData(sql);

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
                    param.push(" " + key + "='" + params[key] + "' ")
                }

                let sql = "UPDATE tbl_pos_category SET " + param.join(",") + " where id='" + id + "' ";


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
                const sql = `DELETE FROM tbl_pos_category WHERE id='${id}' `;

                let result = await db.queryData(sql);
                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    }
};
