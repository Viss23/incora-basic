import { getRandomInt } from "../helpers/date";
import { Show } from "../shows/show";
import { StreamingService } from "../streamingService/streamingService";
import { ISubscription } from "./subscription.interface";

export class Subscription implements ISubscription {
  streamingService: StreamingService;
  constructor(streamingService: StreamingService) {
    this.streamingService = streamingService;
  }
  getRecommendationByGenre(genre: string): Show | null {
    const shows = this.streamingService.getMostViewedShowsOfGenre(genre);
    const random = getRandomInt(0, shows.length - 1);
    return shows[random];
  }
  watch(showName: string) {
    if (this.streamingService.viewsByShowNames.has(showName)) {
      const views =
        (this.streamingService.viewsByShowNames.get(showName) as number) + 1;
      this.streamingService.viewsByShowNames.set(showName, views);
    } else {
      throw Error("Such show does not exist");
    }
  }
  getRecommendationTrending(): Show | null {
    const shows = this.streamingService.getMostViewedShowsOfYear(
      new Date().getFullYear()
    );
    const random = getRandomInt(0, shows.length - 1);
    return shows[random];
  }
}
