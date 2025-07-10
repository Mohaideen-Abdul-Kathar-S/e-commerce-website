import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import axios from 'axios';
import {useNavigate,useLocation} from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ProductInput() {
  const navigate = useNavigate();
  const loc = useLocation();
  const {isLogin} = loc.state || false;
  const [IDs,setIDs] = useState([]);
    const [productsDetails,setProductDetails] = useState({
            _id:'',
            name:'',
            price:'',
            count:'',
            image:'',
            category:'',
            desc:''
        });
    const onChangeHandler = async(e)=>{
        const {name,value} = e.target;
        if(name=="_id"){
          axios.get(`http://localhost:4000/getGroceryByID/${value}`)
          .then((res)=>{
            if(res.data.length>0){
              console.log("no")
              setProductDetails(...res.data);
            }else{
              setProductDetails(prev => ({
            ...prev,
            [name]:value
    }));

            }
          })
          .catch((err)=>{
            console.error(err);
          })
        }else{
        setProductDetails(prev => ({
            ...prev,
            [name]:value
    }));
  }
    };
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(productsDetails)
        axios.post("http://localhost:4000/postdata",productsDetails)
        .then((res)=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item saved successfully",
            showConfirmButton: false,
            timer: 1500
          });
          setProductDetails({
            _id:'',
            name:'',
            price:'',
            count:'',
            image:'',
            category:'',
            desc:''
        })
        })
        .catch((err)=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "please try again",
            showConfirmButton: false,
            timer: 1500
          });
        });
    }

    useEffect(()=>{
      axios.get('http://localhost:4000/getProductsIDs')
      .then((res)=>{
        console.log(res.data)
        setIDs(res.data)})
      .catch((err)=>console.error(err));
    },[])

    const DeleteItem = ()=>{
      if(productsDetails._id){
        axios.delete(`http://localhost:4000/DeleteProduct/${productsDetails._id}`)
        .then((err)=>{
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Deleted successfully",
            showConfirmButton: false,
            timer: 1500
          });
          setProductDetails({
            _id:'',
            name:'',
            price:'',
            count:'',
            image:'',
            category:'',
            desc:''
        })
        }).catch((err)=>{
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "please try again",
            showConfirmButton: false,
            timer: 1500
          });
        })
      }else{
        Swal.fire({
           
            icon: "warning",
            title: "please select Item ID",
            showConfirmButton: false,
            timer: 1500
          });
      }
    }

    
    if(isLogin)
{  return (
    <div style={{ margin:"auto",marginTop:"20px",display: 'flex', flexDirection: 'column', gap: '16px', width: '300px'}}>
       <button onClick={()=>navigate('/Admin')}>Back</button>
      <button onClick={()=>navigate('/CustomersOrders',{state:{isLogin:isLogin}})}>Customers Orders</button>
      <form onSubmit={onSubmitHandler}>
        <Autocomplete
  freeSolo
  options={IDs}
  value={productsDetails._id || ""}
  onInputChange={(event, newInputValue) => {
    onChangeHandler({ target: { name: "_id", value: newInputValue } });
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      label="Product ID"
      variant="outlined"
      name="_id"
      style={{ padding: "10px" }}
    />
  )}
  ListboxProps={{
    style: {
      maxHeight: 48 * 10, // 5 items × 48px item height
      overflowY: 'auto'
    }
  }}
/>


      {/* <TextField id="product-id" label="Product ID" variant="outlined" name="_id" value={productsDetails._id} onChange={onChangeHandler} style={{padding:"10px"}}/> */}
      <TextField id="product-name" label="Product Name" variant="outlined" name="name" value={productsDetails.name} onChange={onChangeHandler} style={{padding:"10px"}}/>
      <TextField id="product-price" label="Price" variant="outlined" type="number" name="price" value={productsDetails.price} onChange={onChangeHandler} style={{padding:"10px"}}/>
      <TextField id="product-count" label="Count" variant="outlined" type="number" name="count" value={productsDetails.count} onChange={onChangeHandler} style={{padding:"10px"}}/>
      <TextField id="product-image" label="Image URL" variant="outlined" name="image" value={productsDetails.image} onChange={onChangeHandler} style={{padding:"10px"}}/>
      <TextField id="product-category" label="Category" variant="outlined" name="category" value={productsDetails.category} onChange={onChangeHandler} style={{padding:"10px"}}/>
      <TextField
        id="product-desc"
        label="Description"
        variant="outlined"
        name="desc"
        multiline
        rows={3}
        value={productsDetails.desc}
        onChange={onChangeHandler}
        style={{padding:"10px"}}
      />
      <br />
      <button type='submit'>Submit</button>
      <button type='button' onClick={DeleteItem}>Delete</button>
      </form>
      <img src={productsDetails.image} alt="productsDetails.image" />
    </div>
  );}else{
    return (
      <div>
        <h2>Please Login</h2>
      </div>
    )
  }
}
