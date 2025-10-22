// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type {
  GameModuleState,
  GameStatus,
  Horse,
  Lane,
  RaceResult,
  RaceSchedule,
  RootState,
  Round,
} from "@/types/game";
import { GameStatuses } from "@/types/game";
import { generateHorses } from "@/utils/horse-generator";
import {
  RACE_DISTANCES,
  HORSES_PER_ROUND,
  INTERVAL_DURATION,
  TOTAL_ROUNDS,
} from "@/utils/constants";
import type { ActionContext } from "vuex/types/index.d.ts";
import { calculateHorseTravelPercent } from "@/utils/race-simulator";

type GameActionContext = ActionContext<GameModuleState, RootState>;

export const gameModule = {
  namespaced: true,

  state: (): GameModuleState => ({
    horses: [],
    gameStatus: GameStatuses.NONE,
    raceSchedule: null,
    currentRoundNumber: 1,
    raceResults: [],
    gameInterval: null,
  }),

  getters: {
    currentRoundData: (state: GameModuleState) => {
      return state.raceSchedule?.rounds[state.currentRoundNumber - 1] || null;
    },

    isIdle: (state: GameModuleState) => {
      return state.gameStatus === GameStatuses.IDLE;
    },

    isPreparing: (state: GameModuleState) => {
      return state.gameStatus === GameStatuses.PREPARING;
    },

    isRacing: (state: GameModuleState) => {
      return state.gameStatus === GameStatuses.RACING;
    },

    isPaused: (state: GameModuleState) => {
      return state.gameStatus === GameStatuses.PAUSED;
    },

    isCompleted: (state: GameModuleState) => {
      return state.gameStatus === GameStatuses.COMPLETED;
    },

    getHorseById:
      (state: GameModuleState) =>
      (horseId: number): Horse | undefined => {
        return state.horses.find((horse) => horse.id === horseId);
      },

    getGameInterval: (state: GameModuleState) => {
      return state.gameInterval;
    },
  },

  mutations: {
    SET_HORSES(state: GameModuleState, horses: Horse[]): void {
      state.horses = horses;
    },

    SET_GAME_STATUS(state: GameModuleState, gameStatus: GameStatus): void {
      state.gameStatus = gameStatus;
    },

    SET_RACE_SCHEDULE(
      state: GameModuleState,
      raceSchedule: RaceSchedule
    ): void {
      state.raceSchedule = raceSchedule;
    },

    SET_CURRENT_ROUND_NUMBER(
      state: GameModuleState,
      roundNumber: number
    ): void {
      state.currentRoundNumber = roundNumber;
    },

    SET_GAME_INTERVAL(state: GameModuleState, intervalId: number | null): void {
      state.gameInterval = intervalId;
    },

    SET_RACE_RESULTS(state: GameModuleState, raceResults: RaceResult[]): void {
      state.raceResults = raceResults;
    },

    UPDATE_HORSE_CONDITION(state: GameModuleState, horse: Horse): void {
      const index = state.horses.findIndex((h) => h.id === horse.id);
      if (index !== -1) {
        state.horses[index] = horse;
      }
    },

    UPDATE_CURRENT_ROUND(state: GameModuleState, round: Round): void {
      if (!state.raceSchedule) return;
      const roundIndex = state.currentRoundNumber - 1;
      if (state.raceSchedule.rounds[roundIndex]) {
        state.raceSchedule.rounds[roundIndex] = {
          ...state.raceSchedule.rounds[roundIndex],
          ...round,
        };
      }
    },

    UPDATE_RACE_RESULT(state: GameModuleState, raceResult: RaceResult): void {
      const index = state.raceResults.findIndex(
        (result) => result.roundNumber === raceResult.roundNumber
      );
      if (index !== -1) {
        state.raceResults[index] = raceResult;
      }
    },
  },
  actions: {
    generateRaceSchedule({ commit }: GameActionContext): void {
      // Generate 20 horses
      const horses = generateHorses();
      commit("SET_HORSES", horses);

      // Create 6 rounds with different distances and horse selections
      const rounds: Round[] = [];

      for (
        let roundNumber = 1;
        roundNumber < RACE_DISTANCES.length + 1;
        roundNumber++
      ) {
        const distance = RACE_DISTANCES[roundNumber - 1];
        if (!distance) continue;

        // Randomly select 10 horses for this round
        const shuffledHorses = [...horses].sort(() => Math.random() - 0.5);
        const lanes = shuffledHorses
          .slice(0, HORSES_PER_ROUND)
          .map((horse, index) => ({
            laneNumber: index + 1,
            horseId: horse.id,
            resultTime: 0,
            ranking: 0,
            horsePosition: 0,
          }));

        rounds.push({
          roundNumber,
          distance,
          lanes,
        });
      }
      commit("SET_GAME_STATUS", GameStatuses.IDLE);
      commit("SET_RACE_SCHEDULE", { rounds });
      commit(
        "SET_RACE_RESULTS",
        rounds.map((r) => ({
          roundNumber: r.roundNumber,
          distance: r.distance,
          rankings: [],
          exhaustedHorses: [],
        }))
      );
      commit("SET_CURRENT_ROUND_NUMBER", 1);
    },

    startRace({ commit }: GameActionContext): void {
      commit("SET_GAME_STATUS", GameStatuses.RACING);
    },

    pauseRace({ commit, state }: GameActionContext): void {
      commit("SET_GAME_STATUS", GameStatuses.PAUSED);
      if (state.gameInterval !== null) {
        clearInterval(state.gameInterval);
        commit("SET_GAME_INTERVAL", null);
      }
    },

    runRound({ commit, state, dispatch }: GameActionContext): void {
      if (state.gameInterval !== null) {
        clearInterval(state.gameInterval);
        commit("SET_GAME_INTERVAL", null);
      }
      commit("SET_GAME_STATUS", GameStatuses.RACING);

      const interval = setInterval(() => {
        const newLanes: Lane[] = [];
        const currentRoundData =
          state.raceSchedule?.rounds[state.currentRoundNumber - 1] || null;
        const currentRoundResult = state.raceResults?.find(
          (result) => result.roundNumber === state.currentRoundNumber
        );

        if (!currentRoundData || !currentRoundResult) return;
        const isAllFinished =
          currentRoundResult?.rankings.length +
            currentRoundResult?.exhaustedHorses?.length ===
          HORSES_PER_ROUND;

        if (isAllFinished) {
          clearInterval(interval);
          commit("SET_GAME_INTERVAL", null);

          if (state.currentRoundNumber < TOTAL_ROUNDS) {
            commit("SET_CURRENT_ROUND_NUMBER", state.currentRoundNumber + 1);
            commit("SET_GAME_STATUS", GameStatuses.PREPARING);
            const timmeout = setTimeout(() => {
              dispatch("runRound");
              clearTimeout(timmeout);
            }, 1000);
          } else {
            commit("SET_GAME_STATUS", GameStatuses.COMPLETED);
          }
          return;
        }

        const raceDistance = currentRoundData.distance;

        currentRoundData.lanes.forEach((lane) => {
          const randFactor = Math.random() * (1 - 0.1) + 0.1; // between 0.1 and 1.0
          const horse = state.horses.find((h) => h.id === lane.horseId);
          if (!horse || lane.horsePosition >= 100) {
            newLanes.push({ ...lane });
            return;
          }
          const horseCondition = Math.floor(horse.condition - randFactor * 1);

          const horseTravel = calculateHorseTravelPercent({
            horseCondition,
            raceDistance: raceDistance,
          });

          // Update horse condition in main state
          const updatedHorse: Horse = {
            ...horse,
            condition: horseCondition < 0 ? 0 : horseCondition,
          };
          commit("UPDATE_HORSE_CONDITION", updatedHorse);
          const horsePosition = horseTravel + lane.horsePosition;
          newLanes.push({
            ...lane,
            horsePosition: horsePosition >= 100 ? 100 : horsePosition,
          });
        });

        // Update lanes with new positions
        commit("UPDATE_CURRENT_ROUND", {
          ...currentRoundData,
          lanes: newLanes,
        });
      }, INTERVAL_DURATION);

      commit("SET_GAME_INTERVAL", interval);
    },

    handleHorseFinish(
      { state, commit }: GameActionContext,
      horseId: number
    ): void {
      const currentRoundResult = state.raceResults?.find(
        (result) => result.roundNumber === state.currentRoundNumber
      );
      if (!currentRoundResult) return;

      const nextRank = currentRoundResult.rankings.length + 1;
      // Update the round with new lane rankings
      commit("UPDATE_RACE_RESULT", {
        ...currentRoundResult,
        rankings: [...currentRoundResult.rankings, { horseId, rank: nextRank }],
      });
    },

    handleExhaustedHorse(
      { state, commit }: GameActionContext,
      horseId: number
    ): void {
      const currentRoundResult = state.raceResults?.find(
        (result) => result.roundNumber === state.currentRoundNumber
      );
      if (!currentRoundResult) return;

      // Update the round with new exhausted horses
      commit("UPDATE_RACE_RESULT", {
        ...currentRoundResult,
        exhaustedHorses: [
          ...(currentRoundResult.exhaustedHorses || []),
          { horseId },
        ],
      });
    },
  },
};
