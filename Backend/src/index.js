import dotenv from "dotenv"
//require("dotenv").config({path:"./"});
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.configDotenv({path:"./.env"})

connectDB().then(()=>{
     app.listen(process.env.PORT,()=>{
     console.log("Server is running")
    })
})
.catch(
(err)=>{
      console.log("error")
}
)