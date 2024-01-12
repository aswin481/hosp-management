import { Schema,model } from "mongoose";


const doctorSchema=Schema({
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
    department:{
        type:Schema.Types.ObjectId,
        ref:"Department"
    },
    qualification:{
        type:String,
        required:true,
    }
    

})



const Doctor=model("Doctor",doctorSchema)

export default Doctor