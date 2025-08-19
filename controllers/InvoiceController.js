const JobModal = require('../models/InvoiceModel');

const NotificationController = require('./NotificationController');
const EmailController = require('./emailController');

const moment = require('moment/moment')

module.exports = {
    getJobMaster :  (req, res)=>{
        JobModal.getAllJobMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {

                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Invoice";
                req.body.noti_desc = "Invoice data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "invoice data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    getJobById :  (req, res)=>{
        const id  = req.params.id

        JobModal.getJobById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result && result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "invoice data";
                data["data"] = result[0] || {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    addJobMaster :  (req, res)=>{

        const params = {
            "quote_created_in"      : req.body.quote_created_in,
            "job_belong_to"         : req.body.job_belong_to,
            "type_of_Job"           : req.body.type_of_Job,
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
            "created_on"            : req.body.created_on,
            "created_date"          : req.body.created_date,
            "created_by"            : req.body.created_by,
            "origin_collection_point"       : req.body?.origin_collection_point,
            "destination_delivery_point"    : req.body?.destination_delivery_point,
            "location"                      : req.body?.location,
            "scope"                         : req.body?.scope,
            "quotation"                     : req.body?.quotation,
            "total_weight": req.body?.total_weight,
            "destination": req.body?.destination,
            "port_of_loading": req.body?.port_of_loading,
            "quantity": req.body?.quantity,
            "commodity": req.body?.commodity,
            "frequency": req.body?.frequency,
            "pieces": req.body?.pieces,
            "transit_time": req.body?.transit_time,
            "dimension": req.body?.dimension,
            "dimension_approximately": req.body?.dimension_approximately,
            "shipment_term": req.body?.shipment_term,
            "type_of_truck": req.body?.type_of_truck,
            "max_weight": req.body?.max_weight,
            "duration": req.body?.duration,
            "storage_term": req.body?.storage_term,
            "consignment": req.body?.consignment,
            "exchange_rate": req.body?.exchange_rate
        }
        
    
        let rowItems = JSON.parse(req.body.row)
        console.log("rowItems", rowItems)

        JobModal.addJobMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }

            const lastInsertedId = result.insertId;

            console.log("lastInsertedId", lastInsertedId)
            
            let data = {};

            if(result)
            {
                JobModal.addJobItemMaster(lastInsertedId, rowItems, (err1, result1) =>{
                    if(err1)
                    {
                        return res.status(500).send(err1)
                    }

                    if(result1) {
                        data["status"] = 200;
                        data["message"] = "invoice record created successfully";
                        data["data"] = [];

                        res.status(200).json(data);
                    } else {
                        data["status"] = 500;
                        data["message"] = "Error on quatation items";
                        data["data"] = [];

                        res.status(500).json(data);
                    }
                });
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    updateJobMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            "quote_created_in"      : req.body.quote_created_in,
            "job_belong_to"         : req.body.job_belong_to,
            "type_of_Job"     : req.body.type_of_Job,
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
            "updated_on"            : req.body.updated_on,
            "updated_by"            : req.body.updated_by,
            "origin_collection_point"       : req.body?.origin_collection_point,
            "destination_delivery_point"    : req.body?.destination_delivery_point,
            "location"                      : req.body?.location,
            "scope"                         : req.body?.scope,
            "quotation"                     : req.body?.quotation,
            "total_weight": req.body?.total_weight,
            "destination": req.body?.destination,
            "port_of_loading": req.body?.port_of_loading,
            "quantity": req.body?.quantity,
            "commodity": req.body?.commodity,
            "frequency": req.body?.frequency,
            "pieces": req.body?.pieces,
            "transit_time": req.body?.transit_time,
            "dimension": req.body?.dimension,
            "dimension_approximately": req.body?.dimension_approximately,
            "shipment_term": req.body?.shipment_term,
            "type_of_truck": req.body?.type_of_truck,
            "max_weight": req.body?.max_weight,
            "duration": req.body?.duration,
            "storage_term": req.body?.storage_term,
            "consignment": req.body?.consignment,
            "exchange_rate": req.body?.exchange_rate
        }

        let rowItems = JSON.parse(req.body.row)
        console.log("rowItems", rowItems)
        
        JobModal.updateJobMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                JobModal.updateJobItemMaster(id,rowItems, (err1, result1) =>{
                    if(err1)
                    {
                        return res.status(500).send(err1)
                    }

                    if(result1) {
                        data["status"] = 200;
                        data["message"] = "invoice record updated successfully";
                        data["data"] = [];

                        res.status(200).json(data);
                    } else {
                        data["status"] = 500;
                        data["message"] = "Error on quatation items";
                        data["data"] = [];

                        res.status(500).json(data);
                    }
                });
                
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    deleteJobMaster :  (req, res)=>{

        const id  = req.params.id

        JobModal.deleteJobMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "invoice record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
    sentJobToEmail : async (req, res)=>{
        const id  = req.params.id;

        // let result = await QuotationModal.getQuotationMailData(id);

        EmailController.sentMailInvoice(id, false);

        let data = [];

        data["status"] = 200;
        data["message"] = "Email Sent successfully";
        data["data"] = {};

        return res.status(200).json(data);
        // })
    },
   jobDocList: (req, res) => {
		
      	const id  = req.params.id;


        JobModal.jobDocList(id, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
          
          let data = {};

            if (result.length > 0) {


                data["status"] = 200;
                data["message"] = "Job doc list featched successfully";
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
   jobPaymentList: (req, res) => {
		
      	const id  = req.params.id;


        JobModal.jobPaymentList(id, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
          
          let data = {};

            if (result.length > 0) {


                data["status"] = 200;
                data["message"] = "Job payment list featched successfully";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Error on Job jobPaymentList";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    },
  
}