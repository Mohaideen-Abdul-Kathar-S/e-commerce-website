import React, {useState } from 'react'
import {TextField} from '@mui/material';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'

export default function GorgotPassord() {
    const navigate = useNavigate();
    const [userEmail,setuserEmail] = useState('');
    const [OTP,setOTP] = useState('');
    const [otp,setotp] = useState('1m%%%n1');
    const [isverify,setIsVerify] = useState(false);
    const [userPassword,setUserPassword] = useState('');
    const [userConformPassword,setUserConformPassword] = useState('');
    const [error,setError] = useState(false);
    const sendOTP = async ()=>{
          Swal.fire({
    title: "Sending OTP...",
    html: "Please wait while we process your request.",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });
        
        axios.post('http://localhost:4000/CheckUserID',{ email: userEmail })
        .then(async (msg)=>{
            try {
      
      const res = await axios.post('http://localhost:4000/send-otp',  { email: msg.data._id });

     setotp(res.data.otp);
     Swal.close(); 
    } catch (err) {
      console.log(err);
    }
        }).catch((err)=>{
            Swal.fire({
      icon: 'error',
      title: 'Invalid UserID',
      timer: 1000,
      showConfirmButton: false
    });
        });

    }
    const verifyOTP = ()=>{
       
        if(otp==OTP){
            Swal.fire({
      icon: 'success',
      title: 'OTP Verified',
      timer: 1000,
      showConfirmButton: false
    });
            setIsVerify(true);
        }else{
            Swal.fire({
      icon: 'error',
      title: 'Invalid OTP',
      timer: 1000,
      showConfirmButton: false
    });
        }
    }
    const ChangePass = async ()=>{
        if(userPassword===userConformPassword){
            setError(false);
            axios.put("http://localhost:4000/updatePassword",{_id :userEmail,userPassword:userPassword})
            .then((res)=>{
                Swal.fire({
                    position:"top-right",
      icon: 'success',
      title: 'Password Changed',
      timer: 1000,
      showConfirmButton: false
    });
                navigate('/SignInRegister')})
            .catch((err)=>console.log(err));
        }else{
            setError(true);
        }
    }
  return (
   <div style={{ padding: "20px" }}>
  <center>
    <div
      style={{
        width: "90%",
        maxWidth: "600px",
        backgroundColor: "rgb(156, 156, 156)",
        marginTop: "10%",
        borderRadius: "20px",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ color: "white", marginBottom: "20px" }}>Forgot Password</h3>

      {otp === "1m%%%n1" ? (
        <>
          <h4 style={{ color: "white" }}>To send OTP enter your userID</h4>

          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={userEmail}
            onChange={(e) => setuserEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                color: "white",
              },
            }}
            InputLabelProps={{
              style: {
                color: "white",
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            required
          />

          <button
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "45px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "10px",
              marginTop: "15px",
            }}
            onClick={sendOTP}
          >
            Send OTP
          </button>
        </>
      ) : isverify ? (
        <>
          <h4 style={{ color: "white" }}>Change Password</h4>

          <TextField
            variant="outlined"
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            required
          />

          <TextField
            variant="outlined"
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={userConformPassword}
            onChange={(e) => setUserConformPassword(e.target.value)}
            error={error}
            helperText={error ? "Passwords should match" : ""}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
              "& label.Mui-error": { color: "red" },
            }}
            required
          />

          <button
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "45px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "10px",
              marginTop: "15px",
            }}
            onClick={ChangePass}
          >
            Change Password
          </button>
        </>
      ) : (
        <>
          <h4 style={{ color: "white" }}>Verification of OTP</h4>

          <TextField
            variant="outlined"
            label="OTP"
            type="text"
            fullWidth
            margin="normal"
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            InputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "white" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "white" },
                "&:hover fieldset": { borderColor: "white" },
                "&.Mui-focused fieldset": { borderColor: "white" },
              },
            }}
            required
          />

          <button
            style={{
              width: "100%",
              maxWidth: "200px",
              height: "45px",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "10px",
              marginTop: "15px",
            }}
            onClick={verifyOTP}
          >
            Verify OTP
          </button>
        </>
      )}
    </div>
  </center>
</div>

  )
}
