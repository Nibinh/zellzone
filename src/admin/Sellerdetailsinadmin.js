import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function Sellerdetailsinadmin({ eml, ph, address }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant=""
        style={{ backgroundColor: "green" }}
        tyle
        className=""
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Seller details<i class="ms-2 text-dark fa-solid fa-user"></i>
      </Button>

      <Collapse in={open}>
        <div className="my-2" id="example-collapse-text">
          <div>
            <h6>
              <i class="fa-solid fa-envelope me-2"></i>
              {eml}
            </h6>
            <p>
              <i class="fa-solid fa-phone me-2"></i>
              {ph}
            </p>
            <p>
              <i class="fa-sharp fa-solid fa-location-dot me-2"></i>
              {address}
            </p>
          </div>
        </div>
      </Collapse>
    </div>
  );
}

export default Sellerdetailsinadmin;
