import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
          },
        }
      );
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex flex-col items-center justify-center p-4 text-center text-white">
            <h3 className="text-xl font-bold mb-2">{movie.title}</h3>
            <p className="text-sm line-clamp-4 overflow-hidden">
              {movie.overview}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoviesPage;
