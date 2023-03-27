import React,{useState,useEffect} from 'react'
import Headertwo from './Headertwo'
import './Homeprodview.css'
import {Container, Row, Col} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import Sellerdetails from './Sellerdetails'
import axios from 'axios'

function Homeprodview() {
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
    const [eml,setEmail]=useState("")

  

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
   

   useEffect(() => {
    fetchdata()
    if(localStorage.getItem("email")){
        setEmail(localStorage.getItem("email"))
    }
   }, [])

   const addtowish=async()=>{
    const body={
        eml,
        id,
        prodName,
        prodType,
        prodAge,
        prodPrice,
        prodDesc,
        prodImage,
        useremail
    }
    const result=await axios.post('http://localhost:8000/wishlist',body)
    .then(response=>{
      alert(response.data.message)
    })
    .catch(error=>{
     alert(error.response.data.message)
    })
   }

  return (
    <div><Headertwo/>

{/* <h3>{prodetail.name}</h3>
    <h3>{prodetail.type}</h3>
    <h3>{prodetail.age}</h3>  
    <h3>{prodetail.price}</h3>
   <img
   src={prodetail.image}
   alt=''
   />
 <Button onClick={()=>addtowish()} variant="secondary" className='ms-2 mt-1'><i class="fa-solid fa-trash"></i></Button> */}
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
   
     {/* <Button onClick={()=>addtowish()}  variant="secondary" className='ms-2 mt-1'>Add to Wishlist<i  class="ms-2 text-danger fa-solid fa-heart"></i></Button>  */}
     <Sellerdetails className='ms-5' eml={prodetail.useremail} ></Sellerdetails>
     <Button onClick={()=>addtowish()}  variant="secondary" className='ms-2 mt-1'>Add to Wishlist<i  class="ms-2 text-danger fa-solid fa-heart"></i></Button> 
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

export default Homeprodview