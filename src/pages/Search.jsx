import SearchBar from "../components/SearchBar";
import Movies from "../components/Movies";
import Placeholder from "../components/Placeholder";
import LoadingIcon from "../components/LoadingIcon";
import { useEffect, useState } from "react";

const apiKey = "16aec738";

function Search() {
  const [placeHolderText, setPlaceHolderText] = useState("Start exploring...");
  const [searchValue, setSearchValue] = useState("");
  const [prevSearchValue, setPrevSearchValue] = useState("");
  const [showMovies, setShowMovies] = useState(false);
  const [currentMovies, setCurrentMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // infinite scrolling
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(null)

  const search = (value, page) => {
    setIsLoading(true);
    const path = `https://www.omdbapi.com/?apikey=${apiKey}&s=${value}&page=${page}`;
    fetch(path)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        if (data.Response !== "False") {
          setMaxPage(Math.ceil(data.totalResults / 10))
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

  // trigger a page change if the page is greater than 1, and you are not past the
  // maximum number of pages
  useEffect(() => {
    if (page > 1 && page <= maxPage) {
      search(prevSearchValue, page);
    } 
  }, [page]);

  function addMovie(newMovie) {
    setCurrentMovies((prevMovies) => [...prevMovies, newMovie]);
  }

  const getMovieDetails = async (data) => {
    setIsLoading(true);
    const moviesArray = data.Search;
    for (let movie of moviesArray) {
      const movieInfo = await fetchMovieDetails(movie);
      if (movieInfo.Response !== "False") {
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

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1
      ) {
        incrementPage();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setPrevSearchValue={setPrevSearchValue}
        setCurrentMovies={setCurrentMovies}
        setPage={setPage}
        search={search}
      />
      {isLoading && <LoadingIcon />}
      {showMovies && <Movies currentMovies={currentMovies} />}
      {!isLoading && !showMovies && <Placeholder text={placeHolderText} />}
    </>
  );
}

export default Search;
