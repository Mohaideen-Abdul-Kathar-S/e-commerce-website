import React, { useState } from "react";
import { TextField, MenuItem, Button, Card, CardContent, Typography } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { userContext } from '../App';

export default function CommentsPush() {
    const { userID } = React.useContext(userContext);
  const [formData, setFormData] = useState({
    type: "Request",
    message: "",
    email: userID || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.message) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        timer: 1500,
        showConfirmButton: false,
      });
      return;
    }

    try {
      await axios.post("http://localhost:4000/sendComment", formData);
      Swal.fire({
        icon: "success",
        title: "Message sent successfully",
        timer: 1500,
        showConfirmButton: false,
      });
      setFormData({ type: "Request", message: "", email: userID || '' });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Failed to send, try again",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
      <Card sx={{ width: 400, p: 2, boxShadow: 4, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom align="center">
            Send Comments to Admin
          </Typography>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
           

            <TextField
              select
              label="Message Type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <MenuItem value="Request">Request</MenuItem>
              <MenuItem value="Complaint">Complaint</MenuItem>
              <MenuItem value="Suggestion">Suggestion</MenuItem>
            </TextField>

            <TextField
              label="Message"
              variant="outlined"
              name="message"
              value={formData.message}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />

            <Button type="submit" variant="contained" color="primary">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
