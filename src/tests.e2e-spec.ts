import { expect, jest, test } from "@jest/globals";
import { Episode } from "./shows/episode";
import { Movie } from "./shows/movie";
import { Series } from "./shows/series";
import { Genre, Show } from "./shows/show";
import { StreamingService } from "./streamingService/streamingService";
import { Subscription } from "./subscription/subscription";
import { User } from "./users/users";

describe("TESTS: ", () => {
  let netflix: StreamingService;
  let subscription: Subscription;
  let user: User;
  const titanic = new Movie(
    "Titanic",
    "drama",
    new Date("November 1, 1997"),
    "03:14:02"
  );
  const drive = new Movie(
    "Drive",
    "action",
    new Date("December 21, 2018"),
    "02:15:05"
  );
  const newFilm = new Movie(
    "new film",
    "action",
    new Date("December 21, 2022"),
    "02:15:05"
  );
  const breakingBadS1S1 = new Episode(
    "BB S1E1",
    "drama",
    new Date("January 20,2008"),
    "00:52:02"
  );
  const breakingBadS1S2 = new Episode(
    "BB S1E2",
    "drama",
    new Date("January 27,2008"),
    "00:53:03"
  );
  const breakingBadSeason1 = new Series(
    "Breaking Bad Season 1",
    "drama",
    new Date("January 20,2008"),
    [breakingBadS1S1, breakingBadS1S2]
  );
  it("Create streamingService Netflix", () => {
    netflix = new StreamingService("Netflix", [
      breakingBadSeason1,
      drive,
      titanic,
      newFilm,
    ]);
    expect(netflix.name).toBe("Netflix");
    expect(netflix.shows).toBeInstanceOf(Array);
  });

  it("Netflix getMostViewedShowsOfGenre(drama)  ", () => {
    const mostViewedShows = netflix.getMostViewedShowsOfGenre("drama");
    expect(Array.isArray(mostViewedShows)).toBe(true);
    expect(mostViewedShows.length).toBeLessThanOrEqual(10);
  });

  it("Netflix getMostViewedShowsOfYear (1997)", () => {
    const mostViewedShows = netflix.getMostViewedShowsOfYear(
      new Date(1997, 1, 1).getFullYear()
    );
    expect(Array.isArray(mostViewedShows)).toEqual(true);
    expect(mostViewedShows.length).toBeLessThanOrEqual(10);
    expect(mostViewedShows.length).toBeGreaterThanOrEqual(0);
  });
  it("addShow ", () => {
    const int = new Movie(
      "Interstellar",
      "drama",
      new Date("October 26, 2014 "),
      "3:09:15"
    );
    netflix.addShow(int);
    expect(netflix.viewsByShowNames.get(int.name)).toBe(0);
  });
  it("create user and subscribe Netflix", () => {
    user = new User();
    subscription = user.subscribe(netflix);
    expect(user.subscriptions.length).toBe(1);
  });
  it("sub again (ERROR)", () => {
    try {
      user.subscribe(netflix);
      expect(true).toBe(false);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBeDefined;
      }
    }
  });
  it("watch interstellar ", () => {
    expect(netflix.viewsByShowNames.get("Interstellar")).toBe(0);
    subscription.watch("Interstellar");
    expect(netflix.viewsByShowNames.get("Interstellar")).toBe(1);
  });
  it("watch invalidShow (ERROR) ", () => {
    try {
      subscription.watch("invalidShow");
      expect(true).toBe(false);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBeDefined;
      }
    }
  });
  it("getRecommendationByGenre(drama)", () => {
    expect(subscription.getRecommendationByGenre("drama")).toBeInstanceOf(Show);
  });
  it("getRecommendationTrending()", () => {
    expect(subscription.getRecommendationTrending()).toBeInstanceOf(Show);
  });
  it("getDuration of Series", () => {
    const breakingBad = netflix.shows.find(
      (v) => v.name === "Breaking Bad Season 1"
    );
    if (breakingBad) {
      expect(breakingBad.getDuration()).toBe("01:45:05"); //sum or all episodes of series
    }
  });
  it("getDuration of Episode", () => {
    const breakingBad = netflix.shows.find(
      (v) => v.name === "Breaking Bad Season 1"
    ) as Series;
    if (breakingBad) {
      expect(breakingBad.episodes[0].getDuration()).toBe("00:52:02");
    }
  });
  it("getDuration of Movie", () => {
    const film = subscription.getRecommendationTrending();
    expect(film?.getDuration()).toBe("02:15:05");
  });
});
