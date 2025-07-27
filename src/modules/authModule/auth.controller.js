import { StatusCodes } from "http-status-codes";
import { userModel } from "../../DB/models/user.model.js";
import { AppError } from "../../utils/error/appError.js";
import { Hash } from "../../utils/hash/hash.js";
import { asyncErrorHandler } from "../../utils/error/asyncErrorHandler.js";
import { Token } from "../../utils/token/token.js";
import { EmailEvents } from "../../utils/messages/sendEmail.js";
import { code } from "../../utils/messages/code.js";

export const register = asyncErrorHandler(
    
    async (req, res, next) => {

        const {userName , email , password} = req.body;

        const isEmailExist = await userModel.findOne({email});

        if(isEmailExist) {
            return next(new AppError("Email already exists", StatusCodes.BAD_REQUEST));
        }

        const newUser = await userModel.create({
            userName,
            email,
            password : Hash.hash(password)
        })

        if(!newUser) {
            return next(new AppError("Failed to create user", StatusCodes.INTERNAL_SERVER_ERROR));
        }

        return res.status(StatusCodes.CREATED).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                userName: newUser.userName,
                email: newUser.email
            }
        });
        
    }
);

export const login = asyncErrorHandler(
    async(req , res ,next)=>{
        const {email , password} = req.body;
        
        const user =await userModel.findOne({email});

        if(!user){
            return next(new AppError("User not found", StatusCodes.NOT_FOUND));
        }

        const isPasswordCorrect = Hash.compare(password , user.password);

        if(!isPasswordCorrect){
            return next(new AppError("Incorrect password", StatusCodes.BAD_REQUEST));
        }

        const token = await Token.generateToken({payload:{id:user._id}});
        
        return res
            .status(StatusCodes.OK)
            .json({
            message: "Login successful",
            token
            })

    }
);

export const uploadProfilePic = asyncErrorHandler(
    async(req , res , next) =>{
         
        const user = req.user;
        user.profilePic = req.file.path;
        await user.save();

        return res
            .status(StatusCodes.OK)
            .json({
                message: "Profile picture uploaded successfully",
                user : {
                    userName : user.userName,
                    profilePic : user.profilePic,
                    id : user._id,
                }
            })
        
    }
)
// logout




export const forgetPassword = asyncErrorHandler(
    async(req , res , next)=>{
        
        const user = req.user;

        const OTP =  code();
        
        user.OTP = Hash.hash(OTP);
        
        await user.save();
        
        EmailEvents.emit('ForgetPassword' , {
            email : user.email ,
            userName : user.userName ,  
            code : OTP
        });

        return res
            .status(StatusCodes.OK)
            .json({
                message: "OTP sent successfully check your email",
            })
    }
)

export const resetPassword = asyncErrorHandler(
    async(req , res ,next)=>{
        const {password , OTP} = req.body;
        const user = req.user;

        const isCorrectOTP = Hash.compare(OTP , user.OTP);

        if(!isCorrectOTP){
            return next(new AppError("Incorrect OTP", StatusCodes.BAD_REQUEST));
        }

        user.password = Hash.hash(password);

        user.OTP = null;

        await user.save();

        return res
            .status(StatusCodes.ACCEPTED)
            .json({
                message: "Password reset successfully",
            })
    }
)

export const logout = asyncErrorHandler(
  async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return next(new AppError("User not found", StatusCodes.NOT_FOUND));
    }

    const isPasswordCorrect = Hash.compare(password, user.password);

    
    if (!isPasswordCorrect) {
      return next(new AppError("Incorrect password", StatusCodes.BAD_REQUEST));
    }

    if(user.email !== req.user.email)
        return next (new AppError('You are not allowed to log out ' , StatusCodes.BAD_REQUEST))

    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return next(new AppError("No token provided", StatusCodes.UNAUTHORIZED));
    }

    const token = authorization.split(" ")[1];

    user.revokedTokens.push(token);
    await user.save();

    return res.status(StatusCodes.OK).json({
      message: "Logged out successfully",
    });
  }
);

