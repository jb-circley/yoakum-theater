import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Movies from "@/pages/Movies";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLayout from "@/pages/admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        <Route path="/admin">
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        </Route>
        <Route path="/admin/movies">
          <AdminLayout>
            <div>Movies Management (Coming Soon)</div>
          </AdminLayout>
        </Route>
        <Route path="/admin/showtimes">
          <AdminLayout>
            <div>Showtimes Management (Coming Soon)</div>
          </AdminLayout>
        </Route>
        <Route>
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/movies" component={Movies} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;