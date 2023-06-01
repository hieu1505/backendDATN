const auth = require('./auth')
const account = require('./account')
const center=require('./center')
const children=require('./children')
const activity=require('./activity')
const comment=require('./comment')
const like=require('./like')
const donor=require('./donor')
const express = require('express')
const router=express.Router()
router.post("/status",function(req, res){
    console.log(req.body.name)})
router.use('/auth',auth)
router.use('/account',account)
router.use('/center',center)
router.use('/children',children)
router.use('/activity',activity)
router.use('/like',like)
router.use('/comment',comment)
router.use('/donor',donor)





module.exports = router;