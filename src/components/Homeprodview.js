import React, { useState, useEffect } from "react";
import Headertwo from "./Headertwo";
import "./Homeprodview.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Sellerdetails from "./Sellerdetails";
import LazyLoad from "react-lazy-load";
import axios from "axios";

axios.defaults.withCredentials = true;
function Homeprodview() {
  const params = useParams();
  const [prodetail, setProdetail] = useState([]);
  const [selerName, setSellername] = useState("");
  const [sellerNumber, setSellerNumber] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [selleremail, setSelleremail] = useState("");
  const [userId, setUserId] = useState("");

  const fetchdata = async () => {
    const { data } = await axios.get(
      "http://localhost:8000/product/veiwproduct/" + params.id
    );
    console.log(data.sellerId);
    setProdetail(data);
    setSellerAddress(data.sellerId.address);
    setSelleremail(data.sellerId.email);
    setSellername(data.sellerId.name);
    setSellerNumber(data.sellerId.phonenumber);
  };

  useEffect(() => {
    fetchdata();
    if (localStorage.getItem("email")) {
      setUserId(localStorage.getItem("email"));
    }
  }, []);
  console.log(userId, params.id);
  const addToWishlist = async () => {
    const result = await axios
      .get(
        `http://localhost:8000/wishlist/addtowishlist/${userId}/${params.id}`
      )
      .then((response) => {
        console.log(response);
        alert(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  return (
    <div>
      <Headertwo />

      <Container className="mb-5">
        <div>
          <Row style={{ marginTop: "70px" }}>
            <Col lg={2}></Col>
            <Col lg={8} className="mb-5">
              <div className="car me-5">
                <img src={prodetail.imageUrl} alt="image" />

                <div>
                  <h1 className="proddisname mb-4">{prodetail.productName}</h1>
                  <h4>{prodetail.type}</h4>
                  <p style={{ textAlign: "justify" }}>
                    {prodetail.description}
                  </p>
                  <span>{prodetail.productAge} used</span>
                  <h4>₹{prodetail.price}</h4>

                  {/* <Button onClick={()=>addtowish()}  variant="secondary" className='ms-2 mt-1'>Add to Wishlist<i  class="ms-2 text-danger fa-solid fa-heart"></i></Button>  */}
                  <Sellerdetails
                    className="ms-5"
                    email={selleremail}
                    name={selerName}
                    phonenumber={sellerNumber}
                    address={sellerAddress}
                  ></Sellerdetails>
                  <Button
                    onClick={() => addToWishlist()}
                    variant="secondary"
                    className="ms-2 mt-1"
                  >
                    Add to Wishlist
                    <i class="ms-2 text-danger fa-solid fa-heart"></i>
                  </Button>
                </div>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default Homeprodview;
