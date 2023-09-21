import React, { useEffect, useState } from "react";
import "../components/Profileprodcardview.css";
import Headertwo from "../components/Headertwo";
import { useParams } from "react-router-dom";
// import axios from "axios";
import axios from "../axios";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const Adminprocardveiw = () => {
  const params = useParams();
  const [prodetail, setProdetail] = useState([]);

  const location = useNavigate();

  const fetchdata = async () => {
    const result = await axios
      .get("/admin/adminveiwproduct/" + params.id)
      .then((response) => {
        setProdetail(response.data);
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
      <Headertwo />

      <Container className="mb-5">
        <div>
          <Row style={{ marginTop: "70px" }}>
            <Col lg={2}></Col>
            <Col lg={8} className="mb-5">
              <div className="car me-5">
                <img src={prodetail.imageUrl} alt="" />

                <div>
                  <h1 className="proddisname mb-4">{prodetail.productName}</h1>
                  <h4>{prodetail.type}</h4>
                  <p style={{ textAlign: "justify" }}>{prodetail.descripton}</p>
                  <span>{prodetail.productAge} used</span>
                  <h4>₹{prodetail.price}</h4>

                  {/* <Button
                    onClick={() => delprod(prodetail._id)}
                    variant="secondary"
                    className="ms-2 mt-1"
                  >
                    <i class="fa-solid text-dark fa-trash"></i>
                  </Button> */}
                </div>
              </div>
            </Col>
            <Col lg={2}></Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Adminprocardveiw;
