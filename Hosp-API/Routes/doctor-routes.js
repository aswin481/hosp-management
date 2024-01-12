import express from "express"
import Doctor from "../db/Schema/doctorSchema.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import Booking from "../db/Schema/bookingSchema.js"
import Prescription from "../db/Schema/prescriptionSchema.js"


const router=express.Router()


router.post("/doctor/signup",async(req,res)=>{
    try{
    const body =req.body

    const doctor=await Doctor.findOne({username:body.username})
    if(doctor){
       return res.status(403).json({message:"Username already taken"})
    }
    if(body.password!= body.confirmpassword){
       return res.status(403).json({message:"Password dont match"})
    }
    const hashedPassword=await bcrypt.hash(body.password,2)
   body.password=hashedPassword
  
   const doc=await Doctor.create(body) 

   res.status(201).json({message:"Doctor SignedUp Succesfully"})


    
    }

    catch(e){
        res.status(500).json({error:e.message})
    }

})


router.post("/doctor/login",async(req,res)=>{
    try{
        const body =req.body
        const doctor=await Doctor.findOne({username:body.username})
        if(!doctor){
            res.status(401).json({message:"Username or Password Incorrect"})
        }
        const isMatching=await bcrypt.compare(body.password,doctor.password)
        if(!isMatching){
            res.status(401).json({message:"Username or Password Incorrect"})
        }

        const token=jwt.sign({id:doctor._id, role:'DOCTOR'},"uyuyfututdtesuytthjgghgyrdyrd@789",{expiresIn:"7d"})

        res.status(200).json({message:"Login Sucess",token:token,id:doctor._id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})
router.get("/doctor/patient/department/:id",async(req,res)=>{
    try {
       const id= req.params.id
        const doctors= await Doctor.find({department:id})
        res.status(200).json(doctors)
    } catch (e) {
        res.status(500).json({error:e.message})
    }
})

router.get("/doctor/patient/:id",async(req,res)=>{
    try {
       const id= req.params.id
        const patients= await Booking.find({doctor:id}).populate("patient")
        
        res.status(200).json(patients)
    } catch (e) {
        res.status(500).json({error:e.message})
    }
})

router.post("/doctor/add-prescription",async(req,res)=>{
    try {
       console.log(req.body)
       await Prescription.create(req.body)
      return  res.status(200).json({message:"Prescription added"})
    } catch (e) {
       return res.status(500).json({error:e.message})
    }
})
router.get("/doctor/booking/:id",async(req,res)=>{
    try {
        const id=req.params.id
        
       
      const bookings= await Booking.findById(id)
        res.status(200).json(bookings)
    } catch (e) {
       return res.status(500).json({error:e.message})
    }
})
router.get("/doctor/:id",async(req,res)=>{
    try {
        const id=req.params.id
        
       
      const doc= await Doctor.findById(id)
        res.status(200).json(doc)
        
    } catch (e) {
       return res.status(500).json({error:e.message})
    }
})




export default router