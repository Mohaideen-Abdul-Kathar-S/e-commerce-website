import React, { useContext, useEffect, useState } from 'react'
import img from '../assets/img1.jpeg';
import '../compStyles/Profile.css';
import { ChevronRight, X } from 'lucide-react';
import { userContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Profile() {
  const {UserAddr,setUserAddr,UserCity,setUserCity,setUserNOH,UserNOH,setUserGender,UserGender,userID,setUserID,UserName,setUserName} = useContext(userContext);
  const [isEdit,setIsEdit] = useState(true);
  const [viewLoc,setViewLoc] = useState(false);
  const [viewOrderDetails,setViewOrderDetails] = useState(false);
  const [viewAccounts,setViewAccounts] = useState(false);
  const [name,setname] = useState(UserName)
  const [gender,setgender] = useState(UserGender)
  const [city,setcity] = useState(UserCity)
  const [addr,setaddr] = useState(UserAddr)
  const [nameofhouse,setnameofhouse] = useState(UserNOH)
  const [orderData,setOrderData] = useState([]);
  const navigate = useNavigate();
  const onChangeName = (e)=>{
    setname(e.target.value);
  }
  const onChangeGender = (e)=>{
    setgender(e.target.value);
  }
  const onChangeCity = (e)=>{
    setcity(e.target.value);
  }
  const onChangeAddr = (e)=>{
  setaddr(e.target.value);
  }
  const onChangeNameofhouse = (e)=>{
  
  setnameofhouse(e.target.value);
  }
  const ChangeIsEdit = ()=>{
    setIsEdit(!isEdit);
  }
  const SaveDetails = async()=>{
    await axios.put("http://localhost:4000/updateUserDetails",{name,gender,nameofhouse,city,addr,userID})
    .then((res)=>console.log(res))
    .catch((err)=>console.error(err));
    setUserName(name);
    setUserGender(gender);
    setUserNOH(nameofhouse);
    setUserCity(city);
    setUserAddr(addr);
    setIsEdit(!isEdit);
  }
  useEffect(()=>{
    console.log("axios run in profile")
    axios.get(`http://localhost:4000/getOrderDetails/${userID}`)
    .then((res)=>{setOrderData(res.data)})
    .catch((err)=>console.error(err));

  },[])

  const cancelOrder = (id)=>{
    axios.delete(`http://localhost:4000/deleteOrder/${id}`)
    .then((res)=>{console.log(res);
      axios.get(`http://localhost:4000/getOrderDetails/${userID}`)
    .then((res)=>{setOrderData(res.data)})
    .catch((err)=>console.error(err));
    })
    .catch((err)=>console.error(err));
  }

  const OrderDetails = (val)=>{
      navigate('/OrderedProductDetails',{state:{val}});
  }

  const navtoHistory = ()=>{
    navigate('/ViewHistory');
  }
  return (
    <div>
      <button className='logoutbtn' onClick={()=>{setUserID('')}}>Logout</button>
      <div className='imgCont'>
      <img src={img} alt="profile picture" className='profilePic'/>
      <h2>{UserName}</h2>
      </div>
      <div>
        {viewLoc==false && <div className='Details' onClick={()=>setViewLoc(true)}>
          Location & Details {<ChevronRight  style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Location & Details  <X onClick={()=>setViewLoc(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
            <label>Name : </label> 
            {isEdit && (<label>{UserName}</label>) || (<input value={name} onChange={onChangeName}/>)} <br />
            <label>Email : </label>
            <label>{userID}</label> <br />
            <label>Gender : </label>
            {isEdit && (<label>{UserGender}</label>) || (<input value={gender} onChange={onChangeGender}/>)} <br />
            <label>Name of house : </label>
            {isEdit && (<label>{UserNOH}</label>) || (<input value={nameofhouse} onChange={onChangeNameofhouse}/>)} <br />
            <label>City : </label>
            {isEdit && (<label>{UserCity}</label>) || (<input value={city} onChange={onChangeCity}/>)} <br />
            <label>Address : </label>
            {isEdit && (<label>{UserAddr}</label>) || (<input value={addr} onChange={onChangeAddr}/>)}<br />
            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}} onClick={()=>{isEdit?ChangeIsEdit():SaveDetails()}}>{isEdit && "Edit Details" || "Save Details"}</button>
          </div>
          }
        { viewOrderDetails==false &&  <div className='Details' onClick={()=>setViewOrderDetails(true)}>
          Order & Details {<ChevronRight style={{marginLeft:"90vw"}}/>}
        </div> || 
        <div className='OpenDetails'>
            <div className='LocationHead'>Order & Details  <X onClick={()=>setViewOrderDetails(false)} className='X' style={{marginLeft:"90vw",cursor:'pointer'}}/></div>
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
            <div style={{display:'flex',flexDirection:"row"}}>
               <button style={{flex:"1",border:"none",padding:"10px",fontSize:"18px",backgroundColor:"Blue",color:"white"}} onClick={()=>OrderDetails(val)} >Details</button>
            <button style={{flex:"1",border:"none",padding:"10px",fontSize:"18px",backgroundColor:"red",color:"white"} } onClick={()=>cancelOrder(val._id)}>Cancel</button>
            </div>
           
            </div>

            ))}
            <button style={{margin:"20px",border:"none",padding:"10px",borderRadius:"10px",fontSize:"18px",backgroundColor:"yellow",color:"gray"}} onClick={()=>navtoHistory()}>View History</button>
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
