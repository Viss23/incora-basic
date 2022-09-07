import { Subscription } from "../subscription/subscription";
import { IUser } from "./users.interface";
import { StreamingService } from "../streamingService/streamingService";

export class User implements IUser {
  subscriptions: Subscription[];
  constructor() {
    this.subscriptions = [];
  }
  subscribe(streamingService: StreamingService): Subscription {
    const sub = new Subscription(streamingService);
    if (this.subscriptions.includes(sub)) {
      throw Error("already subscribed");
    }
    this.subscriptions.push(sub);
    return sub;
  }
}
