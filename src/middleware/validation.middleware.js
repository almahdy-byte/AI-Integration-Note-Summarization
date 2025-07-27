import { StatusCodes } from "http-status-codes";
import { AppError} from '../utils/error/appError.js'
import Joi from "joi";
import { Types } from "mongoose";

export const validation = (schema)=>{
    return (req,res,next)=>{
        const data = {
            ...req.body,
            ...req.params,
            ...req.query    
        }
        
        const result = schema.validate(data);
        let errors = [];
        if(result.error){
            errors.push(result.error.details[0].message)
            return next(new AppError(errors) ,StatusCodes.BAD_REQUEST)  
        }
        next();
}
}

const idValidation =(id)=>{
    return Types.ObjectId.isValid(id) ? true : helper.message = "Invalid ID";
}


export const generalValidationSchema = {
    userName : Joi.string(),
    email : Joi.string().email(),
    password : Joi.string().min(6),
    OTP : Joi.string().length(6),
    title:Joi.string(),
    body:Joi.string(),
   id:Joi.custom(idValidation)
}




export const validationGraphql = (args)=>{
return ()=>{
  const graphqlArgsSchema = Joi.object({

    noteId:Joi.custom(idValidation),
    title: Joi.string(),
    fromDate: Joi.string().isoDate(),
    toDate: Joi.string().isoDate(),
    skip: Joi.number().integer().min(0),
    limit: Joi.number().integer().min(1),
});

    const data = {
    ...args
    }
    const result = graphqlArgsSchema.validate(data); 
    let errors = [];
    if(result.error){
        errors.push(result.error.details[0].message)
        throw new AppError((errors) , StatusCodes.BAD_REQUEST)
    }
    return
}
}