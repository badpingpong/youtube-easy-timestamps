const SECONDS_IN_MINUTE = 60
const MINUTES_IN_HOUR = 60
const SECONDS_IN_HOUR = MINUTES_IN_HOUR * SECONDS_IN_MINUTE

// 3753.43 みたいなのを 06:02:33 と変換
export const convertSecondsToHHMMSS = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / SECONDS_IN_HOUR)
  const minutes = Math.floor((timeInSeconds - hours * SECONDS_IN_HOUR)/MINUTES_IN_HOUR)
  const seconds = Math.floor((timeInSeconds - hours * SECONDS_IN_HOUR - minutes * SECONDS_IN_MINUTE))
  return `${hours}:` + `${minutes}`.padStart(2, '0') + ":" + `${seconds}`.padStart(2, '0')
}
