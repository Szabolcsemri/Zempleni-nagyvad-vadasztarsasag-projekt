import { Router } from "express";
import AuthController from "../Controllers/Auth.Controller.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const AuthRouter = Router();

AuthRouter.post("/login", AuthController.LoginPostController);
AuthRouter.post("/register", AuthController.RegisterPostController);
AuthRouter.patch("/profile", authMiddleware, AuthController.ProfilePatchController);
AuthRouter.get("/profile", authMiddleware, AuthController.ProfileGetController);
AuthRouter.delete("/profile", authMiddleware, AuthController.ProfileDeleteController);

AuthRouter.get("/profile/felhasznalok", authMiddleware, adminMiddleware, AuthController.ProfileGetAdminController);
AuthRouter.delete("/profile/felhasznalok/:id", authMiddleware, adminMiddleware, AuthController.ProfileDeleteAdminController);

export default AuthRouter;