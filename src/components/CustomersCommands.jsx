import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CustomersCommands() {
  const [comments, setComments] = useState([]);

  // Fetch all comments
  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getComments");
      setComments(res.data);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  // Delete a comment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteComment/${id}`);
      setComments(comments.filter((c) => c._id !== id)); // update UI instantly
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📩 Users Messages</h2>
      {comments.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {comments.map((comment) => (
            <li
              key={comment._id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "8px",
                background: "#f9f9f9",
              }}
            >
              <p>
                <strong>Type:</strong> {comment.type}
              </p>
              <p>
                <strong>Email:</strong> {comment.email}
              </p>
              <p>
                <strong>Message:</strong> {comment.message}
              </p>
              <button
                onClick={() => handleDelete(comment._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "8px 12px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
