const mongoose=require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        min:3,
        max:20
    },
    email:{
        type: String,
        required: true,
        unique:true
        ,max:50
    },
    password:{
        type: String,
        required: true,
        min:8,
        max:28
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    }
});

module.exports = mongoose.model('Users',UserSchema);
