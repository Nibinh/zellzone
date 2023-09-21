import React, { useState, useEffect } from "react";
import Headertwo from "./Headertwo";
import "./Homeprodview.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Alert, Button } from "react-bootstrap";
import Sellerdetails from "./Sellerdetails";
// import axios from "axios";
import axios from "../axios";
import LoadingSpinner from "./LoadingSpinner";

function Homeprodview() {
  const params = useParams();
  const [prodetail, setProdetail] = useState([]);
  const [selerName, setSellername] = useState("");
  const [sellerNumber, setSellerNumber] = useState("");
  const [sellerAddress, setSellerAddress] = useState("");
  const [selleremail, setSelleremail] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [alertVariant, setAlertVariant] = useState("");

  const fetchdata = async () => {
    const data = await axios
      .get("/product/veiwproduct/" + params.id)
      .then((response) => {
        console.log(response.data);
        setProdetail(response.data);
        setSellerAddress(response.data.sellerId.address);
        setSelleremail(response.data.sellerId.email);
        setSellerNumber(response.data.sellerId.phonenumber);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  console.log(alert);
  useEffect(() => {
    fetchdata();
    if (localStorage.getItem("email")) {
      setUserId(localStorage.getItem("email"));
    }
  }, []);

  const addToWishlist = async () => {
    const result = await axios
      .get(`/wishlist/addtowishlist/${userId}/${params.id}`)
      .then((response) => {
        console.log(response);
        setMessage(response.data);
        setAlertVariant("success");
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 2000);
      })
      .catch((error) => {
        if (!localStorage.getItem("email")) {
          setMessage("Login Please");
          setAlertVariant("primary");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        } else {
          setMessage("blah");
          setAlert(true);
          setTimeout(() => {
            setAlert(false);
          }, 2000);
        }

        console.log(error);
      });
  };

  return (
    <div>
      <Headertwo />

      <Container className="mb-5">
        {alert && (
          <div className="text-center">
            <Alert variant={alertVariant} onClose={() => setAlert(false)}>
              {message}
            </Alert>
          </div>
        )}
        <div>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <Row style={{ marginTop: "70px" }}>
              <Col lg={2}></Col>
              <Col lg={8} className="mb-5">
                <div className="car me-5">
                  <img src={prodetail.imageUrl} alt="image" />

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
          )}
        </div>
      </Container>
    </div>
  );
}

export default Homeprodview;
