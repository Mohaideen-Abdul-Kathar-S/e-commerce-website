import React,{useContext, useEffect, useState} from 'react';
import {userContext} from '../App';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Cart() {
  const {userID} = useContext(userContext);
  const [userCartDetails,setUserCartDetails] = useState([]);
  useEffect(()=>{
    axios.get(`http://localhost:4000/getCartDetails/${userID[0]}`)
    .then((res)=>setUserCartDetails(res.data.userCart))
    .catch((err)=>console.error(err));
  });

  const removeFromCart = (id)=>{
    const uid = userID[0];
    console.log(uid,id)
    axios.delete('http://localhost:4000/removeFromCart',{data:{"id":id,"userID":uid}})
    .then((res)=>console.log(res))
    .catch((err)=>console.error(err));
  }
  const [popup,setpopup] = useState(false);

  const buyNow = (data)=>{
    setpopup(!popup);
  }
  return (
    <div style={{marginTop:"20px"}}>
     <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","paddingLeft":"15px" }}>
        {
            userCartDetails.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
      
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <div className="text-center">
  <Button variant="danger" className="w-auto" onClick={()=>removeFromCart(data._id)}>
     Remove 
  </Button>
  <Button variant="success" className="w-auto" onClick={()=>buyNow(data)} style={{marginLeft:"40px"}}>
     Buy Now
  </Button>
</div>

        
      </Card.Body>
    </Card>
            ))
          
        }
          </div>

          {popup && (
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
          <p>This is a popup</p>
          <button onClick={() => buyNow({})}>Close</button>
          </div>
          )}
    </div>
  )
}
