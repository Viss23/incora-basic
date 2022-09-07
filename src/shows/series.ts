import { parseSecondsToString } from "../helpers/date";
import { Episode } from "./episode";
import { Genre, Show } from "./show";

export class Series extends Show {
  episodes: Episode[];
  constructor(
    name: string,
    genre: Genre,
    releaseDate: Date,
    episodes: Episode[]
  ) {
    super(name, genre, releaseDate);
    this.episodes = episodes;
  }

  getDuration(): string {
    const episodesDurations = this.episodes.map((episode) => episode.duration);
    const seconds = episodesDurations.reduce((a, b) => a + b, 0);

    return parseSecondsToString(seconds);
  }
}
