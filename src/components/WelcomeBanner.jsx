import React, { useContext,useState } from "react";
import { userContext } from "../App";
import "./WelcomeBanner.css";
import Swal from 'sweetalert2';


export function WelcomeBanner({ AllSearch, setAllSearch }) {
  const { UserName } = useContext(userContext);

  const [showPopup, setShowPopup] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [response, setResponse] = useState(null);

    const handleSearch = async () => {
    try {
      console.log("Searching for:", filePath);
      const res = await fetch("http://127.0.0.1:5000/find-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image_url: filePath }),
      });
      const data = await res.json();
      setResponse(data.product);
      console.log(data.product);
      // Assuming `response` is your product object
if (data.product) {
  Swal.fire({
    title: `<strong>${data.product.name}</strong>`,
    html: `
      <img src="${data.product.image}" alt="${data.product.name}" style="width:200px;height:auto;margin-bottom:10px;" />
      <p>${data.product.desc}</p>
      <p><strong>Category:</strong> ${data.product.category}</p>
      <p style="color:green;font-weight:bold;">Price: ₹${data.product.price}</p>
      <p>Stock: ${data.product.count}</p>
    `,
    showCloseButton: true,
    showConfirmButton: true,
    focusConfirm: false,
  });
}else{
  Swal.fire({
    icon: 'error',
    title: 'Product Not Found',
    text: 'No matching product found for the provided image URL.',
  });
}

    } catch (error) {
      console.error("Search error:", error);
    }
  };

  const uploadURL = () => {
    setShowPopup(true);
  };

  const onChangeHandler = (e) => {
    setAllSearch(e.target.value);
  };

  const ClearSearch = () => {
    setAllSearch("");
  };

  return (
    <div className="banner-container">
      <div className="overlay"></div>
      <div className="banner-content">
        <h2 className="greeting">Hello 👋</h2>
        <h1 className="username">{UserName || "Guest"}</h1>
        <p className="tagline">
          Discover amazing deals and top-quality products handpicked for you!
        </p>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search for products..."
            value={AllSearch}
            onChange={onChangeHandler}
            className="search-box"
          />
          <div className="action-buttons">
            <button className="btn search-btn">Search</button>

            {/* Corrected Upload Button */}
            <button className="btn upload-btn" onClick={uploadURL}>
              Upload
            </button>

            <button className="btn clear-btn" onClick={ClearSearch}>
              Clear
            </button>
          </div>
        </div>
        {showPopup && (
  <div className="popup">
    <div className="popup-content">
      <h3>Enter Image URL</h3>
      <input
        type="text"
        value={filePath}
        onChange={(e) => setFilePath(e.target.value)}
        placeholder="Paste image URL here"
      />
      <button className="search-btn" onClick={handleSearch}>
        Search
      </button>
      <button className="close-btn" onClick={() => setShowPopup(false)}>
        Close
      </button>

      
    </div>
  </div>
)}

       
      </div>

      
    </div>
  );
}

