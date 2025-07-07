import React, { useState } from 'react';
import axios from 'axios';

function SendOTP() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOtp] = useState('');

  const handleSend = async () => {
    try {
      const res = await axios.post('http://localhost:4000/send-otp', { email });
      setMessage(res.data.message);
      setOtp(res.data.otp); // show OTP for testing (remove in production)
    } catch (err) {
      setMessage('Error sending OTP');
    }
  };
  const [OTP,setOTP] = useState('');
  const orderID = "686bf575fe0b4e09040d7455";
  const mail = "mak@gmail.com";

  const Delivery = ()=>{
    if(OTP==otp){
        axios.post(`http://localhost:4000/Delivery/${orderID}`)
        .then((res)=>console.log(res))
        .catch((err)=>console.error(err));
    }
  }

  return (
    <div>
      <h2>Send OTP to Email</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSend}>Send OTP</button>
      <p>{message}</p>
      {/* <p>OTP: {otp}</p> */}
      <input type="text" name='otp' value={OTP} onChange={(e)=>setOTP(e.target.value) } />
      <button onClick={Delivery}>Deliveried</button>
    </div>
  );
}

export default SendOTP;
