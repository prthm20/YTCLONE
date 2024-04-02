import cookieParser from "cookie-parser";
import cors from "cors"
import express from "express";
import multer from "multer"; 

const app=express();
import bodyParser from "body-parser";



app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));
app.use(express.json({}));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

//routes import
app.use(express.static('public'));
import {router} from "./routes/user.routes.js"
//routes declaration
app.use("/api/v1/users",router)
export{app}