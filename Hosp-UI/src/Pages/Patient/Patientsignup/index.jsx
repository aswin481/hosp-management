import Header from "../../../Components/Header"
import { Input,Switch,Select,Button,Upload,Image } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "../../../utils/axiosinstance"
import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import {toast,ToastContainer} from "react-toastify"
import "./patientsignup.css"


const PatientSignup=()=>{
    
    const navigate=useNavigate()
  

    const [patient,setPatient]=useState({name:"",username:"",password:"",address:"",confirmpassword:""})


   
    

   
   


   

const onChange=(e,key)=>{
    let value=e.target.value
   

    setPatient({...patient,[key]:value})
    console.log(patient)
    

}


const onUploadChange=(info)=>{

    if(info.file.status=="done"){
        setPatient({...patient,image:info.file.response.url})
    }

}

const postPatient=async()=>{
    try{
        await axios.post("http://localhost:3000/patient/signup",patient)
        navigate("/patient/login")
        
    }
    catch(e){
  toast.error(e.message)
    }
}


    return(
        <div className="postpatient">

            <Header title="Signup"/> 


            <div className="patient-form">

                <div className="pateint-form-left">
                    <div className="patient-input">
                    <label >Name</label>
                    <Input onChange={(e)=>onChange(e,"name")} />
                    </div>
                    <div className="patient-input">
                    <label >Username</label>
                    <Input onChange={(e)=>onChange(e,"username")} />
                    </div>
                    <div className="patient-input">
                    <label >Password</label>
                    <Input.Password onChange={(e)=>onChange(e,"password")}/>
                    </div>
                    <div className="patient-input">
                    <label >Confirmpassword</label>
                    <Input.Password onChange={(e)=>onChange(e,"confirmpassword")}/>
                    </div>
                    
                    <div className="patient-input">
                    <label >Address</label>
                    <Input onChange={(e)=>onChange(e,"address")} />
                    </div>
                   
                    

                </div>

                <div className="patient-form-right">
                
                
                    
                   

                   
                    <div className="patient-input">
                    <label >Image</label>
                    <Upload name="file" action="http://localhost:3000/uploads" onChange={onUploadChange} >
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                    <Image className="image" width={100} ></Image>
                   
                    </div>
                    <div className="pharmacy-input patient-btn-display">
                    <Button size="large" style={{marginTop:"50px",width:"fit-content"}}  type="primary" onClick={postPatient}>Signup</Button>
                    </div>
                   
                    </div>
                    
                    
                    </div>
<ToastContainer/>
                   
            

        </div>
    )
}

export default PatientSignup