// src/components/FAB.jsx
import React from "react";
import { FaComments } from "react-icons/fa"; // Chat icon
import "./FAB.css";

export default function FAB({ onClick }) {
  return (
    <button className="fab-button" onClick={onClick}>
      <FaComments size={24} /> {/* You can adjust size */}
    </button>
  );
}
