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

  const {userID,createCard} = useContext(userContext);

 

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



 




if(Loading){


  return (
    <div>
      
        {GroceryData.length!=0 && <h2 id='Grocerytag' >Grocery</h2>}
        
        
        {
          createCard(GroceryData)
            
          
        }
          

           {VegetablesData.length!=0 &&<h2 id='Vegetalestag' >Vegetales</h2>}
        
        { createCard(VegetablesData)
            
          
        }
              {CoolDrinksData.length!=0 &&<h2 id='CoolDrinkstg' style={{"fontSize":"26px","paddingTop":"10px"}}>CoolDrinks</h2>}
        
        {
          createCard(CoolDrinksData)
            
          
        }
             {SnacksData.length!=0 &&<h2 id='Snackstag' >Snacks</h2>}
        
        { createCard(SnacksData)
            
          
        }
             {StationariesData.length!=0 &&<h2 id='Stationariestag'  style={{"fontSize":"26px","paddingTop":"10px"}}>Stationaries</h2>}
        
       { createCard(StationariesData)
            
          
        }


        



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
