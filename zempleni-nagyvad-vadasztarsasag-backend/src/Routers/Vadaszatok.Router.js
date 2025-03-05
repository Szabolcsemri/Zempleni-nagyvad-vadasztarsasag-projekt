import { Router } from "express";
import VadaszatokController from "../Controllers/Vadaszatok.Controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware  from "../middleware/adminMiddleware.js";

const VadaszatokRouter = Router();

VadaszatokRouter.get("/", VadaszatokController.VadaszatokGetController);
VadaszatokRouter.post("/", authMiddleware, VadaszatokController.VadaszatPostController);
VadaszatokRouter.get("/:id/csatlakozas", authMiddleware, VadaszatokController.VadaszatCsatlakozasGetController);
VadaszatokRouter.post("/:id/csatlakozas", authMiddleware, VadaszatokController.VadaszatCsatlakozasPostController);
VadaszatokRouter.delete("/:id/csatlakozas", authMiddleware, VadaszatokController.VadaszatLecsatlakozasDeleteController);
VadaszatokRouter.delete("/:id", authMiddleware, adminMiddleware, VadaszatokController.VadaszatAdminDeleteController);

export default VadaszatokRouter;