import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom';

export default function OrderedProductDetails() {
  const loc = useLocation();
  const navigate = useNavigate();
  const {val} = loc.state;
  return (
    <div>
        {
        val.product.map((data,indx)=>(
                      <div key={`${indx}`} className='smallCard'>
                       
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
                    ))
                    
                    
                    }
                    <p>Delivery Address</p>
                    <p>{val.location.address}</p>
                    <p>{val.location.City}</p>
                    <p>{val.location.pincode}</p>
                    <p>Mode of Transaction : {val.mode}</p>
                    <button onClick={()=>navigate('/Profile')}>Back</button>
    </div>
  )
}
