import jwt from "jsonwebtoken";
import { userModel } from "../../DB/models/user.model.js";
import { AppError } from "../error/appError.js";
import { StatusCodes } from "http-status-codes";

export const Token = {

    //sign token
    sign:({payload = {} , signature = "" , options ={} }) =>
        jwt.sign(payload, signature , options),

    //verify token
    verify:({token = "" , signature = "" }) =>
        jwt.verify(token, signature ),

    //generate token  
    generateToken:({payload = {} ,   options ={expiresIn : "1h"} }) =>
        Token.sign({payload, signature : process.env.JWT_SECRET , options}),

    //decode token
    decodeToken:async(authorization = "") =>{

        if(!authorization){
            throw new AppError("Authorization header is required" , StatusCodes.UNAUTHORIZED);
        }
        const parts = authorization.split(" ")

        if(parts.length !== 2){
            throw new AppError("Invalid token format" , StatusCodes.UNAUTHORIZED);
        }
        
        const [bearer , token] = parts;

        if(!bearer || !token || bearer !== 'Bearer'){
            throw new AppError("Invalid token format" , StatusCodes.UNAUTHORIZED);
        }

        const decode = Token.verify({token, signature : process.env.JWT_SECRET });

        try {
            
            const user = await userModel.findById(decode.id)

            if(!user){
                throw new AppError("User not found" , StatusCodes.NOT_FOUND);
            }

            if(user.revokedTokens.includes(token)){
                throw new AppError('token revoked' , StatusCodes.UNAUTHORIZED)
            }
            return user

        } catch (error) {
            throw new AppError(error.message || "Invalid token" , StatusCodes.UNAUTHORIZED);
        }
    },

    decodeTokenGraphQl:async(authorization  )=>{
        
        if(!authorization)
            throw new Error('please send authorization' , {cause:StatusCodes.BAD_REQUEST});
        
        const parts = authorization.split(" ");
        if(parts.length !==2)
            throw new Error('in-valid authorization' , {cause:StatusCodes.BAD_REQUEST});
        
        const [bearer, token] = parts;
        
        if(!bearer || !token || bearer !== 'Bearer'){
            throw new AppError("Invalid token format" , StatusCodes.UNAUTHORIZED);
        }
        try {
            const decoded = await Token.verify({token , signature : process.env.JWT_SECRET})         

            const user =await userModel.findById(decoded.id)
            if (!user) 
                throw new Error('Invalid token');

            if(user.revokedTokens.includes(token)){
                throw new AppError('token revoked' , StatusCodes.UNAUTHORIZED)
            }

            return user;
            
        } catch (error) {
            throw new AppError('Token verification failed', StatusCodes.BAD_REQUEST);
        }
    }
}