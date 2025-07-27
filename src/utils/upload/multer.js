import { StatusCodes } from "http-status-codes";
import multer from "multer";
import { nanoid } from "nanoid";


export const uploadFile = () =>{


    const storage = multer.diskStorage({
        
        destination : 'uploads',

        filename:(req , file , cb) => {
            cb(null , `${nanoid()}_${file.originalname}`)       
        }
    });


    
    
    const upload = multer({storage});
    return upload
}