const { where } = require('sequelize');

const { Sequelize, Op, DataTypes } = require('sequelize');

const db = require('../models');
let getadropt_requesbychildrentid = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let Adropt_request = await db.Adropt_request.findOne({ where: { children_id: id } })
            resData.Adropt_request = Adropt_request
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })

}

let creatadropt_request = async (data) => {
    return new Promise(async (resolve, reject) => {
        let Adropt_detail = await db.Adropt_detail.findOne({
            id: data.adropt_detail_id
        })
        if (Adropt_detail) {
            let adropt_request = await db.Adropt_request.create({
                children_id: data.children_id,
                request: data.request,
                adropt_detail_id: data.adropt_detail_id,

            })
            resolve({
                errCode: 0,
                message: adropt_request
            });
        }
        else {
            resolve({
                errCode: 1,
                message: 'Hồ sơ Khong tồn tại'
            })
        }
    })

}
let Updateadropt_request = (params, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let adropt_request = await db.Adropt_request.findByPk(params.id)
            if (adropt_request) {
                await db.Adropt_request.update({
                  
                    request: data.request,
                   
                }, {
                    where: {
                        id: adropt_request.id
                    }
                })
                resData.errCode = 0;
                resData.errMessage = adropt_request
            }
            else {
                resData.errCode = 2;
                resData.errMessage = " adropt_request ko ton tai"
            }
            resolve(resData)
        } catch (error) {
            reject(error)
        }
    })
}
let getadropt_requesbydetailltid=(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { count, rows } = await db.Adropt_request.findAndCountAll({
                include: [

                    {
                        model: db.Children,
                        required: false,
                        as: 'children',
                        include: [
                            {
                                model: db.Center,
                                required: false,
                                as: 'center',
                            }
                        ]
                    },
                ],
                where: {
                    adropt_detail_id:id
                  },
            })
            let resData = {};
            resData.adropt_request = rows;
            resData.totalElements = count
            resolve(resData);
        } catch (error) {
            reject(error)
        }
    })
}
let Deleteadropt_reques=(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let adropt_request=await db.Adropt_request.findOne({
                where:{
                    id:id
                }
            })
            if(!adropt_request){
                resData.errCode = 1;
                resData.errMessage = "Không tồn tại  yeu cau  có id này";
            }
            else {
                adropt_request.destroy();
                resData.errCode = 0;
                resData.errMessage = "OK";
            }
            resolve(resData)
        } catch (error) {
            reject(error) 
        }
    })
}
let getadropt_requesbycenterid=(id,key,pageNumber , limit) => { return new Promise(async (resolve, reject) => {
    try {
        page = pageNumber - 0;
            limit = limit - 0;
            let offset = page * limit;
        const { count, rows } = await db.Adropt_request.findAndCountAll({
            include: [

                {
                    model: db.Children,
                    required: true,
                    as: 'children',
                    where: {
                        [Op.or]: [
                          { 'children.name': db.sequelize.where(db.sequelize.fn('LOWER', db.sequelize.col('children.name')), 'LIKE', '%' + key + '%') },
                        ],
                        center_id:id
                      },
                    
                },
                {
                    model: db.Adropt_detail,
                    required: false,
                    as: 'adropt_detail',
                    include: [
                        {
                            model: db.Account,
                            required: false,
                            as: 'account',
                            attributes: {
                                exclude: ['password', 'passwordResetToken', 'Token', 'active','email','createdAt','updatedAt']
                            },
                            include: {
                                model: db.Profile,
                                required: true,
                                as: 'profile',
                            }
                        },
        
                    ]
                },

            ],
            offset: offset,
            limit: limit,
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']]
           
        })
        let resData = {};
        resData.adropt_request = rows;
        resData.totalElements = count
        resData.limit = limit;
        resData.totalPages = Math.ceil(count / limit);
        resData.page = page;
        resolve(resData);
    } catch (error) {
        reject(error)
    }
})}
module.exports = {
    getadropt_requesbychildrentid: getadropt_requesbychildrentid,
    creatadropt_request: creatadropt_request,
    Updateadropt_request: Updateadropt_request,
    getadropt_requesbydetailltid:getadropt_requesbydetailltid,
    Deleteadropt_reques:Deleteadropt_reques,
    getadropt_requesbycenterid:getadropt_requesbycenterid

}
