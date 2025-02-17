import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Movie, type Showtime } from "@shared/schema";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Calendar } from "lucide-react";
import { format } from "date-fns";

function formatShowtime(dateStr: string | Date) {
  try {
    // First log the incoming date string for debugging
    console.log("Formatting date:", dateStr);

    // If it's already a Date object, return it
    if (dateStr instanceof Date) {
      return isNaN(dateStr.getTime()) ? null : dateStr;
    }

    // Try parsing the string
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      console.error("Invalid date format:", dateStr);
      return null;
    }
    return date;
  } catch (e) {
    console.error("Error parsing date:", e);
    return null;
  }
}

export default function MovieManagement() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const { data: showtimes, isLoading: showtimesLoading } = useQuery<Showtime[]>({
    queryKey: ["/api/movies", selectedMovieId, "showtimes"],
    enabled: !!selectedMovieId,
  });

  if (moviesLoading) {
    return <div>Loading movies...</div>;
  }

  // Debug log for showtimes data
  console.log("Showtimes data:", showtimes);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Movie Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Movie
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movies?.map((movie) => (
              <TableRow key={movie.id}>
                <TableCell>{movie.title}</TableCell>
                <TableCell>{movie.rating}</TableCell>
                <TableCell>{movie.duration} min</TableCell>
                <TableCell>
                  {movie.isComingSoon ? "Coming Soon" : "Now Showing"}
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedMovieId(movie.id)}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Showtimes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Manage Showtimes - {movie.title}</DialogTitle>
                        <DialogDescription>
                          Manage showtimes and pricing for this movie.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Button size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Showtime
                        </Button>
                        {showtimesLoading ? (
                          <div>Loading showtimes...</div>
                        ) : !showtimes?.length ? (
                          <div className="text-center py-4 text-muted-foreground">
                            No showtimes scheduled for this movie.
                          </div>
                        ) : (
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Time</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {showtimes.map((showtime) => {
                                const date = formatShowtime(showtime.showtime);
                                if (!date) {
                                  console.error("Invalid showtime:", showtime);
                                  return null;
                                }

                                return (
                                  <TableRow key={showtime.id}>
                                    <TableCell>
                                      {format(date, "MMM dd, yyyy")}
                                    </TableCell>
                                    <TableCell>
                                      {format(date, "h:mm a")}
                                    </TableCell>
                                    <TableCell>
                                      ${typeof showtime.price === 'number' 
                                        ? showtime.price.toFixed(2) 
                                        : '0.00'}
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                      <Button variant="outline" size="sm">
                                        Edit
                                      </Button>
                                      <Button variant="outline" size="sm">
                                        Delete
                                      </Button>
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}