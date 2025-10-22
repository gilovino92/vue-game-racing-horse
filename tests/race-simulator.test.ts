import { afterEach, describe, expect, it, vi } from 'vitest'
import { calculateHorseTravelPercent } from '@/utils/race-simulator'

const RACE_DISTANCE = 200

describe('calculateHorseTravelPercent', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('calculates travel percentage based on horse condition and constants', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    const result = calculateHorseTravelPercent({
      horseCondition: 80,
      raceDistance: RACE_DISTANCE,
    })

    expect(result).toBeCloseTo(56.96, 2)
  })

  it('returns 0 when horse condition is 0 regardless of randomness', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.75)

    const result = calculateHorseTravelPercent({
      horseCondition: 0,
      raceDistance: RACE_DISTANCE,
    })

    expect(result).toBe(0)
  })
})
