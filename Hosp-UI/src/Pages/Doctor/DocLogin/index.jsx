import { Input,Button } from "antd"
import axios from "axios"
import { useState } from "react"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import ReCAPTCHA from "react-google-recaptcha"
import Navbar from "../../../Components/Navbar"
import Header from "../../../Components/Header"
import "./doclogin.css"


const Doclogin=()=>{
    const navigate=useNavigate()

    const [cred,setCred]=useState({username:"",password:""})
    const [captcha,setCaptcha]=useState(false)

     const onChange=(e,key)=>{

        setCred({...cred,[key]:e.target.value})

        

     }

     const loginDoc=async()=>{
        try{
        const response=await axios.post("http://localhost:3000/doctor/login",cred)

        
     


     const tokenDecode=jwtDecode(response.data.token)
     
     localStorage.setItem("token",response.data.token)
     localStorage.setItem("doc_id",tokenDecode.id)


     if(response.data.token && tokenDecode.id){
        navigate(`/doctor`)
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
        <div className="doclogin">
            <Navbar/>
            <Header title="LOGIN"/>
            <div className="doclogin-form">
                
                <label >Username</label>
                <Input onChange={(e)=>onChange(e,"username")}/>
                <label>Password</label>
                <Input.Password onChange={(e)=>onChange(e,"password")}/>
                <ReCAPTCHA sitekey="6Lc8OTkpAAAAADzzA1nSNWGMOb4h6aYpFZ67FqbE" onChange={onCaptchaChange}/>
                <Button className="doclogin-btn" type="primary"  onClick={onClick}>Login</Button>
                <ToastContainer/>
            </div>

        </div>
    )
}

export default Doclogin