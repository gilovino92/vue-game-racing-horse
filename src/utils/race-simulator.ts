import { HORSE_MAX_SPEED, INTERVAL_DURATION } from "./constants";

export interface TravelParams {
  horseCondition: number;
  raceDistance: number;
}

export function calculateHorseTravelPercent(params: TravelParams): number {
  const { horseCondition, raceDistance } = params;
  const randFactor = Math.random() * (10 - 1) + 10; // between 0.1 and 1.0
  const baseSpeed = (horseCondition / 100) * HORSE_MAX_SPEED; // in meters per second
  const timeInSeconds = INTERVAL_DURATION / 1000; // convert milliseconds to seconds
  const distanceCovered = baseSpeed * timeInSeconds * randFactor; // in meters
  const travelPercent = (distanceCovered*10 / raceDistance) * 100; // convert to percentage
  return travelPercent;

}
