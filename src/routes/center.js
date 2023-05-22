const router = require('express').Router();
const authJwt = require('../middlewares/authJwt');
const CenterController=require('../controller/CenterController')
const fileUploader =require('../config/cloudinary.config');
router.put('/',CenterController.create);//
router.delete('/:id',authJwt.authenToken,authJwt.isAdmin,CenterController.DeleteCenter);
router.get('/',authJwt.authenToken,authJwt.isAdmin,CenterController.getallCenter);
router.post('/:id',authJwt.authenToken,authJwt.isAdminOrUser,fileUploader.single('image'),CenterController.UpdateCenter)
router.get('/:id',authJwt.authenToken, CenterController.getCenterById);
router.get('/acount/:id',authJwt.authenToken,CenterController.getcenterbyacountid)
module.exports = router