import { parseDurationToSeconds, parseSecondsToString } from "../helpers/date";
import { Show, Genre } from "./show";

export class Movie extends Show {
  private duration: number;
  constructor(name: string, genre: Genre, releaseDate: Date, duration: string) {
    super(name, genre, releaseDate);
    this.duration = parseDurationToSeconds(duration);
  }

  getDuration(): string {
    return parseSecondsToString(this.duration);
  }
}
