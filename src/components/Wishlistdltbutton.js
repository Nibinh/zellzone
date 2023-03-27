import React,{useEffect,useState} from 'react'
import { Button } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Wishlistdltbutton({idnumber}) {

    const location=useNavigate()
   
    const [prodName,setProdname]=useState("")
    const [id,setId]=useState('')
    const [prodType,setProdtype]=useState("")
    const [prodAge,setProdage]=useState("")
    const [prodPrice,setProdprice]=useState("")
    const [prodDesc,setProddesc]=useState("")
    const [prodImage,setProdimage]=useState("")
    const[useremail,setUseremail]=useState("")
    const[eml,setEml]=useState("")

    const fetchdata=async()=>{
        const result=await axios.get('http://localhost:8000/productview/'+idnumber)
       
        setId(result.data.details.Id)
         setProdname(result.data.details.name)
         setProdtype(result.data.details.type)
         setProdage(result.data.details.age)
         setProdprice(result.data.details.price)
         setProddesc(result.data.details.desc)
        setProdimage(result.data.details.image)
        setUseremail(result.data.details.useremail)
    }

    const dltprod=async()=>{
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
                console.log(body)
                const result=await axios.post('http://localhost:8000/wishdelte',body)
                console.log(result)
               window.location.reload()
    }
     


    useEffect(() => {
        if(localStorage.getItem("email")){
            setEml(localStorage.getItem("email"))
        }
        fetchdata()
    }, [])
    
  return (
    <div >
         <Button onClick={()=>dltprod()} variant="secondary" className='ms-2 mt-1 '><i class="fa-solid fa-trash"></i></Button>
    </div>
  )
}

export default Wishlistdltbutton