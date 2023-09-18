import React, { useEffect, useState } from "react";
import Headeradmin from "./Headeradmin";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function Reqprod() {
  const [searchitem, setSearchitem] = useState("");
  const [user, setUser] = useState("");
  const [allproducts, setAllproducts] = useState([]);
  const [name, setName] = useState();

  const fetchdata = async () => {
    const result = await axios
      .get("http://localhost:8000/admin/getnonactiveprod")
      .then((response) => {
        console.log(response.data);
        setAllproducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dltprod = async (id) => {
    const result = await axios.delete("http://localhost:8000/deleteitem/" + id);
    console.log(result);
    fetchdata();
  };

  useEffect(() => {
    if (localStorage.getItem("usern")) {
      setUser(localStorage.getItem("usern"));
    }
    fetchdata();
  }, []);
  console.log(user);
  return (
    <div>
      <Headeradmin />

      <Container className="mt-5 ">
        <Row style={{ marginTop: "120px", marginBottom: "433px" }}>
          <Col>
            <div className="text-center searchset">
              <div>
                <h1 className="produnctsfont">
                  All Requested products for approval{" "}
                  <i class="fa-solid fa-cart-shopping"></i>
                </h1>
                <Form.Group className="mb-3 mt-4">
                  <Form.Control
                    style={{ backgroundColor: "lightgray" }}
                    onChange={(e) => setSearchitem(e.target.value)}
                    placeholder="Search.. "
                  />
                </Form.Group>
              </div>
            </div>
            {allproducts.length > 0 ? (
              <div>
                {user && (
                  <div className="mt-5">
                    <Table striped bordered responsive hover>
                      <thead
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        <tr>
                          <th className="px-3">No</th>
                          {/* <th className="px-3">Id</th> */}
                          <th className="px-3">Name</th>
                          <th className="px-3">Type</th>
                          <th className="px-3">User</th>
                          <th className="px-3">Price</th>
                          <th className="px-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allproducts
                          .filter((data) => {
                            if (searchitem == "") {
                              return data;
                            } else if (
                              data.productName
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
                              {/* <td className="px-3 textfonts">{data.Id}</td> */}
                              <td className="px-3 textfonts">
                                {data.productName}
                              </td>
                              <td className="px-3 textfonts">{data.type}</td>
                              <td className="px-3 textfonts">
                                {data.sellerId.email}
                              </td>
                              <th className="px-3 textfonts">{data.price}</th>
                              <td className="px-3">
                                <Link to={"/adminprodinfo/" + data._id}>
                                  {" "}
                                  <Button
                                    className="ms-3 mt-1"
                                    variant="success"
                                  >
                                    <i class="fa-solid fa-check"></i>
                                  </Button>
                                </Link>
                                <Button
                                  onClick={() => dltprod(data._id)}
                                  variant="danger"
                                  className="ms-2 mt-1"
                                >
                                  <i class="fa-solid fa-circle-xmark"></i>
                                </Button>
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
              <div>
                <h1 className="text-center mt-5 noitemsmsg">
                  No new products request <i class="fa-thin fa-empty-set"></i>
                </h1>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Reqprod;
