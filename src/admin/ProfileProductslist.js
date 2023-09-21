import React, { useEffect, useState } from "react";
import Headeradmin from "./Headeradmin";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
// import axios from "axios";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import axios from "../axios";

function ProfileProductslist() {
  const [searchitem, setSearchitem] = useState("");
  const [allproduct, setProduct] = useState([]);
  const [user, setUser] = useState("");

  const fetchdata = async () => {
    const result = await axios
      .get("/product/allproducts")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("usern")) {
      setUser(localStorage.getItem("usern"));
    }
    fetchdata();
  }, []);

  return (
    <div>
      <Headeradmin />

      <Container className="mt-5 ">
        <Row style={{ marginTop: "120px", marginBottom: "433px" }}>
          <Col>
            <div className="text-center searchset">
              <div>
                <h1 className="produnctsfont">
                  All Accepted Products<i class="ms-2 fa-solid fa-users"></i>
                </h1>
                <Form.Group
                  className="mt-3"
                  style={{ width: "300px", color: "black" }}
                >
                  <Form.Control
                    style={{ backgroundColor: "lightgray" }}
                    onChange={(e) => setSearchitem(e.target.value)}
                    placeholder="Search.. "
                  />
                </Form.Group>
              </div>
            </div>
            {allproduct.length > 0 ? (
              <div>
                {user && (
                  <div className="mt-5">
                    <Table striped bordered responsive hover>
                      <thead
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        <tr>
                          <th className="px-3 textfonts">Id</th>
                          <th className="px-3 textfonts">Name</th>
                          <th className="px-3 textfonts">Type</th>
                          <th className="px-3 textfonts">Used for</th>
                          <th className="px-3 textfonts">Price</th>
                          <th className="px-3 textfonts">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allproduct
                          .filter((data) => {
                            if (searchitem == "") {
                              return data;
                            } else if (
                              data.name
                                .toLowerCase()
                                .includes(searchitem.toLowerCase())
                            ) {
                              return data;
                            } else if (
                              data.type
                                .toLowerCase()
                                .includes(searchitem.toLowerCase())
                            ) {
                              return data;
                            }
                          })
                          .map((data, index) => (
                            <tr>
                              <td className="px-3 textfonts">{index + 1}</td>
                              <td className="px-3 textfonts">
                                {data.productName}
                              </td>
                              <td className="px-3 textfonts">{data.type}</td>
                              <td className="px-3 textfonts">
                                {data.productAge}
                              </td>
                              <td className="px-3 textfonts">
                                {data.price} Rs
                              </td>
                              <td className="px-3 text-center">
                                <Link
                                  to={"/adminallproddetailsdisp/" + data._id}
                                >
                                  {" "}
                                  <Button
                                    className=""
                                    style={{ backgroundColor: "limegreen" }}
                                  >
                                    <i class="fa-solid fa-eye"></i>
                                  </Button>
                                </Link>
                                {/* <Button onClick={()=>deluser(data.email)} variant="secondary" className='ms-2 mt-1'><i class="fa-solid fa-trash"></i></Button>{' '} */}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </Table>
                  </div>
                )}
                {user == "" && (
                  <div>
                    {" "}
                    <div>
                      <h1 className="text-center mt-5 noitemsmsg">
                        Login Please!!{" "}
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <h1 className="text-center mt-5 noitemsmsg">
                No Products yet! <i class="fa-thin fa-empty-set"></i>
              </h1>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ProfileProductslist;
