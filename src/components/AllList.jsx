import React, { useEffect, useState, useContext } from "react";
import { ShoppingCart } from "lucide-react";
import "../compStyles/AllList.css";
import axios from "axios";
import { userContext } from "../App";
import { Commet } from "react-loading-indicators";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

export default function AllList({ AllSearch }) {
  const [Loading, setloading] = useState(false);
  const { userID, createCard } = useContext(userContext);

  const [GroceryData, setGrocey] = useState([]);
  const [VegetablesData, setVegetables] = useState([]);
  const [CoolDrinksData, setCoolDrinks] = useState([]);
  const [SnacksData, setSnacks] = useState([]);
  const [StationariesData, setStationaries] = useState([]);
   const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [error, setError] = useState(null);

    const getAndRecommend = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const res = await fetch("http://127.0.0.1:8000/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lon }),
          });
          const data = await res.json();
          if (res.ok) {
            console.log(data);
            setWeather(data.weather);
            console.log(data.weather)
            setLocalTime(data.local_time);
            console.log(data.local_time)
            setSuggestions(data.suggestions || []);
            console.log(data.suggestions);

          } else {
            console.log(data)
            setError(data);
          }
        } catch (err) {
          setError(err.message || "Network error");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Permission denied or failed to get location: " + err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      }
    );
  };

    useEffect(() => {
    getAndRecommend();
  }, []);

  const filteringProducts = (data, categorytype) =>
    data
      .filter(
        (data) =>
          data.category === categorytype &&
          (AllSearch === "" ||
            data.name.toLowerCase().includes(AllSearch.toLowerCase()) ||
            AllSearch.toLowerCase().includes(data.name.toLowerCase()))
      )
      .slice(0, 10);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getAllProducts")
      .then((res) => {
        setGrocey(filteringProducts(res.data, "grocery"));
        setVegetables(filteringProducts(res.data, "vegetables"));
        setCoolDrinks(filteringProducts(res.data, "cooldrinks"));
        setSnacks(filteringProducts(res.data, "snacks"));
        setStationaries(filteringProducts(res.data, "stationaries"));
      })
      .catch((err) => console.error(err))
      .finally(() => setloading(true));
  }, [AllSearch]);

  if (!Loading) {
    return (
      <div className="loading-container">
        <Commet color="#7e22ce" size="medium" text="Loading..." textColor="#a855f7" />
      </div>
    );
  }

  return (
    <div className="product-container">

      {GroceryData.length !== 0 && <h2 className="section-title Suggesstions">🥫 Suggesstions</h2>}
      {createCard(suggestions)}

      {GroceryData.length !== 0 && <h2 className="section-title grocery">🥫 Grocery</h2>}
      {createCard(GroceryData)}

      {VegetablesData.length !== 0 && <h2 className="section-title vegetables">🥦 Vegetables</h2>}
      {createCard(VegetablesData)}

      {CoolDrinksData.length !== 0 && <h2 className="section-title cool-drinks">🥤 Cool Drinks</h2>}
      {createCard(CoolDrinksData)}

      {SnacksData.length !== 0 && <h2 className="section-title snacks">🍪 Snacks</h2>}
      {createCard(SnacksData)}

      {StationariesData.length !== 0 && <h2 className="section-title stationaries">✏️ Stationaries</h2>}
      {createCard(StationariesData)}

      <footer className="footer">© {new Date().getFullYear()} My Grocery Store. All rights reserved.</footer>
    </div>
  );
}
