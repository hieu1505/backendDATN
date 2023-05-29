const router = require('express').Router();
const authJwt = require('../middlewares/authJwt');
const CommentController=require('../controller/CommentController')
router.post('/',authJwt.authenToken,CommentController.creatCommet)
router.delete('/:id',authJwt.authenToken,CommentController.deletecomment)
module.exports=router