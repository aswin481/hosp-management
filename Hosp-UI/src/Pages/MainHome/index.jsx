import Navbar from "../../Components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import Footer from "../../Components/Footer";
import Hero from "../../Components/Hero";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  const patlogin = () => {
    navigate("/patient/login");
  };
  const doclogin = () => {
    navigate("/doctor/login");
  };

  return (
    <div className="main">
      <Navbar />

      <div className="lower">
        <div className="butttons" style={{ display: "flex", gap: 20 }}>
          <div className="button1">
            <Button type="primary" onClick={patlogin}>
              PatientLogin
            </Button>
          </div>
          <div className="button2">
          <Button type="primary" onClick={doclogin}>
            DocLogin
          </Button>
          </div>
          <div className="button2">
          <Button type="primary" onClick={()=>{
            navigate("/admin/login")
          }}>
            AdminLogin
          </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default Home;
