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
    <div>
        <center>
            <div style={{width:"600px",height:"400px",backgroundColor:"rgb(156, 156, 156)",marginTop:"10%",borderRadius:"20px"}}>
                <h3>Forgot Password</h3>
                { otp==='1m%%%n1' && ( <>
                <h4>To send OTP enter your userID</h4>
                
                <TextField 
                              variant='outlined' 
                              label="Email" 
                              type='email' 
                              name='email'  
                             
                              value={userEmail} 
                              onChange={(e)=>setuserEmail(e.target.value)} 
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
                              
                              <br />
                    <button style={{width:"100px",height:"50px",backgroundColor:"blue",color:"white",border:"none",borderRadius:"10px"}} onClick={sendOTP}> Send OTP</button>
</>) || ( isverify && (
    <>

        <h4>Change Password</h4>
                
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
                             error={error}
                             helperText={error  ? "Passwords should be match":""}
                             required
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
                   '& label.Mui-error': {
                 color: 'red', // red label when error
               }
            }}
            />
                              
                              <br />
                    <button style={{width:"100px",height:"50px",backgroundColor:"blue",color:"white",border:"none",borderRadius:"10px"}} onClick={ChangePass}>Change Password</button>
    
    </>
) || (<>
                <h4>Verificaion of OTP</h4>
                
                <TextField 
                              variant='outlined' 
                              label="OTP" 
                              type='text' 
                              name='OTP'  
                             
                              value={OTP} 
                              onChange={(e)=>setOTP(e.target.value)} 
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
                              
                              <br />
                    <button style={{width:"100px",height:"50px",backgroundColor:"blue",color:"white",border:"none",borderRadius:"10px"}} onClick={verifyOTP}> Verify OTP</button>
</>))}
            </div>
        </center>
    </div>
  )
}
