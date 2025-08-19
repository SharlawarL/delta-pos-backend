
const db = require('../connection/dbConnection')

module.exports = {
    getAllBranchMaster: () => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = "SELECT b.*, c.company_name as cname FROM branch_master b left join company_master  c on c.id = b.company order by id DESC";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getById: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = "SELECT * FROM branch_master where id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    addMaster: async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into branch_master(" + keys.join(",") + ") values ('" + values.join("','") + "') ";

                let result = await db.queryData(sql);

                console.log("result", result?.insertId)

                let insertId = result?.insertId ? result?.insertId : 0;

                // Update branch id in Table
                let branch_id = ((insertId).toString()).padStart(6, "0");

                let sqlUpdate = "UPDATE branch_master SET branch_id='" + branch_id + "' where id='" + insertId + "' ";

                let resultUpdate = await db.queryData(sqlUpdate);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    updateMaster: (id, params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let param = [];

                // Rearrange paramas for set
                for (let key of Object.keys(params)) {
                    param.push(" " + key + "='" + params[key] + "' ")
                }

                let sql = "UPDATE branch_master SET " + param.join(",") + " where id='" + id + "' ";


                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    deleteMaster: (id) => {
        return new Promise(async (resolve, reject) => {
            try {

                const sql = "DELETE from branch_master WHERE id='" + id + "' ";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    }
}