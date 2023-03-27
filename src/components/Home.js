import React,{useState,useEffect} from 'react'
import './Home.css'
import {Row,Col} from 'react-bootstrap';
import 'animate.css';
import ProductView from './ProductView';
import Header from '../Header';
import axios from 'axios';
import Form from 'react-bootstrap/Form';

function Home() {
    const[show,setShow]=useState(false)
    const[products,setProducts]=useState([])
    const[searchitem,setSearchitem]=useState('')

    console.log(searchitem)

   const fetchdata=async()=>{
    const result=await axios.get('http://localhost:8000/acceptedproduct')
    setProducts(result.data.products)
   
   }
 

    useEffect(() => {
    window.addEventListener("scroll",()=>{
        if(window.scrollY>200){
            setShow(true)
        }
        else{
            setShow(false)
        }
    })
    fetchdata()

    }, [])
    

  return (
    
    // diplaypictue area
    <div >
         <header><Header/></header>
        <div id='home' className='displaypic'>
            <Row className='displaypicdetails '>
                <Col lg={3} >
                    <h1 className='headDisplay animate__animated animate__slideInLeft'>Hello...</h1>
                    <p className='headDisplayparaa headDisplaypara animate__animated animate__slideInLeft'>
                    Welcome to our online marketplace where you can both buy and sell items with ease!
                    </p>
                </Col>
                <Col lg={9}></Col>
            </Row> 
        </div>

        {/* //about section */}

        <div id='about' className='mb-5 p-5'>
           <Row  className={show && 'p-5 animate__animated animate__fadeInUp'}>
            <Col className='mt-4 p-5 aboutpara headDisplaypara' lg={5}>
                <div>
                       <h1 className='text-center headDisplaypara '>About</h1>
                        <p className='headDisplaypara'>
                        As a seller, you can showcase your products to a large audience of potential buyers. Simply create an account and list your items for sale with detailed descriptions and high-quality images. You can also set your own prices and manage your sales through our user-friendly platform.
                        </p> 
                   </div>
            </Col>
            <Col className='mt-4 aboutimage ms-auto' lg={5}>
              <div className=''> 
              
                </div>
            </Col>
           </Row>
        </div>
        <hr />

{/* produtc section */}
        <div id='product' className='mb-5'>

          <div className='text-center mt-5 searchset'>
              <div>
                    <h2 className='produnctsfont'>Products<i class="ms-2 fa-solid fa-bag-shopping"></i></h2>
                <Form.Group className="mb-3 text-center" style={{width:'300px',color:'black'}}>
                    <Form.Control style={{backgroundColor:'lightgray'}} onChange={(e)=>setSearchitem(e.target.value)} placeholder="Search.. "  />
                  </Form.Group>
              </div>
          </div>
          
            <Row>
           {   
        products.filter((item)=> {
          if(searchitem==""){
            return item
          }else if(item.name.toLowerCase().includes(searchitem.toLowerCase())){
            return item
          }else if(item.type.toLowerCase().includes(searchitem.toLowerCase())){
            return item
          }
        }).map(item=>(
            <Col className='px-5 mt-5 'lg={3}>
            <ProductView produc={item}/>
             </Col>  
           ))
            }
            </Row>
        </div>

    </div>
  )
}

export default Home