import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
// import axios from "axios";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

function Wishlistdltbutton({ idnumber, email }) {
  const location = useNavigate();

  //   console.log(idnumber);
  const dltprod = async () => {
    const result = await axios
      .get("/wishlist/removing/" + email + "/" + idnumber)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button
        onClick={() => dltprod()}
        variant="secondary"
        className="ms-2 mt-1 "
      >
        <i class="fa-solid fa-trash"></i>
      </Button>
    </div>
  );
}

export default Wishlistdltbutton;
