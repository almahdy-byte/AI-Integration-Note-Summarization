import { StatusCodes } from "http-status-codes"

export const globalErrorHandler = (err, req, res, next) => {
    return res.
    status(err.statusCode || StatusCodes.BAD_REQUEST).
    json({
        message : err.message || "Internal Server Error",
        statusCode : err.statusCode || StatusCodes.BAD_REQUEST,
        stack: err.stack || "No stack available",
    })
}