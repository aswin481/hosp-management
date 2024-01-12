import Header from "../../../Components/Header";
import { Input, Switch, Select, Button, Upload, Image } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "../../../utils/axiosinstance";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../../../Components/Navbar";
import "./adminsignup.css";

const AdminSignup = () => {
  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    name: "",
    username: "",
    password: "",
    confirmpassword: "",
  });

  const onChange = (e, key) => {
    let value = e.target.value;

    setAdmin({ ...admin, [key]: value });
  };

  const postAdmin = async () => {
    try {
      await axios.post("/admin/signup", admin);
      navigate("/admin/login");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <div className="main">
      <Navbar />

      <div className="postadmin">
        <Header title="Signup" />

        <div className="admin-signup-form">
          <div className="admin-form-left">
            <div className="admin-input">
              <label>Name</label>
              <Input onChange={(e) => onChange(e, "name")} />
            </div>
            <div className="admin-input">
              <label>Username</label>
              <Input onChange={(e) => onChange(e, "username")} />
            </div>
            <div className="admin-input">
              <label>Password</label>
              <Input.Password onChange={(e) => onChange(e, "password")} />
            </div>
            <div className="admin-input">
              <label>Confirmpassword</label>
              <Input.Password
                onChange={(e) => onChange(e, "confirmpassword")}
              />
            </div>

            <div className="admin-input admin-btn-display">
              <Button
                size="large"
                style={{ marginTop: "50px", width: "fit-content" }}
                type="primary"
                onClick={postAdmin}
              >
                Signup
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminSignup;
