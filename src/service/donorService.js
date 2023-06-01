const db = require('../models');
let create= async (data) => {
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
            else {
               const donor= await db.Donor.create({
                center_id:data.idcenter,
                account_id:data.idaccount,
                amount:data.amount,
                note:data.note
                })
                resolve({
                    errCode: 0,
                    message: donor
                });
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getlistdonorbycenter=async (id, page, limit) => {
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
                where:{
                    center_id:id
                }
        })
        console.log(rows)
        let resData = {};
        resData.donor = rows;
        resData.limit = limit;
        resData.totalPages = Math.ceil(count / limit);
        resData.totalElements = count
        resData.page = page;
        resolve(resData);
    
       } catch (error) {
        reject(error)
       }})
}
module.exports = {
    create:create,
    getlistdonorbycenter:getlistdonorbycenter
}