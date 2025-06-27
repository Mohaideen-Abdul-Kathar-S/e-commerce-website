import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from '../assets/img1.jpeg'
import { Archive,ShoppingCart } from 'lucide-react';
import '../compStyles/AllList.css'
export default function AllList() {
    const cards = Array.from({length:5});
  return (
    <div>
        <h2 id='Grocerytag' >Grocery</h2>
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" ,"padding-left":"15px"}}>
        {
            cards.map((_,index)=>(
                <Card key ={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Product Name</Card.Title>
        <Card.Text>
          $25.00
        </Card.Text>
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>

           <h2 id='Vegetalestag' >Vegetales</h2>
        
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
             <h2 id='CoolDrinkstg' style={{"font-size":"26px","padding-top":"10px"}}>CoolDrinks</h2>
        
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
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
             <h2 id='Snackstag' >Snacks</h2>
        
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
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
             <h2 id='Stationariestag'  style={{"font-size":"26px","padding-top":"10px"}}>Stationaries</h2>
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" ,"padding-left":"15px"}}>
        {
            cards.map((_,index)=>(
                <Card key ={index} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={img} />
      <Card.Body>
        <Card.Title>Product Name</Card.Title>
        <Card.Text>
          $25.00
        </Card.Text>
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
    </div>
  )
}
