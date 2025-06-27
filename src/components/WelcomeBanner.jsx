import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.jpeg";
import img2 from "../assets/img2.jpeg";
import img3 from "../assets/img3.jpg";
import '../compStyles/WelcomeBanner.css'
import Button from 'react-bootstrap/Button';
import { Search } from 'lucide-react';
function WelcomeBanner() {
  
    let img = [img1,img2,img3];
    const userName = "Kathar"+"..."
    const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % img.length);
    }, 5000); // change image every 5 seconds

    return () => clearInterval(interval); // clean up on unmount
  }, []);
     
  return (
    <div id="divid">
  <img src={img[currentIndex]} alt="shop" style={{ width: "100vw", height: "30vh" }} />
  
  <div className="welcometext">
    <p id="p1" >Hello,</p>
      <p id="p2">{userName}</p>
  </div>
  
  <div className="inputdiv">
    <input type="text" placeholder="Search..." />
    <Button id="btn">Search</Button>
  </div>
  
</div>

  )
}

export default WelcomeBanner