import React from 'react';
import { Link as LinkScroll, animateScroll as scroll,Element,Button as scrollButton } from "react-scroll";

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react'
import { useState,useEffect,useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { CheckPassword } from '../validator/password.validator';
import { ValidateEmail } from '../validator/email.validator';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';



export default function Wantfood() {
  const { isOpen, onOpen, onClose } = useDisclosure()
let navigate = useNavigate(); 
const [submit,setSubmit]=useState(true)
const [modal,setModal]=useState(true)
console.log(modal)
const [location,setlocation]=useState()
const [showPassword, setShowPassword] = useState(false);
const passwordref=useRef()
const emailref=useRef()
const firstnameref=useRef()
const lastnameref=useRef()

const cancelRef = React.useRef()

useEffect(()=>{
sendSignupDetail()

},[submit])

function showPosition(position) {
 
  let value= fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=7b16d0f0dbce4f4c8a7aa4256ebf1585`)
  .then(response => response.json())
  .then(result =>{
let value$=[result.features[0].properties.formatted,position.coords.latitude,position.coords.longitude]
  console.log( result.features[0].properties.formatted,position.coords.latitude,position.coords.longitude)
setlocation(value$)
}).catch((error)=>{
  console.log(error)  
  });

}
    
async function  getLocation() {
 try {
  if (navigator.geolocation) {
    return  navigator.geolocation.watchPosition(showPosition);
  }
 } catch (error) {
  console.log(error)
 }
 
}
useEffect(()=>{
getLocation()
},[])





function sendSignupDetail (){
let email=emailref.current.value
let firstName=firstnameref.current.value
let lastName=lastnameref.current.value
let password=passwordref.current.value
let role=document.getElementById("role").value
let name=firstName+lastName
// console.log(Email,FirstName,LastName,Password,Role)
let obj={
email,name,password,role,location
}
// console.log(obj)

if(CheckPassword(password)&&ValidateEmail(email)){
  fetch("http://localhost:8080/userauth/signup",{
    method:"POST",
    headers:{
     "Content-Type":"application/json" 
    },
    body:JSON.stringify(obj)
    }).then((res)=>{
      let data=res.json()
  console.log(data)
    }).catch((err)=>{console.log( "Error"+" "+err)})
   

   alert("Congratulations!Singup Successfull")
    navigate("/login")
     


}else{
//  let modalonfailure=  document.querySelector(".modalforfailure")
// modalonfailure.addEventListener("click",()=>{
//   setModal((prevmodal)=>!prevmodal)
console.log(window.scrollY)
window.scrollX="300"
setModal(!modal)
// })
}
  



}


const routeChange = () =>{ 
  let path = "/login"; 
  navigate(path);
}
  return (
   <>
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('black.50', 'black.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={0} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
          Please SignUp 
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
          Together We can save millions of tons of food.and We will ensure that no one sleeps with hunger
          </Text>
        </Stack>
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input ref={firstnameref} type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input ref={lastnameref} type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input ref={emailref} type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input ref={passwordref} type={showPassword ? 'text' : 'password'}  />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl id="Role" isRequired>
            <FormLabel>Role</FormLabel>
            <Input id='role' value={"need"} type="text" />
          </FormControl>
            <Stack spacing={10} pt={2}>
             
             

             <LinkScroll  to="popover" spy={true} smooth={true} offset={50} duration={200} >
             <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}
                onClick={()=>{
                  setSubmit(!submit)
                }}
                >
                Sign Up To Register And lets Save Food
              </Button>
             </LinkScroll> 
            
             <Button
             loadingText="Submitting"
             size="lg"
             bg={'black'}
             color={'white'}
             _hover={{
               bg: 'green.500',
             }}
             onClick={()=>{
               setSubmit(!submit)
             }}
             >
             Continue With Google
           </Button>

            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link onClick={routeChange} color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      </Flex>


     

    


<Element name='popover' className='element'>

<div  className={modal?"notfailure":"modalforfailure"} >

<h2 className='modalheading'>Wrong Credentials</h2>

<div className='modalbody' >
Lorem ipsum dolor sit amet consectetur adipisicing elit. Est asperiores ea magnam perspiciatis unde, provident maiores architecto, exercitationem doloremque beatae quae expedita quos maxime id dolores enim rerum amet possimus!
</div>

</div>
</Element>





      </> 

      );
    }
