
import { Input,Switch,Select,Button,Upload,Image } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import "./adddepartment.css"


const AddDepartment=()=>{
    const { id }=useParams()
    const navigate=useNavigate()
    const {TextArea}=Input

    const [pharmacy,setPharmacy]=useState({name:"",hod:"",image:""})


    const [departments,setDepartments]=useState([])

   

   const fetchPharmacy=async()=>{
    try{

    const response=await axios.get(`http://localhost:3000/pharmacy/${id}`)

    const {
        name,
        description,
        price,
        image,
        brand,
        department,
        instock,quantity }=response.data
    
 setPharmacy(response.data)
    }
    catch(e){

    }
   }


   

const onChange=(e,key)=>{
    let value=e.target.value
    if(key=="quantity" || key=="price"){
        value=parseFloat(value)
    }

    setPharmacy({...pharmacy,[key]:value})
    

}


const onUploadChange=(info)=>{

    if(info.file.status=="done"){
        setPharmacy({...pharmacy,image:info.file.response.url})
    }

}

const postDepartment=async()=>{
    try{
        axios.post("http://localhost:3000/department",pharmacy)
        navigate("/admin")
    }
    catch(e){

    }
}
// const editPharmacy=async()=>{
//     try{
//        await axios.patch(`http://localhost:3000/pharmacy/${id}`,pharmacy)
//         navigate("/pharmacy")
//     }
//     catch(e){

//     }

console.log(pharmacy)
    return(
        <div className="postpharmacy">

            {/* <Header title={id? "Edit Pharmacy":"Add Pharmacy"}/>  */}


            <div className="department-form">

                
                    <div className="department-input">
                    <label >Name</label>
                    <Input onChange={(e)=>onChange(e,"name")} value={pharmacy.name}/>
                    </div>
                    
                    
                    <div className="department-input">
                    <label >Hod</label>
                    <Input onChange={(e)=>onChange(e,"hod")} value={pharmacy.price }/>
                    </div>
                   
                   
                    

               

                
               
                
                    
                    
                    
                    <div className="department-input">
                    <label >Image</label>
                    <Upload name="file" action="http://localhost:3000/uploads" onChange={onUploadChange} >
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                    <Image className="image" width={100} src={pharmacy.image}></Image>
                   
                    </div>
                    <div className="department-input department-btn-display">
                    <Button size="large" style={{marginTop:"50px",width:"fit-content"}}  type="primary" onClick={postDepartment}>ADD</Button>
                    </div>
                   
                    
                    
                    </div>
                    

                   
            </div>

        
    )
}

export default AddDepartment