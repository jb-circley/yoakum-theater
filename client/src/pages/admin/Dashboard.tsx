import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Film, Calendar, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { type Movie, type Showtime } from "@shared/schema";

export default function Dashboard() {
  const { data: movies } = useQuery<Movie[]>({
    queryKey: ["/api/movies"],
  });

  const { data: showtimes } = useQuery<Showtime[]>({
    queryKey: ["/api/showtimes"],
  });

  const stats = [
    {
      title: "Total Movies",
      value: movies?.length ?? 0,
      icon: Film,
    },
    {
      title: "Upcoming Showtimes",
      value: showtimes?.length ?? 0,
      icon: Calendar,
    },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
