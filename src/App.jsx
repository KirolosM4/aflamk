import React from "react";
import MainNav from "./component/NavBar";
import Home from "./Home";
import Footer from "./component/Footeer"
import {Routes,Route} from "react-router-dom";
import Movies from "./Movies";

const App = () => {
  return(
    <>
      <MainNav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;