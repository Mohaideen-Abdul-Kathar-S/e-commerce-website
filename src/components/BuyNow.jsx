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
      const [loc,setLoc] = useState({});

  const handleLocationSelect = (latlng) => {
    setSelectedLocation(latlng);
  };

  const handleSubmit = async () => {
    if (!selectedLocation) return alert('Please select a location on the map');
    console.log(selectedLocation.lat,selectedLocation.lng,address,City,Pincode);
      // data[0].quantity=quantity
      loc.lat=selectedLocation.lat
      loc.lng=selectedLocation.lng
      loc.address=address
      loc.City=City
      loc.Pincode=Pincode
      console.log(data);
  };


  return (
    <div className="container py-4">
  <div className="row g-4">
    {data.length === 1 ? (
      <div className="col-12 col-md-6 col-lg-4">
        <Card>
          <Card.Img variant="top" src={data[0].image} />
          <Card.Body>
            <Card.Title>{data[0].name}</Card.Title>
            <Card.Text>{data[0].desc}</Card.Text>
            <h5>₹{data[0].price}</h5>

            <TextField
              fullWidth
              type="number"
              placeholder="Quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => {
                if (e.target.value <= data[0].count) {
                  setQuantity(e.target.value);
                  data[0].quantity = e.target.value;
                } else {
                  alert("Stock is limit");
                }
              }}
              sx={{ marginBottom: 2 }}
              required
            />

            <p>Price (1 item): ₹{data[0].price}</p>
            <p>No. of items: {quantity}</p>
            <p>Total amount: ₹{quantity * data[0].price}</p>
          </Card.Body>
        </Card>
      </div>
    ) : (
      data.map((item) => (
        <div key={item._id} className="col-12 col-md-6 col-lg-4">
          <Card>
            <Card.Img variant="top" src={item.image} />
            <Card.Body>
              <Card.Title>{item.name}</Card.Title>
              <Card.Text>{item.desc}</Card.Text>
              <h5>₹{item.price}</h5>
              <p>Price (1 item): ₹{item.price}</p>
              <p>No. of items: {item.quantity}</p>
              <p>Total amount: ₹{item.quantity * item.price}</p>
            </Card.Body>
          </Card>
        </div>
      ))
    )}
  </div>

  <hr className="my-4" />

  <h3>Select Delivery Location</h3>
  <div className="mb-4" style={{ height: "400px", width: "100%" }}>
    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker onSelect={handleLocationSelect} />
    </MapContainer>
  </div>

  <div className="row g-3">
    <div className="col-12">
      <TextField
        fullWidth
        placeholder="Address..."
        type="text"
        name="address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        rows={4}
        multiline
        required
      />
    </div>
    <div className="col-md-6">
      <TextField
        fullWidth
        placeholder="City"
        type="text"
        name="City"
        value={City}
        onChange={(e) => setCity(e.target.value)}
        required
      />
    </div>
    <div className="col-md-6">
      <TextField
        fullWidth
        placeholder="Pincode"
        type="text"
        name="Pincode"
        value={Pincode}
        onChange={(e) => setPincode(e.target.value)}
        required
      />
    </div>
  </div>

  <div className="text-center mt-4">
    <Link to="/TransactionMode" state={{ data, loc }}>
      <Button
        variant="secondary"
        style={{
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
        onClick={handleSubmit}
      >
        Continue
      </Button>
    </Link>
  </div>
</div>

  )
}
