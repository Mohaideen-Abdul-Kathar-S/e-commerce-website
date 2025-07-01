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

export default function Grocery() {
  const [searchData,setSearchData] = useState('');
  const [product,setProduct] = useState([]);
  const {userID} = useContext(userContext);
  const [quantity,setQuantity] = useState(1);
  const [addtocart,setAddtocart] = useState({
    _id:''
  });
  // console.log(userID);
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
  },[]);

  const addToCart = (data)=>{
    
    setAddtocart(data);
  }
  const AddDetailsInCart = async (data,quantity)=>{
    data.quantity = quantity;
    console.log(data);
    setAddtocart({_id:''})
    await axios.put("http://localhost:4000/addToCart",{"data":data,"userID":userID[0]})
    .then((res)=>console.log(res))
    .catch((err)=>console.error(err));
  }
  return (
    <div>
      <div id='divinput'>
        <input type="text" className='grocerInput' placeholder='Search here...' name='search' value={searchData} onChange={onChangeHandler} />
        <button className='searchbtn' onClick={onClickHandler}>Search</button>
        <button className='clearbtn' onClick={onClearHandler}>Clear</button>
      </div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","paddingLeft":"15px" }}>
        {
            product.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
      
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <div className="text-center">
          <Link to="/BuyNow" state={{data}}><Button variant="danger">Buy Now</Button></Link>
 <span  style={{"padding":"10px"}}> <Button variant="primary" className="w-auto" onClick={()=>addToCart(data)}>
    <ShoppingCart /> Add to Cart
  </Button></span>

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
    <TextField variant='outlined' type='number' label="Quantity" id="product-quantity" name='quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)} required/>
          <button onClick={() => setAddtocart({_id:''})}>Close</button>
          <button onClick={()=> AddDetailsInCart(addtocart,quantity)}>Add</button>
          </div>
          )}
    </div>
  )
}
