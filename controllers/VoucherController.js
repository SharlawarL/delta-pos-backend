const voucherModal = require('../models/VoucherModel');
const  moment = require('moment/moment')

module.exports = {
    getMaster :  (req, res)=>{
        voucherModal.getAllMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Voucher Entry data";
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
    getById :  (req, res)=>{
        const id  = req.params.id

        voucherModal.getById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Voucher Data by ID data";
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
    addMaster :  (req, res)=>{

        const params = {
            date      : req.body.date,
            particulars : req.body.particulars,
            account_group : req.body.account_group,
            amount : req.body.amount,
            pay_mode : req.body.pay_mode,
            remarks : req.body.remarks,
            created_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }

        voucherModal.addMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Voucher entry record created successfully";
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
    updateMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            date      : req.body.date,
            particulars : req.body.particulars,
            account_group : req.body.account_group,
            amount : req.body.amount,
            pay_mode : req.body.pay_mode,
            remarks : req.body.remarks,
            updated_at : moment(new Date()).format('YYYY-MM-DD h:mm:ss')
        }
        
        voucherModal.updateMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Voucher record updated successfully";
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
    deleteMaster :  (req, res)=>{

        const id  = req.params.id

        voucherModal.deleteMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Account record deleted successfully";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                res.status(500).json(data);
            }
        });
    }
}