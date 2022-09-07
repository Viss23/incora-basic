const DAY = 86400;
const HOUR = 3600;
const Minute = 60;

export const parseDurationToSeconds = (str: string) => {
  const [hours, minutes, seconds] = str.split(":");
  const secondsResult =
    parseInt(hours, 10) * HOUR +
    parseInt(minutes, 10) * Minute +
    parseInt(seconds, 10);
  return secondsResult;
};

export const parseSecondsToString = (secs: number) => {
  const days = Math.floor(secs / DAY);
  const hours = Math.floor((secs - days * DAY) / HOUR);
  const minutes = Math.floor((secs - days * DAY - hours * HOUR) / Minute);
  const seconds = secs - days * DAY - hours * HOUR - minutes * Minute;
  return days
    ? `${("0" + days).slice(-2)}:${("0" + hours).slice(-2)}:${(
        "0" + minutes
      ).slice(-2)}:${("0" + seconds).slice(-2)}`
    : `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}:${(
        "0" + seconds
      ).slice(-2)}`;
};

export const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
