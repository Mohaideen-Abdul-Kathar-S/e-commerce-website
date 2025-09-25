import React, { useState,useContext } from 'react'
import '../compStyles/Grocery.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import BuyNow from './BuyNow'
import { Archive,ShoppingCart } from 'lucide-react';
import axios from 'axios';
import {userContext} from '../App';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import {Commet} from 'react-loading-indicators';
import Swal from 'sweetalert2'

export default function Grocery() {
  const [Loading,setLoading]=useState(false);
  const [searchData,setSearchData] = useState('');
  const [product,setProduct] = useState([]);
   const {userID,createCard} = useContext(userContext);
  const [quantity,setQuantity] = useState(1);
  const [addtocart,setAddtocart] = useState({
    _id:''
  });
  // console.log(userID);
  const BuyNow = userID?"/BuyNow":"/SignInRegister";
  const onChangeHandler = (e)=>{
    setSearchData(e.target.value);
  }
  const onClickHandler = ()=>{
    console.log(searchData);
    axios.get(`http://localhost:4000/getGroceryBySearch/${searchData}`)
    .then((res)=>{
      setProduct(res.data);
      // console.log(res.data);
    })
    .catch((Err)=>{

      console.log(Err);
    })
    
  }  
  const onClearHandler = ()=>{
    setSearchData('');
    axios.get("http://localhost:4000/getGrocery")
    .then((res)=>{
      setProduct(res.data);
      // console.log(res.data);
    })
    .catch((Err)=>{

      console.log(Err);
    });
  }
  useState(()=>{
    axios.get("http://localhost:4000/getGrocery")
    .then((res)=>{
      setProduct(res.data);
      // console.log(res.data);
    })
    .catch((Err)=>{

      console.log(Err);
    })
    .finally(()=>setLoading(true))
  },[]);

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
    .catch((err)=>console.error(err))
    
  }
  if(Loading){
  return (
    <div>
      <div id='divinput'>
        <input type="text" className='grocerInput' placeholder='Search here...' name='search' value={searchData} onChange={onChangeHandler} />
        <button className='searchbtn' onClick={onClickHandler}>Search</button>
        <button className='clearbtn' onClick={onClearHandler}>Clear</button>
      </div>
      {createCard(product)}
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
        <h5>Price : Rs.{addtocart.price}</h5>
        

        
      </Card.Body>
    </Card>
    <TextField variant='outlined' type='number' label="Quantity" id="product-quantity" name='quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
          <button onClick={() => setAddtocart({_id:''})}>Close</button>
          <button onClick={()=> AddDetailsInCart(addtocart,quantity)}>Add</button>
          </div>
          )}
    </div>
  )
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
