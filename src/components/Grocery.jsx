import React from 'react'
import '../compStyles/Grocery.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from '../assets/img1.jpeg'
import { Archive,ShoppingCart } from 'lucide-react';

export default function Grocery() {
  const cards = Array.from({length:5});
  return (
    <div>
      <div id='divinput'>
        <input type="text" className='grocerInput' placeholder='Search here...' />
        <button className='searchbtn'>Search</button>
      </div>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","padding-left":"15px" }}>
        {
            cards.map((_,index)=>(
                <Card key ={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Product Name</Card.Title>
        <Card.Text>
          $25.00
        </Card.Text>
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
