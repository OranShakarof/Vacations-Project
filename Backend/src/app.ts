require("dotenv").config();
import express from "express";
import cors from "cors";
import vacationController from "./6-controllers/vacations-controller";
import authController from "./6-controllers/auth-controller";
import followersController from "./6-controllers/followers-controller"
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import expressRateLimit from "express-rate-limit";
import expressFileUpload from "express-fileupload";


const server = express();

// Rate limit: 
server.use(expressRateLimit({
    windowMs: 1000, // Time window.
    max: 500 // Max request allowed in that time window.
}));

// Enable cors
server.use(cors());

// Support request.body as JSON: 
server.use(express.json());

// Support file upload: 
server.use(expressFileUpload());

server.use("/api", vacationController,authController,followersController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log("Listening on http://localhost:" + appConfig.port));
