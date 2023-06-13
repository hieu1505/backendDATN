
let getlistproofsbyid=(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { count, rows } = await db.Proofs.findAndCountAll({
                where: {
                    
                    center_id:id
                  },
            })
            let resData = {};
            resData.proofs = rows;
            resData.totalElements = count
            resolve(resData);
        } catch (error) {
            reject(error)
        }
    })
}
let createproofs=async (id, data) => {
    return new Promise(  async (resolve, reject) => {
        try {
           let proofs=await db.Proofs.create({
            Link:data.image,
            adropt_detail_id:id

           })
           resolve({
            errCode: 0,
            message: proofs
        });
        } catch (error) {
            reject(error)
        }
       
    })
}
let Deleteproofs=(id)=>{
    return new Promise(async (resolve, reject) => {
        try {
            let resData = {};
            let proofs=await db.Proofs.findOne({
                where:{
                    id:id
                }
            })
            if(!proofs){
                resData.errCode = 1;
                resData.errMessage = "Không tồn tại  tre  có id này";
            }
            else {
                proofs.destroy();
                resData.errCode = 0;
                resData.errMessage = "OK";
            }
            resolve(resData)
        } catch (error) {
           reject(error) 
        }
    })
}
module.exports={
    getlistproofsbyid:getlistproofsbyid,
    createproofs:createproofs,
    Deleteproofs:Deleteproofs
    
}