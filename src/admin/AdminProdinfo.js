import React, { useEffect, useState } from "react";
import "./AdminProdinfo.css";
import Headeradmin from "./Headeradmin";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

function AdminProdinfo() {
  const params = useParams();
  const [prod, setProd] = useState([]);
  const location = useNavigate();

  const [id, setId] = useState("");
  const [useremail, setUseremail] = useState("");
  const [prodName, setProdname] = useState("");
  const [prodType, setProdtype] = useState("");
  const [prodAge, setProdage] = useState("");
  const [prodPrice, setProdprice] = useState("");
  const [prodDesc, setProddesc] = useState("");
  const [prodImage, setProdimage] = useState("");

  const fetchdata = async () => {
    const result = await axios
      .get("/admin/adminveiwproduct/" + params.id)
      .then((response) => {
        setProd(response.data);
        setUseremail(response.data.email);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const acptitem = async (id) => {
    const result = await axios
      .get("/admin/activatingproduct/" + id)
      .then((response) => {
        console.log(response);
        location("/reqprod");
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

      <Container style={{ marginTop: "160px" }}>
        <Row className="p-3 mb-5">
          <Col lg={7} className="">
            <img
              className=""
              style={{ height: "300px" }}
              width={"300px"}
              src={prod.imageUrl}
              alt=""
            />
            <h1 className="p-4 ms-2 adminprodfont">{prod.productName}</h1>
          </Col>
          <Col lg={5} className="mt-5 ">
            <h3 className="adminprodfont">
              <span>
                <b>Type: </b>
              </span>
              {prod.type}
            </h3>
            <h3 className="adminprodfont">
              <span>
                <b> Used for:</b>{" "}
              </span>
              {prod.productAge}
            </h3>
            <h3 className="adminprodfont">
              <span>
                {" "}
                <b> Details:</b>{" "}
              </span>
              {prod.description}.
            </h3>
            <h3 className="adminprodfont">
              <span>
                <b>Price: </b>
              </span>
              {prod.price}
            </h3>
            <h3 className="adminprodfont">
              <span>
                <b>Sold by: </b>
              </span>
              {useremail}
            </h3>

            <Button
              onClick={() => acptitem(prod._id)}
              variant="success"
              className="ms-2 mt-1"
            >
              Approve<i class="ms-2 fa-solid fa-thumbs-up"></i>
            </Button>
          </Col>
        </Row>
      </Container>
      {/* 
        <section class="py-5">
            <div class="container px-4 px-lg-5 my-5">
                <div class="row gx-4 gx-lg-5 align-items-center">
                    <div class="col-md-6"><img class="card-img-top mb-5 mb-md-0" src="https://dummyimage.com/600x700/dee2e6/6c757d.jpg" alt="..." /></div>
                    <div class="col-md-6">
                        <div class="small mb-1">SKU: BST-498</div>
                        <h1 class="display-5 fw-bolder">Shop item template</h1>
                        <div class="fs-5 mb-5">
                            <span class="text-decoration-line-through">$45.00</span>
                            <span>$40.00</span>
                        </div>
                        <p class="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at dolorem quidem modi. Nam sequi consequatur obcaecati excepturi alias magni, accusamus eius blanditiis delectus ipsam minima ea iste laborum vero?</p>
                        <div class="d-flex">
                            <input class="form-control text-center me-3" id="inputQuantity" type="num" value="1" style="max-width: 3rem" />
                            <button class="btn btn-outline-dark flex-shrink-0" type="button">
                                <i class="bi-cart-fill me-1"></i>
                                Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section> */}
    </div>
  );
}

export default AdminProdinfo;
