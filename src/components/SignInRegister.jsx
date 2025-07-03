import React, { useState } from 'react'
import { TextField } from '@mui/material'

export default function SignInRegister() {
    const [userEmail,setUserEmail] = useState('');
    const [userPassword,setUserPassword] = useState('');
  return (
    <div>
        <div>
            <TextField variant='outlined' label="Email" type='email' name='email'  placeholder='Email' value={userEmail} onChange={(e)=>setUserEmail(e.target.value)} required/>
            <TextField variant='outlined' label="password" type='password' name='password'  placeholder='Password' value={userPassword} onChange={(e)=>setUserPassword(e.target.value)} required/>
        </div>
    </div>
  )
}
