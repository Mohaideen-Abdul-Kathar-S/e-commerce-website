import React, { useState } from 'react'
import '../compStyles/Grocery.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from '../assets/img1.jpeg'
import { Archive,ShoppingCart } from 'lucide-react';
import axios from 'axios';

export default function Grocery() {
  const cards = Array.from({length:5});
  const [product,setProduct] = useState({});
  useState(()=>{
    axios.get("http://localhost:4000/apitest")
    .then((res)=>{
      setProduct(res.data[0]);
    })
    .catch((Err)=>{

      console.log(Err);
    })
  },[]);
  return (
    <div>
      <div id='divinput'>
        <input type="text" className='grocerInput' placeholder='Search here...' />
        <button className='searchbtn'>Search</button>
      </div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","paddingLeft":"15px" }}>
        {
            cards.map((_,index)=>(
                <Card key ={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
      
        <Card.Text>
          {product.desc}
        </Card.Text>
        <h5>{product.price}</h5>
        <Button variant="danger"><Archive /> Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
    </div>
  )
}
