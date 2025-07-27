import Joi from "joi";
import { generalValidationSchema } from "../../middleware/validation.middleware.js";

export const registerValidationSchema = Joi.object({
    userName:generalValidationSchema.userName.required(),
    email:generalValidationSchema.email.required(),
    password:generalValidationSchema.password.required()
})

export const loginValidationSchema = Joi.object({
    email:generalValidationSchema.email.required(),
    password:generalValidationSchema.password.required()
})

export const resetPasswordValidationSchema = Joi.object({
    password:generalValidationSchema.password.required(),
    OTP : generalValidationSchema.OTP.required()
})