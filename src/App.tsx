// import React from 'react';
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./components/Home";
import "./App.css";
import Trending from "./components/templates/Trending";
import Popular from "./components/templates/Popular";
import Movie from "./components/templates/Movie";
import TvShows from "./components/templates/TvShows";
import Peoples from "./components/templates/Peoples";
import MovieDetails from "./components/templates/MovieDetails";
import PeopleDetails from "./components/templates/PeopleDetails";
import TvDetails from "./components/templates/TvDetails";
import Trailer from "./components/templates/Trailer";
import NotFound from "./components/templates/NotFound";
import AboutUs from "./components/templates/AboutUs";
import ContactUs from "./components/templates/ContactUs";
function App() {
  return (
    <h1 className="bg-[#1F1E24] h-screen w-screen flex ">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/details/:id" element={<MovieDetails />}>
          <Route path="/movie/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/tvShows" element={<TvShows />} />
        <Route path="tv/details/:id" element={<TvDetails />}>
          <Route path="tv/details/:id/trailer" element={<Trailer />} />
        </Route>
        <Route path="/artists" element={<Peoples />} />
        <Route path="/persons/details/:id" element={<PeopleDetails />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </h1>
  );
}

export default App;
