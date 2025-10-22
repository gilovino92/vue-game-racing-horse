
<script setup lang="ts">
import { computed } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from 'vuex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const store = useStore();

const currentRoundData = computed(() => store.getters['game/currentRoundData']);
const raceTrack = computed(() => store.state.game.raceTrack);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle class="flex items-center justify-between">
        <span>Race Track</span>
        <Badge v-if="currentRoundData" variant="outline">
          Round {{ currentRoundData.roundNumber }} - {{ currentRoundData.distance }}m
        </Badge>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div v-if="currentRoundData" class="space-y-4">
        <!-- Race Lanes -->
        <div 
          v-for="(track, index) in raceTrack" 
          :key="track.horseId"
          class="relative"
        >
          <!-- Lane Background -->
          <div class="h-12 bg-muted relative mr-10">

            
            <!-- Horse -->
            <div 
              class="absolute top-1 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold transition-all duration-100 ease-linear z-10"
              :style="{ 
                left: `${track.position}%`,
                backgroundColor: currentRoundData.participatingHorses[index]?.color 
              }"
            >
              🐎
            </div>
            
            <!-- Finish Line -->
            <div class="absolute right-0 top-0 h-full w-1 bg-red-500" />
          </div>
          
          <!-- Horse Info -->
          <div class="mt-1 flex items-center justify-between text-sm">
            <span class="font-medium">
              {{ currentRoundData.participatingHorses[index]?.name }}
            </span>
            <Badge variant="secondary" size="sm">
              {{ Math.round(track.position) }}%
            </Badge>
          </div>
        </div>
      </div>
      
      <!-- No Race Active -->
      <div v-else class="text-center py-12 text-muted-foreground">
        <p>Generate a program and start the race to see horses in action!</p>
      </div>
    </CardContent>
  </Card>
</template>