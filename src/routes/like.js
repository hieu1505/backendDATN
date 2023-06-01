const router = require('express').Router();
const authJwt = require('../middlewares/authJwt');
const LikeController=require('../controller/LikeController');

router.post('/',authJwt.authenToken,LikeController.like)
router.post('/dislike/',authJwt.authenToken,LikeController.dislike)
router.get('/:id',authJwt.authenToken,LikeController.checklikebyidacount)
module.exports=router