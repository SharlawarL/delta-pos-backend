
const db = require('../connection/dbConnection')
const bcrypt = require('bcrypt');

module.exports = {
    empLogin: async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                // data fetch from employee table
                const sql = "SELECT e.*, bs.id as branch_id,bs.name as branch_name FROM employees e left join branch_master bs on e.branch = bs.id where e.email='" + params.email + "' ";

                let result = await db.queryData(sql);

                resolve(result);
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    empRegister: async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const encPass = await bcrypt.hash(params.password, 10);

                params.password = encPass;

                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into employees(" + keys.join(",") + ") values ('" + values.join("','") + "') ";


                // const sql = "INSERT into employees (firstname, lastname, mobile, email, password, status, branch) values('" + params.firstname + "', '" + params.lastname + "', '" + params.mobile + "', '" + params.email + "', '" + encPass + "', 'active', '" + params.branch + "')";

                let result = await db.queryData(sql);

                console.log("result", result?.insertId)

                resolve({ insertId: result?.insertId, result : result});

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
}
