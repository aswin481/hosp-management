 import { useSelector } from "react-redux"
 import "./spinner.css"
 const Spinner=()=>{
    const {loading}=useSelector(state=>state.alerts)
    return(
        <div>
            {loading&&(
            <div className="spinner-parent">
                <div className="spinner-border">
                    
                </div>
            </div>
 )}
        </div>
    )
}
export default Spinner