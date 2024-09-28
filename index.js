import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import route from "./userRoute/userRoute.js"

const app = express()
app.use(bodyParser.json());
dotenv.config();
const PORT = process.env.PORT || 3000 ;
const MONGOURL = process.env.MONGO_URL ;


mongoose.connect(MONGOURL) . then(()=>{
    console.log("database connect successfully")
    app.listen(PORT , ()=>{
        console.log("server is running on the port")
    })
}).catch((error)=>{
    console.log(error)
})


app.use("/api/user" , route);


