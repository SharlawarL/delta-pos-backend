const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const utils = require('../utils/Utils');
const am = require('../models/AuthModel');

const NotificationController = require('./NotificationController');

const moment = require('moment/moment')

module.exports = {
    empLogin: async (req, res) => {
        try {

            let data = {};
            const params = {
                email: req.body.email,
                password: req.body.password,
            }

            const type = req.body.type || 'email'

            let result = await am.empLogin(params);

            if (result.length > 0) {
                //Var init
                let empData = result.length > 0 ? result[0] : {};

                // Check password
                let passCheck = await bcrypt.compare(params.password, empData.password);

                // Token generation
                var token = jwt.sign({...empData}, "lalitsharlawar2024", { expiresIn: '30d' });

                // if (true)
                if ((empData.password && passCheck) || type == 'google') 
                {

                    // Notification content setup
                    req.body.user_id = empData?.id || 0;
                    req.body.noti_sub = "Login";
                    req.body.noti_desc = empData?.firstname+" "+empData?.lastname+" login successfully at "+moment().format('YYYY-MM-DD h:mm:ss a');

                    let resultNoti = await NotificationController.addMaster(req, res);

                    data["status"] = 200;
                    data["message"] = "Employee login successfully!";
                    data["data"] = result;
                    data["token"] = token;

                    console.log("data", data)

                    res.status(200).json(data);
                } else {
                    // Notification content setup
                    req.headers.user_id = empData?.id || 0;
                    req.body.noti_sub = "Login";
                    req.body.noti_desc = empData?.firstname+" "+empData?.lastname+" login failed at "+moment().format('YYYY-MM-DD h:mm:ss a');

                    let resultNoti = await NotificationController.addMaster(req, res);

                    data["status"] = 500;
                    data["message"] = "Invalid email and password";
                    data["data"] = [];

                    res.status(500).json(data);
                }
            } else {
                data["status"] = 500;
                data["message"] = "User not exits. Please connect Administrator";
                data["data"] = [];

                res.status(500).json(data);
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
    empRegister: async (req, res) => {
        try {

            let data = {};

            const params = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                mobile: req.body.mobile,
                password: req.body.password,
                status: "active",
                branch: req.body.branch,
                user_type: req.body.user_type,
                filename : req.body.filename,
            }

            let result = await am.empRegister(params);

            if (result) {

                data["status"] = 200;
                data["message"] = "Employee Registered successfully";
                data["data"] = [];

                return res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Samething went wrong!";
                data["data"] = [];

                return res.status(500).json(data);
            }
        }
        catch (err) {
            console.log(err.message);

            let data = {};
            data["status"] = 500;
            data["message"] = err.message;
            data["data"] = [];

            return res.status(500).json(data);
        }
    }
}
