import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { type Movie } from "@shared/schema";
import { Clock, Star, Play } from "lucide-react";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  onShowtimes: () => void;
}

function getYouTubeVideoId(url: string | null) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

export default function MovieCard({ movie, onShowtimes }: MovieCardProps) {
  const [showTrailer, setShowTrailer] = useState(false);
  const videoId = getYouTubeVideoId(movie.trailerUrl);

  return (
    <>
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
        <CardFooter className="p-4 pt-0 flex flex-col gap-2">
          {movie.trailerUrl && videoId && (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowTrailer(true)}
            >
              <Play className="h-4 w-4 mr-2" />
              Watch Trailer
            </Button>
          )}
          <Button onClick={onShowtimes} className="w-full">
            View Showtimes
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={showTrailer} onOpenChange={setShowTrailer}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{movie.title} - Trailer</DialogTitle>
          </DialogHeader>
          <div className="aspect-video">
            {videoId && (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}`}
                title={`${movie.title} trailer`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}