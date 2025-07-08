import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

export default function CustomersOrders() {
    const navigate = useNavigate();
    const [orderData,setOrderData] = useState([]);
    useEffect(()=>{
        axios.get("http://localhost:4000/getCustomersOrders")
        .then((res)=>{
            setOrderData(res.data);
        })
        .catch((err)=>console.log(err));
    },[])

  return (
    <div>
        {orderData.length>0 && orderData.map((val,ind)=>(
                    <div style={{border:"5px ridge black",margin:"5px",padding:"5px"}}>
                        <h4>userID : {val.userID}</h4>
                        <p>Delivery Address</p>
                    <p>Address : {val.location.address}</p>
                    <p>City : {val.location.City}</p>
                    <p>PinCode : {val.location.Pincode}</p>
                    <p>Mode of Transaction : {val.mode}</p>
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
                        
                        
                      </div>
                      
                    </div>
                    
                    ))}
                    <div style={{display:'flex',flexDirection:"row"}}>
               <button style={{flex:"1",border:"none",padding:"10px",fontSize:"18px",backgroundColor:"Blue",color:"white"}} onClick={()=>navigate('/SendOTP',{state:{userID : val.userID,orderID:val._id}})} >Delivery</button>
           
            </div>
                    
                   
                    </div>
        
                    ))}
    </div>
  )
}
