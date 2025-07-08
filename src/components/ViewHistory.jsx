import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import { userContext } from '../App';
import {useNavigate} from 'react-router-dom';
import {Commet} from 'react-loading-indicators';

export default function ViewHistory() {
  const [Loading,setLoading]=useState(false);
    const {userID} = useContext(userContext);
    const [orderData,setorderData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:4000/getOrderHistory/${userID}`)
        .then((res)=>setorderData(res.data))
        .catch((err)=>console.error(err))
        .finally(()=>setLoading(true));
    })
    if(Loading){
  return (
    <div>
        {orderData.length>0 && orderData.map((val,ind)=>(
                    <div style={{border:"5px ridge black",margin:"5px",padding:"5px"}}>
                      {val.product.map((data,indx)=>(
                      <div key={`${ind}-${indx}`} className='smallCard'>
                       
                      <div className='smallCardImg'>
                        <img src={data.image} alt="imgs" style={{width:"17rem",height:"9rem"}}/>
                      </div>
                      <div className='smallCardData'>
                        <h2>{data.name}</h2>
                        <p>{data.quantity}</p>
                        <p>{data.price}</p>
                        <p >Date</p>
                        
                        {/* <button style={{marginLeft:"70%",marginBottom:"10px",margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}}>Cancel</button> */}
                      </div>
                    </div>
                    ))}
                    <p>Delivery Address</p>
                    <p>{val.location.address}</p>
                    <p>{val.location.City}</p>
                    <p>{val.location.pincode}</p>
                    <p>Mode of Transaction : {val.mode}</p>
                  
                   
                    </div>
        
                    ))}
                      <button onClick={()=>navigate('/Profile')}>Back</button>
    </div>
  )
    }else{
      return(
        <div>
          <center>
     <Commet color="#07266e" size="medium" text="Loading..." textColor="#5666c2" />
          </center>
         
        </div>
      )
    }
}
