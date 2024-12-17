import React from "react";
import { Link } from "react-router-dom";

// Define props for the Card component
interface CardProps {
  title: string; // Title of the card
  onDelete: () => void; // Callback function for delete action
}

// Card Component
const Card: React.FC<CardProps> = ({ title, onDelete ,id}) => {
  return (
    <div style={styles.cardContainer}>
    <Link to={`/deck/${id}`}>
      <h2 style={styles.cardTitle}>{title}</h2>
      </Link>
      
      <button style={styles.deleteButton} onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

// Inline styles for the Card (you can replace this with CSS classes)
const styles = {
  cardContainer: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "1rem",
    maxWidth: "300px",
    margin: "1rem auto",
    textAlign: "center",
    backgroundColor: "#fff",
  },
  cardTitle: {
    fontSize: "1.5rem",
    color: "#333",
  },
  deleteButton: {
    marginTop: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  deleteButtonHover: {
    backgroundColor: "#c0392b",
  },
};

export default Card;
