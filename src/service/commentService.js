const db = require('../models');

let creatCommet=async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let account = await db.Account.findOne({
                where: {
                    id: data.idaccount
                }
            })

            if (!account) {
                resData.errCode = 1;
                resData.errMessage = "Không tồn tại account  có id này";
            }
            else{
                await db.Comment.create({
                    account_id: data.idaccount,
                    activity_id: data.idactivity,
                    content:data.content
                })
                const { count, rows } = await db.Comment.findAndCountAll(
                    {
                        where:{
                            activity_id: data.idactivity
                        }
                    }
                )
                let  resData = {};
                resData.totalcomment = count,
                resData.listcomment=rows
                resolve(resData)
            }
        } catch (error) {
            reject(error)
        }
    })
}
let deleteComment=async (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let Comment = await db.Comment.findOne({
                where: {
                    id: id
                },
            })
            if (!Comment) {
                resData.errCode = 1;
                resData.errMessage = "Không tồn tại trung tam có id này";
            }
            else{
                Comment.destroy();
                resData.errCode = 0;
                resData.errMessage = "OK";
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}
let getlistcomment=async ( page, limit) => {
    return new Promise(async (resolve, reject) => {
        try {
            page = page - 0;
            limit = limit - 0;
            let offset = page * limit;
            const { count, rows } = await db.Comment.findAndCountAll({
                offset: offset,
                limit: limit,
                raw: true,
                nest: true,
                order: [['createdAt', 'DESC']]
            })
            console.log(rows)
            let resData = {};
            resData.Comment = rows;
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
module.exports = {
    creatCommet:creatCommet,
    deleteComment:deleteComment,
    getlistcomment:getlistcomment
}