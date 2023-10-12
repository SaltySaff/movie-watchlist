import { createContext, useState, useContext, useEffect } from "react";

const WatchlistContext = createContext();

export const useWatchlist = () => {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
};

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  const movieExists = (movieID) => {
    return watchlist.some((movie) => movie.imdbID === movieID);
  };

  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  const removeFromWatchlist = (movieID) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== movieID));
  };

  useEffect(() => {
    const storedWatchlist = localStorage.getItem("myWatchlist")
    if (storedWatchlist) {
      setWatchlist(JSON.parse(storedWatchlist))
    } else {
      localStorage.setItem("myWatchlist", JSON.stringify([]))
    }
  }, [])

  useEffect(() => {
    if (watchlist.length > 0) {
      localStorage.setItem("myWatchlist", JSON.stringify(watchlist));
    }
  }, [watchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        movieExists,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};
