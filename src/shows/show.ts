import { Episode } from "./episode";

export type Genre = "action" | "comedy" | "drama" | "fantasy";

export abstract class Show {
  name: string;
  genre: Genre;
  releaseDate: Date;
  episodes?: Episode[];
  constructor(name: string, genre: Genre, releaseDate: Date) {
    this.name = name;
    this.genre = genre;
    this.releaseDate = releaseDate;
  }

  abstract getDuration(name?: string): string;
}
