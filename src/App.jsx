import React from "react";
import {Routes,Route} from "react-router-dom"
import Home from "./Home";
import HeaderNav from "./component/HeaderNav";
import Footer from "./component/Footer";
import Movies from "./Movies";
const App = () => {

  return (
    <div>
      <HeaderNav/>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/Movies" element={<Movies/>}/>
      </Routes>
      <Footer/>
    </div>

  )
}

export default App
