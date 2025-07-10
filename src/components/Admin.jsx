import React, { useState } from 'react'
import { TextField } from '@mui/material'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
export default function Admin() {
    const navigate = useNavigate();
    const [AdminID,setAdminID] = useState('');
    const [AdminPass,setAdminPass] = useState('');
    const [isLogin,setIsLogin] = useState(false);
    const AdminLogin = async()=>{
        axios.post('http://localhost:4000/AdminLogin',{AdminID,AdminPass})
        .then((res)=>{
            console.log(res)
            if(res.data != null){Swal.fire({
              position: "top-end",
              icon: "success",
              title: "successfully Logined",
              showConfirmButton: false,
              timer: 1500
            });
        setIsLogin(true)
    }else
            {Swal.fire({
              position: "top-end",
              icon: "error",
              title: "Error in Login",
              showConfirmButton: false,
              timer: 1500
            });}
            })
        .catch((err)=>{
            console.log(err);
        })
    }

  return (
    <div>
        {!isLogin && (<div>
            <TextField type='text' variant='outlined' label='AdminID' name='AdminID' value={AdminID} onChange={(e)=>setAdminID(e.target.value)}/> <br />
            <TextField  type='password' variant='outlined' label='Password' name='AdminPassword' value={AdminPass} onChange={(e)=>setAdminPass(e.target.value)}/> <br />
            <button onClick={AdminLogin}>Login</button>
        </div>) ||
        (<div>
            <button onClick={()=>navigate('/ProductInput' , {state:{isLogin:isLogin}})}>Product Details</button> <br />
            <button onClick={()=>navigate('/CustomersOrders', {state:{isLogin:isLogin}})}>Orders</button>
        </div>)}
    </div>
  )
}
