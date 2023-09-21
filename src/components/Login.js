import React, { useState, useEffect } from "react";
import Headertwo from "./Headertwo";
import "./Login.css";
import { Container, Row, Col } from "react-bootstrap";
import { Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import axios from "../axios";

axios.defaults.withCredentials = true;

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errdisp, setErrdisp] = useState();
  const [eremail, setEremail] = useState();
  const [alert, SetAlert] = useState(false);

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
      .post("/auth/login", body)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("email", response.data.email);
        SetAlert(true);
        setTimeout(() => {
          SetAlert(false);
          location("/");
        }, 1800);
      })
      .catch((error) => {
        console.log(error.response);
        console.log(error.response.data);
        setErrdisp(error.response.data);

        setTimeout(() => {
          setErrdisp(null);
        }, 4000);
      });
  };

  return (
    <div>
      <Headertwo />

      {alert && (
        <div className="text-center">
          <Button variant="green">
            <Alert variant="success">Login Successfull</Alert>
          </Button>
        </div>
      )}

      <Container className="mt-2 mb-5 p-5 animate__animated  animate__fadeIn animate__delay-0.5s">
        <Form className="rrow mt-5 mb-3 " onSubmit={handleSubmit(onSubmit)}>
          <Row className="g-0 ">
            <Col lg={7}>
              <img
                alt=""
                src="images\aboutimage.png"
                className="im img-fluid "
              />
            </Col>
            <Col lg={5} className="px-5 p-5">
              <h2 style={{ fontWeight: "700" }}>Login</h2>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
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
                  <span className="text-danger">Email is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
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
                  <span className="text-danger">Password is required</span>
                )}
                {errdisp && (
                  <p className="text-center text-danger">{errdisp}</p>
                )}
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
              <span>
                <p className="text-muted">
                  new user?
                  <Link to={"/register"}>
                    <a class="btn btn-link">Register</a>
                  </Link>
                </p>
              </span>
            </Col>
          </Row>
        </Form>
      </Container>

      {/* ////// */}

      {/* <div className='mt-5 mb-5'>
      <Row>
        <Col className='aa'>
        <div className='bb'>
        <div className='mt-5'>
          <h1 className='text-center'>Login</h1>
          <hr/>

     <Form className='mt-4 fm' onSubmit={handleSubmit(onSubmit)}>
      
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control   type="email"  {...register("email",{ value: email,required: true, onChange: (e) => setEmail(e.target.value) })} placeholder="Enter email"/>
        {errors.email && errors.email.type === "required" && <span className='text-danger'>Email is required</span>} 
        
      </Form.Group>

      <Form.Group className="mb-3 brd" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" {...register("password",{ value: password,required: true, onChange: (e) => setPassword(e.target.value) })}  placeholder="Password"  />
        {errors.password && errors.password.type === "required" && <span className='text-danger'>Password is required</span>}
        {errdisp&&(<p className='text-center text-danger'>{errdisp}</p>)}
      </Form.Group>
   
     
      <Button variant="dark" type="submit">
        Submit
      </Button>
     <div>
        <span>
          <p className="text-muted">new user?
         <Link to={'/register'}>
         <a class="btn btn-link">Register</a>
         </Link>
          </p>
            </span>
     </div>
    </Form>
        </div>
        </div>
        </Col>
      </Row>
    </div> */}
    </div>
  );
}

export default Login;
