
const db = require('../connection/dbConnection');

module.exports = {
    getQuotationReport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM quotation q left join customer c on q.customer_key = c.id where q.status='active' and q.created_date between '"+params?.fromdate+"' and '"+params?.todate+"' order by q.id desc";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getJobReport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM job q left join customer c on q.customer_key = c.id where q.status='active' and q.created_date between '"+params?.fromdate+"' and '"+params?.todate+"' order by q.id desc";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getInvoiceReport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT q.*, c.name as cname, c.mobile as cmobile, c.email as cemail, q.status FROM invoice q left join customer c on q.customer_key = c.id where q.status='active' and q.created_date between '"+params?.fromdate+"' and '"+params?.todate+"' order by q.id desc";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    }, 
    getQuotationStatusReport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT q.id, q.quote_id, q.created_date, q.quote_created_in, q.job_belong_to, q.type_of_quotation, q.is_converted FROM quotation as q where q.created_date BETWEEN '"+params?.fromdate+"' and '"+params?.todate+"' "+(params.status != '' ? "AND is_converted='"+params.status+"'": "")+" order by q.id desc";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getDriverTripEndReport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="Select jta.created_by as driver_id, d.name as driver_name, jta.job_id, jta.created_on as trip_end_date from job_trip_activity jta left join driver d on jta.created_by = d.id Where jta.status='End Trip' and jta.created_on BETWEEN '"+params?.fromdate+"' and '"+params?.todate+"'  order by jta.id DESC ";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
    },
    getJobStatusReport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT j.id, j.quote_id, j.job_status, j.created_date, j.quote_created_in, j.job_belong_to, j.type_of_Job, j.driver_app_status, d.name as handled_by FROM job as j left join driver as d on d.id = j.driver_by where j.created_date BETWEEN '"+params?.fromdate+"' and '"+params?.todate+"' "+(params.status != '' ? "AND job_status='"+params.status+"'": "")+" ";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
        
    },
    getnumberofjobdonebyemployeereport: (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT e.id, e.firstname, e.lastname, count(*) as cnt FROM tbl_setting_employees e left join job j on j.created_by=e.id where j.trip_status='End Trip' and j.created_date between '2024-09-01' and '2024-09-28'group by e.id";

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
        
    },
    getNumbersDriverjobReport : (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT d.id, d.name, count(*) as cnt FROM driver d left join job j on j.driver_by=d.id where j.trip_status='End Trip' group by d.id";
    
                let result = await db.queryData(sql);
    
                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    getQuotationPaymentReport : (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                const sql ="SELECT payment_term, count(*) as cnt FROM `quotation` where created_date between '"+params?.fromdate+"' and '"+params?.todate+"' group by payment_term";
    
                let result = await db.queryData(sql);
    
                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
}

