import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Typography  } from '@mui/material';
import axios from 'axios';
import {userContext} from '../App';
import Swal from 'sweetalert2'
import '../compStyles/SignInRegister.css';

export default function SignInRegister() {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
    let navigate = useNavigate();
    const {setUserAddr,setUserCity,setUserNOH,setUserGender,setUserID,setUserName} = useContext(userContext);
    const login = async ()=>{
      await axios.post("http://localhost:4000/userLogin",{"_id":userEmail,"password":userPassword})
      .then((res)=>{
              Swal.fire({
  title: "Successfully Logined",
  icon:"success",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  showConfirmButton: false,
  timer:1500
});
                console.log(res);
                setUserID(userEmail);
                setUserName(res.data.userName)
                setUserAddr(res.data.userAddr)
                setUserCity(res.data.userCity)
                setUserNOH(res.data.userNOH)
                setUserGender(res.data.userGender)
                setUserEmail('');
            
                setUserPassword('');
                
            
                navigate('/')
            })
            .catch((err)=>{
                Swal.fire({
  title: "Incorect UserName or Password",
  icon:"error",
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  showConfirmButton: false,
  timer:1000
});
            })
    }
  return (
    <div >
        <div style={{backgroundColor:"gray",width:"50vw",height:"42vh",margin:"auto",marginTop:"20vh",borderRadius:"40px",border:"10px double",display:"flex",flexDirection:"column",padding:"20px",boxShadow:"15px 15px 5px 5px black"}}>
            
            <h2 style={{paddingBottom:"15px",color:"white"}}>Login</h2>
            <TextField 
              variant='outlined' 
              label="Email" 
              type='email' 
              name='email'  
             
              value={userEmail} 
              onChange={(e)=>setUserEmail(e.target.value)} 
              style={{paddingBottom:"15px"}}
              InputProps={{
                style:{
                  borderColor:"red",
                  color:"white"
                }
              }}
              InputLabelProps={{
    style: {
      color: "white",                // label color
    }
  }}
    sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',       // default border
      },
      '&:hover fieldset': {
        borderColor: 'white',       // on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',       // on focus
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white',               // placeholder text color
      opacity: 1,
    },
  }}
              required/>

            <TextField 
              variant='outlined' 
              label="password" 
              type='password' 
              name='password'  
             
              value={userPassword} 
              onChange={(e)=>setUserPassword(e.target.value)} 
              style={{paddingBottom:"20px"}}
              InputProps={{
                style:{
                  borderColor:"red",
                  color:"white"
                }
              }}
              InputLabelProps={{
    style: {
      color: "white",                // label color
    }
  }}
    sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',       // default border
      },
      '&:hover fieldset': {
        borderColor: 'white',       // on hover
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',       // on focus
      },
    },
    '& .MuiInputBase-input::placeholder': {
      color: 'white',               // placeholder text color
      opacity: 1,
    },
  }}
              required/>
              <p className='gorgotpass' onClick={()=>{navigate('/GorgotPassord')}}>Forgot Password?</p>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
              <button onClick={()=>navigate('/Register')} style={{border:"none",color:"white",padding:"5px",width:"80px",height:"40px",borderRadius:"10px",backgroundColor:"blue",margin:"10px",fontWeight:"600"}}>Register</button>
              <button onClick={login} style={{border:"none",color:"white",padding:"5px",width:"80px",height:"40px",borderRadius:"10px",backgroundColor:"greenyellow",margin:"10px",fontWeight:"600"}}>Login</button>
              </div>
        </div>
    </div>
  )
}
