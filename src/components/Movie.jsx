import React from "react";
import Stars from "./Stars";

export default function Movie({ movie, imgAPI, onClick, width }) {
  const percentage = parseInt((movie.vote_average * 100) / 10);
  return (
    <div
      vote_average={movie.vote_average}
      className="thumbnail mx-3 d-flex flex-column justify-content-end p-2 text-light"
      id={movie.id}
      style={{
        backgroundImage: `url(${imgAPI}${movie.poster_path})`,
        width: `${width}px`,
      }}
      onClick={onClick}
    >
      <Stars width={percentage} />
      <h5 className="mt-3">{movie.title}</h5>
    </div>
  );
}
