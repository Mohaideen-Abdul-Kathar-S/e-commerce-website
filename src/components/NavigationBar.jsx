import React,{useContext} from 'react'
import {BrowserRouter,Routes,Route,Link,NavLink} from 'react-router-dom'
import All from './All'
import Grocery from './Grocery'
import Vegetables from './Vegetables'
import CoolDrinks from './CoolDrinks'
import Snacks from './Snacks'
import Stationaries from './Stationaries'
import BuyNow from './BuyNow'
import Cart from './Cart'
import Profile from './Profile'
import ProductInput from './ProductInput'
import NotFound from './NotFound'
import '../compStyles/NavigationBar.css'
import { Archive,ShoppingCart,User } from 'lucide-react';
import TransactionMode from './TransactionMode';
import {userContext} from '../App';
import SignInRegister from './SignInRegister';
import Register from './Register';
import OrderedProductDetails from './OrderedProductDetails';
import SendOTP from './SendOTP';
import ViewHistory from './ViewHistory';
import CustomersOrders from './CustomersOrders';
import Swal from 'sweetalert2';

export default function NavigationBar() {
  const {userID} = useContext(userContext);
  console.log(userID);
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
   <li>
     { userID===""  && (<NavLink
      to="/SignInRegister"
      className={({ isActive }) =>
        isActive ? "nav-link active" : "nav-link"
      }
    >
      SignIn/Register 
    </NavLink>)}
  </li> 
        </ul>
        { userID!=="" &&  <div className='navIcons'>
         
           <div style={divstyle} >
          <Link to="/Cart"><ShoppingCart size={35} /></Link></div>
          <Link to="/Profile"><div id='profileicon'><User size={35} /></div></Link>
          </div>}
          
        </nav>
        <Routes>
            <Route path='/' element={<All/>}/>
            <Route path='/Grocery' element={<Grocery/>}/>
            <Route path='/Vegetables' element={<Vegetables/>}/>
            <Route path='/CoolDrinks' element={<CoolDrinks/>}/>
            <Route path='/Snacks' element={<Snacks/>}/>
            <Route path='/Stationaries' element={<Stationaries/>}/>
            <Route path='/Cart' element={<Cart/>}/>
            <Route path='/Profile' element={<Profile/>}/>
            <Route path='/ProductInput' element={<ProductInput/>}/>
            <Route path='/BuyNow' element={<BuyNow/>}/>
            <Route path='/TransactionMode' element={<TransactionMode/>}/>
            <Route path='/SignInRegister' element={<SignInRegister/>}/>
            <Route path='/Register' element={<Register/>}/>
            <Route path='/OrderedProductDetails' element={<OrderedProductDetails/>}/>
            <Route path='/SendOTP' element={<SendOTP/>}/>
            <Route path='/ViewHistory' element={<ViewHistory/>}/>
            <Route path='/CustomersOrders' element={<CustomersOrders/>}/>
            <Route path='/*' element={<NotFound/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  )
}
