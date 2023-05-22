const { where } = require('sequelize');
const db = require('../models');

let deleteactivity=(id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let activity=await db.Activity.findOne({
                where:{
                    id:id
                }
            })
            if(!activity){
                resData.errCode = 1;
                resData.errMessage = "Không tồn tại  tre  có id này";
            }
            else{
                activity.destroy();
                resData.errCode = 0;
                resData.errMessage = "OK";
            }
            resolve(resData);
        } catch (error) {
            reject(error);
        }
    })
}
let getactivitybyid=(id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let activity =await db.Activity.findOne({
                where:{id:id}
            })
            resolve(activity)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllactivity=async (key,page,limit)=>{
    return new Promise(async (resolve, reject) => {
        try {
            page = page - 0;
            limit = limit - 0;
            let offset = page * limit;
            const { count, rows } = await db.Activity.findAndCountAll(
                {
                    offset: offset,
                    limit: limit,
                    raw: true,
                    nest: true, 
                }
            )
            let resData = {};
            resData.activity = rows;
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
let getAllactivitybyacountid=async (id,key,page,limit)=>{
    return new Promise(async (resolve, reject) => {
        try {
            page = page - 0;
            limit = limit - 0;
            let offset = page * limit;
            const { count, rows } = await db.Activity.findAndCountAll(
                {
                    offset: offset,
                    limit: limit,
                    raw: true,
                    nest: true, 
                    where:{
                        center_id:id
                    }
                }
            )
            let resData = {};
            resData.activity = rows;
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
let createActivity= async ( id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const activity =await db.Activity.create({
                title:data.title,
                content:data.content,
                contentHTML:data.contentHTML,
                center_id:id
            })
            resolve({
                errCode: 0,
                message: activity
            });
        } catch (error) {
            reject(error)
        }
    })
}
let updateActivity =async ( id,data) => {
    return new Promise(async (resolve, reject) => {
        let resData = {};
        try {
            const activity =await db.Activity.findOne({
                where:{id:id}
            })
            if(activity){
                await db.Activity.update({
                title:data.title,
                content:data.content,
                contentHTML:data.contentHTML, 
                },{where:{
                    id:id
                }})
                resData.errCode = 0;
                resData.errMessage = activity
            }
            else {
                resData.errCode = 2;
                resData.errMessage = "activity ko ton tai"
            }
            resolve(resData)
        } catch (error) {
            reject(error);
            
        }
    })
}
module.exports = {
    deleteactivity:deleteactivity ,
    getactivitybyid:getactivitybyid,
    getAllactivity:getAllactivity,
    getAllactivitybyacountid:getAllactivitybyacountid,
    createActivity:createActivity,
    updateActivity:updateActivity
}