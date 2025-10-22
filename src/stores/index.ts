// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createStore } from 'vuex';
import type { RootState } from '@/types/game';
import { gameModule } from './modules/game';

export const store = createStore<RootState>({
  modules: {
    game: gameModule
  },
  strict: import.meta.env.MODE !== 'production'
});

export type Store = typeof store;