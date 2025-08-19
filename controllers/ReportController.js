const ServiceModel = require('../models/ReportModel');

module.exports = {
    getQuotationReport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            let responce = await ServiceModel.getQuotationReport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Get Quotation Report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getJobReport:  async (req, res)=>{
        try {
            let data = {};
            
            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            let responce = await ServiceModel.getJobReport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Get Job Report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getInvoiceReport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            let responce = await ServiceModel.getInvoiceReport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Get Invoice Report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getDriverTripEndReport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            console.log("params", params)

            let responce = await ServiceModel.getDriverTripEndReport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Get Driver Trip End Report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Something went wrong";
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);
            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getQuotationStatusReport:  async (req, res)=>{
        try {
            let data = {};
            
            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
                'status': req.query.status
            }

            let responce = await ServiceModel.getQuotationStatusReport(params);
    
    
            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Get Quotation Status Report";

                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);
            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getJobStatusReport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
                'status': req.query.status
            }

            console.log("params", params)

            let responce = await ServiceModel.getJobStatusReport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Get Job Status Report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);
            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getNumbersDriverjobReport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            let responce = await ServiceModel.getNumbersDriverjobReport(params);
    
    
            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "get numbers of job done by drivers";
                data["data"] = responce;
                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Something went wrong";
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);
            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];
            res.status(200).json(data);
        }
    },
    getnumberofjobdonebyemployeereport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            console.log("params", params)

            let responce = await ServiceModel.getnumberofjobdonebyemployeereport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "get number of job done by employee report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Something went wrong";
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);
            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
    getQuotationPaymentReport:  async (req, res)=>{
        try {
            let data = {};

            let params = {
                'fromdate' :  req.query.fromdate,
                'todate' :  req.query.todate,
            }

            console.log("params", params)

            let responce = await ServiceModel.getQuotationPaymentReport(params);


            if(responce.length > 0)
            {
                data["status"] = 200;
                data["message"] = "get payment report";
                data["data"] = responce;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = err.message;
                data["data"] = [];
    
                res.status(200).json(data);
            }
        }
        catch(err) {
            console.log(err.message);
            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(200).json(data);
        }
    },
}
