import Joi from "joi";
import { generalValidationSchema } from "../../middleware/validation.middleware.js";

export const createNoteValidationSchema = Joi.object({
    title : generalValidationSchema.title.required(),
    body : generalValidationSchema.body.required()
})

export const noteIdValidation = Joi.object({
    noteId : generalValidationSchema.id.required()
})