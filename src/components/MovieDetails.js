import { Loading } from "./Loading";
import StarRating from "../customComponents/startRating";
import { useEffect, useState } from "react";
const KEY = "f9733796";

export function MoviDetails({
  selectedID,
  setSelectedID,
  AddToMovieList,
  watched,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  const [userRating, SetUserRating] = useState("");

  const isRated = watched.map((movie) => movie.imdbID).includes(selectedID);
  const Rating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  function CreateAddMovie() {
    let movie = {
      imdbID: selectedID,
      Title: title,
      Year: year,
      Poster: poster,
      Runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
    };

    AddToMovieList(movie);
    setSelectedID(null);
  }

  useEffect(
    function () {
      async function getMovieDeatails() {
        let res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
        );
        let data = await res.json();
        setMovie(data);
      }
      getMovieDeatails();
    },
    [selectedID]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;

      return function () {
        document.title = "usePopCorn";
      };
    },
    [title]
  );

  useEffect(
    function () {
      let callback = function (e) {
        if (e.code === "KeyD") {
          setSelectedID(null);
        }
      };

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [setSelectedID]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedID(null)}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isRated ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={SetUserRating}
                    isLoading={setIsLoading}
                  />
                  {userRating && (
                    <button onClick={CreateAddMovie} className="btn-add">
                      {" "}
                      +Add to List{" "}
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie with
                  <span> {Rating} </span> ⭐️{" "}
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
