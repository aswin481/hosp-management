import { Schema,model } from "mongoose";


const prescriptionSchema=Schema({
    patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient"
        
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    },
    prescription:{
        type:String
    },
    booking:{
        type:Schema.Types.ObjectId,
        ref:"Booking"
    },
    date:{
        type:Date,
        required:true,
        default:Date.now()
    },
    
    
    
    
    

})



const Prescription=model("Prescription",prescriptionSchema)

export default Prescription