import React from 'react'
import './Headertwo.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Headertwo() {
  return (
    <div>
          <Navbar className='navn p-3' expand="lg">
      <Container>
      <Link to={'/'} style={{ textDecoration:'none', color:'white' }}>  
    
      <Navbar.Brand  className='d-flex headfont' style={{fontSize:'35px',fontWeight:'600',color:'black'}}>
        <img
            alt=""
            src="https://png.pngtree.com/png-clipart/20220909/original/pngtree-online-shopping-icon-design-png-image_8494138.png"
            width="60"
            height="60"
          />&nbsp; ZellZone</Navbar.Brand>
      </Link>
      
      </Container>
    </Navbar>
    </div>
  )
}

export default Headertwo