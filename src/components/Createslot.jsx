import React,{useCallback,useState,useRef,useEffect} from 'react'
import { Input } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from '@chakra-ui/react'
import "quill/dist/quill.snow.css"
import Quill from 'quill'
import "../editor.css"
var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

export default function CreateSlot(note) {
const referer=useRef()
const [submit,setSubmit]=useState(false)
const [image, setImage] = useState(null);
const [loading, setLoading] = useState(false);
const [email,setEmail]=useState("")
const [location,setlocation]=useState()
const [url,setUrl]=useState("")
const [quill,setQuill]=useState([])

const editor = useCallback((element)=>{
if(element==null) return 
element.innerHTML=""
const editing=document.createElement("div")
element.append(editing)

const q=new Quill(editing,{theme:"snow",  modules: {
    toolbar: toolbarOptions
  }})
  
// });
  setQuill(q)

  },[])
  


const submitdetail=()=>{

  sendSignupDetail()

}
    
    
    function showPosition(position) {
    
      let value= fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=2031d0d377c147ffb9af2f6a2d92e36f`)
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
 
let value= JSON.parse(localStorage.getItem("informationaboutuser"))
//  console.log(value) 
 let accessToken=value.accessToken
let refreshToken=value.refreshToken
console.log(accessToken)
console.log(location)
 let obj={location:location,image:url,content:quill?.getContents()?.ops[0]?.insert,active:true}
    fetch("http://localhost:8080/donour/createslot",{
        method:"POST",
        headers:{
         "Authorization":`Bearer ${accessToken}`,
         "Content-Type":"application/json" 
        },
        body:JSON.stringify(obj)
        }).then((res)=>{
          let data=res.json()
      console.log(data)
        }).catch((err)=>{console.log( "Error"+" "+err)})

    }
    const handleChange = (e) => {
      setLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('key', "a317afff092e0c2f8f3bc6df0966e505");
      formData.append('image', file);
  
      fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data.url)
        setUrl(data.data.url)

        setLoading(false);
        })
        .catch(error => {
          console.error(error);
          setLoading(false);
        });
    };
  


    return (

      
<>





<div id='container'  style={{marginTop:"50px"}} ref={editor}   >

    
</div>

<div>
<Input onChange={handleChange} placeholder='Upload Image' mt={20} type={"file"} />

{loading ? <p>Loading...</p> : <img src={image} alt="Uploaded Image" />}
</div>

<Button colorScheme='blue' my={10} onClick={submitdetail}>Button</Button>

</>    
  
)
}
