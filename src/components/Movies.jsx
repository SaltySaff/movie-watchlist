import Movie from "./Movie";

export default function Movies({ currentMovies }) {

  const movieEls = currentMovies.map((movie) => {
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

  return <section id="movies" className="movies">{movieEls}</section>;
}
