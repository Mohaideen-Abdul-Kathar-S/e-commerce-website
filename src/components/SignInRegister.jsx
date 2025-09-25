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
      if(userEmail==='' || userPassword===''){
        Swal.fire({
  title: "Please Fill All The Fields",
  icon:"warning",
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
        return;
      }
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
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
   
  }}
>
  <div
    style={{
      backgroundColor: "gray",
      width: "90%",
      maxWidth: "400px",
      borderRadius: "20px",
      border: "5px double",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      boxShadow: "8px 8px 5px rgba(0,0,0,0.6)"
    }}
  >
    <h2 style={{ paddingBottom: "15px", color: "white", textAlign: "center" }}>
      Login
    </h2>

    {/* Email Field */}
    <TextField
      variant="outlined"
      label="Email"
      type="email"
      name="email"
      value={userEmail}
      onChange={(e) => setUserEmail(e.target.value)}
      style={{ marginBottom: "15px" }}
      InputProps={{
        style: { color: "white" }
      }}
      InputLabelProps={{
        style: { color: "white" }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'white' },
          '&:hover fieldset': { borderColor: 'white' },
          '&.Mui-focused fieldset': { borderColor: 'white' }
        },
        '& .MuiInputBase-input::placeholder': {
          color: 'white',
          opacity: 1
        }
      }}
      required
    />

    {/* Password Field */}
    <TextField
      variant="outlined"
      label="Password"
      type="password"
      name="password"
      value={userPassword}
      onChange={(e) => setUserPassword(e.target.value)}
      style={{ marginBottom: "15px" }}
      InputProps={{
        style: { color: "white" }
      }}
      InputLabelProps={{
        style: { color: "white" }
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '& fieldset': { borderColor: 'white' },
          '&:hover fieldset': { borderColor: 'white' },
          '&.Mui-focused fieldset': { borderColor: 'white' }
        },
        '& .MuiInputBase-input::placeholder': {
          color: 'white',
          opacity: 1
        }
      }}
      required
    />

    <p
      style={{
        color: "#ccc",
        cursor: "pointer",
        textAlign: "right",
        fontSize: "14px"
      }}
      onClick={() => navigate('/GorgotPassord')}
    >
      Forgot Password?
    </p>

    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "10px"
      }}
    >
      <button
        onClick={() => navigate('/Register')}
        style={{
          border: "none",
          color: "white",
          padding: "5px",
          width: "80px",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "blue",
          fontWeight: "600"
        }}
      >
        Register
      </button>
      <button
        onClick={login}
        style={{
          border: "none",
          color: "white",
          padding: "5px",
          width: "80px",
          height: "40px",
          borderRadius: "10px",
          backgroundColor: "greenyellow",
          fontWeight: "600"
        }}
      >
        Login
      </button>
    </div>
  </div>
</div>

  )
}
