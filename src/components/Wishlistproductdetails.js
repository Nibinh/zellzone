import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Headertwo from "./Headertwo";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Sellerdetails from "./Sellerdetails";
import Button from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

function Wishlistproductdetails() {
  const params = useParams();
  const [prodetail, setProdetail] = useState([]);
  const [sellerEmail, setSellerEmail] = useState("");
  const [sellerPhonenumber, setSellerPhonenumber] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    const result = await axios
      .get("http://localhost:8000/product/veiwproduct/" + params.id)
      .then((response) => {
        setProdetail(response.data);
        setSellerEmail(response.data.sellerId.email);
        setSellerPhonenumber(response.data.sellerId.phonenumber);
        setSellerAddress(response.data.sellerId.address);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div>
      <Headertwo />

      <Container className="mb-5">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            <Row style={{ marginTop: "70px" }}>
              <Col lg={2}></Col>
              <Col lg={8} className="mb-5">
                <div className="car me-5">
                  <img src={prodetail.imageUrl} alt="" />

                  <div>
                    <h1 className="proddisname mb-4">
                      {prodetail.productName}
                    </h1>
                    <h4>{prodetail.type}</h4>
                    <p style={{ textAlign: "justify" }}>
                      {prodetail.description}
                    </p>
                    <span>{prodetail.productAge} used</span>
                    <h4>₹{prodetail.price}</h4>

                    <Sellerdetails
                      className="ms-5"
                      email={sellerEmail}
                      phonenumber={sellerPhonenumber}
                      address={sellerAddress}
                    ></Sellerdetails>
                  </div>
                </div>
              </Col>
              <Col lg={2}></Col>
            </Row>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Wishlistproductdetails;
