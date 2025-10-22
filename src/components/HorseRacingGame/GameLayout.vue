<script setup lang="ts">
import ControlPanel from "@/components/HorseRacingGame/ControlPanel.vue";
import { computed, defineAsyncComponent } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from "vuex";

const HorseListPanel = defineAsyncComponent(() => import('./HorseListPanel.vue'));
const RaceTrack = defineAsyncComponent(() => import('./RaceTrack.vue'));
const ProgramResultsPanel = defineAsyncComponent(() => import('./ProgramResultsPanel.vue'));
const store = useStore();
const isIdle = computed(() => store.getters['game/isIdle']);

</script>

<template>
  <div class="min-h-screen min-w-screen bg-background max-w-screen">
    <div class="mx-auto">
      <!-- Control Panel -->
      <div class="p-2 bg-muted z-10 top-0 w-full sticky">
        <ControlPanel />
      </div>

      <!-- Main Game Area -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-2 mt-2">
        <!-- Horse List Panel -->
        <div class="lg:col-span-1">
          <HorseListPanel v-if="isIdle" />
        </div>

        <!-- Race Track -->
        <div class="lg:col-span-1">
          <RaceTrack v-if="isIdle"/>
        </div>

        <!-- Program & Results -->
        <div class="lg:col-span-1">
          <ProgramResultsPanel v-if="isIdle"/>
        </div>
      </div>
    </div>
  </div>
</template>
