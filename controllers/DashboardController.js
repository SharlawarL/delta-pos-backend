const DashboardModel = require('../models/DashboardModel');

module.exports = {
    getDashboardMatrix :  async (req, res)=>{
        try {

            // Init Params
            let data = {};
            let responce = {
                "data" : {},
                "report" : {}
            };

            // Required params
            const user_data = req?.user_data || {};
            const branch_id = req.query.branch_id || 0;

            // Conditional params
            let conditon = {
                "created_date" : req.query.selecteddate,
            };

            // If user is super admin then show all branch data
            // if(user_data?.user_type != 'superadmin')
            // {
            //     conditon.branch = user_data?.branch
            // }

            // if(branch_id != 0)
            // {
            //     conditon.branch = branch_id;
            // }

            // Model Call
            responce["data"]["today_quotation"] = await DashboardModel.getTodaysQuoteMaster(conditon);
            responce["data"]["today_job"] = await DashboardModel.getTodaysJobMaster(conditon);
            responce["data"]["today_invoice"] = await DashboardModel.getTodaysInvoice(conditon);
            responce["data"]["today_income"] = await DashboardModel.getTodaysIncome(conditon);

            responce["data"]["total_quotation"] = await DashboardModel.getAllQuoteMaster(conditon);
            responce["data"]["total_job"] = await DashboardModel.getAllJobMaster(conditon);
            responce["data"]["total_invoice"] = await DashboardModel.getAllInvoices(conditon);

            responce["data"]["total_cust"] = await DashboardModel.getAllCustMaster(conditon);
            responce["data"]["total_vehicle"] = await DashboardModel.getAllVehicleMaster(conditon);


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
    getDashboardGraph :  async (req, res)=>{
        try {
            let data = {};
            let responce = {
                "data" : {},
                "report" : {}
            };

            responce["report"]["chart_quotation"] = await DashboardModel.getChartQuoteMaster();
            responce["report"]["chart_invoice"] = await DashboardModel.getChartInvoiceMaster();
            responce["report"]["job_pending"] = await DashboardModel.getJobPending();
            responce["report"]["job_completed"] = await DashboardModel.getJobCompleted();


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
    getDashboardTable :  async (req, res)=>{
        try {
            const created_date = req.query.selecteddate;
            let data = {};
            let responce = {
                "data" : {},
                "report" : {}
            };
        
            responce["report"]["quotation"] = await DashboardModel.getReportQuoteMaster(created_date);
            responce["report"]["job_completed"] = await DashboardModel.getReportJobMaster(created_date);
            responce["report"]["job_pending"] = await DashboardModel.getReportJobMasterPending(created_date);
            

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
    getActivityData :  async (req, res)=>{
        try {
            let data = {};
            
            const user_data = req?.user_data || {};
            const user_id = user_data?.id || 0;
            
            console.log("user_data", user_data)
            
            let responce = await DashboardModel.getActivityData(user_id);

            data["status"] = 200;
            data["message"] = "Activity data";
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
}