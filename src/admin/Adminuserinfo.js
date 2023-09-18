import React, { useEffect, useState } from "react";
import "./Adminuserinfo.css";
import { Container, Row, Col } from "react-bootstrap";
import Headeradmin from "./Headeradmin";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Profileprodcard from "../components/Profileprodcard";
import AdminProfileprocard from "./AdminProfileprocard";

function Adminuserinfo() {
  const params = useParams();
  const [user, setUser] = useState([]);
  const [sellp, setSellp] = useState([]);

  const fetchdata = async () => {
    const result = await axios
      .get("http://localhost:8000/admin/getauser/" + params.eml)
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setSellp(response.data.soldProducts);
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

      <div>
        <Row style={{ marginTop: "150px" }}>
          <h1 className="text-center produnctsfont">User Details</h1>
          <Col lg={7} className=" px-5 mt-4">
            <img
              className=""
              style={{ height: "300px" }}
              width={"300px"}
              src={user.imageUrl}
              alt=""
            />
          </Col>

          <Col lg={4} className="mt-5 px-5">
            <p className="adminprodfont" style={{ fontSize: "30px" }}>
              <b>Name:</b> {user.name}
            </p>
            <p className="adminprodfont" style={{ fontSize: "25px" }}>
              <b>Email:</b> {user.email}
            </p>
            <p className="adminprodfont" style={{ fontSize: "25px" }}>
              <b>Ph: </b>
              {user.phonenumber}
            </p>
            <p className="adminprodfont" style={{ fontSize: "25px" }}>
              <b>Adrress:</b> {user.address}
            </p>
          </Col>
        </Row>
      </div>
      <hr />

      <h2 className="text-center produnctsfont mt-4">Selling Products</h2>

      <div className="mb-5 ">
        <Row>
          {sellp.map((item) => (
            <Col className="px-5 mt-5 " lg={3}>
              <AdminProfileprocard products={item} />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Adminuserinfo;
