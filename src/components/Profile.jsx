import React, { useState } from 'react'
import img from '../assets/img1.jpeg';
import '../compStyles/Profile.css';
import { ChevronRight, X } from 'lucide-react';
import { TbRulerMeasure2 } from 'react-icons/tb';


export default function Profile() {
  const [viewLoc,setViewLoc] = useState(false);
  const [viewOrderDetails,setViewOrderDetails] = useState(false);
  const [viewAccounts,setViewAccounts] = useState(false);
  return (
    <div>
      <button className='logoutbtn'>Logout</button>
      <div className='imgCont'>
      <img src={img} alt="profile picture" className='profilePic'/>
      <h2>User Name</h2>
      </div>
      <div>
        {viewLoc==false && <div className='Details' onClick={()=>setViewLoc(true)}>
          Location & Details {<ChevronRight  style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Location & Details  <X onClick={()=>setViewLoc(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
            <p >Name : </p>
            <p >Email : </p>
            <p >Gender : </p>
            <p >Name of house : </p>
            <p >City : </p>
            <p >Address : </p>
            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}}>Edit Details</button>
          </div>
          }
        { viewOrderDetails==false &&  <div className='Details' onClick={()=>setViewOrderDetails(true)}>
          Order & Details {<ChevronRight style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Order & Details  <X onClick={()=>setViewOrderDetails(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
            <div className='smallCard'>
              <div className='smallCardImg'>
                <img src={img} alt="imgs" style={{width:"17rem",height:"9rem"}}/>
              </div>
              <div className='smallCardData'>
                <h2>Product names</h2>
                <p>quantity</p>
                <p>Price</p>
                <p style={{float:"left"}}>Date</p>
                <button style={{marginLeft:"70%",marginBottom:"10px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"red",color:"white"}}>Cancel</button>
                {/* <button style={{marginLeft:"70%",marginBottom:"10px",margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}}>Cancel</button> */}
              </div>
            </div>
            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}}>View History</button>
            </div>}
        {viewAccounts==false && <div className='Details' onClick={()=>setViewAccounts(true)}>
          Accounts {<ChevronRight style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Accounts  <X onClick={()=>setViewAccounts(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
            <label >Balance : -200</label><br />
            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}}>View Transaction</button>
            </div>}

      </div>
    </div>
  )
}
