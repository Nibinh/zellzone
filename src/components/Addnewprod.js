import React, { useState,useEffect } from 'react'
import Headertwo from './Headertwo'
import {Row,Col,Container} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Addnewprod.css'
import { Link } from 'react-router-dom';
import {  useForm } from 'react-hook-form';
import uuid from 'react-uuid';
import axios from 'axios';

function Addnewprod() {
 
 
  

    const [prodName,setProdname]=useState("")
    const [id,setId]=useState('')
    const [prodType,setProdtype]=useState("")
    const [prodAge,setProdage]=useState("")
    const [prodPrice,setProdprice]=useState("")
    const [prodDesc,setProddesc]=useState("")
    const [prodImage,setProdimage]=useState("")
    const[useremail,setUseremail]=useState("")
    // const[email,setAdmemail]=useState("admin@gmail.com")
  
    useEffect(() => {
      setId(uuid().slice(0,3))
    }, [])

    const {register,handleSubmit,formState:{errors}}=useForm()
    
    const formSubmit=async(data)=>{
        // console.log(prodName)
        // console.log(prodType)
        // console.log(prodAge)
        // console.log(prodPrice)
        // console.log(prodDesc)
        // console.log(prodImage)
        // console.log(useremail)
        // console.log(id)
        // console.log(admemail)

        const body={
         
          id,
          prodName,
          prodType,
          prodAge,
          prodPrice,
          prodDesc,
          prodImage,
          useremail
          
        }
        console.log(body)
        const result= await axios.post('http://localhost:8000/useraddprod',body)
        alert("Got your request, Kindly wait for few minutes our team will verify your product and will Upload it shortly")
        window.location.reload()

    }
  return (
    <div><Headertwo/>

    <div className='mt-5 mb-5'>
        <h1 className='text-center addprodheading'>Add new Product to Sell</h1>
        <Row className='mt-5'>
            <Col lg={2} >
            </Col>
            <Col lg={8}  style={{backgroundColor:"white",border:"1px solid",borderRadius:"30px"}} className="formi" >
        
         <Form className='p-5' onSubmit={handleSubmit(formSubmit)}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name of the Product</Form.Label>
            <Form.Control type="text"{...register("prodName",{value:prodName,required:true,onChange:(e)=>setProdname(e.target.value)})} placeholder="Eg: Iphone 14pro, Volkswagan Polo" />
            {errors.prodName && errors.prodName.type === "required" && <span className='text-danger'>Name is required</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product type</Form.Label>
            <Form.Control type="text" {...register("prodType",{value:prodType,required:true,onChange:(e)=>setProdtype(e.target.value)})} placeholder="Eg: Mobile Phone, Car" />
            {errors.prodType && errors.prodType.type === "required" && <span className='text-danger'>Type is required</span>}
            
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>How long you have been using this product</Form.Label>
            <Form.Control type="text" {...register("prodAge",{value:prodAge,required:true,onChange:(e)=>setProdage(e.target.value)})} placeholder="Eg: 10months, 2year" />
            {errors.prodAge && errors.prodAge.type === "required" && <span className='text-danger'>Column is required</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Price</Form.Label>
            <Form.Control type="Number" {...register("prodPrice",{value:prodPrice,required:true,onChange:(e)=>setProdprice(e.target.value)})} placeholder="₹" />
            {errors.prodPrice && errors.prodPrice.type === "required" && <span className='text-danger'>Price is required</span>}
          </Form.Group>


          <Form.Group  className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product Description</Form.Label>
            <Form.Control as="textarea" {...register("prodDesc",{value:prodDesc,required:true,onChange:(e)=>setProddesc(e.target.value)})} />
            {errors.prodDesc && errors.prodDesc.type === "required" && <span className='text-danger'>Description is required</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Image</Form.Label>
            <Form.Control type="text" {...register("prodImage",{value:prodImage,required:true,onChange:(e)=>setProdimage(e.target.value)})} />
            {errors.prodImage && errors.prodImage.type === "required" && <span className='text-danger'>Image is required</span>}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter your current Email</Form.Label>
            <Form.Control type="email" {...register("useremail",{value:useremail,required:true,onChange:(e)=>setUseremail(e.target.value)})} />
            {errors.useremail && errors.useremail.type === "required" && <span className='text-danger'>Email is required</span>}
          </Form.Group>
    
          <Button variant="success" type="submit">
            Submit
          </Button>
         <Link to={'/profile'}>
              <Button className='ms-2' variant="danger" type="submit">
                Cancel
              </Button>
         </Link>
        </Form>
        
            </Col>
            <Col lg={2} >
            </Col>
        </Row>
    </div>

    </div>
  )
}

export default Addnewprod