import { Input,Button } from "antd"
import axios from "axios"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha"
import Navbar from "../../../Components/Navbar"
import Header from "../../../Components/Header"
import Spinner from "../../../Components/Spinner"
import "./patientlogin.css"
import { useSelector ,useDispatch} from "react-redux"
import { showLoading,hideLoading } from "../../../redux/alertsSlice"


const Patientlogin=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [cred,setCred]=useState({username:"",password:""})
    const [captcha,setCaptcha]=useState(false)

     const onChange=(e,key)=>{

        setCred({...cred,[key]:e.target.value})

        

     }

     const Patientlogin=async()=>{
        try{
            dispatch(showLoading())
        const response=await axios.post("http://localhost:3000/patient/login",cred)

        dispatch(hideLoading())

        
     


     const tokenDecode=jwtDecode(response.data.token)
     
     localStorage.setItem("token",response.data.token)
     localStorage.setItem("patient_id",tokenDecode.id)
     


     if(response.data.token && tokenDecode.id){
        navigate(`/patient/${tokenDecode.id}`)
     }
    }
    catch(e){
        dispatch(hideLoading())
        toast.error("username or password incorrect")
    }
    
    }


   

     const onClick=()=>{
        if(captcha){
     Patientlogin()
        }
     }
    const onCaptchaChange=(value)=>{
        setCaptcha(true)

     }

    return(
        <div className="patientlogin">
            <Spinner/>
            
            <Navbar/>
            <Header title="LOGIN"/>
            <div className="patientlogin-form">
                
                <label >Username</label>
                <Input onChange={(e)=>onChange(e,"username")}/>
                <label>Password</label>
                <Input.Password onChange={(e)=>onChange(e,"password")}/>
                <ReCAPTCHA sitekey="6Lc8OTkpAAAAADzzA1nSNWGMOb4h6aYpFZ67FqbE" onChange={onCaptchaChange}/>
                <Button className="patientlogin-btn" type="primary"  onClick={onClick}>Login</Button>
                <ToastContainer/>
            </div>

        </div>
    )
}

export default Patientlogin