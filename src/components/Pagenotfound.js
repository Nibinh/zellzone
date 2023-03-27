import React from 'react'
import Headertwo from './Headertwo'
import './Pagenotfound'
import {Container, Row, Col} from 'react-bootstrap'

function Pagenotfound() {
  return (
    <div><Headertwo/>
        
          
                <Row  style={{marginTop:'100px',marginBottom:'139px'}}> 
                    <Col lg={2}></Col>
                    <Col  lg={7}>
                    <div className='text-center ms-5'>
                 <img
                 width='400px'
                 src='https://i.pinimg.com/originals/90/fb/43/90fb4379e62ef4104a0bd58bae82fe35.gif'
                 alt='not found'
                 />
                    </div>
                    </Col>
                    <Col lg={2}></Col>
                </Row>
          
   
    </div>
  )
}

export default Pagenotfound