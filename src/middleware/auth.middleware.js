import { asyncErrorHandler } from "../utils/error/asyncErrorHandler.js";
import { Token } from "../utils/token/token.js";
import { StatusCodes } from "http-status-codes";

/**
 * Authentication middleware for REST API endpoints
 * 
 * @description Verifies the JWT token from the Authorization header and attaches the user to the request object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * @returns {void}
 */
export const auth = asyncErrorHandler(
    async(req , res ,next)=>{

        const authorization = req.headers['authorization'];

        const user = await Token.decodeToken(authorization);

        req.user = user;
        
        next();
    }
)

/**
 * Authentication middleware for GraphQL queries
 * 
 * @description Verifies the JWT token from the authorization context and returns the authenticated user
 * @param {string} authorization - The authorization header containing the JWT token
 * @returns {Object} The authenticated user object
 * @throws {Error} If user is not found or token is invalid
 */
export const authGraphql = async(authorization)=>{

    const user = await Token.decodeTokenGraphQl(authorization);
    
    if(!user) throw new Error('user not found' , {cause:StatusCodes.NOT_FOUND});
    return user;
}
