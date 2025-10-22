import { describe, expect, it } from 'vitest'
import { generateHorses } from '@/utils/horse-generator'
import { TOTAL_HORSES } from '@/utils/constants'

describe('generateHorses', () => {
  it('creates the expected number of horses each with 100% condition', () => {
    const horses = generateHorses()

    expect(horses).toHaveLength(TOTAL_HORSES)
    expect(new Set(horses.map((horse) => horse.id)).size).toBe(TOTAL_HORSES)
    expect(horses.every((horse) => horse.condition === 100)).toBe(true)
  })

  it('assigns non-empty names and colors to each horse', () => {
    const horses = generateHorses()

    horses.forEach((horse) => {
      expect(typeof horse.name).toBe('string')
      expect(horse.name.length).toBeGreaterThan(0)
      expect(typeof horse.color).toBe('string')
      expect(horse.color.length).toBeGreaterThan(0)
    })
  })
})
