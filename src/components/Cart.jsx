import React,{useContext, useEffect, useState} from 'react';
import {userContext} from '../App';
import {Link } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TextField from '@mui/material/TextField'
import {Commet} from 'react-loading-indicators';
import Swal from 'sweetalert2';

export default function Cart() {
   const [Loading,setLoading]=useState(false);
  const {userID} = useContext(userContext);
  const [addtocart,setAddtocart] = useState({_id:''});
  const [userCartDetails,setUserCartDetails] = useState([]);
  const [navcount,setNavCount]=useState(0);
  useEffect(()=>{
    axios.get(`http://localhost:4000/getCartDetails/${userID}`)
    .then((res)=>setUserCartDetails(res.data.userCart))
    .catch((err)=>console.error(err))
    .finally(()=>setLoading(true));
  });

  const removeFromCart = (id)=>{

      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result)=>{
  if(result.isConfirmed){
    const uid = userID;
    console.log(uid,id)
    axios.delete('http://localhost:4000/removeFromCart',{data:{"id":id,"userID":uid}})
    .then((res)=>{
      Swal.fire({
        position: "top-end",
      title: "Deleted!",
      text: "Your item removed from cart",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    })
    .catch((err)=>console.error(err));
  }
})
  
    
  }
 

  const EditCartProduct = (data)=>{
    setAddtocart(data);
  }

  const UpdateDetailsInCart = async (data)=>{
    setAddtocart({_id:''})
    await axios.put("http://localhost:4000/addToCart",{"data":data,"userID":userID})
    .then((res)=>{
      Swal.fire({
        title: "Details Saved",
        icon:"success",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        showConfirmButton: false,
        timer:1500
      });
    })
    .catch((err)=>console.error(err));
  }

  const checkavailale = async(CartData)=>{
    setNavCount(0);
    CartData.map((data)=>{
      axios.get(`http://localhost:4000/getGroceryByID/${data._id}`)
      .then((res)=>{
        console.log(res.data[0].count);
if(data.quantity>res.data[0].count){
  
  Swal.fire({
  title: `the item ${data.name} is exceeded its limit`,
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});
        
        setNavCount(0);
        
      }else{
        
        setNavCount((prev) => {
    const updated = prev + 1;
    console.log("nav" + updated + "....size" + CartData.length);
    return updated;
  });
      }
      })

      
    })
  }

  if(Loading){
  return (
  <div
    style={{
      marginTop: "20px",
      padding: "20px",
      background: "linear-gradient(135deg, #f9fafb, #e0f2fe)",
      minHeight: "100vh",
    }}
  >
    {/* Cart Items Grid */}
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {userCartDetails.map((data) => (
        <Card
          key={data._id}
          style={{
            width: "18rem",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
          }}
        >
          <Card.Img
            variant="top"
            src={data.image}
            style={{ height: "200px", objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title style={{ fontWeight: "600", fontSize: "18px" }}>
              {data.name}
            </Card.Title>

            <Card.Text style={{ color: "#555", minHeight: "50px" }}>
              {data.desc}
            </Card.Text>
            <h5 style={{ color: "#e63946" }}>₹ {data.price}</h5>
            <h6 style={{ color: "#2563eb" }}>Quantity: {data.quantity}</h6>

            <div
              className="text-center"
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <Button
                variant="danger"
                onClick={() => removeFromCart(data._id)}
                style={{
                  flex: 1,
                  margin: "5px",
                  borderRadius: "8px",
                  fontWeight: "500",
                }}
              >
                Remove
              </Button>
              <Button
                variant="success"
                onClick={() => EditCartProduct(data)}
                style={{
                  flex: 1,
                  margin: "5px",
                  borderRadius: "8px",
                  fontWeight: "500",
                }}
              >
                Edit
              </Button>
            </div>
          </Card.Body>
        </Card>
      ))}
    </div>

    {/* Edit Modal */}
    {addtocart._id !== "" && (
      <div
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            background: "#fff",
            color: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            animation: "fadeIn 0.3s ease",
          }}
        >
          <Card key={addtocart._id} style={{ border: "none" }}>
            <Card.Img
              variant="top"
              src={addtocart.image}
              style={{ height: "220px", objectFit: "cover", borderRadius: "8px" }}
            />
            <Card.Body>
              <Card.Title style={{ fontSize: "20px", fontWeight: "600" }}>
                {addtocart.name}
              </Card.Title>
              <Card.Text style={{ color: "#444" }}>{addtocart.desc}</Card.Text>
              <h5 style={{ color: "#e63946" }}>₹ {addtocart.price}</h5>
            </Card.Body>
          </Card>

          <TextField
            variant="outlined"
            type="number"
            label="Quantity"
            id="product-quantity"
            name="quantity"
            value={addtocart.quantity}
            onChange={(e) => (addtocart.quantity = e.target.value)}
            required
            style={{ margin: "15px 0", width: "100%" }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "15px",
            }}
          >
            <button
              onClick={() => setAddtocart({ _id: "" })}
              style={{
                flex: 1,
                background: "#e11d48",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Close
            </button>
            <button
              onClick={() => UpdateDetailsInCart(addtocart)}
              style={{
                flex: 1,
                background: "#10b981",
                color: "#fff",
                border: "none",
                padding: "10px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    )}

    {/* Buy Now Button */}
    {userCartDetails.length > 0 && (
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link
          to={navcount === userCartDetails.length ? "/BuyNow" : "/Cart"}
          state={{ data: userCartDetails }}
        >
          <Button
            variant="warning"
            onClick={() => {
              checkavailale(userCartDetails);
            }}
            style={{
              padding: "12px 30px",
              fontSize: "18px",
              fontWeight: "600",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
            }}
          >
            🚀 Buy Now
          </Button>
        </Link>
      </div>
    )}
  </div>
);

    }else{
    return(
      <div>
        <center>
   <Commet color="#07266e" size="medium" text="Loading..." textColor="#5666c2" />
        </center>
       
      </div>
    )
  }
}
