import Navbar from "../../Components/Navbar"
import Header from "../../Components/Header"
import axios from "axios"
import { useState,useEffect } from "react"
import Card1 from "../../Components/Card"
import { useNavigate } from "react-router-dom"
import Footer from "../../Components/Footer"


import "./home.css"



const Home=()=>{

    const [departments,setDeparments]=useState([])
    const navigate=useNavigate()

const fetchDepartments=async()=>{
    try {
        const response=await axios.get("http://localhost:3000/patient/department")
        setDeparments(response.data)
      
}
        
    catch (error) {
        console.log(error.message)
    }
}
const fetchDoctors=async(id)=>{
    navigate(`/department/doctor/${id}`)
                 
}
useEffect(()=>{
fetchDepartments()
},[])
   

    return(
        <div className="home">
            
            <Navbar>

            </Navbar>
            <Header title ="Departments"/>
            
            
              
               
                
               
                <hr />
                <div className="card">
                 {departments.map((item)=>{
                    return( 
                    <Card1 title={item.name} image={item.image} hod={item.hod}
                      
                    onClick={()=>fetchDoctors(item._id)}
                      /> 
                    )
                 
                 })}
                
                </div>

                <div className="footer">


                <Footer/>
                </div>
                
            

           

        </div>
    )
}

export default Home