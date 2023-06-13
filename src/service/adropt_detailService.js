const { where } = require('sequelize');
const { Sequelize, DataTypes } = require('sequelize');
const db = require('../models');

let getadropt_detailbyid= (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let Adropt_detail = await db.Adropt_detail.findOne({ where: { id: id }})
            resData.Adropt_detail=Adropt_detail
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

let getadropt_detailbyacountid= (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let Adropt_detail = await db.Adropt_detail.findOne({ where: { account_id: id }})
            resData.Adropt_detail=Adropt_detail
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}

let creatadropt_detail=async ( data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let AccoutData = await db.Account.findOne(
                {
                    where: { id: data.account_id }
                }
            )
            if(AccoutData){
                let adropt_detail=await db.Adropt_detail.create({
                    income:data.income,
                    marital_status:data.marital_status,
                    family_status:data.family_status,
                    account_id:data.account_id
                })
                resolve({
                    errCode: 0,
                    message: adropt_detail
                });
            }
            else{
                resolve({
                    errCode: 1,
                    message: 'tai khoan ko tồn tại'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let Updateadropt_detail=(params, data) => {
    return new Promise(async (resolve, reject) => {
        let resData = {};
        try {
            let adropt_detail = await db.Adropt_detail.findByPk(params.id)
            if (adropt_detail) {
                await db.Adropt_detail.update({
                    income:data.income,
                    marital_status:data.marital_status,
                    family_status:data.family_status,
                    account_id:data.account_id
                },{
                    where:{
                        id:adropt_detail.id
                    }
                })
                resData.errCode = 0;
                resData.errMessage = center
            }
            else {
                resData.errCode = 2;
                resData.errMessage = " adropt_detail ko ton tai"
            }
            resolve(resData)
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    getadropt_detailbyid:getadropt_detailbyid,
    getadropt_detailbyacountid:getadropt_detailbyacountid,
    creatadropt_detail:creatadropt_detail,
    Updateadropt_detail:Updateadropt_detail
}