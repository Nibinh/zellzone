import React from "react";
import "./ProductView.css";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

function ProductView({ produc }) {
  return (
    <Link
      to={`/homeprodview/${produc._id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <Card
        className="card animate__animated animate__fadeInUp"
        style={{ width: "18rem" }}
      >
        <Card.Img
          className="p-5 cardimg"
          style={{ width: "300px", height: "300px" }}
          variant="top"
          src={produc.imageUrl}
        />

        <Card.Body style={{ backgroundColor: "grey" }}>
          <Card.Title> {produc.productName}</Card.Title>
          <Card.Text>
            <p>{produc.type}</p>{" "}
          </Card.Text>
          <Card.Text>₹ {produc.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>

    // <div class="container">
    //   <div class="box">
    //     <div class="imgBox" style={{borderRadius:'20px'}} >
    //       <img
    //         src={produc.image}
    //         alt="no image"
    //         width="60"
    //         height="60"
    //       />
    //     </div>
    //     <div class="content">
    //       <h2>
    //         {produc.name}<br />
    //         <span>{produc.price}</span>
    //       </h2>
    //     </div>
    //   </div>
    //   </div>
  );
}

export default ProductView;
