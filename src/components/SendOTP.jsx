import React, { useState } from 'react';
import {useLocation} from 'react-router-dom';
import axios from 'axios';

function SendOTP() {
  const loc = useLocation();
  const {userID,orderID}= loc.state;
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');

  const handleSend = async () => {
    try {
      console.log(userID)
      const res = await axios.post('http://localhost:4000/send-otp',  { email: userID });
      setMessage(res.data.message);
      setOtp(res.data.otp); // show OTP for testing (remove in production)
    } catch (err) {
      setMessage('Error sending OTP');
    }
  };
  const [OTP,setOTP] = useState('');
  
  

  const Delivery = ()=>{
    if(OTP==otp){
        axios.post(`http://localhost:4000/Delivery/${orderID}`)
        .then((res)=>console.log(res))
        .catch((err)=>console.error(err));
    }
  }

  return (
    <div>
      <h2>Send OTP to {userID}</h2>
      
      <button onClick={handleSend}>Send OTP</button>
      <p>{message}</p>
      {/* <p>OTP: {otp}</p> */}
      <input type="text" name='otp' value={OTP} onChange={(e)=>setOTP(e.target.value) } />
      <button onClick={Delivery}>Deliveried</button>
    </div>
  );
}

export default SendOTP;
