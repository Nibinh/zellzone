import React, { useState, useEffect } from "react";
import "./Wishlistdisplaying.css";
import Headertwo from "./Headertwo";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Wishlistdltbutton from "./Wishlistdltbutton";
import { Link } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

function Wishlistdisplaying() {
  const params = useParams();

  const [wish, setWish] = useState([]);
  const [searchitem, setSearchitem] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchdata = async () => {
    const result = await axios
      .get("http://localhost:8000/wishlist/gettingall/" + params.id)
      .then((response) => {
        setWish(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchdata();
    if (localStorage.getItem("email")) {
      setUserEmail(localStorage.getItem("email"));
    }
  }, [wish]);

  return (
    <div>
      <Headertwo />

      <Container className="container">
        <Row style={{ marginTop: "40px", marginBottom: "433px" }}>
          <Col className="text-center">
            <div className="text-center">
              <h1 className="addprodheading">
                Wishlist<i class="text-danger ms-2 fa-solid fa-heart"></i>
              </h1>
              <Row className="mt-5">
                <Col></Col>
                <Col className="text-center">
                  <Form.Group className="mb-3 search">
                    <Form.Control
                      onChange={(e) => setSearchitem(e.target.value)}
                      placeholder="Search.. "
                    />
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
            </div>
            {loading ? (
              <LoadingSpinner />
            ) : (
              <div>
                {wish.length > 0 ? (
                  <Table
                    striped
                    bordered
                    responsive
                    hover
                    className="mt-2 text-center"
                  >
                    <thead style={{ backgroundColor: "black", color: "white" }}>
                      <tr>
                        <th className="px-3">Id</th>
                        <th className="px-3">Image</th>
                        <th className="px-3">Name</th>
                        <th className="px-3">Price</th>
                        <th className="px-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wish
                        .filter((item) => {
                          if (searchitem == "") {
                            return item;
                          } else if (
                            item.productName
                              .toLowerCase()
                              .includes(searchitem.toLowerCase())
                          ) {
                            return item;
                          }
                        })
                        .map((item, index) => (
                          <tr>
                            <td className="px-3 py-4">{index + 1}</td>
                            <td className="px-3" style={{ width: "350px" }}>
                              <img
                                width="120px"
                                height="90px"
                                src={item.imageUrl}
                                alt="Product image"
                              />
                            </td>
                            <td className="px-3 py-4">{item.productName}</td>
                            <td className="px-3 py-4">{item.price}</td>
                            <td className="px-3 " style={{ width: "200px" }}>
                              <div className="ms-5">
                                <Link to={"/Wishlistproductdetail/" + item._id}>
                                  {" "}
                                  <Button
                                    style={{ float: "left" }}
                                    className="mt-1"
                                    variant="primary"
                                  >
                                    <i class="fa-solid fa-eye"></i>
                                  </Button>
                                </Link>
                                <div style={{ float: "left" }}>
                                  {" "}
                                  <Wishlistdltbutton
                                    idnumber={item._id}
                                    email={userEmail}
                                    className="mt-auto"
                                  ></Wishlistdltbutton>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                ) : (
                  <div>
                    <h1 className="mt-5">
                      You havent added anything to wishlist
                    </h1>
                    <h1>(╯_╰)</h1>
                  </div>
                )}
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Wishlistdisplaying;
