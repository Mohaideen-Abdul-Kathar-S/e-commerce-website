import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function ProductInput() {
  const navigate = useNavigate();
  const loc = useLocation();
  const { isLogin } = loc.state || false;
  const [IDs, setIDs] = useState([]);
  const [productsDetails, setProductDetails] = useState({
    _id: "",
    name: "",
    price: "",
    count: "",
    image: "",
    category: "",
    desc: "",
  });

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;
    if (name === "_id") {
      axios
        .get(`http://localhost:4000/getGroceryByID/${value}`)
        .then((res) => {
          if (res.data.length > 0) {
            setProductDetails(...res.data);
          } else {
            setProductDetails((prev) => ({
              ...prev,
              [name]: value,
            }));
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setProductDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/postdata", productsDetails)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Item saved successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        setProductDetails({
          _id: "",
          name: "",
          price: "",
          count: "",
          image: "",
          category: "",
          desc: "",
        });
      })
      .catch((err) => {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Please try again",
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/getProductsIDs")
      .then((res) => {
        setIDs(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const DeleteItem = () => {
    if (productsDetails._id) {
      axios
        .delete(`http://localhost:4000/DeleteProduct/${productsDetails._id}`)
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setProductDetails({
            _id: "",
            name: "",
            price: "",
            count: "",
            image: "",
            category: "",
            desc: "",
          });
        })
        .catch((err) => {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Please try again",
            showConfirmButton: false,
            timer: 1500,
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Please select Item ID",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  if (isLogin) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "#f0f2f5",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 4,
        }}
      >
        <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, boxShadow: 5 }}>
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold", textAlign: "center" }}>
              Product Management
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/Admin")}>
                Back
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate("/CustomersOrders", { state: { isLogin: isLogin } })}
              >
                Customers Orders
              </Button>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <form onSubmit={onSubmitHandler}>
              <Autocomplete
                freeSolo
                options={IDs}
                value={productsDetails._id || ""}
                onInputChange={(event, newInputValue) => {
                  onChangeHandler({ target: { name: "_id", value: newInputValue } });
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Product ID" fullWidth sx={{ mb: 2 }} />
                )}
              />

              <TextField
                label="Product Name"
                name="name"
                value={productsDetails.name}
                onChange={onChangeHandler}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label="Price"
                type="number"
                name="price"
                value={productsDetails.price}
                onChange={onChangeHandler}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label="Count"
                type="number"
                name="count"
                value={productsDetails.count}
                onChange={onChangeHandler}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label="Image URL"
                name="image"
                value={productsDetails.image}
                onChange={onChangeHandler}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label="Category"
                name="category"
                value={productsDetails.category}
                onChange={onChangeHandler}
                fullWidth
                sx={{ mb: 2 }}
              />

              <TextField
                label="Description"
                name="desc"
                value={productsDetails.desc}
                onChange={onChangeHandler}
                multiline
                rows={3}
                fullWidth
                sx={{ mb: 2 }}
              />

              {/* Buttons */}
              <Box sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                  Save / Update
                </Button>
                <Button type="button" variant="outlined" color="error" onClick={DeleteItem}>
                  Delete
                </Button>
              </Box>
            </form>

            {/* Live Product Preview */}
            {productsDetails.image && (
              <Box sx={{ textAlign: "center", mt: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  Product Preview:
                </Typography>
                <img
                  src={productsDetails.image}
                  alt="preview"
                  style={{
                    maxWidth: "100%",
                    height: "200px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    );
  } else {
    return (
      <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Typography variant="h6" color="error">
          Please Login
        </Typography>
      </Box>
    );
  }
}
