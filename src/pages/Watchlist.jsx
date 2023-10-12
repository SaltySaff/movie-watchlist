import Placeholder from "../components/Placeholder";
import { useState, useEffect } from "react";
import { useWatchlist } from "../components/WatchlistContext";
import Movie from "../components/Movie";

export default function Watchlist() {
  const [hideWatchlist, setHideWatchlist] = useState(true);
  const { watchlist } = useWatchlist();

  const watchlistEls = watchlist.map((movie) => {
    return (
      <Movie
        movie={movie}
        key={movie.imdbID}
        title={movie.Title}
        poster={movie.Poster}
        imdbRating={movie.imdbRating}
        runtime={movie.Runtime}
        genre={movie.Genre}
        plot={movie.Plot}

      />
    );
  });

  useEffect(() => {
    if (watchlist.length > 0) {
        setHideWatchlist(false)
    } else {
        setHideWatchlist(true)
    }
  }, [watchlist])

  return (
    <>
      {!hideWatchlist && (
        <section id="watchlist" className="watchlist">{watchlistEls}</section>
      )}
      {hideWatchlist && <Placeholder text="Your watchlist is a bit empty..." />}
    </>
  );
}
