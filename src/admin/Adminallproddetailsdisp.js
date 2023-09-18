import React, { useEffect, useState } from "react";
import Headeradmin from "./Headeradmin";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Sellerdetailsinadmin from "./Sellerdetailsinadmin";
import { useNavigate } from "react-router-dom";

import axios from "axios";

function Adminallproddetailsdisp() {
  const params = useParams();

  const [prodetail, setProdetail] = useState([]);
  const [address, setAddress] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [useremail, setUseremail] = useState("");

  const fetchdata = async () => {
    const result = await axios
      .get("http://localhost:8000/admin/adminveiwproduct/" + params.id)
      .then((response) => {
        console.log(response.data);
        setProdetail(response.data);
        setUseremail(response.data.sellerId.email);
        setPhonenumber(response.data.sellerId.phonenumber);
        setAddress(response.data.sellerId.address);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <Headeradmin />

      <Container className="mb-5">
        <div>
          <Row style={{ marginTop: "170px" }}>
            <Col lg={2}></Col>
            <Col lg={8} className="mb-5">
              <div className="car me-5">
                <img src={prodetail.imageUrl} alt="" />

                <div>
                  <h1 className="proddisname mb-4">{prodetail.productName}</h1>
                  <h4>{prodetail.type}</h4>
                  <p style={{ textAlign: "justify" }}>
                    {prodetail.description}
                  </p>
                  <span>{prodetail.productAge} used</span>
                  <h4>{prodetail.price} Rs</h4>

                  {/* <Button onClick={()=>addtowish()}  variant="secondary" className='ms-2 mt-1'>Add to Wishlist<i  class="ms-2 text-danger fa-solid fa-heart"></i></Button>  */}

                  <Row>
                    <Col className="" lg={12}>
                      <Sellerdetailsinadmin
                        className=""
                        eml={useremail}
                        ph={phonenumber}
                        address={address}
                      ></Sellerdetailsinadmin>
                    </Col>
                  </Row>
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

export default Adminallproddetailsdisp;
