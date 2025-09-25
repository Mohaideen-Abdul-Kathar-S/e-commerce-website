import React, { useEffect, useState, useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Archive,ShoppingCart } from 'lucide-react';
import '../compStyles/AllList.css'
import axios from 'axios';
import { userContext } from '../App';
import TextField from '@mui/material/TextField';
import {Commet} from 'react-loading-indicators';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'

export default function AllList({AllSearch}) {
  const [Loading,setLoading]=useState(false);

  const {userID,createCard} = useContext(userContext);

 

    const [GroceryData,setGrocey] = useState([]);
    const [VegetablesData,setVegetables] = useState([]);
    const [CoolDrinksData,setCoolDrinks] = useState([]);
    const [SnacksData,setSnacks] = useState([]);
    const [StationariesData,setStationaries] = useState([]);
    const filteringProducts = (data,categorytype)=>data.filter((data)=>data.category==categorytype &&(AllSearch=='' || data.name.toLowerCase().includes(AllSearch.toLowerCase()) || AllSearch.toLowerCase().includes(data.name.toLowerCase()))).slice(0, 10);
    useEffect(()=>{
      axios.get("http://localhost:4000/getAllProducts")
      .then((res)=>{
        setGrocey(filteringProducts(res.data,'grocery'));
        setVegetables(filteringProducts(res.data,'vegetables'));
        setCoolDrinks(filteringProducts(res.data,'cooldrinks'));
        setSnacks(filteringProducts(res.data,'snacks'));
        setStationaries(filteringProducts(res.data,'stationaries'));
      })
      .catch((err)=>{
        console.err(err);
      })
      .finally(()=>setLoading(true))
      ,[AllSearch]
})



 




if(Loading){


  return (
  <div
    style={{
      background: "linear-gradient(135deg, #f9fafb, #eef2ff)",
      minHeight: "100vh",
      padding: "30px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    }}
  >
   

    {/* Grocery Section */}
    {GroceryData.length !== 0 && (
      <h2
        id="Grocerytag"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          margin: "40px 0 20px",
          color: "#047857",
          borderLeft: "6px solid #10b981",
          paddingLeft: "12px",
        }}
      >
        Grocery
      </h2>
    )}
    {createCard(GroceryData)}

    {/* Vegetables Section */}
    {VegetablesData.length !== 0 && (
      <h2
        id="Vegetalestag"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          margin: "40px 0 20px",
          color: "#065f46",
          borderLeft: "6px solid #34d399",
          paddingLeft: "12px",
        }}
      >
        Vegetables
      </h2>
    )}
    {createCard(VegetablesData)}

    {/* Cool Drinks Section */}
    {CoolDrinksData.length !== 0 && (
      <h2
        id="CoolDrinkstg"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          margin: "40px 0 20px",
          color: "#1e3a8a",
          borderLeft: "6px solid #3b82f6",
          paddingLeft: "12px",
        }}
      >
        Cool Drinks
      </h2>
    )}
    {createCard(CoolDrinksData)}

    {/* Snacks Section */}
    {SnacksData.length !== 0 && (
      <h2
        id="Snackstag"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          margin: "40px 0 20px",
          color: "#7c2d12",
          borderLeft: "6px solid #f97316",
          paddingLeft: "12px",
        }}
      >
        Snacks
      </h2>
    )}
    {createCard(SnacksData)}

    {/* Stationaries Section */}
    {StationariesData.length !== 0 && (
      <h2
        id="Stationariestag"
        style={{
          fontSize: "1.8rem",
          fontWeight: "600",
          margin: "40px 0 20px",
          color: "#4b5563",
          borderLeft: "6px solid #9ca3af",
          paddingLeft: "12px",
        }}
      >
        Stationaries
      </h2>
    )}
    {createCard(StationariesData)}

    {/* Footer */}
    <footer
      style={{
        textAlign: "center",
        marginTop: "60px",
        fontSize: "14px",
        color: "#6b7280",
        padding: "20px",
      }}
    >
      © {new Date().getFullYear()} My Grocery Store. All rights reserved.
    </footer>
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
