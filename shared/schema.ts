import { pgTable, text, serial, integer, timestamp, real, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  posterUrl: text("poster_url").notNull(),
  trailerUrl: text("trailer_url"),
  rating: text("rating").notNull(),
  duration: integer("duration").notNull(),
  isComingSoon: boolean("is_coming_soon").default(false).notNull(),
});

export const showtimes = pgTable("showtimes", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").notNull(),
  showtime: timestamp("showtime").notNull(),
  price: real("price").notNull(),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Create insert schemas with proper transformations
export const insertMovieSchema = createInsertSchema(movies);

export const insertShowtimeSchema = createInsertSchema(showtimes, {
  showtime: z.union([z.string(), z.date()]).transform((val) => {
    if (typeof val === 'string') {
      const date = new Date(val);
      if (isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      return date;
    }
    return val;
  }),
});

export const insertContactSchema = createInsertSchema(contacts).omit({ createdAt: true });

// Export types
export type Movie = typeof movies.$inferSelect;
export type Showtime = typeof showtimes.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type InsertMovie = z.infer<typeof insertMovieSchema>;
export type InsertShowtime = z.infer<typeof insertShowtimeSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;