import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { nanoid } from "nanoid";

/**
 * @function uploadFile
 * @description Creates and configures a multer middleware for file uploads
 * @returns {Object} Configured multer middleware for handling file uploads
 */
export const uploadFile = () =>{

    /**
     * Configure disk storage for uploaded files
     * @type {Object}
     */
    const storage = multer.diskStorage({
        
        destination : 'uploads',

        filename:(req , file , cb) => {
            cb(null , `${nanoid()}_${file.originalname}`)       
        }
    });


    
    
    /**
     * Create multer instance with configured storage
     * @type {Object}
     */
    const upload = multer({storage});
    return upload
}