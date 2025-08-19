
const db = require('../connection/dbConnection')
const moment = require('moment-timezone')

module.exports = {
    getAllQuotationMaster : (condition, offset, type) =>{
        return new Promise( async (resolve, reject) =>{
            try {// Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(condition[key])
                    {
                        cond += " and q."+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    }
                }

                // data fetch from customers table
                let sql =`SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM quotation q left join customer c on q.customer_key = c.id`;

                sql += ` where q.status='active' ${cond}`;
                sql += ` order by q.id desc `
                // if(type != 'grand_total'){
                //     sql += ` limit ${offset.page},${offset.limit}`;
                // }
                console.log("sql", sql)
                

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    if(type == 'grand_total'){
                        resolve(result.length);
                    }else {
                        resolve(result);
                    }
                    
                } else {
                    resolve([]);
                }
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getQuotationByCustMaster : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM quotation q left join customer c on q.customer_key = c.id where q.status='active' order by q.id desc";

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

    getQuotationByCustByStatusMaster : (status = 'Pending', callback) =>{

        // data fetch from customers table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM quotation q left join customer c on q.customer_key = c.id where q.status='active' and c_status='"+status+"' order by q.id desc";

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
    getQuotationById : (id, callback) =>{

        // data fetch from quotation master table
        const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, c.address, q.status FROM quotation q left join customer c on q.customer_key = c.id where q.status='active' and q.id='"+id+"'  order by q.id desc ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }   

             // data fetch from quotation items table
            const sql2 ="SELECT * FROM quotation_product where quote ='"+id+"' ";

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
  	getQuotationEmailHistoryById : (id, callback) =>{

        // data fetch from quotation master table
        const sql ="SELECT * FROM `email_history` where quote_id='"+id+"' order by id desc ";

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
    addQuotationMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into quotation("+keys.join(",")+") values ('"+values.join("','")+"') ";

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

            console.log("resultBranch", resultBranch)

            let branch = resultBranch.length > 0 ? (resultBranch[0]['prefix'] ? resultBranch[0]['prefix'] : resultBranch[0]['name']): (params?.quote_created_in).replace(" ", "_");
            branch = branch.toUpperCase();
            
            let id = result.insertId;
            let quote_id = "CSE/"+branch+"/" + ((id).toString())+"/"+moment().format("MM")+"/"+moment().format("YY")+"/"+transf;

            let sq1l ="UPDATE quotation SET quote_id='"+quote_id+"' where id='"+id+"' ";

            console.log("SQL 2 ==>", sq1l)

            db.query(sq1l, (err1, result1) =>{
            });

            // Result
            callback(null, result);
        });
    },
    addQuotationItemMaster : (id, row, callback)  =>{

        let keys = Object.keys(row[0]);
        keys[0] = "quote"
        let values = []
        
        // let quote_id = "CSE/QUOTE/" + (id.toString()).padStart(6,"0");
        let total = 0;

        for(let q in row)
        {
            let value = Object.values(row[q]);

            total = total + (Number(row[q]['total']));

            value[0] = id;

            values.push(value.join("','"))
        }

        const sql ="INSERT into quotation_product(`"+keys.join("`,`")+"`) values ('"+values.join("'),('")+"') ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }

            let sq1l ="UPDATE quotation SET total='"+total+"' where id='"+id+"' ";

            console.log("SQL 2 ==>", sq1l)

            db.query(sq1l, (err1, result1) =>{
            });

            // Result
            callback(null, result);
        });
    },
    updateQuotationMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE quotation SET "+param.join(",")+" where id='"+id+"' ";

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
    updateQuotationItemMaster : (id, row, callback)  =>{

        const sqlDelete ="DELETE from quotation_product WHERE quote='"+id+"' ";

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

            const sql ="INSERT into quotation_product(`"+keys.join("`,`")+"`) values ('"+values.join("'),('")+"') ";

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
    deleteQuotationMaster : (id, callback) =>{

        // data fetch from Quotation table
        // const sql ="DELETE from Quotation WHERE id='"+id+"' ";
        let sql ="UPDATE quotation SET status='deleted' where id='"+id+"' ";

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
    getQuotationMailData : async (id) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, c.address, q.status FROM quotation q left join customer c on q.customer_key = c.id where q.status='active' and q.id='"+id+"'  order by q.id desc";

                let result = await db.queryData(sql);

                const sqlProduct ="SELECT * FROM quotation_product  where quote='"+id+"' ";

                result[0]['product'] = await db.queryData(sqlProduct);

                resolve(result[0])
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    updateCostomerStatus : (id, params, callback) =>{

        // data fetch from Quotation table
        // const sql ="DELETE from Quotation WHERE id='"+id+"' ";
        let sql ="UPDATE quotation SET c_status='"+params.c_status+"', c_remarks='"+params.c_remarks+"' where id='"+id+"' ";

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
    //Quotation Item

    getAllQuotationItem : (callback) =>{

        // data fetch from quotation-product table
        const sql ="SELECT * FROM `cse-fleet`.`quotation_items` order by id desc";
       
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
    getAllQuotationItemByID: (id, callback) =>{

        // data fetch from quotation-product table
        const sql =`SELECT * FROM quotation_items where id='${id}' order by id desc`;
       
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
    addQuotationItemDetails : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into quotation_items("+keys.join(",")+") values ('"+values.join("','")+"') ";

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
    updateQuotationItemDetails : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }
        //let sql ="UPDATE quotation_product SET desc = '"+params.desc+"', amount = '"+params.amount+"' WHERE id= '"+id+"' ";
        let sql ="UPDATE quotation_items SET "+param.join(",")+" where id='"+id+"' ";

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
    addQuotationItemDetails : (params, callback)  =>{
        let keys = Object.keys(params);
        let values = Object.values(params);
       // const sql="INSERT INTO `quotation_items`(`name`,`mobile`,`email`,`dob`,`licence_no`,`licence_expiry`,`exp`,`doj`,`status`,`password`,`address`,`remarks`,`uploadfile`)VALUES('"+params.name+"','"+params.mobile+"','"+params.email+"','"+params.dob+"','"+params.licence_no+"','"+params.licence_expiry+"','"+params.exp+"','"+params.name+"','"+params.status+"','"+params.password+"','"+params.remarks+"','"+params.uploadfile+"')";
        const sql ="INSERT into quotation_items("+keys.join(",")+") values ('"+values.join("','")+"') ";

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
    updateQuotationItem : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE quotation_items SET "+param.join(",")+" where id='"+id+"' ";

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
   
    deleteQuotationItem : (id, callback) =>{

        // data fetch from Quotation table
        let sql ="DELETE from quotation_items WHERE id='"+id+"' ";
       // let sql ="UPDATE quotation SET status='deleted' where id='"+id+"' ";

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
    assignDriverToJob : (id, params, callback) =>{

        // data fetch from Quotation table
        let sql ="UPDATE job SET driver_status='"+params.driver_status+"', driver_by='"+params.driver_by+"' where id='"+id+"' ";

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
 
  
  saveEmailHistory : async (id, email, cc, status) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="INSERT INTO `email_history`(`email`, `cc`, `quote_id`, `created_on`, `status`) VALUES ('"+email+"', '"+cc+"','"+id+"','"+moment.tz("Asia/Kuala_Lumpur").format('YYYY-MM-DD HH:mm:ss')+"', '"+status+"')";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
  
  quotationDocAdd : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into qoute_attachment ("+keys.join(",")+") values ("+values.join(",")+") ";

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
      quotationDocList : (id, callback) =>{

        const sql ="SELECT * FROM qoute_attachment where job_id='"+id+"' order by id desc";

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
  
  quotationDocDelete : (id, callback) =>{

        const sql ="DELETE FROM `qoute_attachment` where id='"+id+"' ";

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