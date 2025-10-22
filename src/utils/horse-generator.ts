import type { Horse } from '@/types/game';
import { TOTAL_HORSES } from './constants';
const numbers = [...Array(TOTAL_HORSES).keys()]

const HORSE_NAMES = [
  'Thunder Bolt', 'Lightning Strike', 'Storm Chaser', 'Fire Arrow',
  'Golden Eagle', 'Silver Bullet', 'Midnight Express', 'Star Runner',
  'Desert Wind', 'Mountain Peak', 'Ocean Wave', 'Forest Spirit',
  'Crimson Flash', 'Azure Dream', 'Emerald Knight', 'Ruby Racer',
  'Diamond Dash', 'Platinum Prince', 'Shadow Hunter', 'Sunset Glory',
  'Aurora Borealis', 'Cosmic Comet', 'Blazing Trail', 'Swift Arrow'
] as const;

const HORSE_COLORS = [
  '#7A5A47', '#6A4242', '#9B5E3C', '#A67A44', '#8A6A48',
  '#C59A73', '#8E8280', '#6B8C8C', '#4B6A6A', '#46525A',
  '#5A5A8C', '#6A6F9A', '#5A7F2B', '#3A5A38', '#8A5640',
  '#5C392A', '#4A4948', '#D2691E', '#FF4500', '#2E8B57'
] as const;


export const generateHorses = (): Horse[] => {
  const horses: Horse[] = [];
  const shuffleList = [...numbers].sort(() => Math.random() - 0.5);
  

  for (let i = 0; i < shuffleList.length; i++) {
    const rawIndex = shuffleList[i];
    const idx = typeof rawIndex === 'number' ? rawIndex : 0;
    const name = HORSE_NAMES[idx % HORSE_NAMES.length] || "";
    const color = HORSE_COLORS[idx % HORSE_COLORS.length] || "";

    horses.push({
      id: i,
      name,
      color,
      condition: 100
    });
  }

  return horses;
};