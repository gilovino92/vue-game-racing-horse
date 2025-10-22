<script setup lang="ts">
import { computed, ref, watch } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from 'vuex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const store = useStore();

const programAccordionValue = ref('round-1');
const updateProgramAccordionValue = (value: string) => {
  programAccordionValue.value = value;
};

const resultsAccordionValue = ref('results-1');
const updateResultsAccordionValue = (value: string) => {
  resultsAccordionValue.value = value;
};  

const mappedRounds = computed(() => {
  const rounds = store.state.game.raceSchedule?.rounds || [];
  return rounds.map((round: any) => {
    return {
      roundNumber: round.roundNumber,
      distance: round.distance,
      lanes: round.lanes.map((lane: any) => {
        const horse = store.getters['game/getHorseById'](lane.horseId);
        return {
          ...lane,
          horse,
        };
      }),
    };
  });
});

const mappedResults = computed(() => {
  const results = store.state.game.raceResults || [];
  return results.map((result: any) => {
    const rankedHourses = [...result.rankings, ...result.exhaustedHorses.reverse()].map((record: any) => {
      const horse = store.getters['game/getHorseById'](record.horseId);
      return {
        ...record,
        horse,
      };  
    });
    return {
      roundNumber: result.roundNumber,
      distance: result.distance,
      rankings: rankedHourses,
    };
  });
});

watch(
  () => store.state.game.currentRoundNumber,
  (newRoundNumber) => {
    updateProgramAccordionValue(`round-${newRoundNumber}`);
    updateResultsAccordionValue(`results-${newRoundNumber}`);
  },
  { deep: true },
);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Race Information</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs default-value="program" class="w-full">
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="program">Race Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>
        
        <!-- Program Tab -->
        <TabsContent value="program" class="space-y-4">
          <Accordion type="single" collapsible class="w-full" :model-value="programAccordionValue" @update:model-value="updateProgramAccordionValue($event as string)">
            <AccordionItem 
              v-for="round in mappedRounds"
              :key="round.roundNumber"
              :value="`round-${round.roundNumber}`"
            >
              <AccordionTrigger>
                <div class="flex items-center justify-between w-full mr-4">
                  <span>Round {{ round.roundNumber }}</span>
                  <Badge variant="outline">{{ round.distance }}m</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lane</TableHead>
                      <TableHead>Horse</TableHead>
                      <TableHead>Condition</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow 
                      v-for="(lane, index) in round.lanes"
                      :key="lane.laneNumber"
                    >
                      <TableCell>{{ index + 1 }}</TableCell>
                      <TableCell class="flex items-center space-x-2">
                        <div 
                          class="w-3 h-3 rounded-full"
                          :style="{ backgroundColor: lane.horse?.color }"
                        />
                        <span>{{ lane.horse?.name }}</span>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          :variant="lane.horse?.condition >= 80 ? 'default' : 
                                   lane.horse?.condition >= 60 ? 'secondary' : 'destructive'"
                          size="sm"
                        >
                          {{ lane.horse?.condition }}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
        
        <!-- Results Tab -->
        <TabsContent value="results" class="space-y-4">
          <Accordion type="single" collapsible class="w-full" :model-value="resultsAccordionValue" @update:model-value="updateResultsAccordionValue($event  as string)">
            <AccordionItem 
              v-for="result in mappedResults" 
              :key="result.roundNumber"
              :value="`results-${result.roundNumber}`"
              
            >
              <AccordionTrigger>
                <div class="flex items-center justify-between w-full mr-4">
                  <span>Round {{ result.roundNumber }} Results</span>
                  <Badge variant="default">{{ result.distance }}m</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Position</TableHead>
                      <TableHead>Horse</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow 
                      v-for="ranking in result.rankings" 
                      :key="ranking.horse.id"
                    >
                      <TableCell>
                        <Badge 
                          :variant="ranking.position === 1 ? 'default' : 
                                   ranking.position <= 3 ? 'secondary' : 'outline'"
                        >
                          {{ ranking.rank }}
                        </Badge>
                      </TableCell>
                      <TableCell class="flex items-center space-x-2">
                        <div 
                          class="w-3 h-3 rounded-full"
                          :style="{ backgroundColor: ranking.horse.color }"
                        />
                        <span>{{ ranking.horse.name }}</span>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </TabsContent>
      </Tabs>
    </CardContent>
  </Card>
</template>