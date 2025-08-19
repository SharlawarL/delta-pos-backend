
const db = require('../connection/dbConnection')

module.exports = {
    getAllVehicleMaster : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM vehicle where status='active'";

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
    getVehicleById : (id, callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM vehicle where status='active' and id='"+id+"' ";

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
    addVehicleMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into vehicle("+keys.join(",")+") values ('"+values.join("','")+"') ";

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
    updateVehicleMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE vehicle SET "+param.join(",")+" where id='"+id+"' ";

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
    deleteVehicleMaster : (id, callback) =>{

        // data fetch from vehicle table
        // const sql ="DELETE from vehicle WHERE id='"+id+"' ";
        let sql ="UPDATE vehicle SET status='deleted' where id='"+id+"' ";

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