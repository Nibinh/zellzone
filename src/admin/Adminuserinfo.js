import React,{useEffect,useState} from 'react'
import './Adminuserinfo.css'
import {Container,Row,Col} from 'react-bootstrap'
import Headeradmin from './Headeradmin'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import Profileprodcard from '../components/Profileprodcard'

function Adminuserinfo() {
    const params=useParams()
    const [prod,setProd]=useState([])
    const[sellp,setSellp]=useState([])
    

    const fetchdata=async()=>{
        const result=await axios.get('http://localhost:8000/userdetail/'+params.eml)
        setProd(result.data.details)
        setSellp(result.data.details.sell)
       
    }
    console.log(sellp)
    useEffect(() => {
        fetchdata()
    }, [])
    
  return (
    <div><Headeradmin/>

        
           <div>
                <Row style={{marginTop:"150px"}}>
                    <h1 className='text-center produnctsfont'>User Details</h1>
                    <Col lg={7}  className=' px-5 mt-4' >
                        <img className='' style={{height:"300px"}} width={"300px"} src={prod.image} alt="" />
                    </Col >
                   
                    <Col lg={4}  className='mt-5 px-5'>
                   <p className='adminprodfont' style={{fontSize:"30px"}}><b>Name:</b> {prod.name}</p>
                   <p className='adminprodfont' style={{fontSize:"25px"}}><b>Email:</b> {prod.email}</p>
                   <p className='adminprodfont' style={{fontSize:"25px"}}><b>Ph: </b>{prod.phonenumber}</p>
                   <p className='adminprodfont' style={{fontSize:"25px"}}><b>Adrress:</b> {prod.adress}</p>
                    </Col>
                </Row>
           </div> 
           <hr />

           <h2 className='text-center produnctsfont mt-4'>Selling Products</h2>

           <div  className='mb-5 '>
            <Row>
           { sellp.map((item)=>(
            <Col className='px-5 mt-5 'lg={3} >
            <Profileprodcard products={item}/>
          </Col>   
           )) }
            </Row>
        </div>
    </div>
  )
}

export default Adminuserinfo