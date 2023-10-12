import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWatchlist } from "../components/WatchlistContext";
import { useState, useEffect } from "react";
import {
  faStar,
  faCircleMinus,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";

export default function Movie(props) {
  const { addToWatchlist, removeFromWatchlist, movieExists } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  function handleAddToWatchList(movie) {
    addToWatchlist(movie);
    setIsInWatchlist(true);
  }

  function handleRemoveFromWatchlist(movie) {
    removeFromWatchlist(movie);
    setIsInWatchlist(false);
  }

  useEffect(() => {
    setIsInWatchlist(movieExists(props.movie.imdbID))
  }, [props.movie.imdbID, movieExists])

  return (
    <div className="movie">
      <div className="poster">
        <img src={props.poster} alt="movie-poster" />
      </div>
      <div className="movie-details">
        <div className="movie-line">
          <h3>{props.title}</h3>
          <span className="no-wrap">
            <FontAwesomeIcon
              className="star-icon"
              icon={faStar}
              color="#FEC654"
            />
            {props.imdbRating}
          </span>
        </div>
        <div className="movie-line">
          <span className="movie-details-span">
            <span>{props.runtime}</span>
            <span>{props.genre}</span>
            {!isInWatchlist && (
              <button
                className="watchlist-btn no-wrap"
                onClick={() => handleAddToWatchList(props.movie)}
              >
                <FontAwesomeIcon icon={faCirclePlus} color="green" /> Watchlist
              </button>
            )}
            {isInWatchlist && (
              <button
                className="watchlist-btn no-wrap"
                onClick={() => handleRemoveFromWatchlist(props.movie.imdbID)}
              >
                <FontAwesomeIcon icon={faCircleMinus} color="red" /> Remove
              </button>
            )}
          </span>
        </div>
        <div className="movie-description">
          <p>{props.plot}</p>
        </div>
      </div>
    </div>
  );
}
