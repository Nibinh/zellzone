import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import "./Headeradmin.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios";

function Headeradmin() {
  const location = useNavigate();

  const logout = async () => {
    const loGout = await axios
      .post("/admin/logout")
      .then((response) => {
        console.log(response);
        if (localStorage.getItem("usern")) {
          localStorage.removeItem("usern");
        }
        location("/adminlogin");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Navbar fixed="top" expand="lg" className="navi">
      <Container>
        <Link
          to={`/adminhome`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Navbar.Brand
            className="d-flex headfont"
            style={{ fontSize: "35px", fontWeight: "600", color: "black" }}
          >
            <img
              alt=""
              src="https://png.pngtree.com/png-clipart/20220909/original/pngtree-online-shopping-icon-design-png-image_8494138.png"
              width="60"
              height="60"
            />
            &nbsp; ZellZone
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto ">
            <Nav.Link href="/reqprod" style={{ color: "black" }}>
              Reqprod
            </Nav.Link>
            <Nav.Link href="/profileProductslist" style={{ color: "black" }}>
              Product
            </Nav.Link>
            <Button
              onClick={() => logout()}
              className="ms-1 "
              style={{ borderRadius: "20px" }}
            >
              {" "}
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headeradmin;
