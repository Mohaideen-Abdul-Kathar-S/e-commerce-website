import React, { useState } from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@mui/material';

export default function TransactionMode() {
  const [mode, setMode] = useState('');

  const handleChange = (event) => {
    setMode(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ width: 200 }}>
        <InputLabel id="mode-label">Select Payment Mode</InputLabel>
        <Select
          labelId="mode-label"
          value={mode}
          label="Select Payment Mode"
          onChange={handleChange}
        >
          <MenuItem value={"UPI"}>UPI</MenuItem>
          <MenuItem value={"Net Banking"}>Net Banking</MenuItem>
          <MenuItem value={"Cash On Delivery"}>Cash On Delivery</MenuItem>
        </Select>
      </FormControl>
      <br />

        {
            mode=="Cash On Delivery" && <button type='button' style={{backgroundColor:"orange",border:"none",color:"white",margin:"20px",padding:"10px",fontSize:"18px"}}>Order</button>
        }
        {
            mode=="UPI" && <form >
                <input type="radio" value={"G-Pay"} name='UPI' /><label>G-Pay</label><br/>
                <input type="radio" value={"PayTM"} name='UPI' /><label>PayTM</label><br/>
                <input type="radio" value={"some"} name='UPI' /><label>some</label>
            </form>
        }
        {
            mode=="Net Banking" && <form >
                <input type="radio" value={"KVB"} name='Net Banking' /><label>KVB</label><br/>
                <input type="radio" value={"ICICI Bank"} name='Net Banking' /><label>ICICI Bank</label><br/>
                <input type="radio" value={"SBI Bank"} name='Net Banking' /><label>SBI Bank</label><br/>
                <input type="radio" value={"Indian Bank"} name='Net Banking' /><label>Indian Bank</label>
            </form>
        }

    </div>
  );
}
