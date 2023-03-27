import React,{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom'
import Headertwo from './Headertwo'
import {Container, Row, Col} from 'react-bootstrap'
import axios from 'axios'
import Sellerdetails from './Sellerdetails'
import Button from 'react-bootstrap'

function Wishlistproductdetails() {
    const params=useParams()
    console.log(params)

    const [prodName,setProdname]=useState("")
    const [id,setId]=useState('')
    const [prodType,setProdtype]=useState("")
    const [prodAge,setProdage]=useState("")
    const [prodPrice,setProdprice]=useState("")
    const [prodDesc,setProddesc]=useState("")
    const [prodImage,setProdimage]=useState("")
    const[useremail,setUseremail]=useState("")
    const [prodetail,setProdetail]=useState([])
   

    const fetchdata=async()=>{
        const result=await axios.get('http://localhost:8000/productview/'+params.id)

       
    
        setProdetail(result.data.details)
        setProdname(result.data.details.name)
        setProdtype(result.data.details.type)
        setProdage(result.data.details.age)
        setProdprice(result.data.details.price)
        setProddesc(result.data.details.desc)
        setProdimage(result.data.details.image)
        setUseremail(result.data.details.useremail)
       }
       
        //  console.log(prodName)
        // console.log(prodType)
        // console.log(prodAge)
        // console.log(prodPrice)
        // console.log(prodDesc)
        // console.log(prodImage)
        // console.log(useremail)
        // console.log(id)
        console.log(prodetail)
     
    
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
   
  
     <Sellerdetails className='ms-5' eml={prodetail.useremail} ></Sellerdetails>
    
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

export default Wishlistproductdetails