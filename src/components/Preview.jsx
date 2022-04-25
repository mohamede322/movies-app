import { useState } from "react";
import Stars from "./Stars";
export default function Preview({ movie, imgAPI, categories }) {
  const percentage = parseInt((movie.vote_average * 100) / 10);
  const image =
    movie.backdrop_path === null ? movie.poster_path : movie.backdrop_path;
  const [img, setImg] = useState(image);
  function resizeImg() {
    window.innerWidth >= 760 ? setImg(image) : setImg(movie.poster_path);
  }
  window.onresize = () => {
    resizeImg();
  };

  setTimeout(
    (window.onload = () => {
      resizeImg();
    }),
    5
  );

  return (
    <div
      className="preview h-50"
      style={{ backgroundImage: `url(${imgAPI}${img})` }}
    >
      <div className="content text-center text-md-start align-items-center align-items-md-start   container d-flex flex-column justify-content-center h-100">
        <div className="stars mb-3">
          <Stars width={percentage} />
        </div>
        <h1 className="p-0 p-md-2 ps-md-0"> {movie.title} </h1>
        <p> {movie.overview} </p>
        <p className="fw-bold">
          <span className=" lead">Release Date:</span> {movie.release_date}
        </p>
        <p className="fw-bold">
          <span className=" lead">Status: </span>
          {movie.status}
        </p>
        <p className="fw-bold">
          <span className="lead">Average Votes: </span>
          {movie.vote_average}
        </p>
        <div className="categories d-flex align-items-center">
          {categories.map((cat, i) => (
            <span key={i} className="text-light p-md-2 p-1 me-3 category">
              {cat.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
