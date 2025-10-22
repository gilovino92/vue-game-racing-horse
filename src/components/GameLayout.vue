<script setup lang="ts">
import ControlPanel from "@/components/ControlPanel.vue";
import HorseListPanel from "@/components/HorseListPanel.vue";
import RaceTrack from "@/components/RaceTrack.vue";
import ProgramResultsPanel from "@/components/ProgramResultsPanel.vue";
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
          <HorseListPanel />
        </div>

        <!-- Race Track -->
        <div class="lg:col-span-1">
          <RaceTrack />
        </div>

        <!-- Program & Results -->
        <div class="lg:col-span-1">
          <ProgramResultsPanel />
        </div>
      </div>
    </div>
  </div>
</template>
