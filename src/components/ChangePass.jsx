import React, { useContext,useState } from 'react'
import {userContext} from '../App'
import {TextField} from '@mui/material'
import Swal from 'sweetalert2';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';


export default function ChangePass() {
    const navigate = useNavigate();
    const {userID} = useContext(userContext);
    const [userPassword,setUserPassword] = useState('');
    const [userConformPassword,setUserConformPassword] = useState('');
    
const UpdatePass = () => {
  console.log(userID);

  axios.post("http://localhost:4000/UpdatePassword", {
    _id: userID,
    userPassword: userPassword,
    newPassword: userConformPassword
  })
    .then((res) => {
      Swal.fire({
        icon: 'success',
        title: 'Password changed successfully!',
        timer: 1500,
        showConfirmButton: false
      });

      // Redirect after delay (after SweetAlert closes)
      setTimeout(() => {
        navigate('/Profile'); // redirect to your desired page
      }, 1500);
    })
    .catch((err) => {
      console.log(err.response?.data?.message || err.message);
      Swal.fire({
        icon: 'error',
        title: "Error updating password",
        text: err.response?.data?.message || 'Something went wrong!',
        timer: 2000,
        showConfirmButton: false
      });
    });
};
  return (
    <div>
        <center>
                <div style={{marginTop:"100px",padding:"20px",backgroundColor:"gray",width:"400px",height:"400px"}}>
                    <h2>Password Changing</h2>

        <TextField 
                                     variant='outlined' 
                                     label="Current password" 
                                     type='password' 
                                     name='Current password'  
                              
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
                                     <br />
                       <TextField 
                                     variant='outlined' 
                                     label="New password" 
                                     type='password' 
                                     name='NewPassword'  
                         
                                     value={userConformPassword} 
                                     onChange={(e)=>setUserConformPassword(e.target.value)} 
                                     
                                     style={{paddingBottom:"20px"}}
                                     
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
                    <button onClick={UpdatePass}>Update</button>
                    </div>
                    </center>
    </div>
  )
}
