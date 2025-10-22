<script setup lang="ts">
import { computed } from "vue";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from "vuex";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const store = useStore();

const rounds = computed(() => store.state.game.rounds);
const results = computed(() => store.state.game.results);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Race Information</CardTitle>
    </CardHeader>
    <CardContent>
      <Tabs
        default-value="program"
        class="w-full"
      >
        <TabsList class="grid w-full grid-cols-2">
          <TabsTrigger value="program">Program</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <!-- Program Tab -->
        <TabsContent
          value="program"
          class="space-y-4"
        >
          <Accordion
            type="single"
            collapsible
            class="w-full"
          >
            <AccordionItem
              v-for="round in rounds"
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
                      v-for="(horse, index) in round.participatingHorses"
                      :key="horse.id"
                    >
                      <TableCell>{{ index + 1 }}</TableCell>
                      <TableCell class="flex items-center space-x-2">
                        <div
                          class="w-3 h-3 rounded-full"
                          :style="{ backgroundColor: horse.color }"
                        />
                        <span>{{ horse.name }}</span>
                      </TableCell>
                      <TableCell>
                        <Badge
                          :variant="
                            horse.condition >= 80
                              ? 'default'
                              : horse.condition >= 60
                              ? 'secondary'
                              : 'destructive'
                          "
                          size="sm"
                        >
                          {{ horse.condition }}
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
        <TabsContent
          value="results"
          class="space-y-4"
        >
          <Accordion
            type="single"
            collapsible
            class="w-full"
          >
            <AccordionItem
              v-for="result in results"
              :key="result.roundNumber"
              :value="`result-${result.roundNumber}`"
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
                      <TableHead>Time</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="ranking in result.rankings"
                      :key="ranking.horse.id"
                    >
                      <TableCell>
                        <Badge
                          :variant="
                            ranking.position === 1
                              ? 'default'
                              : ranking.position <= 3
                              ? 'secondary'
                              : 'outline'
                          "
                        >
                          {{ ranking.position }}
                        </Badge>
                      </TableCell>
                      <TableCell class="flex items-center space-x-2">
                        <div
                          class="w-3 h-3 rounded-full"
                          :style="{ backgroundColor: ranking.horse.color }"
                        />
                        <span>{{ ranking.horse.name }}</span>
                      </TableCell>
                      <TableCell class="font-mono">
                        {{ ranking.finishTime.toFixed(2) }}s
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
