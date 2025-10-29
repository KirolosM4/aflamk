import React from "react";
import MainNav from "./component/NavBar";
import Home from "./Home";
import Footer from "./component/Footeer"
import {Routes,Route} from "react-router-dom";
import Movies from "./Movies";
import Series from "./Series"
import ContactUs from "./ContactUs";
import DetailsMovies from "./DetailsMovies";
import DetailsSeries from "./DetailsSeries";
const App = () => {
  return(
    <>
      <MainNav/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/movies" element={<Movies/>}/>
        <Route path="/series" element={<Series/>}/>
        <Route path="/contactus" element={<ContactUs/>}/>
        <Route path="/movie/:movieId/title/:movieTitle" element={<DetailsMovies/>}/>
        <Route path="/series/:seriesId/title/:seriesTitle" element={<DetailsSeries/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App;