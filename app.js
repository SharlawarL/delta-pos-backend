const express = require("express");

const path = require('path');

const bodyParser = require('body-parser');
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json")
const bcrypt = require('bcrypt');
const http = require('http');
const { Server } = require('socket.io');
const moment = require('moment/moment')

var jwt = require('jsonwebtoken');
var cors = require('cors')

const logger = require('./logger');
var getIP = require('ipware')().get_ip;


// Routes
const employeeRout = require('./routes/EmployeeRout')
const authRout = require('./routes/AuthRout')
const companyMasterRout = require('./routes/CompanyMasterRout')
const DashboardRout = require('./routes/DashboardRout')
const EmailRout = require('./routes/EmailRout')
const PaymodeRout = require('./routes/PaymodeRout')
const AccountRout = require('./routes/AccountRout')

const CategoryRout = require('./routes/CategoryRout')

// Controller
const NotificationController = require('./controllers/NotificationController');

const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const server = http.createServer(app);
const io = new Server(server, {});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

console.log("Hello")
io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle events
    socket.on("message", (data) => {
        console.log(data);
        io.emit("message", data); // Broadcast the message to all clients
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// Pass `io` to the controllers so that they can emit events
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.get('/', (req, res) => {
    res.send("Welcome to node project");
})

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

// JWT Middleware
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        // console.log("token", token)
        jwt.verify(token, 'lalitsharlawar2024', (error, userData) => {
            if (error) {
                console.log(error)
                return res.sendStatus(403);
            }

            req.user_data = userData;
            // next();
        })
        next();
    } else {
        return res.sendStatus(401);
    }
}

// JWT Middleware
const activitycapture = async (req, res, next) => {
    try {
        req.io = io
        req.body.user_id = req?.user_data?.id
        // let result = await NotificationController.addMaster(req, res);

        next();
    } catch (err) {
        logger.error('Error on notification', err);
        res.status(401).json(err);
    }
}

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth', activitycapture, authRout);
app.use('/api/email', activitycapture, EmailRout);

app.use('/api/dashboard', authenticateJWT, activitycapture, DashboardRout);

app.use('/api/employee', authenticateJWT, activitycapture, employeeRout);
app.use('/api/company-master', activitycapture, authenticateJWT, companyMasterRout);

app.use('/api/paymode-master', authenticateJWT, activitycapture, PaymodeRout);
app.use('/api/account-master', authenticateJWT, activitycapture, AccountRout);

app.use('/api/category', authenticateJWT, activitycapture, CategoryRout);

app.listen(5012, () => {
    logger.info('Server listening on port 5012');
    console.log("Our application is started on 5012")
})