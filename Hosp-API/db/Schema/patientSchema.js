import { Schema,model } from "mongoose";


const patientSchema=Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    
    
    image:String,
    address:{
        type:String,
       required:true
    },
    // dob:{
    //     type:Date,
    //     required:true,
    // }
    

})



const Patient=model("Patient",patientSchema)

export default Patient