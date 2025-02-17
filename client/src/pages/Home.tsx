import { useQuery } from "@tanstack/react-query";
import { type Movie } from "@shared/schema";
import MovieCard from "@/components/MovieCard";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";

export default function Home() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const handleShowtimes = (movieId: number) => {
    setLocation(`/movies?id=${movieId}`);
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-[2/3] max-w-[300px] mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Welcome to The Grand Theater</h1>
        <p className="text-xl text-muted-foreground">
          Experience the magic of cinema in Yoakum's premier movie destination
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Now Showing</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.filter(m => !m.isComingSoon).map((movie) => (
            <div key={movie.id} className="max-w-[300px] mx-auto w-full">
              <MovieCard
                movie={movie}
                onShowtimes={() => handleShowtimes(movie.id)}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies?.filter(m => m.isComingSoon).map((movie) => (
            <div key={movie.id} className="max-w-[300px] mx-auto w-full">
              <MovieCard
                key={movie.id}
                movie={movie}
                onShowtimes={() => {}}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-card rounded-lg p-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Special Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Game Room</h3>
            <p className="text-muted-foreground">
              Visit our exciting Game Room across the street! Featuring arcade games,
              pizza, wings, and more.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Birthday Parties</h3>
            <p className="text-muted-foreground">
              Make your celebration special with a movie party package at The Grand Theater.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}