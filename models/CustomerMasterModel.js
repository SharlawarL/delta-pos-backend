const db = require('../connection/dbConnection')

module.exports = {
    getAllCustomerMaster : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM customer  where status='active' order by id DESC";

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
    getCustomerById : (id, callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM customer where status='active' and id='"+id+"' ";

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
    addCustomerMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into customer("+keys.join(",")+") values ('"+values.join("','")+"') ";

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
    updateCustomerMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE customer SET "+param.join(",")+" where id='"+id+"' ";

        console.log("SQL ==>", sql)

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
    deleteCustomerMaster : (id, callback) =>{

        // data fetch from customer table
        let sql ="UPDATE customer SET status='deleted' where id='"+id+"' ";

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