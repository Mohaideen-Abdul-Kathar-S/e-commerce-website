import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material'
import axios from 'axios';
import Swal from 'sweetalert2'

export default function Register() {
    const [userEmail,setUserEmail] = useState('');
    const [userName,setUserName] = useState('');
    const [userPassword,setUserPassword] = useState('');
    const [userConformPassword,setUserConformPassword] = useState('');
    const [error,setError] = useState(false);
    let navigate = useNavigate();
    const SubmitRegister = async ()=>{
        console.log("clicked")
        if(userPassword===userConformPassword){
            await axios.post("http://localhost:4000/userRegister",{userName:userName,userEmail:userEmail,userPassword:userPassword})
            .then((res)=>{
                Swal.fire({
                  title: "Successfully Registered",
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
                setUserEmail('');
                setUserName('');
                setUserPassword('');
                setUserConformPassword('');
                navigate('/SignInRegister');
                
            })
            .catch((err)=>{
                Swal.fire({
                  title: "UserName is already exists",
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
        }else{
          setError(true);
        }
    }
  return (
    <div
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
  
    padding: "10px"
  }}
>
  <div
    style={{
      backgroundColor: "gray",
      width: "90%",
      maxWidth: "450px",
      borderRadius: "20px",
      border: "5px double",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      boxShadow: "8px 8px 5px rgba(0,0,0,0.6)"
    }}
  >
    <h2 style={{ paddingBottom: "15px", color: "white", textAlign: "center" }}>
      Register
    </h2>

    {/* Name */}
    <TextField
      variant="outlined"
      label="Name"
      type="text"
      name="name"
      value={userName}
      onChange={(e) => setUserName(e.target.value)}
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
        }
      }}
      required
    />

    {/* Email */}
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
        }
      }}
      required
    />

    {/* Password */}
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
        }
      }}
      required
    />

    {/* Confirm Password */}
    <TextField
      variant="outlined"
      label="Confirm Password"
      type="password"
      name="confirmPassword"
      value={userConformPassword}
      onChange={(e) => setUserConformPassword(e.target.value)}
      style={{ marginBottom: "20px" }}
      error={error}
      helperText={error ? "Passwords should match" : ""}
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
        '& label.Mui-error': { color: 'red' }
      }}
      required
    />

    {/* Buttons */}
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "10px",
        marginTop: "10px"
      }}
    >
      <button
        onClick={() => navigate('/SignInRegister')}
        style={{
          border: "none",
          color: "white",
          padding: "10px",
          minWidth: "100px",
          borderRadius: "10px",
          backgroundColor: "greenyellow",
          fontWeight: "600"
        }}
      >
        Login
      </button>
      <button
        onClick={SubmitRegister}
        style={{
          border: "none",
          color: "white",
          padding: "10px",
          minWidth: "100px",
          borderRadius: "10px",
          backgroundColor: "blue",
          fontWeight: "600"
        }}
      >
        Register
      </button>
    </div>
  </div>
</div>

  )
}
