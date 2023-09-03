import {RenderMovieResults} from "./RenderMovieResults"


export function DisplayMovieResults({ movies, handlerSelectedID }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <RenderMovieResults
          movie={movie}
          key={movie.imdbID}
          handlerSelectedID={handlerSelectedID}
        />
      ))}
    </ul>
  );
}
