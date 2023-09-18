import React, { useState } from "react";
import "./Adminlogin.css";
import Headertwo from "../components/Headertwo";
import { Container, Row, Col } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Adminlogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [valid, setValid] = useState("");

  const location = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const body = {
      email,
      password,
    };
    const result = await axios
      .post("http://localhost:8000/admin/login", body)
      .then((response) => {
        console.log(response);
        // setValid(response.data.usern);
        localStorage.setItem("usern", response.data.email);
        location("/adminhome");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div>
      <Headertwo />
      <div className="box ">
        <div>
          <Container className="mt-5 mb-5 animate__animated  animate__fadeIn">
            <Form className=" mt-4 mb-5 boxd" onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <h2 className="text-center mt-5">Admin Login</h2>
                <hr></hr>
                <Col className="text-center">
                  <Form.Group className="p-4" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      {...register("email", {
                        value: email,
                        required: true,
                        onChange: (e) => setEmail(e.target.value),
                      })}
                      placeholder="Enter email"
                    />
                    {errors.email && errors.email.type === "required" && (
                      <span className="text-danger">Enter your Email</span>
                    )}
                  </Form.Group>

                  <Form.Group className="p-4" controlId="formBasicPassword">
                    <Form.Control
                      type="password"
                      {...register("password", {
                        value: password,
                        required: true,
                        onChange: (e) => setPassword(e.target.value),
                      })}
                      placeholder="Password"
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-danger">Enter your password</span>
                    )}
                  </Form.Group>

                  <Button className="" variant="primary" type="submit">
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
