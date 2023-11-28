import express, { Request, Response, NextFunction } from "express";
import vacationsService from "../5-services/vacations-service";
import VacationModel from "../3-models/vacation-model";
import StatusCode from "../3-models/status-code";
import verifyToken from "../4-middleware/verify-token";
import verifyAdmin from "../4-middleware/verify-admin";
import path from "path";

const router = express.Router();

router.get("/vacations-by-user/:userId([0-9]+)", verifyToken , async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get route userId:
        const userId = +request.params.userId;
        
        // Get the vacations from the database:
        const vacations = await vacationsService.getVacationsByUser(userId);
        
        // Response back all vacation:
        response.json(vacations);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/:vacationId([0-9]+)", verifyToken , async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get route vacationId:
        const vacationId = +request.params.vacationId;
        
        // Get the vacation from the database:
        const vacation = await vacationsService.getOneVacation(vacationId);
        
        // Response back the vacation:
        response.json(vacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/vacations",verifyAdmin,async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Add image from request.files into request body: 
        request.body.image = request.files.image;
        
        // Get vacation send from the frontend: 
        const vacation = new VacationModel(request.body);
        
        // Add the vacation to database:
        const addedVacation = await vacationsService.addVacation(vacation);
        
        // Response back the added vacation:
        response.status(StatusCode.Created).json(addedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.put("/vacations/:vacationId([0-9]+)",verifyAdmin ,async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Extract route id into body: 
        request.body.vacationId = +request.params.vacationId;

        // Add image from request.files into request body: 
        request.body.image = request.files?.image;

        // Get the vacation sent from the frontend: 
        const vacation = new VacationModel(request.body);

        // Update vacation to database: 
        const updatedVacation = await vacationsService.updateVacation(vacation);

        // Response back the updated vacation:
        response.json(updatedVacation);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/vacations/:vacationId([0-9]+)",verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        // Get route vacationId: 
        const vacationId = +request.params.vacationId;

        // Delete vacation from database: 
        await vacationsService.deleteVacation(vacationId);

        // Response back the updated vacation:
        response.status(StatusCode.NoContent);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/vacations/:image", async (request: Request, response: Response, next: NextFunction) => {
    try {

        // Get image name:
        const image = request.params.image;
        
        // Get image absolute path: 
        const absolutePath = path.join(__dirname, "..", "1-assets", "images", image);
        
        // Response back the image file:
        response.sendFile(absolutePath);
    }
    catch(err: any) {
        next(err);
    }
});


export default router;
