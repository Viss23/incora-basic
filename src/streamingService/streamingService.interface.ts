import { Show } from "../shows/show";

export interface IStreamingService {
  name: string;
  shows: Show[];
  viewsByShowNames: Map<string, number>;
  getMostViewedShowsOfYear: (year: number) => Show[] | [];
  getMostViewedShowsOfGenre: (genre: string) => Show[] | [];
  addShow: (show: Show) => void;
}
