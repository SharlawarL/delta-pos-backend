const mysql = require("mysql2");
const logger = require('../logger');

const dbData = {
    "host": "77.37.47.202",
    "port": '3306',
    "user" : "deltapos",
    "password" : "deltapos@12345",
    "database": "deltapos"
}

// Function to handle database connection and closure
module.exports = {
    query: (sql, callback) => {
        let db = mysql.createConnection(dbData);
        // Connect to the database
        db.connect((err) => {
            if (err) {
                logger.error('Error connecting to MySQL:', err);
                console.error('Error connecting to MySQL:', err.stack);
                callback(err, null);
                return;
            }
            // console.log('Connected to MySQL as id ' + db.threadId);

            // console.log("Sql ===>>", sql)

            // Execute the SQL query
            db.query(sql, (err, results) => {
                if (err) {
                    logger.error('Error executing query:', err);

                    callback(err, null);
                } else {
                    callback(null, results);
                }

                // Close the connection
                db.end((err) => {
                    if (err) {
                        logger.error('Error closing the connection:', err);
                        console.error('Error closing the connection:', err.stack);
                    }
                    console.log('MySQL connection closed');
                });
            });
        });
    },
    queryData: (sql) => {
        return new Promise( async (resolve, reject) =>{
            try {
                
                let db = mysql.createConnection(dbData);

                // Connect to the database
                db.connect((err) => {
                    if (err) {
                        logger.error('Error connecting to MySQL:', err);

                        console.error('Error connecting to MySQL:', err.stack);
                        reject(err)
                        return;
                    }
                    // console.log('Connected to MySQL as id ' + db.threadId);

                    // console.log("Sql ===>>", sql)

                    // Execute the SQL query
                    db.query(sql, (err, results) => {
                        if (err) {
                            logger.error('Error executing query:', err);
                            resolve(err);
                        } else {
                            // console.log("results :::>>", results)
                            resolve(results);
                        }

                        // Close the connection
                        db.end((err) => {
                            if (err) {
                                logger.error('Error connecting to MySQL:', err);
                                console.error('Error closing the connection:', err.stack);
                            }
                            console.log('MySQL connection closed');
                        });
                    });
                });

            } catch (error) {
                console.log("Error :", error)
                reject(error)
            }
        })
        
    }
}

// module.exports = db;

