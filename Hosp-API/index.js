import express from "express";
import mongoose from "./db/index.js";
import routes from "./Routes/index.js";
import cors from "cors"


const app=express()
app.use(express.static("uploads"))

app.use(express.json())

app.use(cors())

app.use(routes)

app.use("*",(req,res)=>{
    res.status(404).send("Route Not Found")
})

app.listen(3000,()=>{
    console.log(" Port 3000 working")
}) 