import express from "express"
import Patient from "../db/Schema/patientSchema.js"
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"
import Booking from "../db/Schema/bookingSchema.js"
import Doctor from "../db/Schema/doctorSchema.js"
import Department from "../db/Schema/departmentSchema.js"
import Prescription from "../db/Schema/prescriptionSchema.js"


const router=express.Router()
router.get("/patient",async(req,res)=>{
    try{
        
    const patient=await Patient.find()
    res.status(200).json(patient)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})


router.post("/patient/signup",async(req,res)=>{
    try{
    const body =req.body

    const patient=await Patient.findOne({username:body.username})
    if(patient){
       return res.status(403).json({message:"Username already taken"})
    }
    if(body.password!= body.confirmpassword){
       return res.status(403).json({message:"Password dont match"})
    }
    const hashedPassword=await bcrypt.hash(body.password,2)
   body.password=hashedPassword
  
   const pat=await Patient.create(body) 

   res.status(201).json({message:"Patient SignedUp Succesfully"})


    
    }

    catch(e){
        res.status(500).json({error:e.message})
    }

})

router.post("/patient/login",async(req,res)=>{
    try{
        const body =req.body
        const patient=await Patient.findOne({username:body.username})
        if(!patient){
            res.status(401).json({message:"Username or Password Incorrect"})
        }
        const isMatching=await bcrypt.compare(body.password,patient.password)
        if(!isMatching){
            res.status(401).json({message:"Username or Password Incorrect"})
        }

        const token=jwt.sign({id:patient._id, role:'PATIENT'},"uyuyfututdtesuytthjgghgyrdyrd@78",{expiresIn:"7d"})

        res.status(200).json({message:"Login Sucess",token:token,id:patient._id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})

router.get("/patient/department",async(req,res)=>{
    try{
    const departmentData=await Department.find()
    res.status(200).json(departmentData)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})

router.get("/patient/department/doctor/:dep_id",async(req,res)=>{
    try{
        const dep_id=req.params.dep_id
    const doctors=await Doctor.find({department:dep_id})
    res.status(200).json(doctors)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})

router.get("/patient/doctor/:doc_id",async(req,res)=>{
    try{
        const doc_id=req.params.doc_id
    const doctor=await Doctor.findById(doc_id)
    res.status(200).json(doctor)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})

router.post("/patient/book/doctor",async(req,res)=>{
    try{
        const body=req.body
        const bookings=await Booking.find({date:body.date,doctor:body.doctor})
        body.token=bookings.length+1
        
    await Booking.create(body)
    res.status(200).json({message:"Your booking added"})

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})


router.get("/patient/bookings/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const bookings=await Booking.find({patient:id})
        
        
    
    res.status(200).json(bookings)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})
router.get("/patient/:id",async(req,res)=>{
    try{
        const id=req.params.id
        const bookings=await Patient.findById(id)
        
        
    
    res.status(200).json(bookings)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})
router.delete("/patients/:id",async(req,res)=>{
    try{
        
        const id=req.params.id
        const patients=await Patient.findByIdAndDelete(id)
        console.log("deleted")
        
        
        
    
    res.status(200).json(patients)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})

router.post("/booking/confirm",async(req,res)=>{
    try{
        const id1=req.params.id
       
        // const {id}= req.body
        // console.log(req.body)
          await  Booking.create(req.body)
            
          
          
          
        
       
        
       
        
        
    
    res.status(200).json("created")

    }

    catch(e){
        
        res.status(500).json({error:e.message})

    }

})
router.get("/patient/prescription/:id",async(req,res)=>{
    try{
        const id=req.params.id
       
       
         const result= await  Prescription.findById({booking:id})
         console.log(result)
         
            
          
        res.status(200).json(result)

    }

    catch(e){
        
        res.status(500).json({error:e.message})

    }

})



export default router