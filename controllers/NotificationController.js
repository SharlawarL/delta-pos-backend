
const serviceModel = require('../models/NotificationModel');
const moment = require('moment/moment')

module.exports = {
    addMaster :  async (req, res)=>{
        try {
            const user_id = req?.body?.user_id || 0;
            
            // Headers info
            const userAgent = req.headers['user-agent'];
            const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress;
            const hostname = req.hostname;
            const referrer = req.headers.referer;
            const cookies = req.cookies;

            const sub = 'Check API Request'
            const description = 'Monitor all incoming api using header info'

            const params = {
                "notification_type": 'info',
                "subject": req.body.noti_sub || sub,
                "description": req.body.noti_desc || description,
                "user_agent": userAgent,
                "ip_address": ipAddress,
                "hostname": hostname,
                "referrer": referrer,
                "cookies": cookies,
                "created_by": user_id,
                "created_on": moment().format('YYYY-MM-DD h:mm:ss a'),
            }

            // console.log("params controller ==>", params)
            
            let result = await serviceModel.addMaster(params);
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


