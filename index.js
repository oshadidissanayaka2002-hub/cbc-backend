import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Student from './models/student.js';
import studentRouter from './routes/studentRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";


const app = express();

const mongoUrl = "mongodb+srv://admin:123@cluster0.zetegt1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoUrl,{})

const connection = mongoose.connection;

connection.once("open",()=>{
    console.log("Database connected");
})

app.use(bodyParser.json())

app.use(
    (req,res,next)=>{
        const token = req.header("Authorization")?.replace("Bearer ","") 
        console.log(token)

        if(token != null){
            jwt.verify(token,"cbc-secret-key-7973" , (error,decoded)=>{
                if(!error){
                    
                    req.user = decoded
                }
            })
        }

        next()
    }
)

app.use("/api/students",studentRouter)
app.use("/api/products",productRouter)
app.use("/api/users",userRouter)

app.listen(
    3000,
    ()=>{
        console.log('Server is running on port 3000');
    }
)