export function ErrorMessage({ message }) {
    return (
      <p className="loader">
        <span>😕 </span>
        {message}
      </p>
    );
  }