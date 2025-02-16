import { Router } from "express";
import VadaszatokController from "../Controllers/Vadaszatok.Controller.js";

const VadaszatokRouter = Router();

VadaszatokRouter.get("/", VadaszatokController.VadaszatokGetController);

export default VadaszatokRouter;