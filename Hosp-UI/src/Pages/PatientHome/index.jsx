import { useNavigate } from "react-router-dom"
import Header from "../../Components/Header"
import { useParams } from "react-router-dom"
import { Avatar,Table,Button } from "antd"
import axios from "../../utils/axiosinstance"
import { useEffect,useState } from "react"
import Layout from "../../Components/PatientLayout"

import "./patienthome.css"


const PatientHome=()=>{
    
    const {id}=useParams()
    const [docid,setDocid]=useState()
    const navigate=useNavigate()
    const onLogout=()=>{
        
            localStorage.removeItem("token")
            localStorage.removeItem("patient_id")
           
            navigate("/patient/login")
           
    
        
    }
    
    const fetchPatientBookings=async()=>{
       const response=await axios.get(`/patient/bookings/${id}`)
       
      
      
       
       

      
       
      
      
    
    }
       const navtohome=()=>{
        navigate("/home")
       }
       
       
    useEffect(()=>{
        fetchPatientBookings()
       
            },[])
   

    const columns = [



        {
          title: 'Doctor Name',
          dataIndex: 'name',
          key: '_id',
          render:(data)=> <p>{data.name}</p>
        },
        {
            title: 'Qualification',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Booking Date',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Token No',
            dataIndex: 'name',
            key: 'name',
          },
          


        ]

   

    return(
        <div >
            
            <Layout>
            
           
                <h1>HOME</h1>
            </Layout>
           
            
            {/* <Header title="My Orders"/>
            
            <div className="button">
                <Button onClick={navtohome}type="primary">Available Departments</Button>
                </div>
            
            <hr />

            <Table columns={columns}/>
          */}
            
        </div>
    )
}

export default PatientHome
