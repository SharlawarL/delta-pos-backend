const QuotationModal = require('../models/QuotationModel');
const EmailController = require('./emailController');
const JobModal = require('../models/JobModel');
const moment = require('moment-timezone')


const mysql = require('mysql2');
const NotificationController = require('./NotificationController');

module.exports = {
    getQuotationMaster :  async(req, res)=>{
        try {

            let data = {};
            let responce = {
                "data" : {},
                "grand_total" : 0
            };
            // Conditional params
            let conditon = {};

            const offset ={
                page: req.query.page,
                limit: req.query.limit,
                search: req.query.search
            };

            responce['data'] = await QuotationModal.getAllQuotationMaster(conditon, offset, 'all_data');
            responce['grand_total'] = await QuotationModal.getAllQuotationMaster(conditon, offset, 'grand_total');

            data["status"] = 200;
            data["message"] = "Dashboard data";
            data["data"] = responce;

            // resolve(data)
            res.status(200).json(data);
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    getQuotationByCustMaster :  (req, res)=>{
        QuotationModal.getQuotationByCustMaster((err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Quotation by Cust data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    getQuotationByCustStatusMaster :  (req, res)=>{

        let status =  req.query.status || 'Pending'
        
        QuotationModal.getQuotationByCustByStatusMaster(status, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Quotation by Cust "+status+" data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    getQuotationById :  (req, res)=>{
        const id  = req.params.id

        QuotationModal.getQuotationById(id, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result && result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Quotation data";
                data["data"] = result[0] || {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
  	getQuotationEmailHistoryById :  (req, res)=>{
        const id  = req.params.id

        QuotationModal.getQuotationEmailHistoryById(id, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result && result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Quotation Email History data";
                data["data"] = result || [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    addQuotationMaster :  (req, res)=>{

        const params = {
            "quote_created_in"      : req.body.quote_created_in,
            "job_belong_to"         : req.body.job_belong_to,
            "type_of_quotation"     : req.body.type_of_quotation,
            "job_classification"    : req.body.job_classification,
            "billing_entry"         : req.body.billing_entry,
            "customer_key"          : req.body.customer_key,
            "subject"               : req.body.subject,
            "payment_term"          : req.body.payment_term,
            "currency"              : req.body.currency,
            "quote_date"            : req.body.quote_date,
            "due_date"              : req.body.due_date,
            "comment"               : req.body.comment,
            "note"                  : req.body.note,
            "branch"                : req.body.branch,
            "created_on"            : moment.tz("Asia/Kuala_Lumpur").format('YYYY-MM-DD HH:mm:ss'),
            "created_date"          : req.body.created_date,
            "created_by"            : req.body.created_by,
            "origin_collection_point"       : req.body.origin_collection_point,
            "destination_delivery_point"    : req.body.destination_delivery_point,
            "location"                      : req.body.location,
            "scope"                         : req.body.scope,
            "quotation"                     : req.body.quotation,
            "total_weight": req.body.total_weight,
            "destination": req.body.destination,
            "port_of_loading": req.body.port_of_loading,
            "quantity": req.body.quantity,
            "commodity": req.body.commodity,
            "frequency": req.body.frequency,
            "pieces": req.body.pieces,
            "transit_time": req.body.transit_time,
            "dimension": req.body.dimension,
            "dimension_approximately": req.body.dimension_approximately,
            "shipment_term": req.body.shipment_term,
            "type_of_truck": req.body.type_of_truck,
            "max_weight": req.body.max_weight,
            "duration": req.body.duration,
            "storage_term": req.body.storage_term,
            "consignment": req.body.consignment,
            "exchange_rate": req.body.exchange_rate
        }
        
    
        let rowItems = JSON.parse(req.body.row)
        console.log("rowItems", rowItems)

        QuotationModal.addQuotationMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }

            const lastInsertedId = result.insertId;

            console.log("lastInsertedId", lastInsertedId)
            
            let data = {};

            if(result)
            {
                QuotationModal.addQuotationItemMaster(lastInsertedId, rowItems, (err1, result1) =>{
                    if(err1)
                    {
                        return res.status(200).send(err1)
                    }

                    EmailController.sentMail(lastInsertedId, 'new');

                    if(result1) {

                        let quote_id = "CSE/QUOTE/" + (lastInsertedId.toString()).padStart(6,"0");

                        // Notification content setup
                        req.body.user_id = req?.user_data?.id
                        req.body.noti_sub = "Quotation";
                        req.body.noti_desc = "Quotation "+quote_id+" record created successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                        let resultNoti = NotificationController.addMaster(req, res);
                        
                        data["status"] = 200;
                        data["message"] = "Quotation record created successfully";
                        data["data"] = [];

                        res.status(200).json(data);
                    } else {
                        data["status"] = 500;
                        data["message"] = "Error on quatation items";
                        data["data"] = [];

                        res.status(200).json(data);
                    }
                });
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    updateQuotationMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            "quote_created_in"      : req.body.quote_created_in,
            "job_belong_to"         : req.body.job_belong_to,
            "type_of_quotation"     : req.body.type_of_quotation,
            "job_classification"    : req.body.job_classification,
            "billing_entry"         : req.body.billing_entry,
            "customer_key"          : req.body.customer_key,
            "subject"               : req.body.subject,
            "payment_term"          : req.body.payment_term,
            "currency"              : req.body.currency,
            "quote_date"            : req.body.quote_date,
            "due_date"              : req.body.due_date,
            "comment"               : req.body.comment,
            "total"                 : req.body.total,
            "note"                  : req.body.note,
          	"c_status"              : req.body.c_status,
          	"c_remarks"             : req.body.c_remarks,
            "updated_on"            : moment.tz("Asia/Kuala_Lumpur").format('YYYY-MM-DD HH:mm:ss'),
            "updated_by"            : req.body.updated_by,
            "origin_collection_point"       : req.body.origin_collection_point,
            "destination_delivery_point"    : req.body.destination_delivery_point,
            "location"                      : req.body.location,
            "scope"                         : req.body.scope,
            "quotation"                     : req.body.quotation,
            "total_weight": req.body.total_weight,
            "destination": req.body.destination,
            "port_of_loading": req.body.port_of_loading,
            "quantity": req.body.quantity,
            "commodity": req.body.commodity,
            "frequency": req.body.frequency,
            "pieces": req.body.pieces,
            "transit_time": req.body.transit_time,
            "dimension": req.body.dimension,
            "dimension_approximately": req.body.dimension_approximately,
            "shipment_term": req.body.shipment_term,
            "type_of_truck": req.body.type_of_truck,
            "max_weight": req.body.max_weight,
            "duration": req.body.duration,
            "storage_term": req.body.storage_term,
            "consignment": req.body.consignment,
            "exchange_rate": req.body.exchange_rate
        }

        let rowItems = JSON.parse(req.body.row)
        console.log("rowItems", rowItems)
        
        QuotationModal.updateQuotationMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result)
            {
                QuotationModal.updateQuotationItemMaster(id,rowItems, (err1, result1) =>{
                    if(err1)
                    {
                        return res.status(200).send(err1)
                    }

                    if(result1) {
                        data["status"] = 200;
                        data["message"] = "Quotation record updated successfully";
                        data["data"] = [];

                        res.status(200).json(data);
                    } else {
                        data["status"] = 500;
                        data["message"] = "Error on quatation items";
                        data["data"] = [];

                        res.status(200).json(data);
                    }
                });
                
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    deleteQuotationMaster :  (req, res)=>{

        const id  = req.params.id

        QuotationModal.deleteQuotationMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Quotation record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    convertQuotationJob : async (req, res)=>{
        const id  = req.params.id;

        let result = await QuotationModal.getQuotationMailData(id);

        const params = {
            "c_status"      : req.body.c_status,
            "c_remarks"         : req.body.c_remarks,
        }

        QuotationModal.updateCostomerStatus(id, params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }

            EmailController.sentMail(id, 'update');

            let data = [];

            data["status"] = 200;
            data["message"] = "Customer confirmed successfully";
            data["data"] = {};

            res.status(200).json(data);
        })
        

        // const params = {
        //     "quote_created_in"      : result?.quote_created_in,
        //     "job_belong_to"         : result?.job_belong_to,
        //     "type_of_job"           : result?.type_of_quotation,
        //     "job_classification"    : result?.job_classification,
        //     "billing_entry"         : result?.billing_entry,
        //     "customer_key"          : result?.customer_key,
        //     "subject"               : result?.subject,
        //     "payment_term"          : result?.payment_term,
        //     "currency"              : result?.currency,
        //     "quote_date"            : result?.quote_date,
        //     "due_date"              : result?.due_date,
        //     "comment"               : result?.comment,
        //     "note"                  : result?.note,
        //     "created_on"            : moment().format('YYYY-MM-DD h:mm:ss a'),
        //     "created_date"          : moment().format('YYYY-MM-DD'),
        //     "created_by"            : result?.created_by
        // }
        
    
        // let rowItems = result?.product
        // console.log("rowItems", rowItems)

        // JobModal.addJobMaster(params, (err, result) =>{
        //     if(err)
        //     {
        //         return res.status(200).send(err)
        //     }

        //     const lastInsertedId = result.insertId;

        //     console.log("lastInsertedId", lastInsertedId)
            
        //     let data = {};

        //     if(result)
        //     {
        //         JobModal.addQuotationJobItemMaster(lastInsertedId, id, is_status,  rowItems, (err1, result1) =>{
        //             if(err1)
        //             {
        //                 return res.status(200).send(err1)
        //             }

        //             req.io.emit('receiveNotification', { message: "Job is ready for delivery" });

        //             if(result1) {
        //                 data["status"] = 200;
        //                 data["message"] = "Job record converted successfully";
        //                 data["data"] = {
        //                     "lastInsertedId" : lastInsertedId
        //                 };

        //                 res.status(200).json(data);
        //             } else {
        //                 data["status"] = 500;
        //                 data["message"] = "Error on quatation items";
        //                 data["data"] = [];

        //                 res.status(200).json(data);
        //             }
        //         });
        //     } else {
        //         data["status"] = 500;
        //         data["message"] = "Samething went wrong!";
        //         data["data"] = [];

        //         res.status(200).json(data);
        //     }
        // });
    },
    convertQuotationToJob : async (req, res)=>{
        const id  = req.params.id;

        let result = await QuotationModal.getQuotationMailData(id);        

        const params = {
            "q_id"                  : id,
            "quote_created_in"      : result?.quote_created_in,
            "job_belong_to"         : result?.job_belong_to,
            "type_of_job"           : result?.type_of_quotation,
            "job_classification"    : result?.job_classification,
            "billing_entry"         : result?.billing_entry,
            "customer_key"          : result?.customer_key,
            "subject"               : result?.subject,
            "payment_term"          : result?.payment_term,
            "currency"              : result?.currency,
            "quote_date"            : result?.quote_date,
            "due_date"              : result?.due_date,
            "comment"               : result?.comment,
            "note"                  : result?.note,
            "branch"                : result?.branch,
          	"c_status"              : result?.c_status,
            "c_remarks"             : result?.c_remarks,
            "created_on"            : moment().format('YYYY-MM-DD HH:mm:ss'),
            "created_date"          : moment().format('YYYY-MM-DD'),
            "created_by"            : result?.created_by,
            "origin_collection_point"       : result?.origin_collection_point,
            "destination_delivery_point"    : result?.destination_delivery_point,
            "location"                      : result?.location,
            "scope"                         : result?.scope,
            "quotation"                     : result?.quotation,
            "total_weight": result?.total_weight,
            "destination": result?.destination,
            "port_of_loading": result?.port_of_loading,
            "quantity": result?.quantity,
            "commodity": result?.commodity,
            "frequency": result?.frequency,
            "pieces": result?.pieces,
            "transit_time": result?.transit_time,
            "dimension": result?.dimension,
            "dimension_approximately": result?.dimension_approximately,
            "shipment_term": result?.shipment_term,
            "type_of_truck": result?.type_of_truck,
            "max_weight": result?.max_weight,
            "duration": result?.duration,
            "storage_term": result?.storage_term,
            "consignment": result?.consignment,
            "exchange_rate": result?.exchange_rate,
            "q_branch": req.body.q_branch,
            "q_user": req.body.q_user,
        }
        
    
        let rowItems = result?.product
        console.log("rowItems", rowItems)

        JobModal.addJobMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }

            const lastInsertedId = result.insertId;

            console.log("lastInsertedId", lastInsertedId)
            
            let data = {};

            if(result)
            {
                JobModal.addQuotationJobItemMaster(lastInsertedId, id, "Yes",  rowItems, (err1, result1) =>{
                    if(err1)
                    {
                        return res.status(200).send(err1)
                    }

                    req.io.emit('receiveNotification', { message: "Job is ready for delivery" });
                  
                  	JobModal.jobDocAddConvert(lastInsertedId, id, (err1, result1) =>{
                      if(err1)
                      {
                          return res.status(200).send(err1)
                      }
                	});

                    if(result1) {
                        data["status"] = 200;
                        data["message"] = "Job record converted successfully";
                        data["data"] = {
                            "lastInsertedId" : lastInsertedId
                        };

                        res.status(200).json(data);
                    } else {
                        data["status"] = 500;
                        data["message"] = "Error on quatation items";
                        data["data"] = [];

                        res.status(200).json(data);
                    }
                });
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    sentQuotationToEmail : async (req, res)=>{
        const id  = req.params.id;
      
      	const email = req.query.email;
        const emailcc = req.query.emailcc;
      
        console.log("email",email)

        let result = await QuotationModal.getQuotationMailData(id);

        EmailController.sentMail(id, 'resend', email, emailcc);

        let data = [];

        data["status"] = 200;
        data["message"] = "Email Sent successfully";
        data["data"] = {};

        return res.status(200).json(data);
        // })
    },
    getQuotationItem :  (req, res)=>{
        QuotationModal.getAllQuotationItem((err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Quotation item data 111";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    getQuotationItemById:  (req, res)=>{
        const id  = req.params.id
        QuotationModal.getAllQuotationItemByID(id, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Quotation item data by id";
                data["data"] = result.length > 0 ? result[0]: {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    addQuotationItem :  (req, res)=>{
        let data = {};
        
        const params = {
            item_type:req.body.item_type,
            description : req.body.description,
            category:req.body.category,
            amount: req.body.amount,
            sst: req.body.sst       
        } 
        QuotationModal.addQuotationItemDetails(params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            if(result) {
                data["status"] = 200;
                data["message"] = "Quotation item record created successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Error on quatation items";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    
    },
    updateQuotationItem :  (req, res)=>{

        const id  = req.params.id

        const params = {
            item_type:req.body.item_type,
            description : req.body.description,
            category:req.body.category,
            sst:req.body.sst,
            amount: req.body.amount               
        }
        
        QuotationModal.updateQuotationItem(id, params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Quotation record updated successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    deleteQuotationItem :  (req, res)=>{

        const id  = req.params.id

        QuotationModal.deleteQuotationItem(id, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Quotation item record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    assignDriverToJob : async (req, res)=>{
        const id  = req.params.id;

        const io = req.io;

        const params = {
            "driver_status"      : req.body.driver_status,
            "driver_by"         : req.body.driver_by
        }

        QuotationModal.assignDriverToJob(id, params, (err, result) =>{
            if(err)
            {
                return res.status(200).send(err)
            }

            let data = {};

            data["status"] = 200;
            data["message"] = "Driver assgined to Job successfully";
            data["data"] = {};
            console.log("Data", data)

            // Emit message to all connected clients in the 'chat' namespace
            io.emit('driver', data);

            res.status(200).json(data);
        })
    }, 
  quotationDocAdd: (req, res) => {
      
      console.log("params",req)
		
      	const id  = req.params.id;
      
        let params = {	
            "job_id": mysql.escape(req.body.job_id),
            "name": mysql.escape(req.body.name),
            "comment": mysql.escape(req.body.comment),
            "created_on": "'"+moment().format('YYYY-MM-DD HH:mm:ss')+"'",
            "created_by": mysql.escape(req.body.created_by)
        }
        
        let filename = req.body.filename

        if(filename != null && filename != '' && filename != undefined)
        {
            params.filename =  mysql.escape(filename)
        }


        QuotationModal.quotationDocAdd(params, (err, result) => {
            if (err) {
                return res.status(200).send(err)
            }
          	let data = {};

  			if (result) {
              data["status"] = 200;
              data["message"] = "Quotation doc added successfully";
              data["data"] = [];

              res.status(200).json(data);
            } else {
              data["status"] = 500;
              data["message"] = "Error on Job doc";
              data["data"] = [];

              res.status(200).json(data);
            }
        });
    },
  quotationDocList: (req, res) => {
		
      	const id  = req.params.id;


        QuotationModal.quotationDocList(id, (err, result) => {
            if (err) {
                return res.status(200).send(err)
            }
          
          let data = {};

            if (result.length > 0) {


                data["status"] = 200;
                data["message"] = "Quotation doc list featched successfully";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Error on Job doc";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
  quotationDocDelete: (req, res) => {
		
      	const id  = req.params.id;


        QuotationModal.quotationDocDelete(id, (err, result) => {
            if (err) {
                return res.status(200).send(err)
            }
          
          let data = {};

            if (result) {


                data["status"] = 200;
                data["message"] = "Quatation doc deleted successfully";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Error on Job doc";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
}