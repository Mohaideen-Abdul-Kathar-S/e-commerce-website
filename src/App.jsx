import NavBar from "./components/NavBar"
import React, { createContext, useState } from "react";
import NavigationBar from './components/NavigationBar'
export let userContext = createContext();
function App() {

  const [userID,setUserID] = useState("");
  const [UserName,setUserName] = useState("");
  const [UserGender,setUserGender] = useState("");
  const [UserNOH,setUserNOH] = useState("");
  const [UserCity,setUserCity] = useState("");
  const [UserAddr,setUserAddr] = useState("");
  

  return (
    <userContext.Provider value={{UserAddr,setUserAddr,UserCity,setUserCity,setUserNOH,UserNOH,setUserGender,UserGender,userID,setUserID,UserName,setUserName}}>
    <NavigationBar/>
    </userContext.Provider>
  )
}

export default App
