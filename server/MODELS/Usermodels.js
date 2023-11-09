const mongoose = require ('mongoose')
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    passsword:String,
    role:{
        type:String,
        default:"user"
    }
})

const UserModel = mongoose.model("userlist",userSchema)
module.exports=UserModel
