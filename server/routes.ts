import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema, insertShowtimeSchema } from "@shared/schema";

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

  app.post("/api/showtimes", async (req, res) => {
    const validatedData = insertShowtimeSchema.parse(req.body);
    const showtime = await storage.createShowtime(validatedData);
    res.status(201).json(showtime);
  });

  app.patch("/api/showtimes/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      const validatedData = insertShowtimeSchema.partial().parse(req.body);
      const showtime = await storage.updateShowtime(id, validatedData);
      res.json(showtime);
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Invalid request" });
    }
  });

  app.delete("/api/showtimes/:id", async (req, res) => {
    try {
      const id = Number(req.params.id);
      await storage.deleteShowtime(id);
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ message: error instanceof Error ? error.message : "Showtime not found" });
    }
  });

  app.post("/api/contact", async (req, res) => {
    const validatedData = insertContactSchema.parse(req.body);
    const contact = await storage.createContact(validatedData);
    res.status(201).json(contact);
  });

  const httpServer = createServer(app);
  return httpServer;
}