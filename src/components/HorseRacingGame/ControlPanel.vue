<script setup lang="ts">
import { computed } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from 'vuex';
import { Button } from '@/components/ui/button';

const store = useStore();

const isRacing = computed(() => store.getters['game/isRacing']);
const isCompleted = computed(() => store.getters['game/isCompleted']);
const currentRoundData = computed(() => store.getters["game/currentRoundData"]);

const generateRaceSchedule = (): void => {
  store.dispatch('game/generateRaceSchedule');
};

const toggleRace = (): void => {
  if (isRacing.value === true) {
     store.dispatch('game/pauseRace');
  } else {
     store.dispatch('game/runRound');
  }
};

</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <div class="text-xl font-bold">Horse Racing Game</div>
    </div>
    
    <div class="flex items-center space-x-4">
      <Button 
        @click="generateRaceSchedule"
        variant="outline"
        :disabled="isRacing"
      >
        Generate Program
      </Button>
      
      <Button
        @click="toggleRace"
        :disabled="isCompleted || !currentRoundData"
        :class="'px-6 ' + (isRacing ? 'bg-yellow-700 text-white hover:bg-yellow-600' : 'bg-green-600 text-white hover:bg-green-700')"
      >
        {{ isRacing ? 'Pause' : 'Start' }}
      </Button>
    </div>
  </div>
</template>