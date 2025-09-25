import React, { useState } from "react";

const FloatingSearchBall = () => {
  const [open, setOpen] = useState(false);
  const [filePath, setFilePath] = useState("");
  const [response, setResponse] = useState(null);

const handleFileChange = (e) => {
  if (e.target.files.length > 0) {
    const file = e.target.files[0];
    const reader = new FileReader();
reader.onload = () => {
  const base64 = reader.result;
  console.log(base64); // full image content
};
reader.readAsDataURL(file);
    setFilePath(URL.createObjectURL(file));

    

  }
};


  const handleURLChange = (e) => {
    setFilePath(e.target.value);
  };

const handleSearch = async () => {
  try {
    const res = await fetch("http://127.0.0.1:8000/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image_url: filePath }),
    });
    const data = await res.json();
    setResponse(data);
  } catch (error) {
    console.error("Search error:", error);
  }
};


  return (
    <>
      {/* Floating Ball */}
      <div
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 w-16 h-16 bg-blue-500 rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition"
      >
        <span className="text-white font-bold text-xl">🔍</span>
      </div>

      {/* Popup Window */}
      {open && (
        <div className="fixed bottom-24 right-5 w-80 bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <h2 className="text-lg font-semibold mb-2">Search Product</h2>

          {/* File Input */}
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2 w-full text-sm"
          />
          <span className="text-gray-500 text-xs mb-2 block">
            or enter URL
          </span>

          {/* URL Input */}
          <input
            type="text"
            placeholder="Paste file URL here"
            value={filePath}
            onChange={handleURLChange}
            className="mb-2 w-full border border-gray-300 rounded px-2 py-1"
          />

          <button
            onClick={handleSearch}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
          >
            Search
          </button>

          {/* Response Display */}
          {response && (
            <div className="mt-4 p-3 bg-gray-50 rounded shadow-sm border border-gray-200">
              <img
                src={response.image}
                alt={response.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{response.name}</h3>
              <p className="text-gray-600">{response.desc}</p>
              <p className="font-semibold mt-1">Category: {response.category}</p>
              <p className="text-green-600 font-bold mt-1">Price: ₹{response.price}</p>
              <p className="text-gray-500 mt-1">Stock: {response.count}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingSearchBall;
