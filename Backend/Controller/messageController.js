const MessageModel = require("../Model/MessageModel");

module.exports.Addmessage = async (req,res,next)=>{
    try {
        const {from,to,message} = req.body;
        const data = MessageModel.create({
            message:{text:message},
            users : [from,to],
            sender:from,
        });
        if (data) return res.json({msg : "success message"})
        return res.json({msg : "faild message"})
    } catch (ex) {
        next(ex);
    }
}
module.exports.getAllmessage = async (req,res,next)=>{
    try {
        const {from,to} = req.body;
        const messages = await MessageModel.find({
            users:{
                $all:[from,to],
            },
        }).sort({updatedAt : 1});
        const projectMessages = messages.map((msg)=>{
            return{
            fromSelf : msg.sender.toString()===from,
            message:msg.message.text
            };
        });
        res.json(projectMessages)
    } catch (ex) {
        next(ex);
    }

};