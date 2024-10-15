import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import HeaderNav from "./component/HeaderNav";
import Footer from "./component/Footer";
import AllMovies from "./AllMovies";
import AllSeries from "./AllSeries";
import ContactUs from "./ContactUse";
import MoviesDetails from "./component/componentsDetails/MoviesDetails";
import SeriesDetails from "./component/componentsDetails/SeriesDetails";
import SearchSeries from "./component/componentsSearch/SearchSeries";
import SearchMovies from "./component/componentsSearch/SearchMovies";

const App = () => {
  return (
    <div>
      <HeaderNav />

      <div className="bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Movies" element={<AllMovies />} />
          <Route path="/Series" element={<AllSeries />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/searchseries" element={<SearchSeries />} />
          <Route path="/searchmovies" element={<SearchMovies />} />

          <Route path="/moviesdetails/:movieId" element={<MoviesDetails />} />
          <Route path="/seriesdetails/:seriesId" element={<SeriesDetails />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
