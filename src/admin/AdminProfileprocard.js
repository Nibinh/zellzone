import React from "react";
import "../components/Profileprodcard.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

const AdminProfileprocard = ({ products }) => {
  return (
    <Link
      to={`/adminprocardveiw/${products._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Img
          className="p-5 cardimg"
          style={{ width: "300px", height: "300px" }}
          variant="top"
          src={products.imageUrl}
        />
        <Card.Body style={{ backgroundColor: "grey" }}>
          <Card.Title>{products.productName}</Card.Title>
          <Card.Text>
            <p>Type: {products.type}</p>{" "}
          </Card.Text>
          <Card.Text>{products.price} Rs</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default AdminProfileprocard;
