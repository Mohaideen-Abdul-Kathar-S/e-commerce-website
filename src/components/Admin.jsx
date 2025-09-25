import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Admin() {
  const navigate = useNavigate();
  const [AdminID, setAdminID] = useState("");
  const [AdminPass, setAdminPass] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const AdminLogin = async () => {
    axios
      .post("http://localhost:4000/AdminLogin", { AdminID, AdminPass })
      .then((res) => {
        console.log(res);
        if (res.data != null) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Successfully Logged In",
            showConfirmButton: false,
            timer: 1500,
          });
          setIsLogin(true);
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Error in Login",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f0f2f5",
        p: 2,
      }}
    >
      {!isLogin ? (
        <Card
          sx={{
            width: 350,
            p: 3,
            borderRadius: 3,
            boxShadow: 4,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ mb: 2, fontWeight: "bold", color: "#1976d2" }}
            >
              Admin Login
            </Typography>

            <TextField
              fullWidth
              type="text"
              variant="outlined"
              label="Admin ID"
              value={AdminID}
              onChange={(e) => setAdminID(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              type="password"
              variant="outlined"
              label="Password"
              value={AdminPass}
              onChange={(e) => setAdminPass(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": { backgroundColor: "#125699" },
                fontWeight: "bold",
              }}
              onClick={AdminLogin}
            >
              Login
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card
          sx={{
            width: 400,
            p: 3,
            borderRadius: 3,
            boxShadow: 4,
            textAlign: "center",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              component="div"
              sx={{ mb: 3, fontWeight: "bold", color: "#2e7d32" }}
            >
              Welcome Admin 👋
            </Typography>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                borderColor: "#1976d2",
                color: "#1976d2",
                "&:hover": { backgroundColor: "#1976d2", color: "white" },
              }}
              onClick={() =>
                navigate("/ProductInput", { state: { isLogin: isLogin } })
              }
            >
              Manage Products
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                mb: 2,
                borderColor: "#d32f2f",
                color: "#d32f2f",
                "&:hover": { backgroundColor: "#d32f2f", color: "white" },
              }}
              onClick={() =>
                navigate("/CustomersOrders", { state: { isLogin: isLogin } })
              }
            >
              View Orders
            </Button>

            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: "#4bf362ff",
                color: "#4bf362ff",
                "&:hover": { backgroundColor: "#4bf362ff", color: "white" },
              }}
              onClick={() =>
                navigate("/CustomersCommands", { state: { isLogin: isLogin } })
              }
            >
              View Commands
            </Button>

          </CardContent>
        </Card>
      )}
    </Box>
  );
}
