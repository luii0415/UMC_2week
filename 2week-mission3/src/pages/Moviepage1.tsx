import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
}

function MoviesPage() {
  const { category } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getEndpointFromCategory = (cat: string | undefined) => {
    switch (cat) {
      case "popular":
        return "popular";
      case "upcoming":
        return "upcoming";
      case "top-rated":
        return "top_rated";
      case "now_playing":
        return "now_playing";
      default:
        return "popular";
    }
  };

  // 데이터 불러오기
  useEffect(() => {
    if (!category) return;

    setIsLoading(true);
    setError(null);
    const endpoint = getEndpointFromCategory(category);

    axios
      .get(
        `https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
          },
        }
      )
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category, page]);

  // 페이지 이동
  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleNextPage = () => {
    setPage(page + 1);
  };

  // 로딩 중 -> 스피너 표시
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-400 border-t-transparent"></div>
      </div>
    );
  }

  // 에러 발생 -> 에러 메시지
  if (error) {
    return (
      <div className="text-red-500 text-center p-4">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="pt-5 pb-10 px-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className={`
            w-10 h-10 rounded-md
            flex items-center justify-center text-xl
            shadow-md
            ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 hover:bg-pink-300 text-black"
            }
          `}
        >
          &lt;
        </button>

        <span className="font-semibold">{page} 페이지</span>

        <button
          onClick={handleNextPage}
          className="w-10 h-10 rounded-md flex items-center justify-center text-xl bg-pink-400 text-white hover:bg-pink-500 shadow-md"
        >
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movies/${movie.id}/details`}>
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
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MoviesPage;
