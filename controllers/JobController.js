const JobModal = require('../models/JobModel');
const InvoiceModal = require('../models/InvoiceModel');
const moment = require('moment-timezone')
const EmailController = require('./emailController');
const NotificationController = require('./NotificationController');
const companyNewNodel = require('../models/CompanyNewModel');

const mysql = require('mysql2');

module.exports = {
    getJobMaster: (req, res) => {
        // Required params
        const user_id = req.query.user_id || {};
        const branch_id = req.query.branch_id || 0;

        console.log("req.query", req.query)

        // Conditional params
        let conditon = {};

        // If user is super admin then show all branch data
        // if(user_data?.user_type != 'superadmin')
        // {
        //     conditon.branch = user_data?.branch
        // }

        if(branch_id != '' && branch_id != 0)
        {
            conditon.q_branch = branch_id;
        }
        if(user_id != '' && user_id != 0)
        {
            conditon.q_user = user_id;
        }


        JobModal.getAllJobMaster(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {

                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Job";
                req.body.noti_desc = "Job data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Job data";
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
  	getJobCompletedMaster: (req, res) => {
        // Required params
        const user_data = req?.user_data || {};
        const branch_id = req.query.branch_id || 0;

        // Conditional params
        let conditon = {};

        // If user is super admin then show all branch data
        // if(user_data?.user_type != 'superadmin')
        // {
        //     conditon.branch = user_data?.branch
        // }

        // if(branch_id != 0)
        // {
        //     conditon.branch = branch_id;
        // }


        JobModal.getJobCompletedMaster(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {

                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Job";
                req.body.noti_desc = "Job data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Job data";
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
    getJobPendingMaster: (req, res) => {
        // Required params
        const user_data = req?.user_data || {};
        const branch_id = req.query.branch_id || 0;

        // Conditional params
        let conditon = {};

        // If user is super admin then show all branch data
        // if(user_data?.user_type != 'superadmin')
        // {
        //     conditon.branch = user_data?.branch
        // }

        // if(branch_id != 0)
        // {
        //     conditon.branch = branch_id;
        // }


        JobModal.getJobPendingMaster(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {

                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Job";
                req.body.noti_desc = "Job data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Job data";
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
    getJobTodaysMaster: (req, res) => {
        // Required params
        const user_data = req?.user_data || {};
        const branch_id = req.query.branch_id || 0;

        // Conditional params
        let conditon = {};

        // If user is super admin then show all branch data
        // if(user_data?.user_type != 'superadmin')
        // {
        //     conditon.branch = user_data?.branch
        // }

        // if(branch_id != 0)
        // {
        //     conditon.branch = branch_id;
        // }


        JobModal.getJobTodaysMaster(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {

                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Job";
                req.body.noti_desc = "Todays Job data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Todays Job data";
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
    getJobActiveMaster: (req, res) => {
        // Required params
        const user_data = req?.user_data || {};
        const branch_id = req.query.branch_id || 0;

        // Conditional params
        let conditon = {};

        // If user is super admin then show all branch data
        // if(user_data?.user_type != 'superadmin')
        // {
        //     conditon.branch = user_data?.branch
        // }

        // if(branch_id != 0)
        // {
        //     conditon.branch = branch_id;
        // }


        JobModal.getJobActiveMaster(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {

                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Job";
                req.body.noti_desc = "Todays Job data record fetched successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Todays Job data";
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
    getJobById: async (req, res) => {
        const id = req.params.id
        let data = {};
        let delivery_order = {
            shipper: {},
            consignee: {},
            deliver_to: {},
            bill_to:{}
        }
        let result = await JobModal.getJobByIdNew(id);

        if(result?.shipper)
        {
            let shipper = await companyNewNodel.getById(result?.shipper);
            delivery_order.shipper = shipper.length > 0 ? shipper[0] : {};
        }
            
        if(result?.consignee)
        {
            let consignee = await companyNewNodel.getById(result?.consignee);
            delivery_order.consignee = consignee.length > 0 ? consignee[0] : {};
        }
            
        if(result?.deliver_to)
        {
            let deliver_to = await companyNewNodel.getById(result?.deliver_to);
            delivery_order.deliver_to = deliver_to.length > 0 ? deliver_to[0] : {};
        }
            
        if(result?.bill_to)
        {
            let bill_to = await companyNewNodel.getById(result?.bill_to);
            delivery_order.bill_to  = bill_to.length > 0 ? bill_to[0] : {};
        }
            
		
      	if(result)
        {
            data["status"] = 200; 
            data["message"] = "Job data by id successfully";
            data["data"] = result;
            data["delivery_order"] = delivery_order;

          	return res.status(200).json(data);  
        } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

              return  res.status(500).json(data);
        }
        
    },
    addJobMaster: (req, res) => {

        const params = {
            "quote_created_in": req.body.quote_created_in,
            "job_belong_to": req.body.job_belong_to,
            "type_of_Job": req.body.type_of_Job,
            "job_classification": req.body.job_classification,
            "billing_entry": req.body.billing_entry,
            "customer_key": req.body.customer_key,
            "subject": req.body.subject,
            "payment_term": req.body.payment_term,
            "currency": req.body.currency,
            "quote_date": req.body.quote_date,
            "due_date": req.body.due_date,
            "comment": req.body.comment,
            "note": req.body.note,
            "created_on": req.body.created_on,
            "created_date": req.body.created_date,
            "created_by": req.body.created_by,
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

        JobModal.addJobMaster(params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            const lastInsertedId = result.insertId;

            console.log("lastInsertedId", lastInsertedId)

            let data = {};

            if (result) {
                JobModal.addJobItemMaster(lastInsertedId, rowItems, (err1, result1) => {
                    if (err1) {
                        return res.status(500).send(err1)
                    }

                    if (result1) {
                        data["status"] = 200;
                        data["message"] = "Job record created successfully";
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
    updateJobMaster: (req, res) => {

        const id = req.params.id

        const params = {
            "quote_created_in": req.body.quote_created_in,
            "job_belong_to": req.body.job_belong_to,
            "type_of_Job": req.body.type_of_Job,
            "job_classification": req.body.job_classification,
            "billing_entry": req.body.billing_entry,
            "customer_key": req.body.customer_key,
            "subject": req.body.subject,
            "payment_term": req.body.payment_term,
            "currency": req.body.currency,
            "quote_date": req.body.quote_date,
            "due_date": req.body.due_date,
            "comment": req.body.comment,
            "total": req.body.total,
            "note": req.body.note,
          	"c_status": req.body.c_status,
            "c_remarks": req.body.c_remarks,
            "shipper": req.body.shipper,
            "consignee": req.body.consignee,
            "deliver_to": req.body.deliver_to,
            "bill_to": req.body.bill_to,
            "updated_on": req.body.updated_on,
            "updated_by": req.body.updated_by,
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

        JobModal.updateJobMaster(id, params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
                JobModal.updateJobItemMaster(id, rowItems, (err1, result1) => {
                    if (err1) {
                        return res.status(500).send(err1)
                    }

                    if (result1) {
                        data["status"] = 200;
                        data["message"] = "Job record updated successfully";
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
    updateJobDeliver: (req, res) => {

        const id = req.params.id

        const params = {
            "shipper": req.body.shipper,
            "consignee": req.body.consignee,
            "deliver_to": req.body.deliver_to,
            "bill_to": req.body.bill_to,
            "updated_on": req.body.updated_on,
            "updated_by": req.body.updated_by
        }

        JobModal.updateJobMaster(id, params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
                data["status"] = 200;
                data["message"] = "Job record updated successfully";
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
  updateJobCompleted: (req, res) => {

        const id = req.params.id

        const params = {
            "job_status": req.body.job_status,
        }

        


        JobModal.updateJobMaster(id, params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
              
              	data["status"] = 200;
                data["message"] = "Job status record updated successfully";
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
    deleteJobMaster: (req, res) => {

        const id = req.params.id

        JobModal.deleteJobMaster(id, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
                data["status"] = 200;
                data["message"] = "Job record deleted successfully";
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
    updateJobTripMaster: async (req, res) => {

        try {

            let data = {};
            let reqdata = req.body;

            const id = req.params.id;

            const status = req.body.status;

            const params = {
                "job_id": req.body.job_id,
                "status": req.body.status,
                "created_by": req.body.created_by,
                "created_on": moment().format('YYYY-MM-DD h:mm:ss a'),
            }

            console.log("params", params)

            let resultUpdate = await JobModal.updateJobTripMaster(id, reqdata,  params);

            if(status == 'End Trip')
            {

                // Convert into invoice
                const job_id = req.body.job_id;

                let result = await JobModal.getJobMailData(job_id);

                const params = {
                    "quote_created_in": result?.quote_created_in,
                    "job_belong_to": result?.job_belong_to,
                    "type_of_job": result?.type_of_job,
                    "job_classification": result?.job_classification,
                    "billing_entry": result?.billing_entry,
                    "customer_key": result?.customer_key,
                    "subject": result?.subject,
                    "payment_term": result?.payment_term,
                    "currency": result?.currency,
                    "quote_date": result?.quote_date,
                    "due_date": result?.due_date,
                    "comment": result?.comment,
                    "note": result?.note,
                    "created_on": moment().format('YYYY-MM-DD HH:mm:ss'),
                    "created_date": moment().format('YYYY-MM-DD'),
                    "created_by": result?.created_by,
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
                    "exchange_rate": result?.exchange_rate
                }

                let rowItems = result?.product
                console.log("rowItems", rowItems)

                let res_invoice=  await InvoiceModal.addJobMaster(params);
              
              	console.log("res_invoice ===>", res_invoice)

                let lastInsertedId = res_invoice?.insertId || 0;

                let res_i_product =  await InvoiceModal.addQuotationJobItemMaster(lastInsertedId, "Yes", rowItems );

                console.log("res_i_product", res_invoice)
                

                data["status"] = 200;
                data["message"] = "Invoice created successfully";
                data["data"] = {
                  "lastInsertedId": lastInsertedId
                };

                return res.status(200).json(data);
            }

            data["status"] = 200;
            data["message"] = "Job activity updated successfully";
            data["data"] = [];

            return res.status(200).json(data);

        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    },
    sentJobToEmail : async (req, res)=>{
        const id  = req.params.id;

        // let result = await QuotationModal.getQuotationMailData(id);

        EmailController.sentMailJob(id, false);

        let data = [];

        data["status"] = 200;
        data["message"] = "Email Sent successfully";
        data["data"] = {};

        return res.status(200).json(data);
        // })
    },
  	jobPaymentAdd: (req, res) => {
      
      console.log("params",req)
		
      	const id  = req.params.id;
      
        let params = {
            "type": mysql.escape(req.body.type),	
            "job_id": mysql.escape(req.body.id),
            "amount": mysql.escape(req.body.amount),
            "remark": mysql.escape(req.body.remark),
          	"pay_mode": mysql.escape(req.body.pay_mode),
            "created_on": "'"+moment().format('YYYY-MM-DD HH:mm:ss')+"'",
            "created_by": mysql.escape(req.body.created_by)
        }
        
        let filename = req.body.filename

        if(filename != null && filename != '' && filename != undefined)
        {
            params.filename =  mysql.escape(filename)
        }


        JobModal.jobPaymentAdd(params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
          	let data = {};

  			if (result) {
              data["status"] = 200;
              data["message"] = "Job payment added successfully";
              data["data"] = [];

              res.status(200).json(data);
            } else {
              data["status"] = 500;
              data["message"] = "Error on Job payment";
              data["data"] = [];

              res.status(500).json(data);
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

                res.status(200).json(data);
            }
        });
    },
  convertJobToInvoice: async (req, res)=>{
        // Convert into invoice
        const job_id = req.params.id;

        let result = await JobModal.getJobMailData(job_id);

        const params = {
            "q_id": result?.q_id,
            "quote_created_in": result?.quote_created_in,
            "job_belong_to": result?.job_belong_to,
            "type_of_Job": result?.type_of_Job,
            "job_classification": result?.job_classification,
            "billing_entry": result?.billing_entry,
            "customer_key": result?.customer_key,
            "subject": result?.subject,
            "payment_term": result?.payment_term,
            "currency": result?.currency,
            "quote_date": result?.quote_date,
            "due_date": result?.due_date,
            "comment": result?.comment,
            "note": result?.note,
          	"c_status"              : result?.c_status,
            "c_remarks"             : result?.c_remarks,
            "created_on": moment.tz("Asia/Kuala_Lumpur").format('YYYY-MM-DD HH:mm:ss'),
            "created_date": moment().format('YYYY-MM-DD'),
            "created_by": result?.created_by,
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
            "exchange_rate": result?.exchange_rate
        }

        let rowItems = result?.product
        console.log("rowItems", rowItems)

        let res_invoice=  await InvoiceModal.addJobMaster(params);

        let lastInsertedId = res_invoice?.insertId || 0;

        let res_i_product =  await InvoiceModal.addQuotationJobItemMaster(lastInsertedId, "Yes", rowItems );
    
    	let res_i_product2 =  await InvoiceModal.jobDocAddConvert(lastInsertedId, job_id );
    
    	let res_i_product3 =  await InvoiceModal.jobPayAddConvert(lastInsertedId, job_id );

        const params2 = {
            "job_status": "completed",
            "invoice_id": lastInsertedId
        }

        JobModal.updateJobMaster(job_id, params2, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
        });

        console.log("res_i_product", res_invoice)
    
    let data = {};
        

        data["status"] = 200;
        data["message"] = "Invoice created successfully";
        data["data"] = {
          "lastInsertedId": lastInsertedId
        };

        return res.status(200).json(data);
    },
  jobDocAdd: (req, res) => {
      
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


        JobModal.jobDocAdd(params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
          	let data = {};

  			if (result) {
              data["status"] = 200;
              data["message"] = "Job doc added successfully";
              data["data"] = [];

              res.status(200).json(data);
            } else {
              data["status"] = 500;
              data["message"] = "Error on Job doc";
              data["data"] = [];

              res.status(500).json(data);
            }
        });
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
  jobDocDelete: (req, res) => {
		
      	const id  = req.params.id;


        JobModal.jobDocDelete(id, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }
          
          let data = {};

            if (result) {


                data["status"] = 200;
                data["message"] = "Job doc deleted successfully";
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