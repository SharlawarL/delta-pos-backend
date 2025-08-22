const db = require('../connection/dbConnection');

module.exports = {
    getAllMaster: () => {
        const sql = `
            SELECT id, icon, cat_name, status, created_by, created_on, updated_by, updated_on 
            FROM tbl_itemmaster_category_master order by id desc
        `;
        return new Promise((resolve, reject) => {
            db.query(sql, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    },

    getById: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = "SELECT * FROM tbl_itemmaster_category_master where id='" + id + "' ";

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
            let keys = Object.keys(params);
            let values = Object.values(params);

            const sql = "INSERT into tbl_itemmaster_category_master(" + keys.join(",") + ") values ('" + values.join("','") + "') ";

            let result = await db.queryData(sql);

            return resolve(result)
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

                let sql = "UPDATE tbl_itemmaster_category_master SET " + param.join(",") + " where id='" + id + "' ";


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
            const sql = `DELETE FROM tbl_itemmaster_category_master WHERE id='${id}' `;

            let result = await db.queryData(sql);

            return resolve(result)
        });
    }
};
