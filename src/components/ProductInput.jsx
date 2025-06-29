import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function ProductInput() {
    const [productsDetails,setProductDetails] = useState({
            _id:'',
            name:'',
            price:'',
            count:'',
            image:'',
            category:'',
            desc:''
        });
    const onChangeHandler = (e)=>{
        const {name,value} = e.target;
        setProductDetails(prev => ({
            ...prev,
            [name]:value
    }));
    };
    const onSubmitHandler = (e)=>{
        e.preventDefault();
        console.log(productsDetails)
    }
    
  return (
    <div style={{ margin:"auto",marginTop:"20px",display: 'flex', flexDirection: 'column', gap: '16px', width: '300px'}}>
      <form onSubmit={onSubmitHandler}>
      <TextField id="product-id" label="Product ID" variant="outlined" name="_id" value={productsDetails._id} onChange={onChangeHandler} style={{padding:"10px"}}/>
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
      </form>
    </div>
  );
}
