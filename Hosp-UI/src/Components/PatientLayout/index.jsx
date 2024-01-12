import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../Header";
import { Table } from "antd";
import axios from "../../utils/axiosinstance";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./layout.css";

const Layout = ({ children }) => {
  const {id}=useParams()
  const navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Booking Status",
      path: "",
      icon: "ri-file-list-line",
    },
    {
      name: "Book Doctor",
      path: "/home",
      icon: "ri-hospital-line",
    },
    
  ];
  const menuToBeRendered = userMenu;
  const getPrescription=async()=>{
       const response=await axios.get(`/patient/prescription/${id}`)
       console.log(response)
  }
  useEffect(()=>{
getPrescription()
  },[])
  const logout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("patient_id")
    navigate("/patient/login")
  }
  return (
    <div className="main1">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="patient-sidebar-header">
            <h1>DocApp</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((item) => {
              return (
                <div className={`d-flex menu-item `}>
                  <i className={item.icon}></i>
                  <Link to={item.path}>{item.name}</Link>
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">
            <div className="d-flex notification">
              <label htmlFor="">About us</label>

              
              <label htmlFor="">Logout</label>

              <i class="ri-logout-box-line" onClick={logout}></i>
            </div>
            
          </div>
          <div className="body">
            <Table/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
