import React,{useState,useEffect} from 'react'
import Headertwo from './Headertwo'
import './Login.css'
import {Container,Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [errdisp,setErrdisp]=useState()
  const [eremail,setEremail]=useState()

  const location=useNavigate()
  
  const {register, handleSubmit,formState:{errors}}=useForm()

 
  
  
  
  const onSubmit=async(data)=>{
  
    const body={
      email,
      password
    }

    const result=await axios.post('http://localhost:8000/login',body)
    .then(response=>{
      alert(response.data.message)
      localStorage.setItem("email",response.data.email)
      location('/')
      
    })
    .catch(error=>{
      console.log(error.response.data.message)
      setErrdisp(error.response.data.message)

     setTimeout(()=>{
      setErrdisp(null)
     },4000)
     
    })
    
  }


  return (

    <div>
    <Headertwo/>

    <Container className='mt-2 mb-5 p-5 animate__animated  animate__fadeIn animate__delay-0.5s' >
        <Form className='rrow mt-5 mb-3 'onSubmit={handleSubmit(onSubmit)}>
        <Row className='g-0 '>
           <Col lg={7}>
           <img
            alt=""
            src="images\aboutimage.png"
            className='im img-fluid '
          />
           </Col>
           <Col lg={5} className="px-5 p-5">
            <h2 style={{fontWeight:"700"}} >Login</h2>

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
    
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <span>
          <p className="text-muted">new user?
         <Link to={'/register'}>
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
  )
}

export default Login