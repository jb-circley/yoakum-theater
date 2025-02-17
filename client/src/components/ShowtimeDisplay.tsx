import { format } from "date-fns";
import { type Showtime } from "@shared/schema";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ShowtimeDisplayProps {
  showtimes: Showtime[];
}

export default function ShowtimeDisplay({ showtimes }: ShowtimeDisplayProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showtimes.map((showtime) => (
            <TableRow key={showtime.id}>
              <TableCell>
                {format(new Date(showtime.showtime), "MMM dd, yyyy")}
              </TableCell>
              <TableCell>
                {format(new Date(showtime.showtime), "h:mm a")}
              </TableCell>
              <TableCell>${showtime.price.toFixed(2)}</TableCell>
              <TableCell>
                <Button variant="secondary" size="sm">
                  Buy Tickets
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
