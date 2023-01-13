import React, { useEffect, useState } from 'react'
import {Link,useMatch,useResolvedPath,useNavigate} from  "react-router-dom"
export default function Navbar() {
const [isauthenticated,setAuthenticated]=useState(false)
const [Role,setRole]=useState(null)
// In this Section we are gonna write some complex logic for creating our react app
const [state,setState]=useState(true)
const navigate=useNavigate()
useEffect(()=>{
  let {role,token}=JSON.parse(localStorage.getItem("informationaboutuser"))||{}
  console.log(role,token)
  setRole(Role)
  if(token){
    setAuthenticated(true)
  }else{
    setAuthenticated(false)
  }
},[])

async function logout(){
  console.log("LOGOUT")
let res=await fetch("http://localhost:8080/userauth/logout",{
method:"POST",

})
let data=await res.json()
console.log(data)
localStorage.removeItem("informationaboutuser")

navigate("/login")
window.location.reload()
}
  return (
    <nav className='nav'>
    <Link  to={"/"} className='site-title'> 
    <img src="https://i.ibb.co/s14Mtn3/Khaan-2.jpg" alt="Khaan-2" border="0" width={"30%"}/>
    </Link>
    
   <img src="https://www.oneindia.com/img/2016/01/14-1452767715-makeinindia-logo.jpg" width={"7%"} />

 {
isauthenticated?(
<>
<ul>

<CustomLink to="/user">
User Profile
</CustomLink>

<CustomLink to="/logout" onClick={logout} >
Logout
</CustomLink>

<CustomLink to="/alldonations">
All Donations 
</CustomLink>

<CustomLink to="/stats">
Stats
</CustomLink>

<CustomLink to="/createslot" display={"none"}>
CreateSlot
</CustomLink>



<CustomLink to="/chat" display={"none"}>
Chat
</CustomLink>



 
</ul>

</>

):(
  <>

  <CustomLink to="/alldonations">
All Donations 
</CustomLink>

<CustomLink to="/findfood" display={"none"}>
Findfood
</CustomLink>

<CustomLink to="/stats">
Stats
</CustomLink>
<CustomLink to="/login">
Login
</CustomLink>

<CustomLink to="/donatefood">
Donate Food
</CustomLink>

<CustomLink to="/wantfood">
Want Food
</CustomLink>

  </>
)


  
 }

   
 


    </nav>
  )
}

function CustomLink({to,children,...props}){
    const resolvedPath= useResolvedPath(to)
    const isActive= useMatch({path:resolvedPath.pathname,end:true}) 
    return (

<li className={isActive?"active":""}>
<Link to={to} {...props}>{children}</Link>

</li>


)


}

