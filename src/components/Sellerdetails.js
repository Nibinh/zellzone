import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function Sellerdetails({ email, phonenumber, address }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        variant=""
        style={{ backgroundColor: "green" }}
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Contact<i class="ms-2 text-dark fa-solid fa-user"></i>
      </Button>

      <Collapse in={open}>
        <div className="my-2" id="example-collapse-text">
          <div>
            <h6>
              <i class="fa-solid fa-envelope me-2"></i>
              {email}
            </h6>
            <p>
              <i class="fa-solid fa-phone me-2"></i>
              {phonenumber}
            </p>
            <p>
              <i class="fa-sharp fa-solid fa-location-dot me-2"></i>
              {address}
            </p>
          </div>
        </div>
      </Collapse>
    </>
  );
}

export default Sellerdetails;
