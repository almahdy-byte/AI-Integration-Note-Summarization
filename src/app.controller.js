import { connectDB } from "./DB/connect.js";
import { globalErrorHandler } from "./utils/error/globalErrorHandler.js";
import authRouter from "./modules/authModule/auth.router.js";
import notesRouter from "./modules/notesModule/notes.router.js";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./graphql.js";
import cors from 'cors'
import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const bootstrap =async(app , express)  => {

    app.use(cors({
    origin:'*'
    }))

    app.use(rateLimit({
        limit : 3,
        message : 'to many requests , please try again later',
        skipSuccessfulRequests : true,
        handler:(req , res , next , options)=>{
            return next(new Error(options.message , {cause : StatusCodes.TOO_MANY_REQUESTS}))
        }

    }))

    app.use(helmet({
        xPoweredBy:false
    }))


    app.use(express.json());
    app.use('/uploads' , express.static('uploads'))
    await connectDB();
    //routers
    app.use('/' , authRouter)
    app.use('/notes' , notesRouter)
    app.use('/graphql' , createHandler({schema,
        graphiql: true,
        context:function(req){
            const authorization = req.headers.authorization || " ";
            return {authorization}
        }
    }))
   app.use(globalErrorHandler)
}