import Navbar from "../../../Components/Navbar";
import { Button, Result, Alert, Input } from "antd";
import axios from "../../../utils/axiosinstance";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../../Components/Header";
import "./booking.css"
const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const paid = localStorage.getItem("patient_id");
  
  const [full, setfull] = useState({ patient: paid ,doctor:id,problem:""});
  
  
  
const onChange=(e,key)=>{
    setfull({...full,[key]:e.target.value})
    
   
}
  const postBooking = async () => {
    await axios.post(`/booking/confirm`,full);
    navigate(`/patient/${paid}`);
    navigate
  };

  const navtohome = () => {
    navigate("/home");
  };
  return (
    <div className="main">
      <Navbar />
      <Header title="Confirm Booking"/>

      <div className="confirm">
      


        <div className="confirm-input">
        <label >Tell us about your problem</label>
           
        
          <Input.TextArea size="large" onChange={(e)=>onChange(e,"problem")}></Input.TextArea>
          </div>
          <div className="buttons">
          <Button type="primary" onClick={postBooking}>Book Now</Button>
          <Button onClick={navtohome}>Go Back</Button>
          </div>
        
      </div>
    </div>
  );
};

export default Booking;
