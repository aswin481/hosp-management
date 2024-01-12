import { Route,Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Doclogin from "./Pages/Doctor/DocLogin"
import Dochome from "./Pages/Doctor/DocHome"
import 'react-toastify/dist/ReactToastify.css';
import Listpharmacy from "./Pages/Pharmacy/ListPharmacy";
import Postpharmacy from "./Pages/Pharmacy/PostPharmacy";
import Addprescription from "./Pages/Doctor/AddPrescrption";
import CheckDocAuth from "./Components/Checkdocauth";
import AvailableDoctors from "./Pages/AvailableDoctors";
import PatientSignup from "./Pages/Patient/Patientsignup";
import Patientlogin from "./Pages/Patient/Patientlogin";
import DocSignup from "./Pages/Doctor/DocSignup";
import PatientHome from "./Pages/PatientHome";
import CheckPatientAuth from "./Components/Checkpatientauth";
import Booking from "./Pages/Doctor/BookingConfirm";
import MainHome from "./Pages/MainHome";
import AdminSignup from "./Pages/Admin/Adminsignup";
import Adminlogin from "./Pages/Admin/Adminlogin";
import Adminhome from "./Pages/Admin/Adminhome";
import AddDepartment from "./Pages/AddDepartment";
import "./App.css"



const App=()=>{



  return(
    <div>

      <Routes>
      <Route path="/"  element={<MainHome/>}/>
    <Route path="/home"  element={<Home/>}/>

    {/* department */}
    <Route path="/add-department"  element={<AddDepartment/>}/>




    {/* admin */}

<Route path="/admin/signup"  element={<AdminSignup/>}/>
<Route path="/admin/login"  element={<Adminlogin/>}/>
<Route path="/admin"  element={<Adminhome/>}/>


    {/* doctor */}
    <Route path="/doctor"  element={
      <CheckDocAuth>
    <Dochome/>
    </CheckDocAuth>
    }/>
    <Route path="/doctor/login"  element={<Doclogin/>}/>
    <Route path="/doctor/:id"  element={<Doclogin/>}/>
    <Route path="/doctor/add-prescrption/:id"  element={<Addprescription/>}/>
    <Route path="department/doctor/:id"  element={<AvailableDoctors/>}/>
    <Route path="/doctor/signup"  element={<DocSignup/>}/>
    <Route path="/doctor/booked/:id"  element={<Booking/>}/>





    {/* pharmacy */}


    <Route path="/pharmacy"  element={<Listpharmacy/>}/>
    <Route path="/add-pharmacy"  element={<Postpharmacy/>}/>
    <Route path="/edit-pharmacy/:id"  element={<Postpharmacy/>}/>


{/* pateint */}
<Route path="/patient/signup" element={<PatientSignup/>} />
<Route path="/patient/login" element={<Patientlogin/>} />
<Route path="/patient/:id" element={
  <CheckPatientAuth>
<PatientHome/>
</CheckPatientAuth>
} />
    
    


      </Routes>

    </div>
  )
}


export default App