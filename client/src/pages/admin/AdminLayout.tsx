import { Link, useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  const navItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Movies", path: "/admin/movies" },
    { name: "Showtimes", path: "/admin/showtimes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin">
              <span className="font-semibold">Admin Dashboard</span>
            </Link>
            <nav className="hidden md:flex items-center gap-4">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="text-sm"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))}
            </nav>
          </div>
          <Link href="/">
            <Button variant="outline" size="sm">
              View Site
            </Button>
          </Link>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="p-6">{children}</Card>
      </main>
    </div>
  );
}
