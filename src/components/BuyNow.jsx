import React, { useState } from 'react'
import { useLocation,Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { TextField } from '@mui/material';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
});

function LocationMarker({ onSelect }) {
  const [position, setPosition] = useState(null);

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
      onSelect(e.latlng); // send selected lat/lng to parent
    },
  });

  return position === null ? null : <Marker position={position} />;
}

export default function BuyNow() {
    let location = useLocation();
    const {data} = location.state;
    const [quantity,setQuantity] = useState(1);
    const [address,setAddress] = useState('');
    const [Pincode,setPincode] = useState('');
    const [City,setCity] = useState('');

      const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
  };

  const handleSubmit = async () => {
    if (!selectedLocation) return alert('Please select a location on the map');
    console.log(selectedLocation.lat,selectedLocation.lng,address,City,Pincode);
   
  };


  return (
    <div>
        
            
                <Card key ={data._id} style={{ width: '18rem' }}>
      <Card.Img variant="top" src={data.image} />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
      
        <Card.Text>
          {data.desc}
        </Card.Text>
        <h5>{data.price}</h5>
        <div className="text-center">
         


</div>

        
      </Card.Body>
    </Card>
            
          <TextField type='number' placeholder='Quantity' name='quantity' value={quantity} onChange={(e)=> setQuantity(e.target.value)} required/>
            
                <p>prince (1 item) : {data.price}</p>
                <p>No. of items : {quantity}</p>
                <p>total amount : {quantity*data.price}</p>

                
      <h3>Select Delivery Location</h3>
      <MapContainer center={[13.0827, 80.2707]} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker onSelect={handleLocationSelect} />
      </MapContainer>
      <br />
      <TextField placeholder='Address...' type="text" name='address' value={address} onChange={(e)=>setAddress(e.target.value)} rows={4} multiline required/>
        <TextField placeholder='City' type="text" name='City' value={City} onChange={(e)=>setCity(e.target.value)} required/>
             <TextField placeholder='Pincode' type="text" name='Pincode' value={Pincode} onChange={(e)=>setPincode(e.target.value)} required/>
      <button onClick={handleSubmit}>Save Location</button>
    
            
       <Link to="/TransactionMode" state={{quantity,data}}>  <Button variant="secondary" style={{paddingLeft:"20px",paddingRight:"20px",margin:"10px"}}>Continue</Button></Link>
    </div>
  )
}
