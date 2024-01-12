import mongoose from "mongoose";


mongoose.connect("mongodb://localhost:27017/hospital")
.then(()=>{
    console.log("db connected")
})
    .catch(e=>{
        console.log(e.messsage)
    })


export default mongoose