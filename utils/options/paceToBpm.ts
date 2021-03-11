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
