const db = require('../connection/dbConnection')

module.exports = {
    driverLogin : (params, callback) =>{

        // data fetch from employee table
        const sql ="SELECT * FROM driver where email='"+params.email+"' ";

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
    getAllDriverMaster : (callback) =>{

        // data fetch from Drivers table
        const sql ="SELECT * FROM driver where status='active'";

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
    getPendingJobs : (callback) =>{

        // data fetch from Drivers table
        const sql ="SELECT * FROM job where driver_by=''";

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
    getJobsByDriverId : (id, callback) =>{

        // data fetch from Drivers table
        const sql ="SELECT j.*, b.geo_lat, b.geo_long FROM job j left join branch_master b on b.name=j.quote_created_in where driver_by='"+id+"' ";

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
    getDriverById : (id, callback) =>{

        // data fetch from Drivers table
        const sql ="SELECT * FROM driver where status='active' and id='"+id+"' ";

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
    getDriverAssignedById : (id) =>{
      return new Promise( async (resolve, reject) =>{
            try {

                // data fetch from Drivers table
                const sql ="SELECT * FROM job where status='active' and driver_app_status='Accepted' and trip_status !='End Trip' and driver_by='"+id+"' ";

                console.log(sql)

                let result = await db.queryData(sql);
              	
              	resolve(result);
              
              } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getDriverAssignedByIdComp : (id) =>{
        return new Promise( async (resolve, reject) =>{
              try {
  
                  // data fetch from Drivers table
                  const sql ="SELECT * FROM job where status='active' and driver_app_status='Accepted' and trip_status ='End Trip' and driver_by='"+id+"' ";
  
                  console.log(sql)
  
                  let result = await db.queryData(sql);
                    
                    resolve(result);
                
                } catch (error) {
                  console.log("Error :", error)
                  reject(error)
              }
          })
      },
    getDriverPendingById : (id, callback) =>{

        // data fetch from Drivers table
        const sql ="SELECT * FROM job where status='active' and driver_app_status='Pending' and trip_status='Pending' and driver_by='"+id+"' ";

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
    addDriverMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into driver ("+keys.join(",")+") values ('"+values.join("','")+"') ";


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
    updateDriverMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE driver SET "+param.join(",")+" where id='"+id+"' ";

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
    deleteDriverMaster : (id, callback) =>{

        // data fetch from Driver table
        let sql ="UPDATE driver SET status='deleted' where id='"+id+"' ";

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
    assignJobToDriver : (params, callback)  =>{

        let sql ="UPDATE job SET driver_by='"+params.driver_id+"', driver_app_status='"+params.status+"' where id='"+params.job_id+"' ";

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
}