import { useState, useEffect } from "react";

const KEY = "f9733796";

export function useMovie(query) {

    const [isLoading, setLoading] = useState(false);
    const [movies, setMovies] = useState([]);
    const [err, setErr] = useState("");
    
    useEffect(
        function () {
          let controller = new AbortController();

          if (query.length < 3) {
            setMovies([]);
            setErr("");
            return;
          }
          
          async function fetchMoviData() {
            try {
              setLoading(true);
              setErr("");
              let res = await fetch(
                `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
                { signal: controller.signal }
              );
    
              if (!res.ok) {
                throw new Error("Something went wrong with fetching movies");
              }
              let movie = await res.json();
              if (movie.Response === "False") {
                throw new Error("Movie not found");
              }
    
              setMovies(movie.Search);
              // setErr("");
            } catch (e) {
              if (e.name !== "AbortError") {
                setErr(e.message);
              }
            } finally {
              setLoading(false);
            }
          }
          
        
          fetchMoviData();
    
          return function () {
            controller.abort();
          };
        },
        [query]
      );

      return {isLoading, movies, err}
}


// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BNjFlZDIyOTQtZGI5Yi00MmIxLTgwOTUtZWUzZDI4NzZkODIyXkEyXkFqcGdeQXVyMTEzNzg0Mjkx._V1_SX300.jpg"
// Title
// : 
// "Sura"
// Type
// : 
// "movie"
// Year
// : 
// "2010"
// imdbID
// : 
// "tt1650433"


