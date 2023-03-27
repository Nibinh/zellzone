import React,{useState,useEffect} from 'react'
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import axios from 'axios';

function Sellerdetails({eml}) {
    
    const [open, setOpen] = useState(false);
    const[email,setEmail]=useState("")
    const[ph,setPh]=useState()
    const[adress,setAdress]=useState("")

    const fetchdata=async()=>{
        const result=await axios.get('http://localhost:8000/prouserdetail/'+eml)
       
        setEmail(result.data.details.email)
        setPh(result.data.details.phonenumber)
        setAdress(result.data.details.adress)
    }
console.log(email)
console.log(ph)
    useEffect(() => {
        fetchdata()
    }, )
    
  return (
   <>
     <Button variant="" style={{backgroundColor:'green'}}tyle className=''
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
       Contact<i class="ms-2 text-dark fa-solid fa-user"></i>
      </Button>

      <Collapse in={open}>
        <div className='my-2' id="example-collapse-text">

                    <div>
                        <h6><i class="fa-solid fa-envelope me-2"></i>{email}</h6>
                        <p><i class="fa-solid fa-phone me-2"></i>{ph}</p>
                        <p><i class="fa-sharp fa-solid fa-location-dot me-2"></i>{adress}</p>
                    </div>
               
         
        </div>
      </Collapse>
   </>
  )
}

export default Sellerdetails