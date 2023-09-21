import React, { useState, useEffect } from "react";
import Headertwo from "./Headertwo";
import { Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Edit.css";
import { useParams } from "react-router-dom";

function Edit() {
  const params = useParams();

  const location = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [phonenumber, setPhonenumber] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [image, setImage] = useState("");
  const [alert, setAlert] = useState(false);
  const [alerMsg, setAlerMsg] = useState("");

  const fetchdata = async () => {
    const result = await axios
      .get("http://localhost:8000/user/getUser/" + params.email)
      .then((response) => {
        setId(response.data._id);
        setEmail(response.data.email);
        setName(response.data.name);
        setPhonenumber(response.data.phonenumber);
        setAdress(response.data.address);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("phonenumber", phonenumber);
    formData.append("address", adress);
    formData.append("image", image);

    const result = await axios
      .put("http://localhost:8000/user/edituser/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setAlert(true);
        setAlerMsg(response.data.message);
        setTimeout(() => {
          location("/profile/" + email);
        }, 4000);
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
      <Headertwo />

      {alert && (
        <div className="text-center">
          <Button variant="green">
            <Alert variant="success">{alerMsg}</Alert>
          </Button>
        </div>
      )}

      <div className="editfirstdiv mt-5 mb-5">
        <div className="ff">
          <div className="mt-5">
            <h1 className="text-center addprodheading">Edit your details</h1>
            <hr />
            <Form className="mt-4" onSubmit={handleSubmit(formSubmit)}>
              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  {...register("name", {
                    value: name,
                    required: true,
                    onChange: (e) => setName(e.target.value),
                  })}
                  placeholder="Name"
                  value={name}
                />
                {errors.name && errors.name.type === "required" && (
                  <span className="text-danger">Name is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>Phonenumber</Form.Label>
                <Form.Control
                  type="text"
                  {...register("phonenumber", {
                    value: phonenumber,
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                    onChange: (e) => setPhonenumber(e.target.value),
                  })}
                  placeholder="Name"
                  value={phonenumber}
                />
                {errors.phonenumber &&
                  errors.phonenumber.type === "required" && (
                    <span className="text-danger">phonenumber is required</span>
                  )}
                {errors.phonenumber &&
                  errors.phonenumber.type === "minLength" && (
                    <span className="text-danger">should be 10 numbers</span>
                  )}
                {errors.phonenumber &&
                  errors.phonenumber.type === "maxLength" && (
                    <span className="text-danger">10 numbers is limit</span>
                  )}
              </Form.Group>

              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>password</Form.Label>
                <Form.Control
                  type="text"
                  {...register("password", {
                    value: password,
                    required: true,
                    minLength: 4,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  placeholder="Password"
                  value={password}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">Password is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="text-danger">minimum 4 characters</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                  type="password"
                  {...register("confirmPassword", {
                    value: confirmPassword,
                    required: true,
                    minLength: 4,
                    onChange: (e) => setConfirmPassword(e.target.value),
                  })}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">Password is required</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="text-danger">minimum 4 characters</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>adress</Form.Label>
                <Form.Control
                  type="text"
                  {...register("adress", {
                    value: adress,
                    required: true,
                    onChange: (e) => setAdress(e.target.value),
                  })}
                  placeholder="Name"
                  value={adress}
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">Address is required</span>
                )}
              </Form.Group>

              <Form.Group className="mb-3 brd" controlId="formBasicPassword">
                <Form.Label>image</Form.Label>
                <Form.Control
                  type="file"
                  {...register("image", {
                    value: image,
                    required: true,
                    onChange: (e) => setImage(e.target.files[0]),
                  })}
                  placeholder="Name"
                />
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger">Image is required</span>
                )}
              </Form.Group>

              <Button variant="dark" type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
