import { Card } from "antd"
import "./card.css"



const Card1=(props)=>{



    return(


<div className="card">
 <Card
 style={{
    margin:"20px",
                            
     width: 200,
       height:250
              }}
 onClick={props.onClick}

 title={props.title}
  cover={<img className="card-img" src={props.image}></img>}
 
 >
            <p>{props.hod}</p>
            <p>{props.name}</p>
            <p>{props.qualification}</p>
            <p>{props.price}</p>
            <p>{props.brand}</p>
            <p>{props.quantity}</p>
            </Card>
</div>
    )

        }
        export default Card1