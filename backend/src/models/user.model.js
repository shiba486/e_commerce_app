import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import validator from "validator"


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        min:[6,'name must be atleast 6 character'],
        max:[56,'name must be atleast 56 character'], 
        required: [true,'Please provide your emial'],
    },
    email:{
        type: String,
        required: [true,'Please provide your emial'],
        unique:true,
        index:true,
        trim:true,
        validate:[validator.isEmail,'Please provide a valid email']
    },
    password:{
        type: String,
        required: [true,'Please provide your pasword'],
        max:[256,'name must be atleast 256 character'], 
    },
    phone:{
        type: String,
        required: [true,'Please provide your Phone Number'],
    },
    address:{
        type: String,
        required: [true,'Please provide your address'],
    },
     isAdmin:{
         type: Boolean,
         default: false 
        }

},{timestamps:true,versionKey:false})

//password hashing
userSchema.pre("save",async function(next){
    if(!this.isModified('password')) return next

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

// checking password isCorrect
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password); 
} 

//generate access token
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            id: this._id,
            name:this.name,
            email:this.email
        }
,process.env.ACCESS_TOKEN_SECRET,
{expiresIn:process.env.ACCESS_TOKEN_EXPIRY}

)
}
//generate refresh token
userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            id: this._id,
           
        }
,process.env.REFRESH_TOKEN_SECRET,
{expiresIn:process.env.REFRESH_TOKEN_EXPIRY}

)

}

export const User = mongoose.model("User",userSchema)