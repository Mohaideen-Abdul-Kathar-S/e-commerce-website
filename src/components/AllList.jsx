import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Archive,ShoppingCart } from 'lucide-react';
import '../compStyles/AllList.css'
import axios from 'axios';
export default function AllList({AllSearch}) {
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
      }),[AllSearch]
})

  return (
    <div>
      
        {GroceryData.length!=0 && <h2 id='Grocerytag' >Grocery</h2>}
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" ,"paddingLeft":"15px"}}>
        {
            GroceryData.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>

           {VegetablesData.length!=0 &&<h2 id='Vegetalestag' >Vegetales</h2>}
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","paddingLeft":"15px" }}>
        {
            VegetablesData.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
              {CoolDrinksData.length!=0 &&<h2 id='CoolDrinkstg' style={{"fontSize":"26px","paddingTop":"10px"}}>CoolDrinks</h2>}
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","paddingLeft":"15px" }}>
        {
            CoolDrinksData.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
             {SnacksData.length!=0 &&<h2 id='Snackstag' >Snacks</h2>}
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap","paddingLeft":"15px" }}>
        {
            SnacksData.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <Button variant="danger"><Archive />Add to Backet</Button>
        <span  style={{"padding":"10px"}}><Button variant="primary"><ShoppingCart/>Cart</Button></span>
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
             {StationariesData.length!=0 &&<h2 id='Stationariestag'  style={{"fontSize":"26px","paddingTop":"10px"}}>Stationaries</h2>}
        
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" ,"paddingLeft":"15px"}}>
       {
            StationariesData.map((data)=>(
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
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
