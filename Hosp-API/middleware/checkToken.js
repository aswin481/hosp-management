import jwt from "jsonwebtoken"
const checkToken=(req,res,next,role)=>{
    try{
         const token=req.headers.authorization
         if(!token){
           return res.status(403).json({message:"You r not authorized"})
         }
         const ogToken=token.split(" ")[1]
        const isValid=jwt.verify(ogToken,"uyuyfututdtesuytthjgghgyrdyrd@789")
       if(isValid.role==role){
        next()
       }
       else{
        return res.status(403).json({message:"You r not authorized"})
       }

       

    }
    catch(e){


        return res.status(500).json({message:e.message})
    }
}
export default checkToken