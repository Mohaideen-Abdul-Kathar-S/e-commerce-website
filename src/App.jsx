import NavBar from "./components/NavBar"
import React, { createContext, useState } from "react";
import NavigationBar from './components/NavigationBar'
export let userContext = createContext();
function App() {

  const userID = useState("");
  

  return (
    <userContext.Provider value={{userID}}>
    <NavigationBar/>
    </userContext.Provider>
  )
}

export default App
