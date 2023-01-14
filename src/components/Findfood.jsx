import React ,{useEffect,useState} from 'react'
import { Card, CardHeader, CardBody, CardFooter ,Button,Badge} from '@chakra-ui/react'
import { FaBeer } from "react-icons/fa";
 // <-- import styles to be used

import { v4 as uuidv4 } from 'uuid';

// The default icon size is 1em (16px)

// import { Button } from 'react-bootstrap';
import Slot from './Slot'
export default function Findfood() {
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
function changeStatus(){
// this is gonna change status
console.log("hello from my side and button is clicked")
// from here i am gonna change the status of slot
// so now i am gonna make a patch request here to change the status 
fetch("http://localhost:8080/donour/updateslot")


}
 return (
    <div>



     {allslots.map((el)=>{
      return (
<Card>
<Slot key={uuidv4()} image={el.image} content={el.content} name={el.name} location={el.location}  />
<CardFooter
    justify='space-between'
    flexWrap='wrap'
    sx={{
      '& > button': {
        minW: '136px',
      },
    }}
  >
    <Button flex='1' variant='ghost' >
     Like   <i class="fa-regular fa-heart"></i>


    </Button>
    <Button flex='1' variant='ghost' >
      Comment
    </Button>
    <Button onClick={changeStatus} flex='1' variant='ghost' >
   {el.active=="true"? <Badge colorScheme='green'>Click To Book</Badge>:<Badge colorScheme='green'>InActive</Badge>}
    </Button>
  </CardFooter>  
</Card>
     
      )
     })}
 

    </div>
  )
}
