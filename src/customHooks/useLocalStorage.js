import { useState, useEffect } from "react";

export function useLocalStorage(initial, key) {
  const [value, setValue] = useState(function () {
    let watchedData = JSON.parse(localStorage.getItem("key"));
    return watchedData ? watchedData : initial;
  });

  useEffect(
    function () {
      localStorage.setItem("key", JSON.stringify(value));
    },
    [value]
  );

  return [value, setValue]
}
