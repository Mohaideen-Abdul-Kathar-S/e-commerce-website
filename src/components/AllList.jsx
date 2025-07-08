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

  const {userID} = useContext(userContext);
  const [quantity,setQuantity] = useState(1);
  const [addtocart,setAddtocart] = useState({
    _id:''
  });

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
    .catch((err)=>console.error(err));
  }
  const BuyNow = userID?"/BuyNow":"/SignInRegister";

if(Loading){


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
        {data.count>0 && <Link to={BuyNow} state={{data : [data]}}><Button variant="danger">Buy Now</Button></Link> || <Button variant="danger" style={{ fontSize: "12px" }} onClick={()=>{
          Swal.fire({
  
  icon: "warning",
  title: "Item is out of stack",
  showConfirmButton: false,
  timer: 1000
});
        }}>Out Of Stack</Button>}
        <span  style={{"padding":"10px"}}><Button variant="primary" onClick={()=>addToCart(data)}><ShoppingCart/>Add to Cart</Button></span>
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
          {data.count>0 && <Link to={BuyNow} state={{data : [data]}}><Button variant="danger">Buy Now</Button></Link> || <Button variant="danger" style={{ fontSize: "12px" }} onClick={()=>{Swal.fire({
  
  icon: "warning",
  title: "Item is out of stack",
  showConfirmButton: false,
  timer: 1000
});}}>Out Of Stack</Button>}
        <span  style={{"padding":"10px"}}><Button variant="primary" onClick={()=>addToCart(data)}><ShoppingCart/>Add to Cart</Button></span>
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
          {data.count>0 && <Link to={BuyNow} state={{data : [data]}}><Button variant="danger">Buy Now</Button></Link> || <Button variant="danger" style={{ fontSize: "12px" }} onClick={()=>{
            Swal.fire({
  
  icon: "warning",
  title: "Item is out of stack",
  showConfirmButton: false,
  timer: 1000
});
          }}>Out Of Stack</Button>}
        <span  style={{"padding":"10px"}}><Button variant="primary" onClick={()=>addToCart(data)}><ShoppingCart/>Add to Cart</Button></span>
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
          {data.count>0 && <Link to={BuyNow} state={{data : [data]}}><Button variant="danger">Buy Now</Button></Link> || <Button variant="danger" style={{ fontSize: "12px" }} onClick={()=>{
            Swal.fire({
  
  icon: "warning",
  title: "Item is out of stack",
  showConfirmButton: false,
  timer: 1000
});
          }}>Out Of Stack</Button>}
        <span  style={{"padding":"10px"}}><Button variant="primary" onClick={()=>addToCart(data)}><ShoppingCart/>Add to Cart</Button></span>
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
         {data.count>0 && <Link to={BuyNow} state={{data : [data]}}><Button variant="danger">Buy Now</Button></Link> || <Button variant="danger" style={{ fontSize: "12px" }} onClick={()=>{
          Swal.fire({
  
  icon: "warning",
  title: "Item is out of stack",
  showConfirmButton: false,
  timer: 1000
});
         }}>Out Of Stack</Button>}
        <span  style={{"padding":"10px"}}><Button variant="primary" onClick={()=>addToCart(data)}><ShoppingCart/>Add to Cart</Button></span>
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
