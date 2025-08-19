
const db = require('../connection/dbConnection')

module.exports = {
    getAllCustomers : (callback) =>{

        // data fetch from customers table
        const sql ="Select * from customers";

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

    addCustomers : (params, callback)  =>{

        // data fetch from customers table
        const sql ="INSERT into customers(name, address) values ('"+params.name+"', '"+params.address+"') ";

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

    updateCustomers : (id, params, callback)  =>{

        // data fetch from customers table
        const sql ="UPDATE customers SET id='"+params.id+"', name ='"+params.name+"', address = '"+params.address+"' WHERE id='"+id+"' ";


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
    deleteCustomers : (id, callback)  =>{

        // data fetch from customers table
        const sql ="DELETE from customers WHERE id='"+id+"' ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    }
}