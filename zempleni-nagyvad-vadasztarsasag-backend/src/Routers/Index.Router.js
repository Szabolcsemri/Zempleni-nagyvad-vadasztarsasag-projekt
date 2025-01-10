import { Router } from "express";
import IndexController from "../Controllers/Index.Controller.js";

const IndexRouter = Router();

IndexRouter.get("/", IndexController.IndexGetController);

export default IndexRouter;