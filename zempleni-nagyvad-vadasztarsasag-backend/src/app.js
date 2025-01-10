import express from "express";
import session from "express-session";
import AuthRouter from "./Routers/Auth.Router.js";
import IndexRouter from "./Routers/Index.Router.js";
import sequelize from "./db.js";
import cors from "cors";

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(cors({origin: "http://localhost:4200", credentials: true}));

app.use(session({
    secret: 'kulcs',
    resave: false,
    saveUninitialized: true
}));

app.use(express.urlencoded({ extended : false}));

app.use("/", AuthRouter);

(async () => {
    try{
        await sequelize.authenticate();
        console.log('Sikeresen csatalkoztál az adatbázishoz!');
    }catch (error){
        console.error('Nem sikerült csatlakozni az adatbázishoz:', error);
    }
})();

app.listen(PORT, () => {
    console.log(`A backend elindult a http://localhost:${PORT}/ URL-en!`);
});