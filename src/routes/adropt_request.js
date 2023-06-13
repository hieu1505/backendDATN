const express= require('express')
const router=express.Router()
const authJwt = require('../middlewares/authJwt');
const adropt_requestController=require('../controller/adropt_requestController')
router.get('/:id',authJwt.authenToken,adropt_requestController.getadropt_requesbyid);
module.exports = router