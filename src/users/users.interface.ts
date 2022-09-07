import { StreamingService } from "../streamingService/streamingService";
import { Subscription } from "../subscription/subscription";

export interface IUser {
  subscriptions: Subscription[];
  subscribe: (streamingService: StreamingService) => Subscription;
}
