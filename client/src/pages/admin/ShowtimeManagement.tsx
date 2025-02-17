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
import { Plus } from "lucide-react";
import { format } from "date-fns";

export default function ShowtimeManagement() {
  const { data: showtimes, isLoading: showtimesLoading } = useQuery<Showtime[]>({
    queryKey: ["/api/showtimes"],
  });

  const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  if (showtimesLoading || moviesLoading) {
    return <div>Loading showtimes...</div>;
  }

  const getMovieTitle = (movieId: number) => {
    return movies?.find((m) => m.id === movieId)?.title || "Unknown Movie";
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Showtime Management</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Showtime
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Movie</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {showtimes?.map((showtime) => (
              <TableRow key={showtime.id}>
                <TableCell>{getMovieTitle(showtime.movieId)}</TableCell>
                <TableCell>
                  {format(new Date(showtime.showtime), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(showtime.showtime), "h:mm a")}
                </TableCell>
                <TableCell>${showtime.price.toFixed(2)}</TableCell>
                <TableCell className="text-right space-x-2">
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
