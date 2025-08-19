
const em = require('../models/EmployeeModel');
const am = require('../models/AuthModel');

const NotificationController = require('./NotificationController');
const moment = require('moment/moment')
const mysql = require('mysql2');

module.exports = {
    getAllEmployees: (req, res) => {

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

        em.getAllEmployees(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {
                // Notification content setup
                req.body.user_id = req?.user_data?.id
                req.body.noti_sub = "Employee";
                req.body.noti_desc = "Employee data record fetched successfully at " + moment().format('YYYY-MM-DD h:mm:ss a');

                let resultNoti = NotificationController.addMaster(req, res);

                data["status"] = 200;
                data["message"] = "Employee data";
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
    getAllMenu: (req, res) => {
        // Conditional params
        let conditon = {};

        em.getAllMenu(conditon, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {

                let rData = {};

                result.map((m)=>{
                    if(m.p_id == 0)
                    {
                        m.sub_menu = {};
                        rData[m.id] = m;
                    }

                    if(rData[m.p_id] != undefined)
                    {
                        rData[m.p_id].sub_menu[m.id] = m;
                    }

                })

                data["status"] = 200;
                data["message"] = "Menu data";
                data["data"] = rData;

                res.status(200).json(data);
            } else {
                data["status"] = 500;
                data["message"] = "Data not found";
                data["data"] = [];

                res.status(200).json(data);
            }
        });
    },
    getEmployeesById: (req, res) => {
        const id = req.params.id
        em.getEmployeesById(id, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result.length > 0) {
                data["status"] = 200;
                data["message"] = "Employee data";
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
    passwordChange: (req, res) => {
        let data = {};

        const id = req.params.id

        const params = {
            password: req.body.password,
            cpassword: req.body.cpassword
        }

        if (params.password == params.cpassword) {
            em.passwordChange(id, params, (err, result) => {
                if (err) {
                    return res.status(500).send(err)
                }

                if (result) {
                    data["status"] = 200;
                    data["message"] = "Employee password updated successfully";
                    data["data"] = [];

                    res.status(200).json(data);
                } else {
                    data["status"] = 500;
                    data["message"] = "Samething went wrong!";
                    data["data"] = [];

                    res.status(500).json(data);
                }
            });
        } else {
            data["status"] = 500;
            data["message"] = "Password not match";
            data["data"] = [];

            res.status(500).json(data);
        }


    },
    userMenuUpdate: (req, res) => {

        const id = req.params.id

        console.log("req.body.umenu", req.body)

        let params = {
            umenu: mysql.escape(req.body.umenu)
        }
        console.log("params", params)

        em.employeeUpdate(id, params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
                data["status"] = 200;
                data["message"] = "Employee record updated successfully";
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
    updateEmployee: (req, res) => {

        const id = req.params.id

        let params = {
            firstname: mysql.escape(req.body.firstname),
            lastname: mysql.escape(req.body.lastname),
            email: mysql.escape(req.body.email),
            mobile: mysql.escape(req.body.mobile),
            status: mysql.escape(req.body.status),
            branch: mysql.escape(req.body.branch),
            user_type: mysql.escape(req.body.user_type)
        }

        let filename = req.body.filename

        if (filename != null && filename != '' && filename != undefined) {
            params.filename = mysql.escape(filename)
        }

        em.employeeUpdate(id, params, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
                data["status"] = 200;
                data["message"] = "Employee record updated successfully";
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
    deleteEmployee: (req, res) => {

        const id = req.params.id

        em.deleteEmployee(id, (err, result) => {
            if (err) {
                return res.status(500).send(err)
            }

            let data = {};

            if (result) {
                data["status"] = 200;
                data["message"] = "Employee record deleted successfully";
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
