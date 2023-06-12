const router = require('express').Router();
const authJwt = require('../middlewares/authJwt');
const notificationController=require('../controller/notificationController')
router.get('/account/:id',authJwt.authenToken, notificationController.GetNotificationForUserByAccountId);
module.exports=router