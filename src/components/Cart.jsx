import React,{useContext, useEffect, useState} from 'react';
import {userContext} from '../App';
import {Link } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import TextField from '@mui/material/TextField'
import {Commet} from 'react-loading-indicators';
import Swal from 'sweetalert2';

export default function Cart() {
   const [Loading,setLoading]=useState(false);
  const {userID} = useContext(userContext);
  const [addtocart,setAddtocart] = useState({_id:''});
  const [userCartDetails,setUserCartDetails] = useState([]);
  const [navcount,setNavCount]=useState(0);
  useEffect(()=>{
    axios.get(`http://localhost:4000/getCartDetails/${userID}`)
    .then((res)=>setUserCartDetails(res.data.userCart))
    .catch((err)=>console.error(err))
    .finally(()=>setLoading(true));
  });

  const removeFromCart = (id)=>{

      Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result)=>{
  if(result.isConfirmed){
    const uid = userID;
    console.log(uid,id)
    axios.delete('http://localhost:4000/removeFromCart',{data:{"id":id,"userID":uid}})
    .then((res)=>{
      Swal.fire({
        position: "top-end",
      title: "Deleted!",
      text: "Your item removed from cart",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
    })
    .catch((err)=>console.error(err));
  }
})
  
    
  }
 

  const EditCartProduct = (data)=>{
    setAddtocart(data);
  }

  const UpdateDetailsInCart = async (data)=>{
    setAddtocart({_id:''})
    await axios.put("http://localhost:4000/addToCart",{"data":data,"userID":userID})
    .then((res)=>{
      Swal.fire({
        title: "Details Saved",
        icon:"success",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        showConfirmButton: false,
        timer:1500
      });
    })
    .catch((err)=>console.error(err));
  }

  const checkavailale = async(CartData)=>{
    setNavCount(0);
    CartData.map((data)=>{
      axios.get(`http://localhost:4000/getGroceryByID/${data._id}`)
      .then((res)=>{
        console.log(res.data[0].count);
if(data.quantity>res.data[0].count){
  
  Swal.fire({
  title: `the item ${data.name} is exceeded its limit`,
  showClass: {
    popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `
  },
  hideClass: {
    popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `
  }
});
        
        setNavCount(0);
        
      }else{
        
        setNavCount((prev) => {
    const updated = prev + 1;
    console.log("nav" + updated + "....size" + CartData.length);
    return updated;
  });
      }
      })

      
    })
  }

  if(Loading){
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
    {userCartDetails.length>0 && <Link to={navcount===userCartDetails.length?"/BuyNow":"/Cart"} state={{data : userCartDetails}}>  
<Button variant="danger" className="w-auto" onClick={()=>{checkavailale(userCartDetails)}} style={{margin:"auto"}}>
     Buy Now
  </Button></Link>}

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
