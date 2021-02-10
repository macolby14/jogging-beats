export function durationFormat(milliSec: number): string {
  const durMin = Math.floor(milliSec / 1000 / 60);
  const durSec = Math.floor((milliSec / 1000) % 60)
    .toString()
    .padStart(2, "0");

  return `${durMin} min ${durSec} sec`;
}
