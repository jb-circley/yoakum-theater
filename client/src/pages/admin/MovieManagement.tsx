import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { type Movie, type Showtime, type InsertShowtime, insertShowtimeSchema } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Calendar } from "lucide-react";
import { format } from "date-fns";

interface AddShowtimeFormData {
  showtime: string;
  price: number;
}

function formatDate(date: string | Date | null): string {
  try {
    if (!date) return "No date";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "Invalid date";
    return format(dateObj, "MMM dd, yyyy");
  } catch (e) {
    return "Invalid date";
  }
}

function formatTime(date: string | Date | null): string {
  try {
    if (!date) return "No time";
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    if (isNaN(dateObj.getTime())) return "Invalid time";
    return format(dateObj, "h:mm a");
  } catch (e) {
    return "Invalid time";
  }
}

function formatPrice(price: number | null | undefined): string {
  if (typeof price !== 'number') return "$0.00";
  return `$${price.toFixed(2)}`;
}

function AddShowtimeDialog({
  movieId,
  isOpen,
  onClose,
}: {
  movieId: number;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const form = useForm<AddShowtimeFormData>({
    resolver: zodResolver(insertShowtimeSchema.omit({ movieId: true })),
    defaultValues: {
      showtime: new Date(Date.now() + 3600000).toISOString().slice(0, 16), // Current time + 1 hour
      price: 12.99,
    },
  });

  const createShowtimeMutation = useMutation({
    mutationFn: async (data: AddShowtimeFormData) => {
      const showtimeData: InsertShowtime = {
        movieId,
        showtime: new Date(data.showtime),
        price: data.price,
      };
      await apiRequest("POST", "/api/showtimes", showtimeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies", movieId, "showtimes"] });
      toast({
        title: "Success",
        description: "Showtime added successfully",
      });
      form.reset();
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Showtime</DialogTitle>
          <DialogDescription>
            Add a new showtime for this movie. Please enter the date, time, and price.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => createShowtimeMutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="showtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date and Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={createShowtimeMutation.isPending}>
                {createShowtimeMutation.isPending ? "Adding..." : "Add Showtime"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function EditShowtimeDialog({
  showtime,
  isOpen,
  onClose,
}: {
  showtime: Showtime;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { toast } = useToast();
  const form = useForm<AddShowtimeFormData>({
    resolver: zodResolver(insertShowtimeSchema.omit({ movieId: true })),
    defaultValues: {
      showtime: new Date(showtime.showtime).toISOString().slice(0, 16),
      price: showtime.price,
    },
  });

  const updateShowtimeMutation = useMutation({
    mutationFn: async (data: AddShowtimeFormData) => {
      const showtimeData = {
        showtime: new Date(data.showtime),
        price: data.price,
      };
      await apiRequest("PATCH", `/api/showtimes/${showtime.id}`, showtimeData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies", showtime.movieId, "showtimes"] });
      toast({
        title: "Success",
        description: "Showtime updated successfully",
      });
      form.reset();
      onClose();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Showtime</DialogTitle>
          <DialogDescription>
            Update the showtime details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((data) => updateShowtimeMutation.mutate(data))}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="showtime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date and Time</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      {...field}
                      onChange={(e) => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={updateShowtimeMutation.isPending}>
                {updateShowtimeMutation.isPending ? "Updating..." : "Update Showtime"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default function MovieManagement() {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [showAddShowtime, setShowAddShowtime] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
  const { toast } = useToast();

  const { data: movies, isLoading: moviesLoading } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const { data: showtimes, isLoading: showtimesLoading } = useQuery<Showtime[]>({
    queryKey: ["/api/movies", selectedMovieId, "showtimes"],
    enabled: !!selectedMovieId,
  });

  const deleteShowtimeMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/showtimes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/movies", selectedMovieId, "showtimes"] });
      toast({
        title: "Success",
        description: "Showtime deleted successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleDeleteShowtime = (id: number) => {
    if (window.confirm("Are you sure you want to delete this showtime?")) {
      deleteShowtimeMutation.mutate(id);
    }
  };

  if (moviesLoading) {
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
                        <Button
                          size="sm"
                          onClick={() => setShowAddShowtime(true)}
                        >
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
                              {showtimes.map((showtime) => (
                                <TableRow key={showtime.id}>
                                  <TableCell>
                                    {formatDate(showtime.showtime)}
                                  </TableCell>
                                  <TableCell>
                                    {formatTime(showtime.showtime)}
                                  </TableCell>
                                  <TableCell>
                                    {formatPrice(showtime.price)}
                                  </TableCell>
                                  <TableCell className="text-right space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => setEditingShowtime(showtime)}
                                    >
                                      Edit
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeleteShowtime(showtime.id)}
                                      disabled={deleteShowtimeMutation.isPending}
                                    >
                                      Delete
                                    </Button>
                                  </TableCell>
                                </TableRow>
                              ))}
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

      {selectedMovieId && (
        <AddShowtimeDialog
          movieId={selectedMovieId}
          isOpen={showAddShowtime}
          onClose={() => setShowAddShowtime(false)}
        />
      )}
      {editingShowtime && (
        <EditShowtimeDialog
          showtime={editingShowtime}
          isOpen={!!editingShowtime}
          onClose={() => setEditingShowtime(null)}
        />
      )}
    </div>
  );
}