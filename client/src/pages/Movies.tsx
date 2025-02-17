import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { type Movie, type Showtime } from "@shared/schema";
import MovieCard from "@/components/MovieCard";
import ShowtimeDisplay from "@/components/ShowtimeDisplay";

export default function Movies() {
  const [location] = useLocation();
  const { toast } = useToast();
  const movieId = new URLSearchParams(location.split("?")[1]).get("id");

  const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const { data: showtimes, isLoading: showtimesLoading } = useQuery<Showtime[]>({
    queryKey: ["/api/movies", movieId, "showtimes"],
    enabled: !!movieId,
  });

  const selectedMovie = movies?.find((m) => m.id === Number(movieId));

  if (moviesLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Movies & Showtimes</h1>

      {selectedMovie ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/3 max-w-[300px] mx-auto">
              <MovieCard
                movie={selectedMovie}
                onShowtimes={() => {}}
              />
            </div>
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl font-semibold mb-4">Showtimes</h2>
              {showtimesLoading ? (
                <div>Loading showtimes...</div>
              ) : (
                <ShowtimeDisplay showtimes={showtimes || []} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {movies?.map((movie) => (
            <div key={movie.id} className="max-w-[300px] mx-auto w-full">
              <MovieCard
                movie={movie}
                onShowtimes={() => {
                  window.location.search = `?id=${movie.id}`;
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}