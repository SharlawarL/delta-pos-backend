const vehicleModal = require('../models/VehicleMasterModel');

module.exports = {
    getVehicleMaster :  (req, res)=>{
        vehicleModal.getAllVehicleMaster((err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Vehicle data";
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
    getVehicleById :  (req, res)=>{
        const id  = req.params.id

        vehicleModal.getVehicleById(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result.length > 0)
            {
                data["status"] = 200;
                data["message"] = "Vehicle data";
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
    addVehicleMaster :  (req, res)=>{

        const params = {
            reg_no      : req.body.reg_no,
            v_name      : req.body.v_name,
            model       : req.body.model,
            mfd_by      : req.body.mfd_by,
            chassis_no  : req.body.chassis_no,
            engine_no   : req.body.engine_no,
            v_type      : req.body.v_type,
            v_color     : req.body.v_color,
            reg_expiry  : req.body.reg_expiry,
            v_group     : req.body.v_group,
            engine_type : req.body.engine_type,
            mileage     : req.body.mileage,
            init_road_km : req.body.init_road_km,
            device_id   : req.body.device_id,
            gps_api     : req.body.gps_api,
            status      : "active",
        }

        vehicleModal.addVehicleMaster(params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Vehicle record created successfully";
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
    updateVehicleMaster :  (req, res)=>{

        const id  = req.params.id

        const params = {
            reg_no      : req.body.reg_no,
            v_name      : req.body.v_name,
            model       : req.body.model,
            mfd_by      : req.body.mfd_by,
            chassis_no  : req.body.chassis_no,
            engine_no   : req.body.engine_no,
            v_type      : req.body.v_type,
            v_color     : req.body.v_color,
            reg_expiry  : req.body.reg_expiry,
            v_group     : req.body.v_group,
            engine_type : req.body.engine_type,
            mileage     : req.body.mileage,
            init_road_km : req.body.init_road_km,
            device_id   : req.body.device_id,
            gps_api     : req.body.gps_api,
            status      : req.body.status
        }
        
        vehicleModal.updateVehicleMaster(id, params, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Vehicle record updated successfully";
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
    deleteVehicleMaster :  (req, res)=>{

        const id  = req.params.id

        vehicleModal.deleteVehicleMaster(id, (err, result) =>{
            if(err)
            {
                return res.status(500).send(err)
            }
            
            let data = {};

            if(result)
            {
                data["status"] = 200;
                data["message"] = "Vehicle record deleted successfully";
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