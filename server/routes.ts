import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/movies", async (_req, res) => {
    const movies = await storage.getMovies();
    res.json(movies);
  });

  app.get("/api/movies/:id", async (req, res) => {
    const movie = await storage.getMovie(Number(req.params.id));
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.json(movie);
  });

  app.get("/api/showtimes", async (_req, res) => {
    const showtimes = await storage.getShowtimes();
    res.json(showtimes);
  });

  app.get("/api/movies/:id/showtimes", async (req, res) => {
    const showtimes = await storage.getShowtimesByMovie(Number(req.params.id));
    res.json(showtimes);
  });

  app.post("/api/contact", async (req, res) => {
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(validatedData);
    res.status(201).json(contact);
  });

  const httpServer = createServer(app);
  return httpServer;
}
