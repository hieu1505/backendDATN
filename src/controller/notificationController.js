const notificationService=require('../service/notificationService')
let GetNotificationForUserByAccountId = async(req, res) => {
    let id = req.params.id;
    if(!id) {
        return res.status(400).json({
            errCode: "1",
            errMessage: "Thiếu tham số id"
        })
    }
    let notification = await notificationService.GetNotificationForUserByAccountId(id);
    return res.status(200).json({message: notification});
}
module.exports = {
    
    GetNotificationForUserByAccountId:GetNotificationForUserByAccountId
}