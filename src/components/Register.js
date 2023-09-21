import React, { useState } from "react";
import "./Register.css";
import Headertwo from "./Headertwo";
import { Row, Col, Alert } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [image, setImage] = useState();
  const [alert, setAlert] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useNavigate();
  // cloudinary code
  // const postDetails = (pics) => {
  //   const data = new FormData();
  //   data.append("file", pics);
  //   data.append("upload_preset", "zellzone");
  //   data.append("cloud_name", "dabqlnwgo");
  //   fetch("https://api.cloudinary.com/v1_1/dabqlnwgo/image/upload", {
  //     method: "post",
  //     body: data,
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setImage(data.url.toString());
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("email", email);
    formData.append("name", name);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phonenumber", phonenumber);
    formData.append("address", adress);

    const result = await axios
      .post("http://localhost:8000/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
          location("/login");
        }, 1800);
      })
      .catch((error) => {
        console.log("2", error);
        if (error.response) {
          alert(error.response.data);

          window.location.reload();
        } else if (error.request) {
          console.log("4", error.request);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  return (
    <div>
      <Headertwo />
      {alert && (
        <div className="text-center">
          <Button variant="green">
            <Alert variant="success">Account Created</Alert>
          </Button>
        </div>
      )}
      <div className="mt-5 mb-5">
        <Row>
          <Col className="cc">
            <div className="dd">
              <div className="mt-5">
                <h1 className="text-center">Register</h1>
                <hr />
                <Form className="mt-4" onSubmit={handleSubmit(formSubmit)}>
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
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                    <br />
                    {errors.email && errors.email.type === "required" && (
                      <span className="text-danger">Email is required</span>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3 brd"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("name", {
                        value: name,
                        required: true,
                        onChange: (e) => setName(e.target.value),
                      })}
                      placeholder="Name"
                    />
                    {errors.name && errors.name.type === "required" && (
                      <span className="text-danger">Name is required</span>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3 brd"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="number"
                      {...register("phonenumber", {
                        value: phonenumber,
                        required: true,
                        maxLength: 10,
                        minLength: 10,
                        onChange: (e) => setPhonenumber(e.target.value),
                      })}
                      placeholder="Phone Number"
                    />
                    {errors.phonenumber &&
                      errors.phonenumber.type === "required" && (
                        <span className="text-danger">
                          phonenumber is required
                        </span>
                      )}
                    {errors.phonenumber &&
                      errors.phonenumber.type === "minLength" && (
                        <span className="text-danger">
                          should be 10 numbers
                        </span>
                      )}
                    {errors.phonenumber &&
                      errors.phonenumber.type === "maxLength" && (
                        <span className="text-danger">10 numbers is limit</span>
                      )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3 brd"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("password", {
                        value: password,
                        required: true,
                        minLength: 4,
                        onChange: (e) => setPassword(e.target.value),
                      })}
                      placeholder="Password"
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-danger">Password is required</span>
                    )}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <span className="text-danger">
                          minimum 4 characters
                        </span>
                      )}
                  </Form.Group>

                  {/* confirmPassword */}
                  <Form.Group
                    className="mb-3 brd"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>ConfirmPassword</Form.Label>
                    <Form.Control
                      type="password"
                      {...register("confirmPassword", {
                        value: confirmPassword,
                        required: true,
                        minLength: 4,
                        onChange: (e) => setConfirmPassword(e.target.value),
                      })}
                      placeholder="Confirm Password"
                    />
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "required" && (
                        <span className="text-danger">
                          Password is required
                        </span>
                      )}
                    {errors.confirmPassword &&
                      errors.confirmPassword.type === "minLength" && (
                        <span className="text-danger">
                          minimum 4 characters
                        </span>
                      )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3 brd"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      {...register("adress", {
                        value: adress,
                        required: true,
                        onChange: (e) => setAdress(e.target.value),
                      })}
                      placeholder="Address"
                    />
                    {errors.adress && errors.adress.type === "required" && (
                      <span className="text-danger">Address is required</span>
                    )}
                  </Form.Group>

                  <Form.Group
                    className="mb-3 brd"
                    controlId="formBasicPassword"
                  >
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="file"
                      {...register("image", {
                        value: image,
                        required: true,
                        onChange: (e) => setImage(e.target.files[0]),
                      })}
                    />
                    {errors.image && errors.image.type === "required" && (
                      <span className="text-danger">image is required</span>
                    )}
                  </Form.Group>

                  <Button variant="dark" type="submit">
                    Submit
                  </Button>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Register;
