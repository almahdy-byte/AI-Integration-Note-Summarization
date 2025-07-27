import { Router } from "express";
import * as authService from "./auth.controller.js";
import { auth } from "../../middleware/auth.middleware.js";
import { uploadFile } from "../../utils/upload/multer.js";
import { validation } from "../../middleware/validation.middleware.js";
import * as authValidation from "./auth.validation.js";
const router = Router();

router.post(
    '/register' ,
    validation(authValidation.registerValidationSchema),
    authService.register
);

router.post(
    '/login' ,
    validation(authValidation.loginValidationSchema),
    authService.login
);  

router.post(
    '/forget-password' ,
    authService.forgetPassword
);
router.post(        
    '/reset-password' ,
    validation(authValidation.resetPasswordValidationSchema),
    authService.resetPassword
);

router.post(
    '/logout' ,
    validation(authValidation.loginValidationSchema),
    auth ,
    authService.logout 
)
router.patch(
    '/upload-profile-pic' ,
    auth ,
    uploadFile().single('image') ,
    authService.uploadProfilePic
)
export default router;