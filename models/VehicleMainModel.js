
const db = require('../connection/dbConnection')

module.exports = {
    getAllMaster : (callback) =>{

        // data fetch from customers table
        const sql ="SELECT ve.`id`, ve.`entry_no`, ve.`vehicle_details`, ve.`date`, ve.`account_group`, ve.`amount`, ve.`pay_mode`, ve.`remarks`, ve.`created_at`, ve.`updated_at`, ag.`name` as account_group_name, pm.`paymode` as paymode, vm.particulars as particulars FROM vehicle_maintenance ve left join account_groups as ag on ve.account_group=ag.id left join payment_modes as pm on ve.pay_mode=pm.id left join voucher_entry as vm on ve.expense_particulars=vm.id";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }   
            // Result
            callback(null, result);
        });
    },
    getById : (id, callback) =>{

        // data fetch from customers table
        const sql ="SELECT ve.`id`, ve.`entry_no`, ve.`vehicle_details`, ve.`date`, ve.`account_group`, ve.`amount`, ve.`pay_mode`, ve.`remarks`, ve.`created_at`, ve.`updated_at`, ag.`name` as account_group_name, ag.id as ac_id, pm.`paymode` as paymode, pm.id as py_id, vm.particulars, vm.id as p_id, vm.particulars as particulars FROM vehicle_maintenance ve left join account_groups as ag on ve.account_group=ag.id left join payment_modes as pm on ve.pay_mode=pm.id left join voucher_entry as vm on ve.expense_particulars=vm.id where ve.id='"+id+"' ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }   
            // Result
            callback(null, result);
        });
    },
    addMaster : (params, callback)  =>{

        let keys = Object.keys(params);
        let values = Object.values(params);

        const sql ="INSERT into vehicle_maintenance("+keys.join(",")+") values ('"+values.join("','")+"') ";

        console.log("params", keys, values)
        console.log("sql", sql)

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    updateMaster : (id, params, callback)  =>{

        let param = [];

        // Rearrange paramas for set
        for(let key of Object.keys(params))
        {
            param.push(" "+key+"='"+params[key]+"' ")
        }

        let sql ="UPDATE vehicle_maintenance SET "+param.join(",")+" where id='"+id+"' ";

        console.log("SQL ==>", sql)

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
    deleteMaster : (id, callback) =>{

        // data fetch from vehicle table
        const sql ="DELETE from vehicle_maintenance WHERE id='"+id+"' ";
        // let sql ="UPDATE vehicle_maintenance SET status='deleted' where id='"+id+"' ";

        db.query(sql, (err, result) =>{
            // Error
            if(err)
            {
                callback(err)
            }
            // Result
            callback(null, result);
        });
    },
}