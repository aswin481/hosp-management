import { Input,Button } from "antd"
import axios from "axios"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha"
import Navbar from "../../../Components/Navbar"
import Header from "../../../Components/Header"
import "./adminlogin.css"


const Adminlogin=()=>{
    const navigate=useNavigate()

    const [cred,setCred]=useState({username:"",password:""})
    const [captcha,setCaptcha]=useState(false)

     const onChange=(e,key)=>{

        setCred({...cred,[key]:e.target.value})

        

     }

     const loginAdmin=async()=>{
        try{
        const response=await axios.post("http://localhost:3000/admin/login",cred)

        
     


     const tokenDecode=jwtDecode(response.data.token)
     
     localStorage.setItem("token",response.data.token)
     localStorage.setItem("admin_id",tokenDecode.id)


     if(response.data.token && tokenDecode.id){
        navigate(`/admin`)
     }
    }
    catch(e){
        toast.error("username or password incorrect")
    }
    
    }


   

     const onClick=()=>{
        if(captcha){
     loginDoc()
        }
     }
    const onCaptchaChange=(value)=>{
        setCaptcha(true)

     }

    return(
        <div className="adminlogin">
            <Navbar/>
            <Header title="LOGIN"/>
            <div className="adminlogin-form">
                
                <label >Username</label>
                <Input onChange={(e)=>onChange(e,"username")}/>
                <label>Password</label>
                <Input.Password onChange={(e)=>onChange(e,"password")}/>
                <ReCAPTCHA sitekey="6Lc8OTkpAAAAADzzA1nSNWGMOb4h6aYpFZ67FqbE" onChange={onCaptchaChange}/>
                <Button className="adminlogin-btn" type="primary"  onClick={loginAdmin}>Login</Button>
                <ToastContainer/>
            </div>

        </div>
    )
}

export default Adminlogin