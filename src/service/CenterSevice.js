const db = require('../models');
const bcrypt = require('bcryptjs');
const AuthService =require('./AuthService') ;
const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let createCenter = async ( data) => {
    return new Promise(
        async (resolve, reject) => {
            try {
                let checkemail = await AuthService.checkAccountEmail(data.email)
                
                if (checkemail === true) {
                    resolve({
                        errCode: 1,
                        message: 'email đã tồn tại'
                    })
                }
                else {
                    let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                    let [role, created] = await db.Role.findOrCreate({
                        where: { name: 'center' }
                    })
                    const profile = await db.Profile.create({
                        name: data.name,
                        address: data.address,
                        avatar: data.images,
                        gender: data.gender === '1' ? true : false,
                        phoneNumber: data.phoneNumber,
                        birthday: data.birthday
                    })
                    const account = await db.Account.create({
                        email: data.email,
                        password: hashPasswordFromBcrypt,
                        active: data.active,
                        role_id: role.id,
                        profile_id: profile.id,
                        Token:''

                    })
                    const center = await db.Center.create({
                        name: data.name,
                        email: data.email,
                        adress: data.address,
                        phoneNumber: data.phoneNumber,
                        picture: data.image,
                        account_id: account.id
                    })
                    resolve({
                        errCode: 0,
                        message: center
                    });
                }
            } catch (error) {
                reject(error);
            }
        })
}
let deleteCenter = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let center = await db.Center.findOne({
                where: {
                    id: id
                },
            })
            if (!center) {
                resData.errCode = 1;
                resData.errMessage = "Không tồn tại trung tam có id này";
            }
            else {
                center.destroy();
                resData.errCode = 0;
                resData.errMessage = "OK";
            }
            resolve(resData);
        } catch (error) {
            reject(error);
        }
    })
}

let getAllCenter = async (key, page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            page = page - 0;
            limit = limit - 0;
            let offset = page * limit;
            const { count, rows } = await db.Center.findAndCountAll({
                offset: offset,
                limit: limit,
                raw: true,
                nest: true,
            })
            console.log(rows)
            let resData = {};
            resData.center = rows;
            resData.limit = limit;
            resData.totalPages = Math.ceil(count / limit);
            resData.totalElements = count
            resData.page = page;
            resolve(resData);
        } catch (error) {
            reject(error)
        }
    })
}
let UpdateCenter = (params, data) => {
    console.log(data)
    return new Promise(async (resolve, reject) => {
        let resData = {};
        try {
            let center = await db.Center.findByPk(params.id)
            if (center) {
                await db.Center.update({
                    name: data.name,
                    email: data.email,
                    adress: data.adress,
                    phoneNumber: data.phoneNumber,
                    picture: data.image,
                },{
                    where:{
                        id:center.id
                    }
                })
                resData.errCode = 0;
                resData.errMessage = center
            }
            else {
                resData.errCode = 2;
                resData.errMessage = "Center ko ton tai"
            }
            resolve(resData)
        } catch (error) {
            reject(error);
        }
    })
}
let getCenterById=(id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let center=await db.Center.findOne({
                where:{id:id}
            })
            countchildent=await db.Children.count({where:{
                center_id:id
            }})
            resData.countchildent=countchildent
            resData.center=center
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}
let getcenterbyacountid=(id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let center=await db.Center.findOne({
                where:{account_id:id}
            })
            resolve(center)
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createCenter: createCenter,
    deleteCenter: deleteCenter,
    getAllCenter: getAllCenter,
    UpdateCenter: UpdateCenter,
    getCenterById:getCenterById,
    getcenterbyacountid:getcenterbyacountid
}