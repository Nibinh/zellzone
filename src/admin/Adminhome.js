import React,{useEffect,useState} from 'react'
import Headeradmin from './Headeradmin'
import Headertwo from '../components/Headertwo'
import './Adminhome.css'
import {Container,Row,Col} from 'react-bootstrap'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom'


function Adminhome() {
  const [user,setUser]=useState("")
  const [allusers,setAllusers]=useState([])
  const [searchitem,setSearchitem]=useState("")


  const fetchdata=async()=>{
    const result=await axios.get('http://localhost:8000/allusers')
    setAllusers(result.data.all)
  }

  const deluser=async(eml)=>{
    const result=await axios.delete('http://localhost:8000/delusers/'+eml)
    console.log(result)
    fetchdata()
  }


  useEffect(() => {
    if(localStorage.getItem("usern")){
      setUser(localStorage.getItem("usern"))
    }
    fetchdata()
   
  },[] )
  console.log(allusers)
  
  return (
    <div  >
        <Headeradmin/>
       

        <Container className='mt-5 ' >
        
            <Row style={{marginTop:'120px',marginBottom:'433px'}}>
                <Col >
                <div className='text-center searchset'>
               <div>
                  <h1 className='produnctsfont'>All Users<i class="ms-2 fa-solid fa-users"></i></h1>
            <Form.Group className="mt-3" style={{width:'300px',color:'black'}}>
            <Form.Control style={{backgroundColor:'lightgray'}} onChange={(e)=>setSearchitem(e.target.value)} placeholder="Search.. "  />
          </Form.Group>
               </div>
                </div>
  {allusers.length>0?(
     <div>
     {user&&( <div className='mt-5'>
       <Table striped bordered responsive hover  >
         <thead style={{backgroundColor:"black",color:"white"}}>
           <tr>
             <th className='px-3 textfonts'>Id</th>
             <th className='px-3 textfonts'>Name</th>
             <th className='px-3 textfonts'>Email</th>
             <th className='px-3 textfonts'>Phone</th>
             <th className='px-3 textfonts'>Actions</th>
             
           </tr>
         </thead>
         <tbody>
 
         {
       
         allusers.filter((data)=> {
           if(searchitem==""){
             return data
           }else if(data.name.toLowerCase().includes(searchitem.toLowerCase())){
             return data
           }else if(data.email.toLowerCase().includes(searchitem.toLowerCase())){
             return data
           }
         }).map((data,index)=>(
           <tr >
           <td className='px-3 textfonts'>{index+1}</td>
           <td className='px-3 textfonts'>{data.name}</td>
           <td className='px-3 textfonts'>{data.email}</td>
           <td className='px-3 textfonts'>{data.phonenumber}</td>
           <td className='px-3'>
          <Link to={'/adminuserinfo/'+data.email}> <Button className='ms-3' variant="primary"><i class="fa-solid fa-eye"></i></Button></Link >
     <Button onClick={()=>deluser(data.email)} variant="secondary" className='ms-2 mt-1'><i class="fa-solid fa-trash"></i></Button>{' '}
           </td>
         </tr>
         ))
           }
            
         </tbody>
       </Table>
       </div>) }
       { user==""&&(
         <div><h1 className='text-center mt-5 noitemsmsg'>Login Please!! </h1></div>
       )}
  </div>
  ):(<h1 className='text-center mt-5 noitemsmsg'>No Users yet! <i class="fa-thin fa-empty-set"></i></h1>)              
  }
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Adminhome