import Header from "../../../Components/Header"
import { Table,Button } from "antd"
import { useEffect,useState } from "react"
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import { ToastContainer,toast } from "react-toastify"
import { useNavigate,useParams } from "react-router-dom"
import axios from "../../../utils/axiosinstance"




// import Card1 from "../../Components/Card"


import Layout from "../../../Components/Adminlayout"

import "./adminhome.css"


const Adminhome=()=>{
    

  const navigate=useNavigate()

    const [items,setItems]=useState([])



    const getPatients=async()=>{

        const response=await axios.get(`/doctor/patient/${localStorage.getItem("doc_id")}`)

        
        setItems(response.data)
        

    }


    useEffect(()=>{
        getPatients()
        
    },[])



    const onDeletePatients= async(id)=>{
      try{
    await axios.delete(`/patients/${id}`)
    toast.success("Item deleted successfully")
    getPatients()

      }
      catch(e){
        toast.error(e.message)

      }

        
    }

    const onAddPrescription=(id)=>{
        navigate(`/doctor/add-prescrption/${id}`)
    }

    const columns = [



      {
        title: 'Patient_ID',
        dataIndex: '_id',
        key: '_id',
      },
        {
          title: 'Name',
          dataIndex: 'patient',
          key: 'name',
          render:(data)=> <p>{data.name}</p>
        },
        

          {
            title: 'Image',
            dataIndex: 'patient',
            key: 'image',
            render:(data)=> <img className="table-img" src={data.image}  />
          },

          {
            title: 'Address',
            dataIndex: 'patient',
            key: 'address',
            render:(data)=> <p>{data.address}</p>
          },

          
          
          

          
          {
            title: 'Add Prescription',
            dataIndex: '_id',
            key: 'edit',
            render:(id)=> <EditOutlined style={{fontSize:"16px", color:"blue",cursor:"pointer"}} onClick={()=>onAddPrescription(id)}/>
          },

          {
            title: 'Delete',
            dataIndex: '_id',
            key: 'delete',
            render:(id)=> <DeleteOutlined onClick={()=>onDeletePatients(id)} style={{fontSize:"16px", color:"red",cursor:"pointer"}}/>
          },
          

    ]



    return(
      <div>
        <Layout/>
     
            
            {/* <div className="table">
                <Table columns={columns} dataSource={items} />
            </div> */}
           

        
            </div>
    )
}

export default Adminhome