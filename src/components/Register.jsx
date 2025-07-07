import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material'
import axios from 'axios';

export default function Register() {
    const [userEmail,setUserEmail] = useState('');
    const [userName,setUserName] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [userConformPassword,setUserConformPassword] = useState('');
    let navigate = useNavigate();
    const SubmitRegister = async ()=>{
        console.log("clicked")
        if(userPassword===userConformPassword){
            await axios.post("http://localhost:4000/userRegister",{userName:userName,userEmail:userEmail,userPassword:userPassword})
            .then((res)=>{
                console.log(res);
                setUserEmail('');
                setUserName('');
                setUserPassword('');
                setUserConformPassword('');
                navigate('/SignInRegister');
                
            })
            .catch((err)=>{
                console.error(err);
            })
        }
    }
  return (
    <div >
        <div style={{backgroundColor:"gray",width:"50vw",height:"60vh",margin:"auto",marginTop:"20vh",borderRadius:"40px",border:"10px double",display:"flex",flexDirection:"column",padding:"20px",boxShadow:"15px 15px 5px 5px black"}}>
              <h2 style={{paddingBottom:"15px",color:"white"}}>Register</h2>
            <TextField 
              variant='outlined' 
              label="Name" 
              type='text' 
              name='name'  
           
              value={userName} 
              onChange={(e)=>setUserName(e.target.value)} 
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
<TextField 
              variant='outlined' 
              label="Conform password" 
              type='password' 
              name='ConformPassword'  
  
              value={userConformPassword} 
              onChange={(e)=>setUserConformPassword(e.target.value)} 
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
              
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                <button  onClick={()=>navigate('/SignInRegister') } style={{border:"none",color:"white",padding:"5px",width:"80px",height:"40px",borderRadius:"10px",backgroundColor:"greenyellow",margin:"10px",fontWeight:"600"}}>Login</button>
              <button onClick={SubmitRegister} style={{border:"none",color:"white",padding:"5px",width:"80px",height:"40px",borderRadius:"10px",backgroundColor:"blue",margin:"10px",fontWeight:"600"}}>Register</button>
            
              </div>
        </div>
    </div>
  )
}
