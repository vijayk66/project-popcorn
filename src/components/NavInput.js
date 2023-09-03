import { useEffect, useRef } from "react";

export function Navinput({ query, setQuery }) {
  let inputEl = useRef(null);

  useEffect(
    function () {
      let callback = function (e) {
        if (document.activeElement === inputEl.current) return;
        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      };
      document.addEventListener("keypress", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}
