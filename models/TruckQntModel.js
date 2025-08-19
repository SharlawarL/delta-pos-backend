
const db = require('../connection/dbConnection')

module.exports = {
    getTruckQnt : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM `truck_qty`";

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
        const sql ="SELECT * FROM `truck_qty` where id='"+id+"' ";

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
    addTruckQnt : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT INTO `truck_qty`("+keys.join(",")+") values ('"+values.join("','")+"') ";

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
    updateTruckQnt : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE `truck_qty` SET"+param.join(",")+" where id  ='"+id+"' ";

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
    deleteTruckQnt : (id, callback) =>{

        // data fetch from Voucher table
        const sql ="DELETE FROM `truck_qty` WHERE id='"+id+"' ";

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