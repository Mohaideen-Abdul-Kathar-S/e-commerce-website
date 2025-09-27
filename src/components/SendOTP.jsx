import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";

function SendOTP() {
  const loc = useLocation();
  const navigate = useNavigate();
  const { userID, orderID } = loc.state;
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState(""); // backend OTP (testing only)
  const [OTP, setOTP] = useState(""); // user input OTP
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSend = async () => {
    try {
      setLoading(true);
      setMessage("");
      const res = await axios.post("http://localhost:4000/send-otp", {
        email: userID,
      });
      console.log(res.data);
      setMessage(res.data.message);
      setOtp(res.data.otp); // ❌ remove in production
      
    } catch (err) {
      setMessage("❌ Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const Delivery = async () => {
    console.log(`OTP:${OTP},otp:${otp}`);
    if (OTP == otp) {
      try {
        await axios.post(`http://localhost:4000/Delivery/${orderID}`);
        setSuccess(true);
        setMessage("✅ Order marked as Delivered!");
        // Prompt user to enter amount
swal({
  title: "Enter Amount",
  text: "Please enter the amount",
  content: "input",
  button: true,
})
.then(async (value) => {
  if (value) {
    let amount = parseFloat(value);

    try {
      // Call API and wait until it finishes
      await axios.post(`http://localhost:4000/userExpense`, {
  orderId: orderID,
  spendAmount: amount,
});

      // Only after API success, show success alert
      swal("Success", `You entered: ₹${amount}`, "success");
      
      // 👉 You can move to next step here
      // e.g., redirect or reload
      // window.location.href = "/orders";

    } catch (error) {
      console.error("API Error:", error);
      swal("Error", "Failed to save expense. Please try again!", "error");
    }

  } else {
    swal("Cancelled", "No amount entered", "error");
  }
});


        setTimeout(() => navigate("/CustomersOrders", { state: { isLogin: true } }), 1500);
      } catch (err) {
        console.error(err);
        setMessage("❌ Delivery update failed");
      }
    } else {
      setMessage("❌ Incorrect OTP");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f4f6f8",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", borderRadius: 3, boxShadow: 5 }}>
        <CardContent>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Delivery OTP Verification
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Send OTP to: <b>{userID}</b>
          </Typography>

          {message && (
            <Alert
              severity={success ? "success" : "info"}
              sx={{ mb: 2 }}
            >
              {message}
            </Alert>
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Send OTP"}
            </Button>
          </Box>

          <TextField
            label="Enter OTP"
            variant="outlined"
            fullWidth
            value={OTP}
            onChange={(e) => setOTP(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            sx={{ fontWeight: "bold", textTransform: "none" }}
            onClick={Delivery}
          >
            Confirm Delivery
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SendOTP;
