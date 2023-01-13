import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles.css'
import {BrowserRouter} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { ChakraProvider } from '@chakra-ui/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

  <BrowserRouter>
<ChakraProvider>
<App />
</ChakraProvider>


  </BrowserRouter>
 
  </React.StrictMode>,
)
