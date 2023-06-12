let GetNotificationForUserByAccountId=(id) => {
    return new Promise(async (resolve, reject) => {
        try {
            let notification = await db.Notification.findAll({
                order: [
                    ['id', 'DESC']
                ],
                where:{
                    account_id:id
                }
            })
            resolve(notification);
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    
    GetNotificationForUserByAccountId:GetNotificationForUserByAccountId
}