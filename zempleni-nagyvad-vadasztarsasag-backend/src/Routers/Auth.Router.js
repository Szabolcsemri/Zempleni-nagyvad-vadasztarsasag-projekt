import { Router } from "express";
import AuthController from "../Controllers/Auth.Controller.js";

const AuthRouter = Router();

AuthRouter.get("/login", AuthController.LoginGetController);
AuthRouter.post("/login", AuthController.LoginPostController);
AuthRouter.get("/register", AuthController.RegisterGetController);
AuthRouter.post("/register", AuthController.RegisterPostController);

export default AuthRouter;