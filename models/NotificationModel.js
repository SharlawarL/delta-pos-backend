
const db = require('../connection/dbConnection')

module.exports = {
    addMaster: async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into notification_master(" + keys.join(",") + ") values ('" + values.join("','") + "') ";

                let result = await db.queryData(sql);

                // console.log("result", result?.insertId)
                
                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
}