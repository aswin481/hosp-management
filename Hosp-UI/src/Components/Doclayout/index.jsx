import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import axios from "../../utils/axiosinstance";
import { useState,useEffect } from "react";
import { Table } from "antd";
import {toast} from "react-toastify"
import {DeleteOutlined,EditOutlined} from "@ant-design/icons"
import "./doclayout.css";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor",
      icon: "ri-file-list-line",
    },
    {
      name: "Available Departments",
      path: "/home",
      icon: "ri-hospital-line",
    },

  ];
  const menuToBeRendered = userMenu;
  const [items,setItems]=useState([])



  const getPatients=async()=>{

      const response=await axios.get(`/doctor/patient/${localStorage.getItem("doc_id")}`)

      
      setItems(response.data)
      console.log(response)

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
const removeId=()=>{
  localStorage.removeItem("token")
  localStorage.removeItem("doc_id")
  navigate("/doctor/login")
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
          title: 'Problem',
          dataIndex: 'problem',
          key: 'address',
         
        },

        
        
        

        
        {
          title: 'Add Prescription',
          dataIndex: '_id',
          key: 'edit',
          render:(id)=> <EditOutlined style={{fontSize:"16px", color:"blue",cursor:"pointer"}} onClick={()=>onAddPrescription(id)}/>
        },

       
        

  ]

  return (
    <div className="doc-main1">
      <div className="d-flex layout">
        <div className="doc-sidebar">
          <div className="doc-sidebar-header">
            <h1>Doc App</h1>
          </div>
          <div className="doc-menu">
            {menuToBeRendered.map((item) => {
              return (
                <div className={`d-flex doc-menu-item `}>
                  <i className={item.icon}></i>
                  <Link to={item.path}>{item.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="doc-content">
          <div className="doc-header">
            <div className="d-flex notification">
              <label htmlFor="">About us</label>

             
              <label htmlFor="">Logout</label>

              <i class="ri-logout-box-line" onClick={removeId}></i>
            </div>
            
          </div>
          <div className="doc-body">
          <Table columns={columns} dataSource={items} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
