import { NextFunction, Request, Response } from "express";
import appConfig from "../2-utils/app-config";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    // Display error: 
    console.log(err);

    // Find status code: 
    const statusCode = err.status || 500; // Short Circuit

    const isCrash = statusCode >= 500 && statusCode <= 599;

    // Crash in production - return some general error:
    const message = isCrash && appConfig.isProduction ? "Some error, please try again." : err.message;

    // Send back error details to frontend:
    response.status(statusCode).send(message);
}

export default catchAll;
