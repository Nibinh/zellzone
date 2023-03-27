import React, { useState } from 'react'
import './Register.css'
import Headertwo from './Headertwo'
import {Row, Col} from 'react-bootstrap'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {  useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Register() {
  const [email,setEmail]=useState('')
  const [name,setName]=useState('')
  const [phonenumber,setPhonenumber]=useState(0)
  const [password,setPassword]=useState('')
  const [adress,setAdress]=useState('')
  const [image,setImage]=useState('')

  const {register, handleSubmit,formState:{errors}}=useForm()

  const location=useNavigate()


  const formSubmit=async(data)=>{
   
    const body={
      email,
      name,
      password,
      phonenumber,
      adress,
      image
    }

    const result=await axios.post('http://localhost:8000/register',body)
   
    .then(response => {
      // handle successful response
     alert(response.data.message)
     location('/login')
    
    })
    .catch(error => {
      if (error.response) {
        // handle error response with status code outside 200-299 range
        alert(error.response.data.message);
        window.location.reload()
      
       
        // console.log(error.response.status);
        // console.log(error.response.headers);
      } 
      else if (error.request) {
        // handle error when no response was received
        console.log(error.request);
      } else {
        // handle any other error
        console.log('Error', error.message);
      }
    })
    // alert(result.data.message) 
  }
 
  return (
    <div>
        <Headertwo/>

        <div className='mt-5 mb-5'>
      <Row>
        <Col className='cc'>
        <div className='dd'>
        <div className='mt-5'>
          <h1 className='text-center'>Register</h1>
          <hr/>
          <Form className='mt-4' onSubmit={handleSubmit(formSubmit)}>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
         <Form.Control  type="email" {...register("email",{value:email,required:true,onChange:(e)=>setEmail(e.target.value)})}  placeholder="Enter email"/>
         <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text><br/>
         {errors.email && errors.email.type === "required" && <span className='text-danger'>Email is required</span>}
        
      </Form.Group>
     

      <Form.Group className="mb-3 brd" controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
         <Form.Control  type="text" {...register("name",{value:name,required:true,onChange:(e)=>setName(e.target.value)})}  placeholder="Name" />
         {errors.name && errors.name.type==="required" && <span className='text-danger'>Name is required</span>}
      </Form.Group>

      <Form.Group className="mb-3 brd" controlId="formBasicPassword">
        <Form.Label>Phone Number</Form.Label>
         <Form.Control  type="number" {...register("phonenumber",{value:phonenumber,required:true,maxLength:10, minLength:10,onChange:(e)=>setPhonenumber(e.target.value)})}  placeholder="Phone Number" />
         {errors.phonenumber && errors.phonenumber.type==="required" && <span className='text-danger'>phonenumber is required</span>}
         {errors.phonenumber && errors.phonenumber.type==="minLength" && <span className='text-danger'>should be 10 numbers</span>}
         {errors.phonenumber && errors.phonenumber.type==="maxLength" && <span className='text-danger'>10 numbers is limit</span>}
      </Form.Group>

      <Form.Group className="mb-3 brd" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
         <Form.Control  type="password" {...register("password",{value:password,required:true,minLength:4,onChange:(e)=>setPassword(e.target.value)})} placeholder="Password" />
         {errors.password && errors.password.type==="required" && <span className='text-danger'>Password is required</span>}
         {errors.password && errors.password.type==="minLength" && <span className='text-danger'>minimum 4 characters</span>}
      </Form.Group>

      
      <Form.Group className="mb-3 brd" controlId="formBasicPassword">
        <Form.Label>Address</Form.Label>
         <Form.Control  type="text" {...register("adress",{value:adress,required:true,onChange:(e)=>setAdress(e.target.value)})} placeholder="Address" />
         {errors.adress && errors.adress.type==="required" && <span className='text-danger'>Address is required</span>}
      </Form.Group>

      <Form.Group className="mb-3 brd" controlId="formBasicPassword">
        <Form.Label>Image</Form.Label>
         <Form.Control  type="text" {...register("image",{value:image,required:true,onChange:(e)=>setImage(e.target.value)})}  placeholder="Name" />
         {errors.image && errors.image.type==="required" && <span className='text-danger'>image is required</span>}
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
  )
}

export default Register