import { beforeEach, describe, expect, it } from 'vitest'
import { createStore } from 'vuex'
import { gameModule } from '@/stores/modules/game'
import { GameStatuses } from '@/types/game'
import { HORSES_PER_ROUND, TOTAL_HORSES, TOTAL_ROUNDS } from '@/utils/constants'

const createGameStore = () =>
  createStore({
    modules: {
      game: gameModule,
    },
  })

describe('game store module', () => {
  let store: ReturnType<typeof createGameStore>

  beforeEach(() => {
    store = createGameStore()
  })

  it('generates a full race schedule with horses and results', async () => {
    await store.dispatch('game/generateRaceSchedule')

    const state = store.state as { game: typeof gameModule.state extends () => infer S ? S : never }
    const gameState = state.game

    expect(gameState.horses).toHaveLength(TOTAL_HORSES)
    expect(gameState.raceSchedule?.rounds).toHaveLength(TOTAL_ROUNDS)
    expect(gameState.raceResults).toHaveLength(TOTAL_ROUNDS)
    expect(gameState.gameStatus).toBe(GameStatuses.IDLE)
    expect(gameState.currentRoundNumber).toBe(1)

    gameState.raceSchedule?.rounds.forEach((round) => {
      expect(round.lanes).toHaveLength(HORSES_PER_ROUND)
      round.lanes.forEach((lane, index) => {
        expect(lane.laneNumber).toBe(index + 1)
        expect(lane.horsePosition).toBe(0)
        expect(lane.ranking).toBe(0)
      })
    })
  })

  it('records finishing horses with incremental rankings', async () => {
    await store.dispatch('game/generateRaceSchedule')
    const state = store.state as { game: ReturnType<typeof gameModule.state> }
    const gameState = state.game
    const firstRound = gameState.raceSchedule?.rounds[0]
    if (!firstRound) {
      throw new Error('First round was not generated')
    }

    const firstHorseId = firstRound.lanes[0]?.horseId
    const secondHorseId = firstRound.lanes[1]?.horseId
    if (firstHorseId === undefined || secondHorseId === undefined) {
      throw new Error('Round lanes were not generated')
    }

    await store.dispatch('game/handleHorseFinish', firstHorseId)
    await store.dispatch('game/handleHorseFinish', secondHorseId)

    const result = gameState.raceResults[0]!
    expect(result.rankings).toEqual([
      { horseId: firstHorseId, rank: 1 },
      { horseId: secondHorseId, rank: 2 },
    ])
  })

  it('tracks exhausted horses separately from rankings', async () => {
    await store.dispatch('game/generateRaceSchedule')
    const state = store.state as { game: ReturnType<typeof gameModule.state> }
    const gameState = state.game
    const horseId = gameState.raceSchedule?.rounds[0]?.lanes[0]?.horseId
    if (horseId === undefined) {
      throw new Error('Horse ID unavailable for exhausted test')
    }

    await store.dispatch('game/handleExhaustedHorse', horseId)

    const result = gameState.raceResults[0]!
    expect(result.exhaustedHorses).toEqual([{ horseId }])
    expect(result.rankings).toHaveLength(0)
  })
})
