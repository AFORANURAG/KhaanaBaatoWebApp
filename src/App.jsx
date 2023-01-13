import { useState } from 'react'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import About from './components/About'
import {Route,Routes} from "react-router-dom"
import Alldonations from './components/Alldonations'
import Stats from './components/Stats'
import Wantfood from './components/Wantfood'
import Donatefood from './components/Donatefood'
import Login from "./components/Login"
import Createslot from './components/Createslot'
import Chat from './components/Chat'
import Findfood from './components/Findfood'
import Logout from './components/Logout'
import Userprofile from './components/Userprofile'

function App() {


  const [count, setCount] = useState(0)
  return (


    <>

<Navbar/>
<div className="container">
<Routes>
<Route path={"/"} element={<Homepage/>}/>

<Route path={"/wantfood"} element={<Wantfood/>}/>
<Route path={"/donatefood"} element={<Donatefood/>}/>
<Route path={"/alldonations"} element={<Alldonations/>}/>
<Route path={"/about"} element={<About/>}/>
<Route path={"/stats"} element={<Stats/>}/>
<Route path={"/login"} element={<Login/>}/>
<Route path={"/chat"} element={<Chat/>}/>
<Route path={"/createslot"} element={<Createslot/>}/>
<Route path={"/findfood"} element={<Findfood/>}/>
<Route path={'/user'} element={<Userprofile/>}/>

<Route path={'/logout'} element={<Logout/>} />



</Routes>

</div>

</>


  )
}

export default App

