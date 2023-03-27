import React,{useEffect,useState} from 'react'
import './Profile.css'
import Headertwo from './Headertwo'
import {Container,Row,Col} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Profileprodcard from './Profileprodcard';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom'


function Profile() {
  const[eml,setEml]=useState('')
  const [prodt,setProdt]=useState([])
  const [sell,setSell]=useState([])
  const params=useParams()
  const location=useNavigate()



const fetchdata=async()=>{
  const result=await axios.get('http://localhost:8000/prouserdetail/'+params.eml)
  setProdt(result.data.details)
  setSell(result.data.details.sell)
 }
console.log(prodt)
console.log(sell)

  useEffect(() => {
  fetchdata()
  if(localStorage.getItem("email")){

  } 
  },[])
 
 const logout=()=>{
  if(localStorage.getItem("email")){
    localStorage.removeItem("email")
    location('/')
  }
 }

  return (
    <div>
        <Headertwo/>
    
        <div className='mt-5'>
            <Row>
                <Col md={7}>
                <div className=' px-5'>
                 <img className='pici  px-3'  src={prodt.image}
                alt="no" />
                </div>
                <div className='px-4 picname mt-3'>
             <h2 className='text-center picnamef profilefont p-1'>{prodt.name}</h2>
                </div>
                 </Col>
           
                  <Col md={4} className="ms-5 mt-3 ">
                  <div style={{marginTop:"50px"}} >
                      <h3><i class="fa-solid fa-envelope"></i>{prodt.email}</h3>
                      <h3><i class="fa-solid fa-mobile-screen-button"></i>{prodt.phonenumber}</h3>
                      <h3><i class="fa-solid fa-location-dot"></i>{prodt.adress}</h3>
                  </div>
                  <div className='mt-3'>
                  <Link to={'/edit/'+prodt.email}> <Button  className='ms-2' variant="light"><i class="fa-solid fa-user-pen"></i></Button></Link>
                  <Link to={'/Wishlistdisplaying/'+params.eml}><Button className='ms-2' variant="light"><i class="text-danger fa-solid fa-heart"></i></Button></Link>
                 <Link to={'/addnewprod'}><Button className='ms-2' variant="light"><i class="fa-solid fa-cart-plus"></i></Button></Link>
                  <Button onClick={()=>logout()} className='ms-2 text-danger' variant="light">Logout</Button>
                  
                  </div>
                  </Col>
             
              
                
            </Row>
        </div>
        <hr className='mt-5 ' style={{color:"blue"}} ></hr>
        <h2 className='produnctsfont text-center'>Your Store<i class="ms-2 fa-solid fa-bag-shopping"></i></h2>


        <div  className='mb-5 '>
            <Row>
           { sell.map((item)=>(
            <Col className='px-5 mt-5 'lg={3} >
            <Profileprodcard products={item}/>
          </Col>   
           )) }
            </Row>
        </div>

    </div>
  )
}

export default Profile