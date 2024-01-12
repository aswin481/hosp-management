import Header from "../../../Components/Header"
import { Table,Button } from "antd"
import { useEffect,useState } from "react"
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import { ToastContainer,toast } from "react-toastify"
import { useNavigate,useParams } from "react-router-dom"
import axios from "../../../utils/axiosinstance"

import "./listpharmacy.css"


const Listpharmacy=()=>{
  

  const navigate=useNavigate()

    const [items,setItems]=useState([])



    const getPharmacy=async()=>{

        const response=await axios.get("/pharmacy")
        setItems(response.data)

    }


    useEffect(()=>{
        getPharmacy()
    },[])



    const onDeletePharmacy= async(id)=>{
      try{
    await axios.delete(`/pharmacy/${id}`)
    toast.success("Item deleted successfully")
    getPharmacy()

      }
      catch(e){
        toast.error(e.message)

      }

        
    }

    const onEditPharmacy=(id)=>{
        navigate(`/edit-pharmacy/${id}`)
    }

    const columns = [



      {
        title: 'ID',
        dataIndex: '_id',
        key: '_id',
      },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
          },

          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render:(data)=> <img className="table-img" src={data}  />
          },

          {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
          },

          {
            title: 'Brand',
            dataIndex: "brand",
            key: 'brand',
          },

          {
            title: 'Department',
            dataIndex: 'department',
            key: 'department',
            render:(d)=> d.name
            
          },

          {
            title: 'Instock',
            dataIndex: 'instock',
            key: 'instock',
            render:(d)=>{
            if(d){
                 return "Yes"
            }
            else{
              return "No"
            }
          }
          },

          {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
          },
          {
            title: 'Edit',
            dataIndex: '_id',
            key: 'edit',
            render:(id)=> <EditOutlined style={{fontSize:"16px", color:"blue",cursor:"pointer"}} onClick={()=>onEditPharmacy(id)}/>
          },

          {
            title: 'Delete',
            dataIndex: '_id',
            key: 'delete',
            render:(id)=> <DeleteOutlined onClick={()=>onDeletePharmacy(id)} style={{fontSize:"16px", color:"red",cursor:"pointer"}}/>
          },
          

    ]



    return(
        <div className="listpharmacy">

            <Header title="Pharmacy"/> 
            <div className="add-pharmacy-btn">
            <Button type="primary" onClick={()=>navigate("/add-pharmacy")}>ADD</Button>
            </div>
            <div className="table">
                <Table columns={columns} dataSource={items}/>
            </div>
            <ToastContainer/>

        </div>
        
    )
}

export default Listpharmacy