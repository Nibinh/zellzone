import React,{useEffect,useState} from 'react'
import Headeradmin from './Headeradmin'
import {Container, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Sellerdetailsinadmin from './Sellerdetailsinadmin'
import { useNavigate } from 'react-router-dom';


import axios from 'axios'

function Adminallproddetailsdisp() {
  const params=useParams()
  const location=useNavigate()
 
  const [prodetail,setProdetail]=useState([])

    const [prodName,setProdname]=useState("")
    const [id,setId]=useState('')
    const [prodType,setProdtype]=useState("")
    const [prodAge,setProdage]=useState("")
    const [prodPrice,setProdprice]=useState("")
    const [prodDesc,setProddesc]=useState("")
    const [prodImage,setProdimage]=useState("")
    const[useremail,setUseremail]=useState("")


  const fetchdata=async()=>{
    const result=await axios.get('http://localhost:8000/productview/'+params.id)
    setProdetail(result.data.details)

    setId(result.data.details.Id)
    setProdname(result.data.details.name)
    setProdtype(result.data.details.type)
    setProdage(result.data.details.age)
    setProdprice(result.data.details.price)
    setProddesc(result.data.details.desc)
    setProdimage(result.data.details.image)
    setUseremail(result.data.details.useremail)
  }
      
  const deleteprod=async()=>{
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
   
    const deletedata=await axios.delete('http://localhost:8000/deleteacptditem/'+id)
  console.log(deletedata)
  const deleteselldata=await axios.post('http://localhost:8000/selldelte',body)
  console.log(deleteselldata)
  location('/profileProductslist')
 
  }
       

  useEffect(() => {
  fetchdata()
  }, [])
  
  return (
    <div><Headeradmin/>

<Container className='mb-5'>
 <div >
    <Row  style={{marginTop:'170px'}}>
      <Col lg={2}></Col>
      <Col lg={8} className='mb-5'>
      <div className='car me-5'>
    <img  src={prodetail.image}
     alt=''/>
  
   <div>
     <h1 className='proddisname mb-4'>{prodetail.name}</h1>
     <h4>{prodetail.type}</h4>
     <p style={{textAlign:'justify'}}>
     {prodetail.desc}
     </p>
      <span>{prodetail.age} used</span>
     <h4>{prodetail.price} Rs</h4>
   
     {/* <Button onClick={()=>addtowish()}  variant="secondary" className='ms-2 mt-1'>Add to Wishlist<i  class="ms-2 text-danger fa-solid fa-heart"></i></Button>  */}

     <Row>
      <Col className='' lg={8} >
      <Sellerdetailsinadmin  className='' eml={prodetail.useremail}  ></Sellerdetailsinadmin>
      </Col>
      <Col className='ms-start' lg={4}>
      <Button onClick={()=>deleteprod()}  variant="secondary" className='me-end '>Delete</Button>
      </Col>
     </Row>
   
     
    
   </div>
   </div >
      </Col>
      <Col lg={2}></Col>
    </Row>
 </div>
</Container>

    </div>
  )
}

export default Adminallproddetailsdisp