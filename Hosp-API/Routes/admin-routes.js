import express from "express";
import Pharmacy from "../db/Schema/pharmacySchema.js";
import Department from "../db/Schema/departmentSchema.js";
import checkToken from "../middleware/checkToken.js";
import Admin from "../db/Schema/Adminroute.js";
import bcrypt from "bcrypt"
import jwt  from "jsonwebtoken"


const router=express.Router()
router.post("/admin/signup",async(req,res)=>{
    try{
    const body =req.body

    const admin=await Admin.findOne({username:body.username})
    if(admin){
       return res.status(403).json({message:"Username already taken"})
    }
    if(body.password!= body.confirmpassword){
       return res.status(403).json({message:"Password dont match"})
    }
    const hashedPassword=await bcrypt.hash(body.password,2)
   body.password=hashedPassword
  
   const doc=await Admin.create(body) 

   res.status(201).json({message:"Admin SignedUp Succesfully"})


    
    }

    catch(e){
        res.status(500).json({error:e.message})
    }

})
router.post("/admin/login",async(req,res)=>{
    try{
        const body =req.body
        const admin=await Admin.findOne({username:body.username})
       
        if(!admin){
            res.status(401).json({message:"Username or Password Incorrect"})
        }
        const isMatching=await bcrypt.compare(body.password,admin.password)
        if(!isMatching){
            res.status(401).json({message:"Username or Password Incorrect"})
        }

        const token=jwt.sign({id:admin._id, role:'ADMIN'},"uyuyfututdtesuytthjgghgyrdyrd@78",{expiresIn:"7d"})

        res.status(200).json({message:"Login Sucess",token:token,id:admin._id})
    }
    catch(e){
        res.status(500).json({error:e.message})
    }
})


//department routes

router.post("/department",async(req,res)=>{
    try{
        await Department.create(req.body)
        res.status(201).json({message:"Department added succesfully"})

    }
    catch(e){
        res.status(500).json({error:e.message})
    }

})      

router.get("/department",async(req,res)=>{
    try{
    const departmentData=await Department.find()
    res.status(200).json(departmentData)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})


//pharmacy routes

router.post("/pharmacy",async(req,res)=>{
    try{
        await Pharmacy.create(req.body)
        res.status(201).json({message:"Medicine added succesfully"})

    }
    catch(e){
        res.status(500).json({error:e.message})
    }

})


router.get("/pharmacy",(req,res,next)=>checkToken(req,res,next,"DOCTOR"),async(req,res)=>{
    try{
    const pharmacyData=await Pharmacy.find().populate("department")
    res.status(200).json(pharmacyData)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})




router.get("/pharmacy/:id",async(req,res)=>{

    const id=req.params.id
    try{
    const pharmacyData=await Pharmacy.findById(id)
    res.status(200).json(pharmacyData)

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})



router.delete("/pharmacy/:id",async(req,res)=>{

    const id=req.params.id
    try{
    await Pharmacy.findByIdAndDelete(id)
    res.status(200).json({message:"Pharmacy deleted succesfully"})

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})




router.patch("/pharmacy/:id",async(req,res)=>{

    const id=req.params.id
    const updateData=req.body
    try{
    await Pharmacy.findByIdAndUpdate(id,updateData)
    res.status(200).json({message:"Pharmacy updated succesfully"})

    }

    catch(e){
        res.status(500).json({error:e.message})

    }

})





export default router
