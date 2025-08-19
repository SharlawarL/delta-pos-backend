
const db = require('../connection/dbConnection')
const  moment = require('moment/moment')

module.exports = {
    getAllJobMaster : (condition, callback) =>{

        // Condition configurations
        let cond = "";

        for(let key in condition)
        {
            if(condition[key])
            {
                cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
            } 
            
        }

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' "+cond+" order by q.id desc";

        console.log("sql ===>>", sql)

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
  	getJobCompletedMaster : (condition, callback) =>{

        // Condition configurations
        let cond = "";

        for(let key in condition)
        {
            if(condition[key])
            {
                cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
            } 
            
        }

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.job_status='completed' "+cond+" order by q.id desc";

        console.log("sql ===>>", sql)

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
    getJobPendingMaster : (condition, callback) =>{

        // Condition configurations
        let cond = "";

        for(let key in condition)
        {
            if(condition[key])
            {
                cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
            } 
            
        }

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.job_status='pending' "+cond+" order by q.id desc";

        console.log("sql ===>>", sql)

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
    getJobTodaysMaster: (condition, callback) =>{

        // Condition configurations
        let cond = "";

        for(let key in condition)
        {
            cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
            
        }

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and created_date='"+moment().format("YYYY-MM-DD")+"' "+cond+" order by q.id desc";

        console.log("sql ===>>", sql)

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
    getJobActiveMaster: (condition, callback) =>{

        // Condition configurations
        let cond = "";

        for(let key in condition)
        {
            cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
            
        }

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and driver_status='Assigned' "+cond+" order by q.id desc";

        console.log("sql ===>>", sql)

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
  	getJobByIdNew : async (id) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from job table
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, c.address, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.id='"+id+"' ";

                let result = await db.queryData(sql);

                const sqlProduct ="SELECT * FROM job_product where quote ='"+id+"' ";

                result[0]['products'] = await db.queryData(sqlProduct);
              
              	const sqlOthercharges ="SELECT * FROM job_payment where status='active' and job_id='"+id+"' order by id desc ";
				
              	let otherData = await db.queryData(sqlOthercharges);
              	let otherTotal = 0;
              	
              	for(let d of otherData)
                {
                  otherTotal = otherTotal + parseFloat(d.amount);
                }
                result[0]['othercharges'] = otherData;
                result[0]['othertotal'] = otherTotal;

                resolve(result[0])
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getJobById : (id, callback) =>{

        // data fetch from Job master table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, c.address, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.id='"+id+"' ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }   

             // data fetch from Job items table
            const sql2 ="SELECT * FROM job_product where quote ='"+id+"' ";

            db.query(sql2, (err, result2) =>{
                // Error
                if(err)
                {
                    callback(err)
                }   
                
                // Result2
                if(result && result.length > 0)
                {
                    result[0]["products"] = result2;
                }
                

                // Result
                callback(null, result);
            });

            
        });
    },
    addJobMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into job ("+keys.join(",")+") values ('"+values.join("','")+"') ";

        db.query(sql, async(err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }

            let transf = "TR"

            if(params?.job_classification == 'HANDLING SERVICES')
            {
                transf = "HS"
            } else if(params?.job_classification == 'AIR EXPORT')
            {
                transf = "AE"
            } else if(params?.job_classification == 'AIR IMPORT')
            {
                transf = "AI"
            } else if(params?.job_classification == 'SEA EXPORT')
            {
                transf = "SE"
            } else if(params?.job_classification == 'SEA IMPORT')
            {
                transf = "SE"
            } else if(params?.job_classification == 'AIR IMPORT CONSOLE')
            {
                transf = "AIC"
            } else {
                transf = "TR"
            }

            const sqlBranch = "SELECT * FROM branch_master where name='" + params?.quote_created_in + "' ";
                        
            let resultBranch = await db.queryData(sqlBranch);

            let branch = resultBranch.length > 0 ? (resultBranch[0]['prefix'] ? resultBranch[0]['prefix'] : resultBranch[0]['name']): (params?.quote_created_in).replace(" ", "_");
            branch = branch.toUpperCase();

            let id = result.insertId;

            let quote_id = "";
            if(params?.q_id)
            {
                quote_id = "CSE/"+branch+"/" + ((params?.q_id).toString())+"/"+moment().format("MM")+"/"+moment().format("YY")+"/"+transf;
            } else {
                quote_id = "CSE/"+branch+"/"+moment().format("MM")+"/"+moment().format("YY")+"/"+transf;
            }

            // let quote_id = "CSE/"+branch+"/" + ((params?.q_id).toString())+"/"+moment().format("MM")+"/"+moment().format("YY")+"/"+transf;

            let sq1l ="UPDATE job SET quote_id='"+quote_id+"' where id='"+id+"' ";

            console.log("SQL 2 ==>", sq1l)

            db.query(sq1l, (err1, result1) =>{
            });


            let sq12 ="UPDATE quotation SET j_id='"+id+"' where id='"+params?.q_id+"' ";

            console.log("SQL 3 ==>", sq12)

            db.query(sq12, (err1, result1) =>{
            });

            // Result
            callback(null, result);
        });
    },
    addJobItemMaster : (id, row, callback)  =>{

        let keys = Object.keys(row[0]);
        keys[0] = "quote"
        let values = []
        
        // let quote_id = "CSE/JOB/" + (id.toString()).padStart(6,"0");
        let total = 0;

        for(let q in row)
        {
            let value = Object.values(row[q]);

            total = total + Number(row[q]['amount']);

            value[0] = id;

            values.push(value.join("','"))
        }

        const sql ="INSERT into job_product(`"+keys.join("`,`")+"`) values ('"+values.join("'),('")+"') ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }

            let sq1l ="UPDATE job SET total='"+total+"' where id='"+id+"' ";

            console.log("SQL 2 ==>", sq1l)

            db.query(sq1l, (err1, result1) =>{
            });

            // Result
            callback(null, result);
        });
    },
    addQuotationJobItemMaster : (id, qid, is_status = 'No', drow, callback)  =>{

        const modifiedData = drow.map(({ id, ...rest }) => rest);

        let row = modifiedData;

        console.log("Row", row)

        let keys = Object.keys(row[0]);
        keys[0] = "quote"
        let values = []
        
        //let quote_id = "CSE/JOB/" + (id.toString()).padStart(6,"0");
        let total = 0;

        for(let q in row)
        {
            let value = Object.values(row[q]);

            total = total + Number(row[q]['total']);

            value[0] = id;

            values.push(value.join("','"))
        }

        const sql ="INSERT into job_product(`"+keys.join("`,`")+"`) values ('"+values.join("'),('")+"') ";

        console.log("sql insert", sql)

        db.query(sql, async (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }

            let sq1l ="UPDATE job SET total='"+total+"' where id='"+id+"' ";

            console.log("SQL 2 ==>", sq1l)

            let result1 = await db.queryData(sq1l);

            let sq12 ="UPDATE quotation SET is_converted='"+is_status+"' where id='"+qid+"' ";

            console.log("SQL 3 ==>", sq1l)
            
            let result2 = await db.queryData(sq12);

            // Result
            callback(null, result);
        });
    },
    updateJobMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE job SET "+param.join(",")+" where id='"+id+"' ";

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
    updateJobItemMaster : (id, row, callback)  =>{

        const sqlDelete ="DELETE from job_product WHERE quote='"+id+"' ";

        db.query(sqlDelete, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }

            const newArray = row.map(({ quote, ...rest }) => rest);

            row = newArray;
            // Result
            let keys = Object.keys(row[0]);
            keys[0] = "quote"
            let values = []
            
            let quote_id = "CSE/" + (id.toString()).padStart(6,"0");
            let total = 0;

            for(let q in row)
            {
                let value = Object.values(row[q]);

                total = total + Number(row[q]['total']);

                value[0] = id;

                values.push(value.join("','"))
            }

            const sql ="INSERT into job_product(`"+keys.join("`,`")+"`) values ('"+values.join("'),('")+"') ";

            db.query(sql, (err, result) =>{
                // Error
                if(err)
                {
                    callback(err)
                }

                // Result
                callback(null, result);
            });
        });

        
    },
    deleteJobMaster : (id, callback) =>{

        // data fetch from Job table
        // const sql ="DELETE from Job WHERE id='"+id+"' ";
        let sql ="UPDATE job SET status='deleted' where id='"+id+"' ";

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
    updateJobTripMaster : (id, reqdata, params)  =>{
        return new Promise( async (resolve, reject) =>{
            try {

                let param = [];

                // Rearrange paramas for set
                let keys = Object.keys(params);
        		let values = Object.values(params);

                const sql ="INSERT into job_trip_activity(`"+keys.join("`,`")+"`) values ('"+values.join("','")+"') ";

                let result = await db.queryData(sql);

                let query = ""
                if(params?.status == "Start Job")
                {
                    query += ", trip_start= '"+moment().format('YYYY-MM-DD HH:mm:ss')+"' "
                    query += ", trip_start_reading ='"+reqdata.reading+"' "
                }
                if(params?.status == "End Trip")
                {
                    query += ", trip_end= '"+moment().format('YYYY-MM-DD HH:mm:ss')+"' "
                    query += ", trip_end_reading ='"+reqdata.reading+"' "
                }

                let sql2 ="UPDATE job SET trip_status='"+params?.status+"', trip_status_by='"+params?.created_by+"' "+query+" where id='"+params?.job_id+"' ";

                let result2 = await db.queryData(sql2);

                if(result.length > 0)
                {
                    resolve(result);
                } else {
                    resolve(0);
                }
            
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })

        
    },
    getJobMailData : async (id) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from job table
                const sql ="SELECT j.*, c.name as cname, c.mobile as cmobile, c.email as cemail, c.address, j.status FROM job j left join customer c on j.customer_key = c.id where j.status='active' and j.id='"+id+"'  order by j.id desc";

                let result = await db.queryData(sql);

                const sqlProduct ="SELECT * FROM job_product  where quote='"+id+"' ";

                result[0]['product'] = await db.queryData(sqlProduct);

                resolve(result[0])
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    jobPaymentAdd : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into job_payment ("+keys.join(",")+") values ("+values.join(",")+") ";

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
    jobPaymentList : (id, callback) =>{

        const sql ="SELECT * FROM job_payment where status='active' and job_id='"+id+"' order by id desc";

        console.log("sql ===>>", sql)

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
      jobDocAdd : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into job_attachment ("+keys.join(",")+") values ("+values.join(",")+") ";

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
      jobDocList : (id, callback) =>{

        const sql ="SELECT * FROM job_attachment where job_id='"+id+"' order by id desc";

        console.log("sql ===>>", sql)

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
      
      jobDocAddConvert : (jid, qid, callback)  =>{
        
         const sql ="SELECT * FROM job_attachment where job_id='"+qid+"' order by id desc";

        console.log("sql ===>>", sql)

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }   
          console.log("result", result)
            // Result
          	for(let i in result)
            {
              console.log("result", result[i])
              const sql ="INSERT INTO `invoice_payment`(`job_id`, `name`, `filename`, `comment`, `created_by`, `created_on`) VALUES ('"+jid+"', '"+result[i]?.name+"', '"+result[i]?.filename+"', '"+result[i]?.comment+"' , '"+result[i]?.created_by+"' , '"+moment().format('YYYY-MM-DD HH:mm:ss')+"') ";

              db.query(sql, (err, result) =>{
              });
            }
          
          	
            callback(null, result);
        });
        /**

        let keys = Object.keys(params);
        let values = Object.values(params);

        
        */
    },
      jobDocDelete : (id, callback) =>{

        const sql ="DELETE FROM `job_attachment` where id='"+id+"' ";

        console.log("sql ===>>", sql)

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