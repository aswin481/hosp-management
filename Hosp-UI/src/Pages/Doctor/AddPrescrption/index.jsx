import Header from "../../../Components/Header"
import { Input,Button } from "antd"
import Navbar from "../../../Components/Navbar"


import axios from "../../../utils/axiosinstance"
import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"

import "./prescription.css"


const Addprescription=()=>{
    const { id }=useParams()
    const navigate=useNavigate()
    const {TextArea}=Input

    const [prescription,setPrescription]=useState({prescription:"",doctor:localStorage.getItem("doc_id"),patient:id,booking:id})


    

    


  

const onChange=(e)=>{
    let value=e.target.value
    

    setPrescription({...prescription,prescription:value})
    

}




const postPrescription=async()=>{
    try{
       await axios.post("/doctor/add-prescription",prescription)
        navigate("/doctor")
    }
    catch(e){

    }
}
const getBookingDetails=async()=>{
    try{
      const details= await axios.get(`/doctor/booking/${id}`)
        
       
    }
    catch(e){

    }
}

useEffect(()=>{
getBookingDetails()
},[])


    return(
        <div className="main">
            <Navbar/>
            <Header title="ADD PRESCRIPTION"/>

        
        <div className="postprescription">
          

           


            

               
                    <div className="area">
                    
                    <label >Prescription</label>
                    <TextArea onChange={(e)=>onChange(e)} rows={6} />
                    </div>
                   
                    
                   
                    

                
                      <div className="button">
                    
                    <Button size="large" style={{marginTop:"50px",width:"fit-content"}}  type="primary" onClick={postPrescription}>ADD</Button>
                    
                   
                    </div>

        </div>
        </div>
    )
}

export default Addprescription