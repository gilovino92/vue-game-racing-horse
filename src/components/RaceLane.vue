<script setup lang="ts">
import { computed, ref, watch } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from "vuex";
import IconHorse from "./ui/icons/IconHorse.vue";
import { Badge } from "@/components/ui/badge";

const emit = defineEmits<{
  (e: "horseFinished", horseId: number): void;
  (e: "horseExhausted", horseId: number): void;
}>();

const props = defineProps<{
  laneNumber: number;
  horseId: number;
  horsePosition: number;
}>();
const store = useStore();
const isFinished = ref(false);

const horse = computed(() => {
  return store.getters["game/getHorseById"](props.horseId);
});

watch(
  () => store.state.game.currentRoundNumber,
  (newVal) => {
    isFinished.value = false;
  }
);

watch(
  () => horse.value.condition,
  (newVal) => {
    if (newVal <= 0) {
      isFinished.value = true;
      emit("horseExhausted", props.horseId);
    }
  }
);

watch(
  () => props.horsePosition,
  (newData) => {
    if (newData >= 95 && !isFinished.value) {
      isFinished.value = true;
      emit("horseFinished", props.horseId);
    }
  },
  { deep: true }
);
</script>

<template>
  <div
    class="w-full"
    v-if="horse"
  >
    <!-- Lane Background -->
    <div class="w-full bg-muted relative">
      <div
        class="h-8 relative"
        :style="{ width: 'calc(100% - 32px)' }"
      >
        <!-- Horse -->
        <div
          class="absolute top-1 h-6 w-6 rounded-full flex items-center justify-center text-white font-bold transition-all duration-800 ease-linear"
          :style="{
            left: `${props.horsePosition}%`,
          }"
        >
          <IconHorse
            class="w-full h-full"
            :style="{
              fill: horse.color,
              transform: 'scaleX(-1)',
            }"
          />
        </div>
        <!-- Finish Line -->
        <div
          class="absolute top-0 h-full w-1 bg-red-500"
          :style="{ left: '100%' }"
        />
      </div>
    </div>

    <!-- Horse Info -->
    <div class="mt-1 flex items-center justify-between text-sm bg-white">
      <span class="font-medium">
        {{ horse.name }}
      </span>
      <Badge
        variant="secondary"
        size="sm"
      >
        {{ Math.round(horse.condition) }}%
      </Badge>
    </div>
  </div>
</template>
