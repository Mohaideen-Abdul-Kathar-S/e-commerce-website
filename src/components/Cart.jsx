import React,{useContext, useEffect, useState} from 'react';
import {userContext} from '../App';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TextField from '@mui/material/TextField'


export default function Cart() {
  const {userID} = useContext(userContext);
  const [addtocart,setAddtocart] = useState({_id:''});
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
 

  const EditCartProduct = (data)=>{
    setAddtocart(data);
  }

  const UpdateDetailsInCart = async (data)=>{
    setAddtocart({_id:''})
    await axios.put("http://localhost:4000/addToCart",{"data":data,"userID":userID[0]})
    .then((res)=>console.log(res))
    .catch((err)=>console.error(err));
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
        <h5>{data.quantity}</h5>
        <div className="text-center">
  <Button variant="danger" className="w-auto" onClick={()=>removeFromCart(data._id)}>
     Remove 
  </Button>
  <Button variant="success" className="w-auto" onClick={()=>EditCartProduct(data)} style={{marginLeft:"40px"}}>
     Edit
  </Button>
</div>

        
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
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
    <TextField variant='outlined' type='number' label="Quantity" id="product-quantity" name='quantity' value={addtocart.quantity} onChange={(e)=>addtocart.quantity=e.target.value} required/>
          <button onClick={() => setAddtocart({_id:''})}>Close</button>
          <button onClick={()=> UpdateDetailsInCart(addtocart)}>Update</button>
          </div>
          )}
          
    </div>
  )
}
