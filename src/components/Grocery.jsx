import React, { useState,useContext } from 'react'
import '../compStyles/Grocery.css'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import img from '../assets/img1.jpeg'
import { Archive,ShoppingCart } from 'lucide-react';
import axios from 'axios';
import {userContext} from '../App';

export default function Grocery() {
  const [searchData,setSearchData] = useState('');
  const [product,setProduct] = useState([]);
  const {userID} = useContext(userContext);
  console.log(userID);
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

  const addToCart = async (id)=>{
    await axios.put("http://localhost:4000/addToCart",{"id":id,"userID":userID[0]})
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
  <Button variant="primary" className="w-auto" onClick={()=>addToCart(data._id)}>
    <ShoppingCart /> Add to Cart
  </Button>
</div>

        
      </Card.Body>
    </Card>
            ))
          
        }
          </div>
    </div>
  )
}
