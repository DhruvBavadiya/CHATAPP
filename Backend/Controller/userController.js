const User = require("../Model/Usermodel")
const bcrypt = require("bcrypt");

module.exports.register = async (req,res,next)=>{
    try{
        const {name,email,password}= req.body;
        const nameCheck = await User.findOne({name})
        if(nameCheck)
            return res.json({msg:"User Name is already used",status:false});
        
        const emailCheck = await User.findOne({email})
        if(emailCheck)
        return res.json({msg:"email is already used",status:false});

        const Hashpassword = await bcrypt.hash(password,10);
        const user = await User.create({
            email,
            name,
            password:Hashpassword,
        })
        delete user.password;
        return res.json({status:true,user});
    }
    catch(ex){
        next(ex);
    }
}
module.exports.login = async (req,res,next)=>{
    try{
        const {name,password}= req.body;
        const user = await User.findOne({name})
        if(!user)
        return res.json({msg:"Incorrect username ",status:false});
        
        const isPassvalid = await bcrypt.compare(password,user.password)
        if(!isPassvalid)
        return res.json({msg:"Incorrect password ",status:false});
        delete user.password
        return res.json({status:true,user});
    }
    catch(ex){
        next(ex);
    }
}
module.exports.setAvatar = async (req,res,next)=>{
    try{
        const userId = req.params.id;
        const avatarImage = req.body.image;
        const userData = await User.findByIdAndUpdate(userId,{
            isAvatarImageSet:true,
            avatarImage
        });
        return res.json({
            isSet:userData.isAvatarImageSet,
            image:userData.avatarImage
        });
    }
    catch(ex){
        next(ex);
    }
}
module.exports.alluser = async (req,res,next)=>{

        try {
            const users = await User.find({_id:{$ne:req.params.id}}).select([
                "email",
                "name",
                "avatarImage",
                "_id"
            ]);
            return res.json(users);
        } catch (ex) {
            next(ex)
        }


}
