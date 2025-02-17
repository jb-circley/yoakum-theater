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
  updateShowtime(id: number, showtime: Partial<InsertShowtime>): Promise<Showtime>;
  deleteShowtime(id: number): Promise<void>;
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
        posterUrl: "https://static.wixstatic.com/media/93182a_d180ff2ff4af44f9b25fdbf4ffaaabfb~mv2.jpeg",
        trailerUrl: "https://www.youtube.com/watch?v=-5xzjw_0d_0",
        rating: "PG-13",
        duration: 120,
      },
      {
        title: "Captain America",
        description: "The latest Marvel adventure",
        posterUrl: "https://static.wixstatic.com/media/93182a_8036f7446be24523a39327bce959246c~mv2.jpeg",
        trailerUrl: "https://youtu.be/O_A8HdCDaWM",
        rating: "PG-13",
        duration: 150,
      },
      {
        title: "Minecraft: The Movie",
        description: "An epic adventure in the world of blocks",
        posterUrl: "https://static.wixstatic.com/media/93182a_8a1c12156041414299fa0e1e501c98f8~mv2.jpeg",
        trailerUrl: "https://www.youtube.com/watch?v=NxXrE1UkgQY",
        rating: "PG",
        duration: 110,
        isComingSoon: true,
      },
      {
        title: "Snow White",
        description: "A magical tale retold",
        posterUrl: "https://static.wixstatic.com/media/93182a_bad4ac5b108a41ada5e3e78ae3300671~mv2.jpeg",
        trailerUrl: "https://www.youtube.com/watch?v=GhPLUnWEdCM",
        rating: "PG",
        duration: 115,
        isComingSoon: true,
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

  async updateShowtime(id: number, update: Partial<InsertShowtime>): Promise<Showtime> {
    const existing = this.showtimes.get(id);
    if (!existing) {
      throw new Error('Showtime not found');
    }
    const updated = { ...existing, ...update };
    this.showtimes.set(id, updated);
    return updated;
  }

  async deleteShowtime(id: number): Promise<void> {
    if (!this.showtimes.has(id)) {
      throw new Error('Showtime not found');
    }
    this.showtimes.delete(id);
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