const express = require('express');
const router = express.Router();
const dc = require('../controllers/DashboardController')

router.get('/get-dashboard-matrix', dc.getDashboardMatrix);
router.get('/get-dashboard-graph', dc.getDashboardGraph);
router.get('/get-dashboard-table', dc.getDashboardTable);
router.get('/get-activity-data', dc.getActivityData);

module.exports = router;