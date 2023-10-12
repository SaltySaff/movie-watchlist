import SearchBar from "../components/SearchBar";
import Movies from "../components/Movies";
import Placeholder from "../components/Placeholder";
import LoadingIcon from "../components/LoadingIcon";
import { useState } from "react";

const apiKey = "16aec738";

function Search() {
  const [placeHolderText, setPlaceHolderText] = useState("Start exploring...");
  const [searchValue, setSearchValue] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const search = () => {
    setIsLoading(true);
    const path = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}`;
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.Response !== "False") {
          // reset current movies array
          setCurrentMovies([]);
          // switch from placeholder to movie list
          setShowMovies(true);
          // get detailed info from api
          getMovieDetails(data);
        } else {
          setShowMovies(false);
          handleError(data);
        }
      });
  };

  function addMovie(newMovie) {
    setCurrentMovies((prevMovies) => [...prevMovies, newMovie]);
  }

  const getMovieDetails = async (data) => {
    setIsLoading(true);
    const moviesArray = data.Search;
    for (let movie of moviesArray) {
      const movieInfo = await fetchMovieDetails(movie);
      if (movieInfo.Response !== 'False') {
        addMovie(movieInfo);
      }
    }
    setIsLoading(false);
  };

  const fetchMovieDetails = (movie) => {
    const imdbID = movie.imdbID;
    return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
      .then((res) => res.json())
      .then((data) => data);
  };

  // render error message in placeholder text
  const handleError = (data) => {
    setPlaceHolderText(`Error: ${data.Error}`);
  };

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        search={search}
      />
      {isLoading && <LoadingIcon />}
      {!isLoading && showMovies && <Movies currentMovies={currentMovies} />}
      {!isLoading && !showMovies && <Placeholder text={placeHolderText} />}
    </>
  );
}

export default Search;
