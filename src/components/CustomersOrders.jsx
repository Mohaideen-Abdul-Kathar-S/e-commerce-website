import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Grid,
  Divider,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function CustomersOrders() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { isLogin } = loc.state || false;
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getCustomersOrders")
      .then((res) => {
        setOrderData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!isLogin) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" color="error">
          Please Login
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Navigation Buttons */}
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        <Button variant="outlined" onClick={() => navigate("/Admin")}>
          Back
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/ProductInput", { state: { isLogin } })}
        >
          Product Details
        </Button>
      </Box>

      {/* Orders */}
      {orderData.length > 0 ? (
        orderData.map((val, ind) => (
          <Card
            key={ind}
            sx={{
              mb: 3,
              borderRadius: 3,
              boxShadow: 4,
              overflow: "hidden",
            }}
          >
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Order by UserID: {val.userID}
              </Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                Delivery Address
              </Typography>
              <Typography variant="body2">
                {val.location.address}, {val.location.City} -{" "}
                {val.location.Pincode}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Mode of Transaction: <b>{val.mode}</b>
              </Typography>

              <Divider sx={{ mb: 2 }} />

              {/* Products in Order */}
              <Grid container spacing={2}>
                {val.product.map((data, indx) => (
                  <Grid item xs={12} sm={6} md={4} key={`${ind}-${indx}`}>
                    <Card
                      sx={{
                        borderRadius: 2,
                        boxShadow: 2,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        sx={{
                          height: 150,
                          overflow: "hidden",
                          borderBottom: "1px solid #eee",
                        }}
                      >
                        <img
                          src={data.image}
                          alt={data.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>
                      <CardContent>
                        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                          {data.name}
                        </Typography>
                        <Typography variant="body2">
                          Quantity: {data.quantity}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "green" }}>
                          ₹ {data.price}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ display: "block", mt: 1, color: "gray" }}
                        >
                          Date: {new Date().toLocaleDateString()}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {/* Delivery Button */}
              <Box sx={{ mt: 3, textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{
                    borderRadius: 2,
                    px: 5,
                    fontWeight: "bold",
                    textTransform: "none",
                  }}
                  onClick={() =>
                    navigate("/SendOTP", {
                      state: { userID: val.userID, orderID: val._id },
                    })
                  }
                >
                  Mark as Delivery
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ textAlign: "center", mt: 5 }}>
          No orders available
        </Typography>
      )}
    </Box>
  );
}
