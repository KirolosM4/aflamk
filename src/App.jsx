import React from "react";
import MainNav from "./component/NavBar";
import Home from "./Home";
import {Routes,Route} from "react-router-dom";

const App = () => {
  return(
    <>
      <MainNav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
      </Routes>
    </>
  )
}

export default App;