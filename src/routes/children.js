const express= require('express')
const router=express.Router();
const authJwt = require('../middlewares/authJwt');
const ChildrenController=require('../controller/ChildrenController')
const fileUploader = require('../config/cloudinary.config');
const children = require('../models/children');

router.delete('/:id',authJwt.authenToken,authJwt.isAdminOrUser,ChildrenController.DeleteChildren);
router.get('/center/:id',authJwt.authenToken,ChildrenController.getallChildren);
router.get('/:id',authJwt.authenToken, ChildrenController.getChildrenById);
router.post('/create/:id',authJwt.authenToken,fileUploader.single('image'),ChildrenController.create);
router.put('/:id',ChildrenController.UpdateChildren)
 
module.exports = router
