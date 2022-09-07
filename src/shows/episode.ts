import { parseDurationToSeconds, parseSecondsToString } from "../helpers/date";
import { Genre, Show } from "./show";

export class Episode extends Show {
  duration: number;
  constructor(name: string, genre: Genre, releaseDate: Date, duration: string) {
    super(name, genre, releaseDate);
    this.duration = parseDurationToSeconds(duration);
  }

  getDuration(): string {
    return parseSecondsToString(this.duration);
  }
}
