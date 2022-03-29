import { convertSecondsToHHMMSS } from "./timeConverters"

describe('convertSecondsToHHMMSS', () => {
  test('36000.3は10:00:00になる',() => {
    expect(convertSecondsToHHMMSS(36000.3)).toBe('10:00:00')
  })
})