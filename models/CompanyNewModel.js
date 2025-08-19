
const db = require('../connection/dbConnection')

module.exports = {
    getAllMaster: async () => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from employee table
                const sql = "SELECT * from company_new order by id desc" ;

                console.log("sql", sql)

                let result = await db.queryData(sql);

                resolve(result);
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getById: async ( id ) => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from employee table
                const sql = "SELECT * from company_new where id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result);
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    addMaster: async ( params ) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into company_new(" + keys.join(",") + ") values ('" + values.join("','") + "') ";

                let result = await db.queryData(sql);

                resolve(result);
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    updateMaster: async ( id, params ) => {
        return new Promise(async (resolve, reject) => {
            try {

                let param = [];

                for (let key of Object.keys(params)) {
                    param.push(" " + key + "='" + params[key] + "' ")
                }
        
                let sql = "UPDATE company_new SET " + param.join(",") + " where id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result);
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    deleteMaster: async ( id ) => {
        return new Promise(async (resolve, reject) => {
            try {
        
                const sql = "DELETE from company_new WHERE id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result);
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
}