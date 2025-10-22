<script setup lang="ts">
import { computed, } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from "vuex";
import { Card, CardContent } from "@/components/ui/card";
import RaceLane from "./RaceLane.vue";
import { TOTAL_ROUNDS } from "@/utils/constants";

const store = useStore();
const currentRoundData = computed(() => store.getters["game/currentRoundData"]);

const isIdle = computed(() => store.getters["game/isIdle"]);
const isPreparing = computed(() => store.getters["game/isPreparing"]);
const isRacing = computed(() => store.getters["game/isRacing"]);
const isPaused = computed(() => store.getters["game/isPaused"]);
const isCompleted = computed(() => store.getters["game/isCompleted"]);

const handleFinish = (horseId: number) => {
  store.dispatch("game/handleHorseFinish", horseId);
};
const handleExhaustedHorse = (horseId: number) => {
  store.dispatch("game/handleExhaustedHorse", horseId);
};

const isShowingTrack = computed(() => {
  return (
    currentRoundData.value &&
    (isRacing.value || isPaused.value || isCompleted.value)
  );
});
</script>

<template>
  <Card>
    <CardContent>
      <div v-if="isIdle">
        <div class="text-center py-6 font-bold">
          CLICK
          <div
            class="inline-flex bg-green-600 text-white px-6 whitespace-nowrap rounded-md text-sm font-medium shadow-xs h-9 py-2"
          >
            {{ "Start" }}
          </div>
          TO BEGIN THE RACE!
        </div>
      </div>
      <div
        v-else-if="isShowingTrack"
        class="space-y-4 w-full"
      >
        <div class="mb-4 text-lg font-bold text-center">
          <span
            class="text-gray-800"
            v-if="!isCompleted"
            >Round {{ currentRoundData.roundNumber }} -
            {{ currentRoundData.distance }}m</span
          >
          <span
            class="text-red-600"
            v-else
          >
            {{ "Race Completed" }}
          </span>
        </div>
        <!-- Race Lanes -->
        <RaceLane
          v-for="lane in currentRoundData.lanes"
          :key="lane.laneNumber"
          :horseId="lane.horseId"
          :currentRoundData="currentRoundData"
          :laneNumber="lane.laneNumber"
          :horsePosition="lane.horsePosition"
          @horse-finished="handleFinish($event)"
          @horse-exhausted="handleExhaustedHorse($event)"
        ></RaceLane>
      </div>

      <div
        v-else-if="currentRoundData && isPreparing"
        class="text-center py-12 text-xl font-bold mb-4"
      >
        <span class="text-gray-800"> NEXT: </span>
        <span class="text-red-600">
          <span v-if="currentRoundData.roundNumber === TOTAL_ROUNDS">FINAL </span>ROUND {{ currentRoundData.roundNumber }} - {{ currentRoundData.distance }} m
        </span>
      </div>

      <!-- No Race Active -->
      <div
        v-else
        class="text-center py-12 text-muted-foreground"
      >
        <p>Generate a program and start the race to see horses in action!</p>
      </div>
    </CardContent>
  </Card>
</template>
