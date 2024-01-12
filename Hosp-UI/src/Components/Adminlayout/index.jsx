import { Link, useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import axios from "../../utils/axiosinstance";
import Card1 from "../Card";
import "./adminlayout.css";

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
      name: "Added list",
      path: "/#",
      icon: "ri-file-list-3-fill",
    },
    {
      name: "Add Pharmacy",
      path: "/add-pharmacy",
      icon: "ri-file-list-line",
    },
    {
      name: "Add Department",
      path: "/add-department",
      icon: "ri-hospital-line",
    },
  ];
  const menuToBeRendered = userMenu;
  const [departments, setDeparments] = useState([]);
  const [pharmacy, setPharmacy] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/department");
      setDeparments(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const fetchPharmacy = async () => {
    try {
      const response = await axios.get("http://localhost:3000/pharmacy");
      setPharmacy(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchDepartments();
    fetchPharmacy();
  }, []);
  const onLogout=()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("admin_id")
    navigate("/admin/login")
  }
  return (
    <div className="main1">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
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

              <i class="ri-logout-box-line" onClick={onLogout}></i>
            </div>
          </div>
          <div className="body">
           
            <div className="pharmacy-card">
              <h1>Pharmacy</h1>
              {pharmacy.map((item) => {
                return (
                  <div className="card2">
                    <Card1
                      title={item.name}
                      image={item.image}
                      
                    />
                  </div>
                );
              })}
            </div>
            <div className="dept-card">
              <h1 >Departments</h1>

              {departments.map((item) => {
                return (
                  <div className="card1">
                    <Card1
                      title={item.name}
                      image={item.image}
                      hod={item.hod}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
