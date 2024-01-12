import { Schema,model } from "mongoose";


const departmentSchema=Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    
    image:String,
    hod:String,
    

})



const Department=model("Department",departmentSchema)

export default Department