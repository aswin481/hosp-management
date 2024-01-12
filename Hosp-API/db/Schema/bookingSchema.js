import { Schema,model } from "mongoose";


const bookingSchema=Schema({
    patient:{
        type:Schema.Types.ObjectId,
        ref:"Patient"
        
    },
    doctor:{
        type:Schema.Types.ObjectId,
        ref:"Doctor"
    },
    problem:{
        type:String,
        
    },
   
    
    token:{
        type:Number,
        max:50
    },

    
    
    
    

})



const Booking=model("Booking",bookingSchema)

export default Booking