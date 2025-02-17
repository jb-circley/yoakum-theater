import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { type Movie } from "@shared/schema";
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

export default function MovieManagement() {
  const { data: movies, isLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  if (isLoading) {
    return <div>Loading movies...</div>;
  }

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
