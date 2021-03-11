/* 
    http://www.run2r.com/Technical+linking-bpm-to-running-speed.aspx
    150 bpm is 16.0934 min/mi
    171 bpm is 6.43736 min/mil
*/

const runningFastTime = 6 * 60;
const runningSlowTime = 16 * 60;
const runningFastBpm = 171;
const runningSlowBpm = 150;

export function runningTimeToBpm(min: number, second: number) {
  const time = min * 60 + second;
  const slope =
    (runningFastBpm - runningSlowBpm) / (runningFastTime - runningSlowTime);
  const bpm = slope * (time - runningSlowTime) + runningSlowBpm;
  return Math.round(bpm);
}

export function bpmToRunningTime(bpm: number) {
  const slope =
    (runningFastTime - runningSlowTime) / (runningFastBpm - runningSlowBpm);
  const time = slope * (bpm - runningSlowBpm) + runningSlowTime;
  return time;
}

const intensityToBpmMap: Map<string, number> = new Map([
  ["LOW", 150],
  ["MODERATE_LOW", 155],
  ["MODERATE", 160],
  ["MODERATE_HIGH", 165],
  ["HIGH", 170],
]);

export function intensityToBpm(intensity: string) {
  const ans = intensityToBpmMap.get(intensity);
  if (ans === undefined) {
    return 0;
  }
  return ans;
}

export function bpmToIntensity(bpm: number) {
  let closestIntensity = "LOW";
  let minDiff = Infinity;
  intensityToBpmMap.forEach((intensityBeats, intensity) => {
    const diff = Math.abs(intensityBeats - bpm);
    if (diff < minDiff) {
      closestIntensity = intensity;
      minDiff = diff;
    }
  });

  return closestIntensity;
}
