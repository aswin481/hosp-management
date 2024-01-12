
import Header from "../../Components/Header"
import { useParams } from "react-router-dom"
import axios from "../../utils/axiosinstance"
import { useState,useEffect } from "react"
import Card1 from "../../Components/Card"
import { useNavigate } from "react-router-dom"

import {toast,ToastContainer} from "react-toastify"
import Navbar from "../../Components/Navbar"
import { Button } from "antd"

import "./doctors.css"




const AvailableDoctors=()=>{
    
    const {id}=useParams()

    const [doctors,setDoctors]=useState([])
    const navigate=useNavigate()

const fetchDoctors=async()=>{
    try {
        const response=await axios.get(`/doctor/patient/department/${id}`)
        
        setDoctors(response.data)
}
        
    catch (error) {
        console.log(error.message)
    }
}
const nav=(id)=>{
    navigate(`/doctor/booked/${id}`)
}
useEffect(()=>{
fetchDoctors()
},[])
   

    return(
        <div className="doctor">
            <Navbar/>
    <Header title="Doctor"/>
    <hr />
    <div className="doctor-card">
        
   {  doctors.map(item=>{
    return (
         <Card1 onClick={()=>nav(item._id)} image={item.image} name={item.name} qualification={item.qualification} />
             )
})

   
    }
    
    </div>
   
    
   
   <ToastContainer/>
        </div>
    )
    
}

export default AvailableDoctors