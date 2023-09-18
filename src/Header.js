import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Header.css";
import { Link } from "react-router-dom";

function Header() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (localStorage.getItem("email")) {
      setEmail(localStorage.getItem("email"));
    }

    window.addEventListener("scroll", () => {
      if (window.scrollY > 550) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  }, []);

  return (
    <Navbar fixed="top" expand="lg" className={`nav ${show && "nav_black"}`}>
      <Container>
        <Link to={`/`} style={{ textDecoration: "none", color: "white" }}>
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
          <Nav className="ms-auto mb-3">
            <Nav.Link
              href="#home"
              className="headertextstyle"
              style={{ color: "black" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#about"
              className="headertextstyle"
              style={{ color: "black" }}
            >
              About
            </Nav.Link>
            <Nav.Link
              href="#product"
              className="headertextstyle"
              style={{ color: "black" }}
            >
              Product
            </Nav.Link>
            {email == "" && (
              <Nav.Link
                href="/login"
                className="headertextstyle"
                style={{ color: "black" }}
              >
                Login
              </Nav.Link>
            )}
            {email && (
              <Nav.Link
                href={"/profile/" + email}
                className="headertextstyle"
                style={{ color: "black" }}
              >
                Profile
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
