const CenterSevice= require('../service/CenterSevice');
const moment = require('moment');

let create=async(req,res)=>{
    console.log(req.body)
    if (!req.body.phoneNumber || !req.body.email || !req.body.name || !req.body.birthday || !req.body.address || !req.body.password || !req.body.gender) {
        return res.status(400).json({
            erroCode: 1,
            message: 'nhập đầy đủ thông tin s'
        })
    }
   
        req.body.image = req.file.path;
    
    
    if (!moment(req.body.birthday, 'YYYY-MM-DD', true).isValid()) {
        return res.status(400).json({
            erroCode: 1,
            message: 'định dạng birthday không đúng. Ví dụ về định dạng đúng : 2022-11-20'
        })
    }
    if (req.body.password.length < 5 || req.body.password.length > 15) {
        return res.status(400).json({
            erroCode: 1,
            message: 'độ dài mật khẩu phải lớn hơn hoặc bằng 5 ký tự và không quá 15 ký tự'
        })
    }
    if (req.body.gender === '1') {
        req.body.images = 'https://res.cloudinary.com/drotiisfy/image/upload/v1665540808/profiles/male_default_avatar.jng_tgqrqf.jpg'
    } else {
        req.body.images = 'https://res.cloudinary.com/drotiisfy/image/upload/v1665540809/profiles/female_defaule_avatar_ezuxcv.jpg'
    }
    req.body.active = '1'
    let message = await CenterSevice.createCenter(req.body)
    if (message.errCode == 0) {
        return res.status(200).json(message.errCode);
    } else if (message.errCode == 1) {
        return res.status(409).json(message.errCode);
    } 

    
}

let DeleteCenter=async (req,res)=>{
    console.log('delete')
    let id =req.params.id;
    console.log(id)
    if (!id){
        return res.status(400).json({message: 'Thiếu tham số id'});
    }
    let resData=await CenterSevice.deleteCenter(id)
    if(resData.errCode === 1) {
        return res.status(404).json({
            message: resData.message
        })
    }
    if(resData.errCode === 0) {
        return res.status(200).json({
            message: resData.message
        })
    }
}
let getallCenter =async (req,res)=>{
    let key;
    if( req.query.key === undefined){
        key = ''
    } else{
        key= req.query.key
    }
    let pageNumber = req.query.page === undefined ? 0: req.query.page;
    let limit = req.query.limit === undefined ? 10 : req.query.limit;
    let resData=await CenterSevice.getAllCenter(key,pageNumber,limit)
    let page ={};
    page.size= resData.size;
    page.totalPages= resData.totalPages;
    page.totalElements = resData.totalElements;
    page.page = resData.page;
    return res.status(200).json({
        erroCode:0,
        message: 'OK',
        page: page,
        center: resData.center,
    })
}
let UpdateCenter=async (req,res)=>{
    console.log('update')
    if(!req.params) {
        return res.status(200).json({
            errCode: "1",
            errMessage: "Thieu tham so id"
        })
    }
    if (req.file) {
        req.body.image = req.file.path;
    } 
    let resData=await CenterSevice.UpdateCenter(req.params,req.body)
    if(resData.errCode == 2){
        return res.status(404).json({
            errCode:resData.errCode,
            message: resData.errMessage
        })
    } else {
        return res.status(200).json({
            errCode:resData.errCode,
            message: resData.errMessage
        })
}}
let getCenterById=async(req,res)=>{
    let id = parseInt(req.params.id);
    if (id) {
        let center = await CenterSevice.getCenterById(id);
        if(center){
            return res.status(200).json({
                errCode: 0,
                message: center,
            })
        }
        else {
            return res.status(404).json({
                errCode: 1,
                message: 'Không tìm thấy center có id này',
            })
        }
    } else {
        return res.status(400).json({
            errCode: 1,
            message: 'Thiếu tham số id',
        })
    }
}
let getcenterbyacountid=async(req,res)=>{
    let id = parseInt(req.params.id);
    if (id) {
        let center = await CenterSevice.getcenterbyacountid(id);
        if(center){
            return res.status(200).json({
                errCode: 0,
                message: center,
            })
        }
        else {
            return res.status(404).json({
                errCode: 1,
                message: 'Không tìm thấy center có id này',
            })
        }
    
    } else {
        return res.status(400).json({
            errCode: 1,
            message: 'Thiếu tham số id',
        })
    }
}
module.exports = {
    create:create,
    DeleteCenter:DeleteCenter,
    getallCenter:getallCenter,
    UpdateCenter:UpdateCenter,
    getCenterById:getCenterById,
    getcenterbyacountid:getcenterbyacountid
}