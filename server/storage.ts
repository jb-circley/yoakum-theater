import {
  type Movie,
  type Showtime,
  type Contact,
  type InsertMovie,
  type InsertShowtime,
  type InsertContact,
} from "@shared/schema";

export interface IStorage {
  getMovies(): Promise<Movie[]>;
  getMovie(id: number): Promise<Movie | undefined>;
  createMovie(movie: InsertMovie): Promise<Movie>;
  getShowtimes(): Promise<Showtime[]>;
  getShowtimesByMovie(movieId: number): Promise<Showtime[]>;
  createShowtime(showtime: InsertShowtime): Promise<Showtime>;
  createContact(contact: InsertContact): Promise<Contact>;
}

export class MemStorage implements IStorage {
  private movies: Map<number, Movie>;
  private showtimes: Map<number, Showtime>;
  private contacts: Map<number, Contact>;
  private currentMovieId: number;
  private currentShowtimeId: number;
  private currentContactId: number;

  constructor() {
    this.movies = new Map();
    this.showtimes = new Map();
    this.contacts = new Map();
    this.currentMovieId = 1;
    this.currentShowtimeId = 1;
    this.currentContactId = 1;

    // Add some sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    const sampleMovies: InsertMovie[] = [
      {
        title: "One of Them Days",
        description: "A thrilling new movie coming to theaters",
        posterUrl: "https://example.com/poster1.jpg",
        trailerUrl: "https://youtube.com/watch?v=123",
        rating: "PG-13",
        duration: 120,
      },
      {
        title: "Captain America",
        description: "The latest Marvel adventure",
        posterUrl: "https://example.com/poster2.jpg",
        trailerUrl: "https://youtube.com/watch?v=456",
        rating: "PG-13",
        duration: 150,
      },
    ];

    sampleMovies.forEach((movie) => this.createMovie(movie));
  }

  async getMovies(): Promise<Movie[]> {
    return Array.from(this.movies.values());
  }

  async getMovie(id: number): Promise<Movie | undefined> {
    return this.movies.get(id);
  }

  async createMovie(insertMovie: InsertMovie): Promise<Movie> {
    const id = this.currentMovieId++;
    const movie: Movie = { ...insertMovie, id };
    this.movies.set(id, movie);
    return movie;
  }

  async getShowtimes(): Promise<Showtime[]> {
    return Array.from(this.showtimes.values());
  }

  async getShowtimesByMovie(movieId: number): Promise<Showtime[]> {
    return Array.from(this.showtimes.values()).filter(
      (showtime) => showtime.movieId === movieId
    );
  }

  async createShowtime(insertShowtime: InsertShowtime): Promise<Showtime> {
    const id = this.currentShowtimeId++;
    const showtime: Showtime = { ...insertShowtime, id };
    this.showtimes.set(id, showtime);
    return showtime;
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const contact: Contact = {
      ...insertContact,
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }
}

export const storage = new MemStorage();
