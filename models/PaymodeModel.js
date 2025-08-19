
const db = require('../connection/dbConnection')

module.exports = {
    getAllMaster : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM payment_modes";

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
    getById : (id, callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM payment_modes where id='"+id+"' ";

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
    addMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into payment_modes("+keys.join(",")+") values ('"+values.join("','")+"') ";

        console.log("params", keys, values)
        console.log("sql", sql)

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
    updateMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE payment_modes SET "+param.join(",")+" where id='"+id+"' ";

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
    deleteMaster : (id, callback) =>{

        // data fetch from vehicle table
        const sql ="DELETE from payment_modes WHERE id='"+id+"' ";
        // let sql ="UPDATE vehicle_maintenance SET status='deleted' where id='"+id+"' ";

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