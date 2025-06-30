import React from 'react'
import {BrowserRouter,Routes,Route,Link,NavLink} from 'react-router-dom'
import All from './All'
import Grocery from './Grocery'
import Vegetables from './Vegetables'
import CoolDrinks from './CoolDrinks'
import Snacks from './Snacks'
import Stationaries from './Stationaries'
import Bucket from './Bucket'
import Cart from './Cart'
import ProductInput from './ProductInput'
import NotFound from './NotFound'
import '../compStyles/NavigationBar.css'
import { Archive,ShoppingCart } from 'lucide-react';
export default function NavigationBar() {
  const divstyle = { "marginTop":" 20px",
    "marginRight":" 20px",
    width:" 50px",
    height: "50px",
  "paddingRight":"50px"}
  return (
    <div>
        <BrowserRouter>
        <nav>
          <div className='logo'>
              Arab Store
          </div>
        <ul>
         
        
  <li>
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      All
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/Grocery"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      Grocery
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/Vegetables"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      Vegetables
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/CoolDrinks"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      CoolDrinks
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/Snacks"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      Snacks
    </NavLink>
  </li>
  <li>
    <NavLink
      to="/Stationaries"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      Stationaries
    </NavLink>
  </li>
        </ul>
        <div className='navIcons'>
         
          <div style={divstyle}><Link to="/Cart"><ShoppingCart size={35}/></Link></div>
          <div id='profileicon'></div>
        </div>
        </nav>
        <Routes>
            <Route path='/' element={<All/>}/>
            <Route path='/Grocery' element={<Grocery/>}/>
            <Route path='/Vegetables' element={<Vegetables/>}/>
            <Route path='/CoolDrinks' element={<CoolDrinks/>}/>
            <Route path='/Snacks' element={<Snacks/>}/>
            <Route path='/Stationaries' element={<Stationaries/>}/>
            
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/ProductInput' element={<ProductInput/>}/>
            <Route path='/*' element={<NotFound/>}/>

        </Routes>
        </BrowserRouter>
    </div>
  )
}
