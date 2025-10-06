import NavBar from "./components/NavBar"
import React, { createContext, useState } from "react";
import NavigationBar from './components/NavigationBar'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Archive,ShoppingCart } from 'lucide-react';
import Swal from 'sweetalert2';
import {Link} from 'react-router-dom'
import TextField from '@mui/material/TextField';
import axios from 'axios';
import FloatingSearchBall from "./components/FloatingSearchBall";
import RecommendWidget from "./components/RecommendWidget";
import GroceryChat from "./components/GroceryChat";
import './app.css'
import FAB from "./components/Fab";

export let userContext = createContext();
function App() {

  const [userID,setUserID] = useState("");
  const [UserName,setUserName] = useState("");
  const [UserGender,setUserGender] = useState("");
  const [UserNOH,setUserNOH] = useState("");
  const [UserCity,setUserCity] = useState("");
  const [UserAddr,setUserAddr] = useState("");
   const BuyNow = userID?"/BuyNow":"/SignInRegister";
    const [addtocart,setAddtocart] = useState({
    _id:''
  });
    const [quantity,setQuantity] = useState(1);

   const [chatOpen, setChatOpen] = useState(false);

  const handleFABClick = () => {
    setChatOpen((prev) => !prev); // Toggle chat box
  };

    const addToCart = (data)=>{

  if(userID!=''){
      setAddtocart(data);
    }else{
      Swal.fire({
    position: "top-end",
    icon: "warning",
    title: "Please login",
    showConfirmButton: false,
    timer: 1500
  });
    }

  }



const createCard = (Data) => {
  return (
    <div className="card-grid">
      {Data.map((data) => (
        <div key={data._id} className="product-card">
          <div className="card-image">
            <img src={data.image} alt={data.name} />
          </div>
          <div className="card-body">
            <h3>{data.name}</h3>
            <p>{data.desc}</p>
            <h4>₹ {data.price}</h4>
            <div className="card-buttons">
              {data.count > 0 ? (
                <Link to="/BuyNow" state={{ data: [data] }}>
                  <button className="btn-primary">Buy Now</button>
                </Link>
              ) : (
                <button
                  className="btn-disabled"
                  onClick={() =>
                    Swal.fire({
                      icon: "warning",
                      title: "Item is out of stock",
                      showConfirmButton: false,
                      timer: 1000,
                    })
                  }
                >
                  Out of Stock
                </button>
              )}
              <button className="btn-secondary" onClick={() => addToCart(data)}>
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};



//     const createCard = (Data)=>{
//     return <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" ,"paddingLeft":"15px"}}> {Data.map((data)=>(
//                 <Card key ={data._id} style={{ width: '18rem' }}>
//       <Card.Img variant="top" src={data.image} />
//       <Card.Body>
//         <Card.Title>{data.name}</Card.Title>
//         <Card.Text>
//           {data.desc}
//         </Card.Text>
//         <h5>{data.price}</h5>
//         {data.count>0 && <Link to={BuyNow} state={{data : [data]}}><Button variant="danger">Buy Now</Button></Link> || <Button variant="danger" style={{ fontSize: "12px" }} onClick={()=>{
//           Swal.fire({
  
//   icon: "warning",
//   title: "Item is out of stack",
//   showConfirmButton: false,
//   timer: 1000
// });
//         }}>Out Of Stack</Button>}
//         <span  style={{"padding":"10px"}}><Button variant="primary" onClick={()=>addToCart(data)}><ShoppingCart/>Add to Cart</Button></span>
//       </Card.Body>
//     </Card>
//             ))}
//             </div>
//   }
  
    const AddDetailsInCart = async (data,quantity)=>{
    data.quantity = quantity;
    console.log(data);
    setAddtocart({_id:''})
    await axios.put("http://localhost:4000/addToCart",{"data":data,"userID":userID})
    .then((res)=>{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item successfully added into the cart",
        showConfirmButton: false,
        timer: 1500
      });
    })
    .catch((err)=>console.error(err));
  }

  return (
    <userContext.Provider value={{UserAddr,setUserAddr,UserCity,setUserCity,setUserNOH,UserNOH,setUserGender,UserGender,userID,setUserID,UserName,setUserName,createCard}}>
    <NavigationBar/>
   
    {chatOpen && <GroceryChat />}
     <FAB onClick={handleFABClick} />

    {addtocart._id!="" && (
            <div style={{
            backgroundColor: "gray",
            width: "500px",
            height: "700px",
            position: "fixed",            
            top: "50%",                    
            left: "50%",                 
            transform: "translate(-50%, -50%)", 
            zIndex: 1000,
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}>
                  <Card key ={addtocart._id} style={{ width: '18rem' }}>
              <Card.Img variant="top" src={addtocart.image} />
              <Card.Body>
                <Card.Title>{addtocart.name}</Card.Title>
              
                <Card.Text>
                  {addtocart.desc}
                </Card.Text>
                <h5>{addtocart.price}</h5>
                
        
                
              </Card.Body>
            </Card>
            <TextField variant='outlined' type='number' label="Quantity" id="product-quantity" name='quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
                  <button onClick={() => setAddtocart({_id:''})}>Close</button>
                  <button onClick={()=> AddDetailsInCart(addtocart,quantity)}>Add</button>
                  </div>
                  )}

    </userContext.Provider>
  )
}

export default App
