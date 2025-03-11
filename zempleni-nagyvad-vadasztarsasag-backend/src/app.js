import express from "express";
import AuthRouter from "./Routers/Auth.Router.js";
import VadaszatokRouter from "./Routers/Vadaszatok.Router.js";
import sequelize from "./db.js";
import kapcsolatok from "../models/Kapcsolatok.js";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:4200", credentials: true}));

app.use(express.urlencoded({ extended : false}));

app.use("/", AuthRouter);
app.use("/vadaszatok", VadaszatokRouter);

(async () => {
    try{
        await sequelize.sync({alter: true});
        kapcsolatok();
        await sequelize.authenticate();
        console.log('Sikeresen csatalkoztál az adatbázishoz!');
    }catch (error){
        console.error('Nem sikerült csatlakozni az adatbázishoz:', error);
    }
})();

app.listen(PORT, () => {
    console.log(`A backend elindult a http://localhost:${PORT}/ URL-en!`);
});