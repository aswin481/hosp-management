import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"

const CheckPatientAuth=(props)=>{
    
    const token=localStorage.getItem("token")
    
    if(token){
         const {role}= jwtDecode(token)
         if(role=="PATIENT"){
    return<> {props.children}</>
         }
         else  return <Navigate to="/patient/login"/>
    }
    else return <Navigate to="/patient/login"/>
        

}

export default CheckPatientAuth