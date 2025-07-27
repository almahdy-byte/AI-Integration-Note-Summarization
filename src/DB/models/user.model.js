import { Schema , model} from "mongoose";

const userSchema = new Schema({
    userName:{
        type: String,
        required: true,
    } ,

    email:{
        type: String,
        required: true,
        unique: true,
    },

    password:{
        type: String,
        required: true,
    } ,

    profilePic:{
        type:String
    },

    OTP:{
        type: String,
    },

    
    revokedTokens:[{
        type :String
    }]
})

export const userModel = model('User' , userSchema)


