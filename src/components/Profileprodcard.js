import React from 'react'
import './Profileprodcard.css'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Profileprodcard({products}) {
  console.log(products)
  return (

   <Link to={`/profileprodcardview/${products.Id}`} style={{ textDecoration:'none', color:'black' }}>
      <Card className='card'  style={{ width: '18rem' }}>
      <Card.Img className='p-5 cardimg' style={{ width:'300px',height:'300px'}} variant="top" src={products.image}/>
      <Card.Body style={{backgroundColor:"grey"}}>
        <Card.Title>{products.name}</Card.Title>
        <Card.Text>
        <p>Type: {products.type}</p>    </Card.Text>
        <Card.Text>
         {products.price} Rs
        </Card.Text>
       
      </Card.Body>
    </Card>
   </Link>
    
)
  
}

export default Profileprodcard