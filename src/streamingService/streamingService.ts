import { Show } from "../shows/show";
import { IStreamingService } from "./streamingService.interface";

type showsWithViewsType = [Show, number];

export class StreamingService implements IStreamingService {
  name: string;
  shows: Show[];
  viewsByShowNames: Map<string, number>;
  constructor(name: string, shows: Show[]) {
    this.name = name;
    const names = shows.map((v) => v.name);
    const map = new Map();
    names.forEach((n, index) => {
      if (map.has(n)) {
        shows.splice(index, 1); // remove from array during initiation if we already have show with same name
      } else {
        map.set(n, 0);
      }
    });
    this.shows = shows;
    this.viewsByShowNames = map;
  }

  getMostViewedShowsOfYear(yearDate: number): Show[] | [] {
    const filterByYear = this.shows.filter(
      (show) => show.releaseDate.getFullYear() === yearDate
    );
    const showsWithViews: showsWithViewsType[] = filterByYear.map((show) => [
      show,
      this.viewsByShowNames.get(show.name) as number,
    ]);
    const top10ShowsOfYear = showsWithViews
      .sort((a, b) => (a[1] as number) - (b[1] as number))
      .map((v) => v[0])
      .slice(0, 10);
    return top10ShowsOfYear;
  }

  getMostViewedShowsOfGenre(genre: string): Show[] | [] {
    const filterByYear = this.shows.filter((show) => show.genre === genre);
    const showsWithViews: showsWithViewsType[] = filterByYear.map((show) => [
      show,
      this.viewsByShowNames.get(show.name) as number,
    ]);
    const top10ShowsOfGenre = showsWithViews
      .sort((a, b) => (a[1] as number) - (b[1] as number))
      .map((v) => v[0])
      .slice(0, 10);
    return top10ShowsOfGenre;
  }

  addShow(show: Show) {
    if (this.viewsByShowNames.has(show.name)) {
      throw Error("Show with such name already exist");
    } else {
      this.shows.push(show);
      this.viewsByShowNames.set(show.name, 0);
    }
  }
}
