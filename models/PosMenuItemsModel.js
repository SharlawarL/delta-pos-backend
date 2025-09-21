const db = require('../connection/dbConnection');

module.exports = {
    getAllMaster: () => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `
                    SELECT 
                    tpmi.id, tpmi.category_id, tpc.cat_name as cat_name, tpmi.name,tpmi.spanish_name, tpmi.description, tpmi.price, tpmi.is_active, tpmi.image_url, 
                    tpmi.created_on, tpmi.created_by, tpmi.updated_on, tpmi.updated_by
                    FROM tbl_pos_menu_items as tpmi
                    left join tbl_pos_category as tpc on tpmi.category_id = tpc.id
                    order by id desc
                `;

                let result = await db.queryData(sql);

                const sqlItems = `
                   SELECT 
                    tpr.menu_item_id,tpi.id, tpi.menu_code, tpi.name, tpi.unit, tpi.current_stock, tpi.reorder_level, tpi.cost_per_unit, tpr.quantity
                    FROM tbl_pos_recipes as tpr
                    left join tbl_pos_ingredients as tpi on tpi.id = tpr.ingredient_id 
                    order by id desc
                `;

                let resultItems = await db.queryData(sqlItems);

                result.forEach(element => {
                    element.recipes = [];

                    resultItems.forEach(item => {
                        if(element.id == item.menu_item_id){
                            element.recipes.push(item)
                        }
                    })
                });

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    getById: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `SELECT 
                    tpmi.id, tpmi.category_id, tpc.cat_name as cat_name, tpmi.name,tpmi.spanish_name, tpmi.description, tpmi.price, tpmi.is_active, tpmi.image_url, 
                    tpmi.created_on, tpmi.created_by, tpmi.updated_on, tpmi.updated_by
                    FROM tbl_pos_menu_items as tpmi
                    left join tbl_pos_category as tpc on tpmi.category_id = tpc.id 
                    where tpmi.id='${id}' 
                `;

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    

    addMaster:async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into tbl_pos_menu_items(" + keys.join(",") + ") values (" + values.join(",") + ") ";

                let result = await db.queryData(sql);

                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    updateMaster: (id, params) => {
        return new Promise(async(resolve, reject) => {
            try {
                let param = [];

                // Rearrange paramas for set
                for (let key of Object.keys(params)) {
                    param.push(" " + key + "=" + params[key] + " ")
                }

                let sql = "UPDATE tbl_pos_menu_items SET " + param.join(",") + " where id='" + id + "' ";


                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },

    deleteMaster: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM tbl_pos_menu_items WHERE id='${id}' `;

                let result = await db.queryData(sql);
                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    deleteRecipesMaster: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                const sql = `DELETE FROM tbl_pos_recipes WHERE menu_item_id='${id}' `;

                let result = await db.queryData(sql);
                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    addRecipesMaster:async (params) => {
        return new Promise(async (resolve, reject) => {
            try {
                let keys = Object.keys(params);
                let values = Object.values(params);

                const sql = "INSERT into tbl_pos_recipes(" + keys.join(",") + ") values (" + values.join(",") + ") ";

                let result = await db.queryData(sql);

                return resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
    getRecipesById: (id) => {
        return new Promise(async(resolve, reject) => {
            try {
                // data fetch from customers table
                const sql = `SELECT 
                    tpi.id, tpi.menu_code, tpi.name, tpi.unit, tpi.current_stock, tpi.reorder_level, tpi.cost_per_unit, tpr.quantity
                    FROM tbl_pos_recipes as tpr
                    left join tbl_pos_ingredients as tpi on tpi.id = tpr.ingredient_id 
                    where tpr.menu_item_id='${id}' 
                `;

                let result = await db.queryData(sql);

                resolve(result)
            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        });
    },
};
