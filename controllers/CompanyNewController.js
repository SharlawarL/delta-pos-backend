const model = require('../models/CompanyNewModel');

module.exports = {
    getAllMaster: async (req, res) => {
        try {

            let data = {};

            let result = await model.getAllMaster();

            if (result.length > 0) {
                data["status"] = 200;
                data["message"] = "Get Company New Data";
                data["data"] = result;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found...!!!";
                data["data"] = [];

                res.status(200).json(data);
            }
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
    getDataById: async(req, res) => {
        try {

            let data = {};
            const id = req.params.id

            let result = await model.getById(id);

            if (result.length > 0) {
                data["status"] = 200;
                data["message"] = "Get Company New Data By Id";
                data["data"] = result ? result[0] : {};

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found...!!!";
                data["data"] = [];

                res.status(200).json(data);
            }
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
    addCompanyNew: async (req, res) => {
        try {

            let data = {};
            
            const params = {
                name: req.body.name,
                shipper: req.body.shipper,
                consignee: req.body.consignee,
                deliver_to: req.body.deliver_to,
                bill_to: req.body.bill_to,
                address: req.body.address,
                address_2: req.body.address_2,
                address_3: req.body.address_3,
                postal_code: req.body.post_code,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                phone_no: req.body.phone,
                fax_no: req.body.fax,
            }

            let result = await model.addMaster(params);

            if (result) {
                data["status"] = 200;
                data["message"] = "Data successfully submitted";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Something went wrong...!!!";
                data["data"] = [];

                res.status(200).json(data);
            }
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
    updateCompanyNew: async(req, res) => {

        try {
            
            let data = {};

            const id = req.params.id
            
            const params = {
                name: req.body.name,
                shipper: req.body.shipper,
                consignee: req.body.consignee,
                deliver_to: req.body.deliver_to,
                bill_to: req.body.bill_to,
                address: req.body.address,
                address_2: req.body.address_2,
                address_3: req.body.address_3,
                postal_code: req.body.post_code,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                phone_no: req.body.phone,
                fax_no: req.body.fax,
            }

            let result = await model.updateMaster(id, params);

            if (result) {
                data["status"] = 200;
                data["message"] = "Data successfully updated";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Something went wrong...!!!";
                data["data"] = [];

                res.status(200).json(data);
            }
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
    deleteCompanyNew: async(req, res) => {
        try {
            
            let data = {};

            const id = req.params.id

            let result = await model.deleteMaster(id);

            if (result) {
                data["status"] = 200;
                data["message"] = "Data successfully deleted";
                data["data"] = [];

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Something went wrong...!!!";
                data["data"] = [];

                res.status(200).json(data);
            }
        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            res.status(500).json(data);
        }
    }
}