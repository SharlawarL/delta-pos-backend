
const db = require('../connection/dbConnection')
const  moment = require('moment/moment')

module.exports = {
    getAllQuoteMaster : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {

                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(key != 'created_date')
                    {
                        if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    }
                    
                }


                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM quotation where status='active' "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getAllJobMaster : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(key != 'created_date')
                    {
                        if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    }
                    
                }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM job where driver_status='Assigned' "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getAllCustMaster : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(key != 'created_date')
                    {
                        if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    }
                    
                }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM customer where status='active' "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getAllVehicleMaster: async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {

                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(key != 'created_date')
                    {
                        if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    }
                    
                }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM vehicle where status='active'  "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getTodaysQuoteMaster : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                 // Condition configurations
                 let cond = "";

                 console.log("condition", condition)

                 for(let key in condition)
                 {
                    if(condition[key])
                    {
                        if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    }              
                     
                 }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM quotation where status='active' "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getTodaysJobMaster : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // Condition configurations

                let cond = "";

                for(let key in condition)
                {
                   if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    
                }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM job where status='active' "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getTodaysInvoice : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    }                     
                }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM invoice where status='active' "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getAllInvoices : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                    if(key != 'created_date')
                    {
                        if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    }
                    
                }

                // data fetch from customers table
                const sql ="SELECT count(*) as cnt FROM invoice where status='active'  "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getTodaysIncome : async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                
                // Condition configurations
                let cond = "";

                for(let key in condition)
                {
                   if(condition[key])
                    {
                        cond += " and "+(key).toString()+" = '"+(condition[key]).toString()+"' ";
                    } 
                    
                }

                // data fetch from customers table
                const sql ="SELECT SUM(total) as cnt FROM invoice where status='active'  "+cond+" ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getAllIncome : async () =>{
        return new Promise( async (resolve, reject) =>{
            try {
                let date =  moment().format('YYYY-MM-DD');
                // data fetch from customers table
                const sql ="SELECT SUcountM(total) as cnt FROM invoice where status='active' ";

                let result = await db.queryData(sql);

                if(result.length > 0)
                {
                    resolve(result[0]["cnt"]);
                } else {
                    resolve(0);
                }
                
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getReportQuoteMaster : async (created_date) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM quotation q left join customer c on q.customer_key = c.id where q.status='active' and q.created_date="+moment(created_date).format('YYYY-MM-DD')+"  order by q.id desc limit 5";

                let result = await db.queryData(sql);

                resolve(result)                

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getReportJobMaster : async (created_date) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.job_status ='completed' and date(q.created_date)='"+moment(created_date).format('YYYY-MM-DD')+"' order by q.id desc limit 5";

                console.log("sql", sql)

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getReportJobMasterPending : async (created_date) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.job_status ='pending' and date(q.created_date)='"+moment(created_date).format('YYYY-MM-DD')+"' order by q.id desc limit 5";
                console.log("sql", sql)

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getChartQuoteMaster : async () =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT quote_date, SUM(total) as cnt FROM `quotation` group by quote_date order by quote_date desc limit 4";

                let result = await db.queryData(sql);

                let res = {}

                for(let rd in result)
                {
                    res[result[rd]?.quote_date] =  (parseFloat(result[rd]?.cnt)).toFixed(2)
                }

                resolve(res)                

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getChartInvoiceMaster: async () =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT quote_date, SUM(total) as cnt FROM `invoice` group by quote_date order by quote_date desc limit 4";

                let result = await db.queryData(sql);

                let res = {}

                for(let rd in result)
                {
                    res[result[rd]?.quote_date] = (parseFloat(result[rd]?.cnt)).toFixed(2)
                }

                resolve(res)                 

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getJobCompleted: async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT quote_date, SUM(total) as cnt FROM `job` where job_status='completed' group by quote_date order by quote_date desc limit 4";

                let result = await db.queryData(sql);

                let res = {}

                for(let rd in result)
                {
                    res[result[rd]?.quote_date] = (parseFloat(result[rd]?.cnt)).toFixed(2)
                }

                resolve(res)                 

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getJobPending: async (condition) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                // data fetch from customers table
                const sql ="SELECT quote_date, SUM(total) as cnt FROM `job` where job_status='pending' group by quote_date order by quote_date desc limit 4";

                let result = await db.queryData(sql);

                let res = {}

                for(let rd in result)
                {
                    res[result[rd]?.quote_date] = (parseFloat(result[rd]?.cnt)).toFixed(2)
                }

                resolve(res)                 

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getActivityData : async (id) =>{
        return new Promise( async (resolve, reject) =>{
            try {
                
                // data fetch from customers table
                const sql ="SELECT * FROM `notification_master` where created_by='"+id+"' and subject != 'Check API Request' ORDER BY `id` DESC limit 8";

                console.log("sql", sql)

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
}