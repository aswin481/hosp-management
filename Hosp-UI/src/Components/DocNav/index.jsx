import { useNavigate } from "react-router-dom"
import "./docnav.css"


const DocNav=()=>{
    const navigate=useNavigate()



    const onLogout=()=>{
        localStorage.removeItem("token")
        localStorage.removeItem("doc_id")
        navigate("/doctor/login")
       

    }

    return(
        <div className="navbar">
            <div className="left">
    <h1>Doctor</h1>
    </div>
    <div className="right">
    <p>Home</p>
    <p onClick={onLogout}>Logout</p>
    </div>
        </div>
    )
}

export default DocNav