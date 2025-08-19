
const db = require('../connection/dbConnection')

module.exports = {
    getAllCompanyMaster: () => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from company table
                const sql = "SELECT * FROM company_master order by id desc";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error 111 :", error)
                reject(error)
            }
        })
    },
    getById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from company table
                const sql = "SELECT * FROM company_master where id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    addCompanyMaster: async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into company_master(" + keys.join(",") + ") values ('" + values.join("','") + "') ";

                let result = await db.queryData(sql);

                console.log("result", result?.insertId)

                let insertId = result?.insertId ? result?.insertId : 0;

                // Update branch id in Table
                let branch_id = ((insertId).toString()).padStart(6, "0");

                let sqlUpdate = "UPDATE company_master SET company_id='" + branch_id + "' where id='" + insertId + "' ";

                let resultUpdate = await db.queryData(sqlUpdate);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    updateCompanyMaster: (id, params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let param = [];

                // Rearrange company for set
                for (let key of Object.keys(params)) {
                    param.push(" " + key + "='" + params[key] + "' ")
                }

                let sql = "UPDATE company_master SET " + param.join(",") + " where id='" + id + "' ";


                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    deleteCompanyMaster: (id) => {
        return new Promise(async (resolve, reject) => {
            try {

                const sql = "DELETE from company_master WHERE id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    }
}