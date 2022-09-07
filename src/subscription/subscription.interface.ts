import { Show } from "../shows/show";
import { StreamingService } from "../streamingService/streamingService";

export interface ISubscription {
  streamingService: StreamingService;
  watch: (showName: string) => void;
  getRecommendationTrending: () => Show | null;
  getRecommendationByGenre: (genre: string) => Show | null;
}
