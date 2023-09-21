import React, { useEffect, useState } from "react";
import "./Profile.css";
import Headertwo from "./Headertwo";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Profileprodcard from "./Profileprodcard";
import { Link } from "react-router-dom";
// import axios from "axios";
import axios from "../axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function Profile() {
  const [eml, setEml] = useState("");
  const [user, setUser] = useState([]);
  const [sell, setSell] = useState([]);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const location = useNavigate();

  const fetchdata = async () => {
    const result = await axios
      .get("/user/getUser/" + params.email)
      .then((response) => {
        setUser(response.data);
        setSell(response.data.soldProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  console.log(sell);

  useEffect(() => {
    fetchdata();
  }, []);

  const logout = async () => {
    const log = await axios
      .post("/auth/logout")
      .then((response) => {
        console.log(response);
        if (localStorage.getItem("email")) {
          localStorage.removeItem("email");
        }
        location("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Headertwo />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <div className="mt-5">
            <Row>
              <Col md={7}>
                <div className=" px-5">
                  <img className="pici  px-3" src={user.imageUrl} alt="no" />
                </div>
                <div className="px-4 picname mt-3">
                  <h2 className="text-center picnamef profilefont p-1">
                    {user.name}
                  </h2>
                </div>
              </Col>

              <Col md={4} className="ms-5 mt-3 ">
                <div style={{ marginTop: "50px" }}>
                  <h3>
                    <i class="fa-solid fa-envelope"></i>
                    {user.email}
                  </h3>
                  <h3>
                    <i class="fa-solid fa-mobile-screen-button"></i>
                    {user.phonenumber}
                  </h3>
                  <h3>
                    <i class="fa-solid fa-location-dot"></i>
                    {user.address}
                  </h3>
                </div>
                <div className="mt-3">
                  <Link to={"/edit/" + user.email}>
                    {" "}
                    <Button className="ms-2" variant="light">
                      <i class="fa-solid fa-user-pen"></i>
                    </Button>
                  </Link>
                  <Link to={"/Wishlistdisplaying/" + user._id}>
                    <Button className="ms-2" variant="light">
                      <i class="text-danger fa-solid fa-heart"></i>
                    </Button>
                  </Link>
                  <Link to={"/addnewprod"}>
                    <Button className="ms-2" variant="light">
                      <i class="fa-solid fa-cart-plus"></i>
                    </Button>
                  </Link>
                  <Button
                    onClick={() => logout()}
                    className="ms-2 text-danger"
                    variant="light"
                  >
                    Logout
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
          <hr className="mt-5 " style={{ color: "blue" }}></hr>
          <h2 className="produnctsfont text-center">
            Your Store<i class="ms-2 fa-solid fa-bag-shopping"></i>
          </h2>

          <div className="mb-5 ">
            <Row>
              {sell.map((item) => (
                <Col className="px-5 mt-5 " lg={3}>
                  <Profileprodcard products={item} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
