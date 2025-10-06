import React, { useEffect, useState } from "react";
import {WelcomeBanner} from './WelcomeBanner'
import AllList from './AllList'
import Footer from './Footer'

export default function All() {
  const [AllSearch,setAllSearch] = useState('');
  return (
    <div>
        <WelcomeBanner AllSearch = {AllSearch} setAllSearch={setAllSearch}/>
        <AllList AllSearch = {AllSearch}/>
    
    </div>
  )
}
