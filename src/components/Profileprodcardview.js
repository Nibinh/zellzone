import React,{useEffect,useState} from 'react'
import './Profileprodcardview.css'
import Headertwo from './Headertwo'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap'

function Profileprodcardview() {
    const params=useParams()
    const [prodetail,setProdetail]=useState([])

    const [prodName,setProdname]=useState("")
    const [id,setId]=useState('')
    const [prodType,setProdtype]=useState("")
    const [prodAge,setProdage]=useState("")
    const [prodPrice,setProdprice]=useState("")
    const [prodDesc,setProddesc]=useState("")
    const [prodImage,setProdimage]=useState("")
    const[useremail,setUseremail]=useState("")

    const location=useNavigate()

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
  
const delprod=async()=>{

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
  
  const deleteselldata=await axios.post('http://localhost:8000/selldelte',body)
  alert("Product is removed")
  location('/profile/'+useremail)

}
   useEffect(() => {
    fetchdata()
   }, [])
   
  return (
    <div><Headertwo/>

<Container className='mb-5'>
 <div >
    <Row  style={{marginTop:'70px'}}>
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
     <h4>₹{prodetail.price}</h4>
   
     <Button onClick={()=>delprod()} variant="secondary" className='ms-2 mt-1'><i class="fa-solid text-dark fa-trash"></i></Button>
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

export default Profileprodcardview