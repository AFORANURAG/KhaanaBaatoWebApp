import React ,{useEffect,useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter ,Button,Badge} from '@chakra-ui/react'

// The default icon size is 1em (16px)

// import { Button } from 'react-bootstrap';
import Slot from './Slot'
export default function Alldonations() {
 const [allslots,setSlots]=useState([])
 
 useEffect(() => {
   //lets make a fetch request to get all the donations.
  makerequest()
  
}, [])

function makerequest(){
fetch("http://localhost:8080/donour/getallslots").then(res=>
  res.json()
  
).then(data=>{
  setSlots(data)
  console.log(data)
}).catch(err=>
  console.log(err)
)
  

 }
 
  return (
    <div>
     {allslots.map((el)=>{
      return (
      <Card>
<Slot key={el.email} image={el.image} content={el.content} name={el.name} location={el.location}  />
<CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
    mb={10}
  >
    <Button flex='1' variant='ghost' >
      Like
    </Button>
    <Button flex='1' variant='ghost' >
      Comment
    </Button>
   
  </CardFooter>  
</Card>
     )
     })}


    </div>
  )
}
