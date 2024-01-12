import Header from "../../../Components/Header"
import { Input,Switch,Select,Button,Upload,Image } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "../../../utils/axiosinstance"
import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import {toast,ToastContainer} from "react-toastify"
import Navbar from "../../../Components/Navbar"
import Footer from "../../../Components/Footer"
import "./docsignup.css"


const DocSignup=()=>{
    
    const navigate=useNavigate()
  

    const [doc,setDoc]=useState({name:"",username:"",password:"",department:"",confirmpassword:"",qualification:""})
    const [departments,setDepartments]=useState([])

    const fetchDepartments=async()=>{
       const response= await axios.get("http://localhost:3000/department")
       const op=response.data.map(item=>{
        return { label:item.name, value:item._id}
       })
       setDepartments(op)
    }



    useEffect(()=>{
     fetchDepartments()
    },[])

   
    

   
   


   

const onChange=(e,key)=>{
    let value=e.target.value
   

    setDoc({...doc,[key]:value})
    
    

}
const onSelect=(e)=>{
    setDoc({...doc,department:e})
}


const onUploadChange=(info)=>{

    if(info.file.status=="done"){
        setDoc({...doc,image:info.file.response.url})
    }

}

const postDoc=async()=>{
    try{
        await axios.post("/doctor/signup",doc)
        navigate("/doctor/login")
        
    }
    catch(e){
  toast.error(e.message)
    }
}
  const url="C:\Users\home\Desktop\Projects\MERN-projects\Hospital Management\Hosp-UI\public\young-handsome-physician-medical-robe-with-stethoscope.jpg"

    return(
        <div className="main">
        

        <Navbar/>
      

        <div className="postdoc" >

            <Header title="Signup"/> 


            <div className="doc-form">

                
                    <div className="doctor-input">
                    <label >Name</label>
                    <Input onChange={(e)=>onChange(e,"name")} />
                    </div>
                    <div className="doctor-input">
                    <label >Username</label>
                    <Input onChange={(e)=>onChange(e,"username")} />
                    </div>
                    <div className="doctor-input">
                    <label >Password</label>
                    <Input.Password onChange={(e)=>onChange(e,"password")}/>
                    </div>
                    <div className="doctor-input">
                    <label >Confirmpassword</label>
                    <Input.Password onChange={(e)=>onChange(e,"confirmpassword")}/>
                    </div>
                    
                    <div className="doctor-input-dep">
                    <label >Department</label>
                   <Select options={departments} onChange={onSelect}/>
                    </div>
                    <div className="doctor-input">
                    <label >Qualification</label>
                    <Input onChange={(e)=>onChange(e,"qualification")} />
                    </div>
                   
                    

                

                
                
                
                    
                   

                   
                    <div className="doctor-input">
                    <label >Image</label>
                    <Upload name="file" action="http://localhost:3000/uploads" onChange={onUploadChange} >
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                    <Image className="image" width={100} ></Image>
                   
                    </div>
                    <div className="doc-input doctor-btn-display">
                    <Button size="large" style={{marginTop:"50px",width:"fit-content"}}  type="primary" onClick={postDoc}>Signup</Button>
                    </div>
                   
                    
                    
                    
                    </div>
<ToastContainer/>
                   
            

        </div>
        
        </div>
    )
}

export default DocSignup