import React, { useEffect, useState,useContext } from 'react'
import axios from 'axios';
import { userContext } from '../App';
import {useNavigate} from 'react-router-dom';
import {Commet} from 'react-loading-indicators';

export default function ViewHistory() {
  const [Loading,setLoading]=useState(false);
    const {userID} = useContext(userContext);
    const [orderData,setorderData] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        axios.get(`http://localhost:4000/getOrderHistory/${userID}`)
        .then((res)=>setorderData(res.data))
        .catch((err)=>console.error(err))
        .finally(()=>setLoading(true));
    })
    if(Loading){
  return (
  <div
    style={{
      padding: "20px",
      background: "linear-gradient(135deg, #f9fafb, #e0f2fe)",
      minHeight: "100vh",
    }}
  >
    <h2
      style={{
        textAlign: "center",
        marginBottom: "20px",
        color: "#1e293b",
        fontWeight: "700",
      }}
    >
      📦 Order History
    </h2>

    {orderData.length > 0 ? (
      orderData.map((val, ind) => (
        <div
          key={ind}
          style={{
            border: "1px solid #d1d5db",
            borderRadius: "12px",
            marginBottom: "20px",
            padding: "20px",
            background: "#fff",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
          }}
        >
          {/* Product List */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            {val.product.map((data, indx) => (
              <div
                key={`${ind}-${indx}`}
                style={{
                  display: "flex",
                  gap: "15px",
                  background: "#f9fafb",
                  borderRadius: "8px",
                  padding: "10px",
                  flex: "1 1 280px",
                  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)",
                }}
              >
                <div>
                  <img
                    src={data.image}
                    alt="imgs"
                    style={{
                      width: "120px",
                      height: "80px",
                      borderRadius: "6px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: "600" }}>
                    {data.name}
                  </h3>
                  <p style={{ margin: "3px 0", color: "#374151" }}>
                    Quantity: {data.quantity}
                  </p>
                  <p style={{ margin: "3px 0", color: "#16a34a" }}>
                    ₹ {data.price}
                  </p>
                  <p style={{ margin: "3px 0", fontSize: "13px", color: "#6b7280" }}>
                    Delivered on: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Details */}
          <div style={{ marginBottom: "10px" }}>
            <h4 style={{ fontSize: "16px", fontWeight: "600", color: "#1e40af" }}>
              🏠 Delivery Address
            </h4>
            <p style={{ margin: "2px 0" }}>{val.location.address}</p>
            <p style={{ margin: "2px 0" }}>{val.location.City}</p>
            <p style={{ margin: "2px 0" }}>Pincode: {val.location.pincode}</p>
          </div>

          {/* Transaction Details */}
          <div>
            <p
              style={{
                margin: "5px 0",
                fontWeight: "600",
                color: "#374151",
              }}
            >
              💳 Mode of Transaction:{" "}
              <span style={{ color: "#2563eb" }}>{val.mode}</span>
            </p>
          </div>
        </div>
      ))
    ) : (
      <h3 style={{ textAlign: "center", color: "#6b7280" }}>
        No orders found 😔
      </h3>
    )}

    {/* Back Button */}
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <button
        onClick={() => navigate("/Profile")}
        style={{
          background: "#2563eb",
          color: "#fff",
          border: "none",
          padding: "12px 30px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          transition: "background 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1e40af")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#2563eb")}
      >
        🔙 Back to Profile
      </button>
    </div>
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
