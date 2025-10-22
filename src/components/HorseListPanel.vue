<script setup lang="ts">
import { computed } from 'vue';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { useStore } from 'vuex';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const store = useStore();
const horses = computed(() => store.state.game.horses);
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>Stable ({{ horses.length }} Horses)</CardTitle>
    </CardHeader>
    <CardContent>
      <ScrollArea class="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead class="text-center">Color</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="horse in horses" :key="horse.id">
              <TableCell class="font-medium">{{ horse.name }}</TableCell>
              <TableCell>
                <div class="flex items-center justify-center">
                  <div 
                    class="w-4 h-4 rounded-full border"
                    :style="{ backgroundColor: horse.color }"
                  />
                </div>
              </TableCell>
              <TableCell>
                <Badge 
                  :variant="horse.condition >= 80 ? 'default' : 
                           horse.condition >= 60 ? 'secondary' : 'destructive'"
                >
                  {{ horse.condition }}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </ScrollArea>
    </CardContent>
  </Card>
</template>