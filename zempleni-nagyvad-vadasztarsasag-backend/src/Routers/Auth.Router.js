import { Router } from "express";
import AuthController from "../Controllers/Auth.Controller.js";
import authMiddleware from "../middleware/authMiddleware.js";

const AuthRouter = Router();

AuthRouter.get("/profile", authMiddleware, AuthController.ProfileGetController);
AuthRouter.delete("/profile", authMiddleware, AuthController.ProfileDeleteController);
AuthRouter.post("/login", AuthController.LoginPostController);
AuthRouter.patch("/profile", authMiddleware, AuthController.ProfilePatchController);
AuthRouter.post("/register", AuthController.RegisterPostController);

export default AuthRouter;