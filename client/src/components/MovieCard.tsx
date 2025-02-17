import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { type Movie } from "@shared/schema";
import { Clock, Star } from "lucide-react";

interface MovieCardProps {
  movie: Movie;
  onShowtimes: () => void;
}

export default function MovieCard({ movie, onShowtimes }: MovieCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="aspect-[2/3] relative">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{movie.duration} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{movie.rating}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={onShowtimes} className="w-full">
          View Showtimes
        </Button>
      </CardFooter>
    </Card>
  );
}
