const express = require('express');
const router = express.Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    let dir = 'images/';

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    let fName = uuidv4();
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    req.fName = fName + ext;
    cb(null, fName + ext);
  },
});
var upload = multer({ storage: storage });

const userControllers = require('../controllers/users');
const ordersControllers = require('../controllers/orders');
const stocksControllers = require('../controllers/stocks');
const lookupControllers = require('../controllers/lookups');

const { isAuth } = require('../services/IsAuth');

router.post('/users/login', userControllers.login);
router.post('/users', isAuth, userControllers.create);
router.get('/users', isAuth, userControllers.list);
router.put('/users/:id', isAuth, userControllers.update);
router.delete('/users/:id', isAuth, userControllers.remove);

// request route
router.post('/orders', isAuth, ordersControllers.create);
router.get('/orders', isAuth, ordersControllers.list);
router.get('/done-orders', isAuth, ordersControllers.listDoneOrders);
router.get('/orders/:id', isAuth, ordersControllers.listStatusLogs);
router.put('/orders/:id', isAuth, ordersControllers.update);
router.put('/orders/dce/:id', isAuth, ordersControllers.moveToDoneForReview);
router.delete('/orders/:id', isAuth, ordersControllers.remove);
router.patch('/orders', isAuth, ordersControllers.updateStatus);

router.post('/stock', isAuth, upload.single('image'), stocksControllers.create);
router.get('/stock', isAuth, stocksControllers.list);
router.get('/stock/approve', isAuth, stocksControllers.listForApproval);
router.post('/stock/approve', isAuth, stocksControllers.approveStockAmount);
router.delete('/stock/:id', isAuth, stocksControllers.remove);
router.put('/stock/:id', isAuth, upload.single('image'), stocksControllers.update);
router.put('/stock/dce-amount/:id', isAuth, stocksControllers.updateStockForDCE);
router.get('/stock/amountLimit', stocksControllers.checkAmountLimit);

// lookups routes
router.post('/lookups', isAuth, lookupControllers.create);
router.get('/lookups', lookupControllers.list);
router.put('/lookups/settings', isAuth, lookupControllers.updateSettings);
router.put('/lookups/:id', isAuth, lookupControllers.update);
router.delete('/lookups/:id', isAuth, lookupControllers.remove);

module.exports = router;
