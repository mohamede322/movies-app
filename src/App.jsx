import { useState, useEffect, useRef } from "react";
import Preview from "./components/Preview";
import Movie from "./components/Movie";

function App() {
  const apiKey = "?api_key=0a5c3ec2a6516c0eb8a3931ad4c0b376";
  const baseURL = "https://api.themoviedb.org/3/";
  const IMG_API = "https://image.tmdb.org/t/p/w1280";
  const api = `${baseURL}movie/popular${apiKey}`;

  const [movies, setMovies] = useState([]);
  const [preview, setPreview] = useState({});
  const [movieCategory, setMovieCategory] = useState([]);
  const [scrollLvl, setScrollLvl] = useState(0);

  async function getData() {
    const movies_res = await fetch(api);
    const data_res = await movies_res.json();
    data_res.results.sort((a, b) => b.vote_average - a.vote_average);
    setMovies(data_res.results);
    const details_res = await fetch(
      `${baseURL}movie/${data_res.results[0].id}${apiKey}`
    );
    const details_data = await details_res.json();
    setPreview(details_data);
    setMovieCategory(details_data.genres);
  }
  useEffect(() => {
    getData();
  }, []);

  async function handleClick(e) {
    const { id } = e.target;
    const details_res = await fetch(`${baseURL}movie/${id}${apiKey}`);
    const details_data = await details_res.json();
    setPreview(details_data);
    setMovieCategory(details_data.genres);
  }
  const containerRef = useRef(null);
  const movieWidth = 200;
  const aroundMovie = 24;
  function handleScroll(e) {
    const { clientWidth } = containerRef.current;
    const { length } = movies;
    const totalMovieWidth = movieWidth + aroundMovie;
    const minus = Math.floor(clientWidth / totalMovieWidth);
    const maxScroll = totalMovieWidth * (length - minus + 1);
    const scroll = 75;

    if (e.deltaY <= 0) {
      if (scrollLvl <= 0) {
        setScrollLvl(0);
      } else {
        setScrollLvl(scrollLvl - scroll);
      }
    } else if (e.deltaY > 0) {
      if (scrollLvl >= maxScroll) {
        setScrollLvl(maxScroll);
      } else {
        setScrollLvl(scrollLvl + scroll);
      }
    }
    containerRef.current.scroll(scrollLvl, 0);
  }

  return (
    <div className="App bg-dark">
      <Preview movie={preview} categories={movieCategory} imgAPI={IMG_API} />
      <div
        className="movies-container d-flex justify-content-between align-items-center ms-0 ms-md-5 h-50"
        onWheel={handleScroll}
        ref={containerRef}
      >
        {movies.map((movie) => (
          <Movie
            width={movieWidth}
            key={movie.id}
            onClick={handleClick}
            movie={movie}
            imgAPI={IMG_API}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
