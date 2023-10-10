import { createContext, useState, useContext } from "react";

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
    return watchlist.some(movie => movie.imdbID === movieID)
  }

  const addToWatchlist = (movie) => {
    setWatchlist([...watchlist, movie]);
  };

  const removeFromWatchlist = (movieID) => {
    setWatchlist(watchlist.filter((movie) => movie.imdbID !== movieID));
  };

  return (
    <WatchlistContext.Provider value={{watchlist, addToWatchlist, removeFromWatchlist, movieExists}}>
        {children}
    </WatchlistContext.Provider>
  )
};
