const db = require('../connection/dbConnection')
const bcrypt = require('bcrypt');

module.exports = {
    getAllEmployees : (condition, callback) =>{

        // Condition configurations
        let cond = "";

        for(let key in condition)
        {
            cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
            
        }

        // data fetch from employees table
        const sql ="Select * from tbl_setting_employees where status='active' "+cond+" order by id desc";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    getAllMenu: (condition, callback) =>{


        // data fetch from employees table
        const sql ="Select * from tbl_menu order by id asc";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    getEmployeesById : (id, callback) =>{

        // data fetch from employees table
       const sql ="Select * from tbl_setting_employees where status='active' and id='"+id+"' ";
      

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    employeeUpdate : async (id, params, callback) => {

        let param = [];
        
        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"="+params[key]+" ")
        }

        let sql ="UPDATE tbl_setting_employees SET "+param.join(",")+" where id='"+id+"' ";

        console.log("Sql", sql)

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    passwordChange : async (id, params, callback) => {
        const encPass = await bcrypt.hash(params.password, 10);

        const sql ="UPDATE tbl_setting_employees SET password = '"+encPass+"' WHERE id= '"+id+"' ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    deleteEmployee : async (id, callback) => {
        
        let sql ="UPDATE tbl_setting_employees SET status='deleted' where id='"+id+"' ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },

}
