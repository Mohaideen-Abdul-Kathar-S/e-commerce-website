import React, { useState,useContext } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Grid,
  Paper,
} from "@mui/material";
import { useLocation,useNavigate } from 'react-router-dom';
import {userContext} from '../App';
import axios from 'axios';
import Grocery from './Grocery';
import Swal from 'sweetalert2';


export default function TransactionMode() {
  let navigate = useNavigate();
  let location = useLocation();
  const {data,loc} = location.state;
  const {userID} = useContext(userContext);

  const [mode, setMode] = useState('');
  const [orders,setOrders] = useState({});

  const handleChange = (event) => {
    setMode(event.target.value);
  };
  const PlaceOrder = async ()=>{
    orders.product = data;
    orders.location = loc;
    orders.mode = mode;
    orders.userID = userID;
    console.log(orders);
    await axios.post("http://localhost:4000/postOrderDetails",orders)
    .then((res)=>{
      Swal.fire({
  position: "top-end",
  icon: "success",
  title: "Your Order has been saved",
  showConfirmButton: false,
  timer: 1500
});

      navigate('/Grocery');
    })
    .catch((err)=>console.error(err));
  }
  return (
    <div style={{ padding: "20px" }}>
  <Paper sx={{ padding: 3, maxWidth: 500, margin: "auto",minHeight: "80vh", overflowY: "auto" }}>
    <Grid container spacing={3}>
      {/* Payment Mode Dropdown */}
      <Grid item xs={12}>
  <FormControl
    fullWidth
    sx={{
      minWidth: "100%",
      '@media (max-width:600px)': {
        fontSize: "14px"
      }
    }}
  >
    <InputLabel id="mode-label">Select Payment Mode</InputLabel>
  <Select
  native
  value={mode}
  onChange={handleChange}
  fullWidth
>
  <option value="">Select Payment Mode</option>
  <option value="UPI">UPI</option>
  <option value="Net Banking">Net Banking</option>
  <option value="Cash On Delivery">Cash On Delivery</option>
</Select>

  </FormControl>
</Grid>


      {/* UPI Options */}
      {mode === "UPI" && (
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup name="UPI" row={false}>
              <FormControlLabel value="G-Pay" control={<Radio />} label="G-Pay" />
              <FormControlLabel value="PayTM" control={<Radio />} label="PayTM" />
              <FormControlLabel value="some" control={<Radio />} label="some" />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}

      {/* Net Banking Options */}
      {mode === "Net Banking" && (
        <Grid item xs={12}>
          <FormControl component="fieldset" fullWidth>
            <RadioGroup name="NetBanking" row={false}>
              <FormControlLabel value="KVB" control={<Radio />} label="KVB" />
              <FormControlLabel value="ICICI Bank" control={<Radio />} label="ICICI Bank" />
              <FormControlLabel value="SBI Bank" control={<Radio />} label="SBI Bank" />
              <FormControlLabel value="Indian Bank" control={<Radio />} label="Indian Bank" />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}

      {/* Place Order Button */}
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={PlaceOrder}
          sx={{ padding: "10px", fontSize: "16px" }}
        >
          Place Order
        </Button>
      </Grid>
    </Grid>
  </Paper>
</div>
  );
}
