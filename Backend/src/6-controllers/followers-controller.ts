import express, { NextFunction, Request, Response } from "express";
import FollowModel from "../3-models/follow-model";
import StatusCode from "../3-models/status-code";
import verifyToken from "../4-middleware/verify-token";
import followersService from "../5-services/followers-service";

const router = express.Router();

router.get("/followers", verifyToken , async (request: Request, response: Response, next: NextFunction) => {
    try {
        
        // Get the vacations from the database:
        const followers = await followersService.getFollowers();
        
        // Response back all vacation:
        response.json(followers);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/followers", verifyToken ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Get vacation send from the frontend: 
        const follow = new FollowModel(request.body);
        
        // Add the vacation to database:
        const addedFollow = await followersService.addFollow(follow);
        
        // Response back the added vacation:
        response.status(StatusCode.Created).json(addedFollow);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/followers/:userId&:vacationId", verifyToken ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Get route id: 
        const userId = +request.params.userId;
        const vacationIdId = +request.params.vacationId;
        
        // Delete follow from database:
        await followersService.deleteFollow(userId,vacationIdId);
        
        // Response back the updated vacation:
        response.sendStatus(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});

export default router;