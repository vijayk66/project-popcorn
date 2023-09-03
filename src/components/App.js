import { useEffect, useRef, useState } from "react";

// custom Hooks
import { useMovie } from "../customHooks/useMovie";
import { useLocalStorage } from "../customHooks/useLocalStorage";

// Components
import { Loading } from "./Loading";
import { Navbar } from "./Navbar";
import { Navlogo } from "./Navlogo";
import { Navinput } from "./NavInput";
import { NavNumResuts } from "./NavNumResults";
import { Main } from "./Main";
import { MovieResultsBox } from "./MovieResultsBox";
import { DisplayMovieResults } from "./DisplayMovieResults";
import { MovieSummary } from "./MovieSummary";
import { MoviesWatchedList } from "./MoviesWatchedList";
import { ErrorMessage } from "./ErrorMessage";
import { MoviDetails } from "./MovieDetails";


export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);
  const [watched, setWatched] = useLocalStorage([], "watched");

  // custom hook
  const { isLoading, movies, err } = useMovie(query);

  function handlerSelectedID(id) {
    setSelectedID((selectedID) => (id === selectedID ? null : id));
  }

  function AddToMovieList(movie) {
    setWatched((watched) => [...watched, movie]);
  }

  function DeleteWatchedMovie(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Navlogo />
        <Navinput query={query} setQuery={setQuery} />
        <NavNumResuts movies={movies} />
      </Navbar>
      <Main>
        <MovieResultsBox>
          {isLoading && <Loading />}
          {!isLoading && !err && (
            <DisplayMovieResults
              movies={movies}
              isLoading={isLoading}
              handlerSelectedID={handlerSelectedID}
            />
          )}
          {err && <ErrorMessage message={err} />}
        </MovieResultsBox>

        <MovieResultsBox>
          {selectedID ? (
            <MoviDetails
              selectedID={selectedID}
              setSelectedID={setSelectedID}
              AddToMovieList={AddToMovieList}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <MoviesWatchedList
                watched={watched}
                DeleteWatchedMovie={DeleteWatchedMovie}
              />
            </>
          )}
        </MovieResultsBox>
      </Main>
    </>
  );
}
