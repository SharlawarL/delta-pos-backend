
const db = require('../connection/dbConnection')

module.exports = {
    getAllClassificationMaster : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT * FROM cse_fleet.classification_master";

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
        const sql ="INSERT into classification_master(JobClassification) values ('"+params.JobClassification+"') ";

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