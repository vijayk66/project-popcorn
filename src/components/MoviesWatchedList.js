import {MoviesWatchedListRender} from "./MoviesWatchedListRender"

export function MoviesWatchedList({ watched, DeleteWatchedMovie }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <MoviesWatchedListRender
          movie={movie}
          key={movie.imdbID}
          DeleteWatchedMovie={DeleteWatchedMovie}
        />
      ))}
    </ul>
  );
}
