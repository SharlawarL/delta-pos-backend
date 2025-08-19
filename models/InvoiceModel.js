
const e = require('cors');
const db = require('../connection/dbConnection')
const  moment = require('moment/moment')

module.exports = {
    getAllJobMaster: (callback) => {

        // data fetch from customers table
        const sql = "SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM invoice q left join customer c on q.customer_key = c.id where q.status='active' order by q.id desc";

        db.query(sql, (err, result) => {
            // Error
            if (err) {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    getJobById: (id, callback) => {

        // data fetch from Job master table
        const sql = "SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, c.address, q.status FROM invoice q left join customer c on q.customer_key = c.id where q.status='active' and q.id='" + id + "' ";

        db.query(sql, (err, result) => {
            // Error
            if (err) {
                callback(err)
            }

            // data fetch from Job items table
            const sql2 = "SELECT * FROM invoice_product where quote ='" + id + "' ";

            db.query(sql2, (err, result2) => {
                // Error
                if (err) {
                    callback(err)
                }

                // Result2
                if (result && result.length > 0) {
                    result[0]["products"] = result2;
                }


                // Result
                callback(null, result);
            });


        });
    },
    addJobMaster: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into invoice (" + keys.join(",") + ") values ('" + values.join("','") + "') ";

                let result = await db.queryData(sql);

                console.log("result", result?.insertId)

                const sqlBranch = "SELECT * FROM branch_master where name='" + params?.quote_created_in + "' ";
                            
                let resultBranch = await db.queryData(sqlBranch);
    
                let branch = resultBranch.length > 0 ? (resultBranch[0]['prefix'] ? resultBranch[0]['prefix'] : resultBranch[0]['name']): (params?.quote_created_in).replace(" ", "_");
                branch = branch.toUpperCase();

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
                
                let insertId = result?.insertId ? result?.insertId : 0;

                // let quote_id = "CSE/INVOICE/" +branch+"/"+ (params?.q_id.toString()).padStart(6, "0");
                
                let quote_id = "";
                if(params?.q_id)
                {
                    quote_id = "CSE/"+branch+"/" + ((params?.q_id).toString())+"/"+moment().format("MM")+"/"+moment().format("YY")+"/"+transf;
                } else {
                    quote_id = "CSE/"+branch+"/"+moment().format("MM")+"/"+moment().format("YY")+"/"+transf;
                }

                let sqlUpdate = "UPDATE invoice SET quote_id='" + quote_id + "' where id='" + insertId + "' ";




                let resultUpdate = await db.queryData(sqlUpdate);

                resolve({ insertId: insertId, quote_id: quote_id })
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    addJobItemMaster: (id, row, callback) => {

        let keys = Object.keys(row[0]);
        keys[0] = "quote"
        let values = []

        let quote_id = "CSE/INVOICE/" + (id.toString()).padStart(6, "0");
        let total = 0;

        for (let q in row) {
            let value = Object.values(row[q]);

            total = total + Number(row[q]['amount']);

            value[0] = id;

            values.push(value.join("','"))
        }

        const sql = "INSERT into invoice_product(`" + keys.join("`,`") + "`) values ('" + values.join("'),('") + "') ";

        db.query(sql, (err, result) => {
            // Error
            if (err) {
                callback(err)
            }

            // let sq1l ="UPDATE invoice SET quote_id='"+quote_id+"', total='"+total+"' where id='"+id+"' ";

            // console.log("SQL 2 ==>", sq1l)

            // db.query(sq1l, (err1, result1) =>{
            // });

            // Result
            callback(null, result);
        });
    },
    addQuotationJobItemMaster: (id, is_status = 'No', drow ) => {
        return new Promise(async (resolve, reject) => {
            try {
                const modifiedData = drow.map(({ id, ...rest }) => rest);

                let row = modifiedData;

                console.log("Row", row)

                let keys = Object.keys(row[0]);
                keys[0] = "quote"
                let values = []

                let quote_id = "CSE/INVOICE/" + (id.toString()).padStart(6, "0");
                let total = 0;

                for (let q in row) {
                    let value = Object.values(row[q]);

                    total = total + Number(row[q]['total']);

                    value[0] = id;

                    values.push(value.join("','"))
                }

                const sql = "INSERT into invoice_product(`" + keys.join("`,`") + "`) values ('" + values.join("'),('") + "') ";

                console.log("sql insert", sql)

                let result = await db.queryData(sql);

                let sq1l = "UPDATE invoice SET total='" + total + "' where id='" + id + "' ";

                console.log("SQL 2 ==>", sq1l)

                let result1 = await db.queryData(sq1l);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    updateJobMaster: (id, params, callback) => {

        let param = [];

        // Rearrange paramas for set
        for (let key of Object.keys(params)) {
            param.push(" " + key + "='" + params[key] + "' ")
        }

        let sql = "UPDATE invoice SET " + param.join(",") + " where id='" + id + "' ";

        console.log("SQL ==>", sql)

        db.query(sql, (err, result) => {
            // Error
            if (err) {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    updateJobItemMaster: (id, row, callback) => {

        const sqlDelete = "DELETE from invoice_product WHERE quote='" + id + "' ";

        db.query(sqlDelete, (err, result) => {
            // Error
            if (err) {
                callback(err)
            }

            const newArray = row.map(({ quote, ...rest }) => rest);

            row = newArray;
            // Result
            let keys = Object.keys(row[0]);
            keys[0] = "quote"
            let values = []

            let quote_id = "CSE/" + (id.toString()).padStart(6, "0");
            let total = 0;

            for (let q in row) {
                let value = Object.values(row[q]);

                total = total + Number(row[q]['amount']);

                value[0] = id;

                values.push(value.join("','"))
            }

            const sql = "INSERT into invoice_product(`" + keys.join("`,`") + "`) values ('" + values.join("'),('") + "') ";

            db.query(sql, (err, result) => {
                // Error
                if (err) {
                    callback(err)
                }

                // Result
                callback(null, result);
            });
        });


    },
    deleteJobMaster: (id, callback) => {

        // data fetch from Job table
        // const sql ="DELETE from Job WHERE id='"+id+"' ";
        let sql = "UPDATE invoice SET status='deleted' where id='" + id + "' ";

        db.query(sql, (err, result) => {
            // Error
            if (err) {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    getJobMailData : async (id) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from job table
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM invoice q left join customer c on q.customer_key = c.id where q.status='active' and q.id='"+id+"'  order by q.id desc";

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
  jobDocAddConvert : (jid, qid, callback)  =>{
    
    return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from job table
                const sql ="SELECT * FROM job_attachment where job_id='"+qid+"' order by id desc";

                let result = await db.queryData(sql);
              	console.log("result", result)

                for(let i in result)
                {
                  console.log("result i", result[i])
                  let sql2 ="INSERT INTO `invoice_attachment`(`job_id`, `name`, `filename`, `comment`, `created_by`, `created_on`) VALUES ('"+jid+"', '"+result[i]?.name+"', '"+result[i]?.filename+"', '"+result[i]?.comment+"' , '"+result[i]?.created_by+"' , '"+moment().format('YYYY-MM-DD HH:mm:ss')+"') ";
				  console.log("sql2", sql2)
                  
                  let resultData = await db.queryData(sql2);
                }

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
        
    },
  jobDocList : (id, callback) =>{

        const sql ="SELECT * FROM invoice_attachment where job_id='"+id+"' order by id desc";

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
  jobPayAddConvert : (jid, qid, callback)  =>{
    
    return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from job table
                const sql ="SELECT * FROM job_payment where job_id='"+qid+"' order by id desc";
              	console.log("sql i", sql)

                let result = await db.queryData(sql);
              	console.log("result", result)

                for(let i in result)
                {
                  console.log("result i", result[i])
                  let sql2 ="INSERT INTO `invoice_payment`(`job_id`, `type`, `pay_mode`, `amount`, `remark`, `filename`, `created_by`, `created_on`) VALUES ('"+jid+"', '"+result[i]?.type+"', '"+result[i]?.pay_mode+"', '"+result[i]?.amount+"', '"+result[i]?.remark+"', '"+result[i]?.filename+"' , '"+result[i]?.created_by+"' , '"+moment().format('YYYY-MM-DD HH:mm:ss')+"') ";
				  console.log("sql2", sql2)
                  
                  let resultData = await db.queryData(sql2);
                }

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
        
    },
  jobPaymentList : (id, callback) =>{

        const sql ="SELECT * FROM invoice_payment where status='active' and job_id='"+id+"' order by id desc";

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