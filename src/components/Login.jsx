import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Select
  } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';


  export default function Login() {
const [state,setState]=useState(false)
const navigate=useNavigate()
    let Email=useRef()
    let Password=useRef()
    let Role=useRef()

    async function login(){
      let email=Email.current.value;
      let password=Password.current.value;
      let role=Role.current.value;
      let obj={email,password,role}
let res=await fetch("http://localhost:8080/userauth/login",{
method:"POST",
body:JSON.stringify(obj),
headers:{
  "Content-Type":"application/json"
}

})

let data=await res.json() 

console.log(data)

let localstorageobj={role:role,token:data.refreshToken,accessToken:data.accessToken}

localStorage.setItem("informationaboutuser",JSON.stringify(localstorageobj))

navigate("/")
window.location.reload()
      }  
    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('white.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to continue</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
            
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input ref={Email} type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input ref={Password} type="password" />
              </FormControl>
              <Select ref={Role} placeholder='Select option'>
  <option value='Donate'>Donate</option>
  <option value='need'>need</option>
</Select>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  onClick={login}
                  >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }