import Header from "../../../Components/Header"
import { Input,Switch,Select,Button,Upload,Image } from "antd"
import { UploadOutlined } from "@ant-design/icons"
import axios from "axios"
import { useState,useEffect } from "react"
import { useNavigate,useParams } from "react-router-dom"
import Footer from "../../../Components/Footer"
import "./postpharmacy.css"


const Postpharmacy=()=>{
    const { id }=useParams()
    const navigate=useNavigate()
    const {TextArea}=Input

    const [pharmacy,setPharmacy]=useState({name:"",description:"",image:"",price:"",brand:"",department:"",instock:false,quantity:""})


    const [departments,setDepartments]=useState([])

    const fetchDepartments=async()=>{
       const response= await axios.get("http://localhost:3000/department")
       const op=response.data.map(item=>{
        return { label:item.name, value:item._id}
       })
       setDepartments(op)
    }

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


    useEffect(()=>{
        fetchDepartments()

        if(id){
            fetchPharmacy()
        }
    },[])

const onChange=(e,key)=>{
    let value=e.target.value
    if(key=="quantity" || key=="price"){
        value=parseFloat(value)
    }

    setPharmacy({...pharmacy,[key]:value})
    

}
const onInstockChange=(e)=>{
    setPharmacy({...pharmacy,instock:e})

}
const onSelect=(e)=>{

    setPharmacy({...pharmacy,department:e})

}
const onUploadChange=(info)=>{

    if(info.file.status=="done"){
        setPharmacy({...pharmacy,image:info.file.response.url})
    }

}

const postPharmacy=async()=>{
    try{
        axios.post("http://localhost:3000/pharmacy",pharmacy)
        navigate("/admin")
    }
    catch(e){

    }
}
const editPharmacy=async()=>{
    try{
       await axios.patch(`http://localhost:3000/pharmacy/${id}`,pharmacy)
        navigate("/pharmacy")
    }
    catch(e){

    }
}
console.log(pharmacy)
    return(
        <div className="postpharmacy">

            <Header title={id? "Edit Pharmacy":"Add Pharmacy"}/> 


            <div className="pharmacy-form">

                <div className="pharmacy-form-left">
                    <div className="pharmacy-input">
                    <label >Name</label>
                    <Input onChange={(e)=>onChange(e,"name")} value={pharmacy.name}/>
                    </div>
                    <div className="pharmacy-input">
                    <label >Description</label>
                    <TextArea onChange={(e)=>onChange(e,"description")} rows={6} value={pharmacy.description}/>
                    </div>
                    <div className="pharmacy-input">
                    <label >Price</label>
                    <Input onChange={(e)=>onChange(e,"price")} value={pharmacy.price }/>
                    </div>
                    <div className="pharmacy-input">
                    <label >Brand</label>
                    <Input onChange={(e)=>onChange(e,"brand")} value={pharmacy.brand}/>
                    </div>
                   
                    

                </div>

                <div className="pharmacy-form-right">
                <div className="pharmacy-input">
                    <label >Instock</label>
                    <Switch style={{width:"40px"}} onChange={onInstockChange} checked={pharmacy.instock}/>
                   
                    </div>
                
                    
                    <div className="pharmacy-input">
                    <label >Quantity</label>
                    <Input onChange={(e)=>onChange(e,"quantity")} type="number" value={pharmacy.quantity}/>
                    </div>

                    <div className="pharmacy-input">
                    <label >Department</label>
                    <Select options={departments} onChange={onSelect} value={pharmacy.department}/>

                    <div className="pharmacy-input">
                    <label >Image</label>
                    <Upload name="file" action="http://localhost:3000/uploads" onChange={onUploadChange} >
                        <Button icon={<UploadOutlined/>}>Click to Upload</Button>
                    </Upload>
                    <Image className="image" width={100} src={pharmacy.image}></Image>
                   
                    </div>
                    <div className="pharmacy-input btn-display">
                    <Button size="large" style={{marginTop:"50px",width:"fit-content"}}  type="primary" onClick={id?editPharmacy:postPharmacy}>{id?"UPDATE":"ADD"}</Button>
                    </div>
                   
                    </div>
                    
                    
                    </div>

                   
            </div>
           

        </div>
    )
}

export default Postpharmacy