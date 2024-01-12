import { useNavigate } from "react-router-dom"
import "./navbar.css"


const Navbar=(props)=>{
    const navigate=useNavigate()

    const navmain=()=>{
    navigate("/")
    }



    return(
        <div >
            
            <nav className="navbar">

                <div className="left">
                  <h2>DocApp</h2>
                </div>
                <div className="right">
                <p onClick={navmain}>Home</p>
                <p>About us</p>
                </div>
            </nav>
            
            </div>

            

        
    )
}

export default Navbar