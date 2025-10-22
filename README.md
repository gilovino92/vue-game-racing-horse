# 🐎 Vue Horse Racing Game

A dynamic and interactive horse racing simulation game built with Vue 3, TypeScript, and Tailwind CSS. Experience the thrill of virtual horse racing with realistic mechanics, real-time race progression, and comprehensive race management.

## ✨ Features

### 🎮 Core Game Mechanics
- **20 Unique Horses**: Each horse has distinctive names, colors, and dynamic condition stats (0-100)
- **6 Progressive Racing Rounds**: Distances from 1200m to 2200m, testing horse endurance
- **Smart Horse Selection**: 10 randomly selected horses compete in each round
- **Real-time Race Simulation**: Live position updates with physics-based movement
- **Advanced Condition System**: Horse fatigue dynamically affects performance during races
- **Exhaustion Mechanics**: Horses can become too tired to continue, adding strategic depth

### 🎯 Interactive Features
- **Race Program Generator**: Create complete racing schedules with random horse assignments
- **Live Race Control**: Start, pause, and monitor races in real-time
- **Multi-Round Progression**: Automatic advancement through all 6 racing rounds
- **Comprehensive Race History**: Track results, rankings, and performance across all rounds
- **Horse Stable Management**: Monitor all horses and their current condition status

### 🎨 Modern User Interface
- **Component-Based Design**: Built with Reka UI components and Tailwind CSS
- **Responsive Layout**: Three-panel layout optimizing desktop and mobile experiences
- **Tabbed Navigation**: Seamless switching between race programs and historical results
- **Live Data Visualization**: Real-time progress indicators and position tracking
- **Accessibility First**: ARIA-compliant components with keyboard navigation

## 🛠️ Technology Stack

### Frontend Framework
- **Vue 3** (v3.5.22) - Modern reactive framework with Composition API
- **TypeScript** (v5.9.3) - Type-safe development with enhanced IDE support
- **Vite** (v7.1.7) - Ultra-fast build tool and development server with HMR

### State Management & Architecture
- **Vuex 4** - Centralized state management with modular store architecture
- **VueUse Core** - Collection of essential Vue composition utilities
- **Modular Game Store** - Organized game logic with getters, mutations, and actions

### Styling & UI Framework
- **Tailwind CSS 4** (v4.1.14) - Utility-first CSS framework with custom configuration
- **Reka UI** (v2.5.1) - Accessible, unstyled component library
- **Class Variance Authority** - Type-safe component variants
- **Lucide Vue Next** - Beautiful, customizable SVG icons
- **TW Animate CSS** - Extended animation utilities for Tailwind

### Data & Tables
- **TanStack Vue Table** (v8.21.3) - Powerful table management for race results
- **Custom Table Components** - Specialized UI components for race data display

### Development & Build Tools
- **Vue TSC** (v3.1.0) - TypeScript compiler specifically for Vue
- **Vite Vue Plugin** - Official Vue support for Vite
- **Path Aliases** - Clean imports using @ alias for src directory

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd vue-game-racing-horse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🎯 How to Play

### Starting a Race Session

1. **Generate Program**: Click "Generate Program" to create 20 horses and schedule 6 rounds
2. **View Participants**: Check the "Program" tab to see which horses will race in each round
3. **Start Racing**: Click "Start" to begin the first round
4. **Watch the Action**: Observe horses moving across the track in real-time
5. **Track Progress**: Monitor horse positions and conditions throughout the race

### Game Progression

- **Round Progression**: Races automatically advance through all 6 rounds
- **Distance Scaling**: Each round features longer distances (1200m → 2200m)
- **Horse Fatigue**: Watch as horses tire and slow down over time
- **Results Tracking**: View complete race history in the "Results" tab

### Understanding the Interface

#### Control Panel
- **Generate Program**: Creates new horses and racing schedule
- **Start/Pause**: Controls race execution
- **Race Status**: Visual indicators for current game state

#### Race Track
- **Live Positions**: Real-time horse movement visualization
- **Progress Indicators**: Percentage completion for each horse
- **Finish Line**: Clear visual goal for horses
- **Horse Identification**: Color-coded horses with names

#### Information Panels
- **Stable View**: Complete horse roster with condition stats
- **Program Schedule**: Detailed participant lists for each round
- **Race Results**: Historical data with rankings and times

## 🏗️ Project Architecture

```
src/
├── components/                 # Vue component library
│   ├── GameLayout.vue         # Main application layout wrapper
│   ├── ControlPanel.vue       # Race control interface (start/pause/generate)
│   ├── RaceTrack.vue          # Live racing visualization component
│   ├── RaceLane.vue           # Individual lane with horse animation
│   ├── HorseListPanel.vue     # Horse stable and condition display
│   ├── ProgramResultsPanel.vue # Tabbed race info and results
│   └── ui/                    # Reusable UI component library
│       ├── accordion/         # Expandable content sections
│       ├── badge/             # Status and category indicators
│       ├── button/            # Interactive button components
│       ├── card/              # Content container components
│       ├── icons/             # Custom icon components (Horse, etc.)
│       ├── scroll-area/       # Custom scrollable content areas
│       ├── separator/         # Visual content dividers
│       ├── table/             # Data table components with utilities
│       └── tabs/              # Tabbed navigation components
├── stores/                    # Vuex state management
│   ├── index.ts              # Root store configuration
│   └── modules/
│       └── game.ts           # Game state module with full race logic
├── types/                     # TypeScript type definitions
│   └── game.ts               # Game entities and state interfaces
├── utils/                     # Business logic utilities
│   ├── constants.ts          # Game configuration constants
│   ├── horse-generator.ts    # Horse creation and randomization
│   └── race-simulator.ts     # Racing physics and calculations
└── lib/                      # Shared utility functions
    └── utils.ts              # Common helper functions and utilities
```

## 🔧 Configuration

### Game Constants
Located in `src/utils/constants.ts`:

```typescript
export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]; // meters
export const TOTAL_HORSES = 20;      // horses in stable
export const HORSES_PER_ROUND = 10;  // participants per race
export const TOTAL_ROUNDS = 6;       // number of rounds
export const HORSE_MAX_SPEED = 17.8; // meters per second
export const INTERVAL_DURATION = 800; // milliseconds between updates
```

### Customization Options
- **Race Distances**: Modify round distances in constants
- **Horse Pool**: Adjust total number of horses
- **Update Frequency**: Change interval duration for smoother/faster racing
- **UI Theme**: Customize colors in CSS variables

## 🎲 Game Mechanics Deep Dive

### Race Simulation Engine
The game features a sophisticated physics-based racing system:

```typescript
// Core racing constants
RACE_DISTANCES: [1200, 1400, 1600, 1800, 2000, 2200] // meters
TOTAL_HORSES: 20                    // horses in stable
HORSES_PER_ROUND: 10               // participants per race
TOTAL_ROUNDS: 6                    // number of race rounds
HORSE_MAX_SPEED: 17.8              // meters per second
INTERVAL_DURATION: 800             // milliseconds between updates
```

### Horse Management System
- **Dynamic Condition**: Horses start at 100% condition, decreasing with fatigue
- **Random Performance**: Each update includes randomization factors (0.1-1.0)
- **Exhaustion Logic**: Horses with 0 condition become exhausted and stop racing
- **Persistent State**: Horse conditions carry over between rounds

### Race Progression Logic
1. **Program Generation**: Random selection of 10 horses per round from 20-horse stable
2. **Real-time Updates**: 800ms intervals with physics-based position calculations
3. **Finish Detection**: Automatic ranking as horses cross 100% completion
4. **Round Advancement**: Automatic progression with 1-second preparation intervals
5. **Results Tracking**: Complete race history with rankings and exhausted horses

### State Management Architecture
The game uses Vuex with a modular approach:

- **Game Status States**: `NONE` → `IDLE` → `PREPARING` → `RACING` → `PAUSED` → `COMPLETED`
- **Reactive Updates**: All UI components react to state changes in real-time
- **Action-based Logic**: Race progression handled through Vuex actions
- **Computed Properties**: Efficient data derivation using Vue's reactivity system

## 🎨 Design System & UI Architecture

### Component Library Structure
The project uses a comprehensive design system built on Reka UI:

#### Core UI Components
- **Accordion**: Expandable content sections with smooth animations
- **Badge**: Status indicators and category labels with variant support
- **Button**: Interactive elements with loading states and size variants
- **Card**: Content containers with header, body, and footer sections
- **Table**: Data display with sorting, filtering, and responsive design
- **Tabs**: Navigation between different content views
- **Scroll Area**: Custom scrollable regions with styled scrollbars

#### Game-Specific Components
- **Race Lane**: Individual horse racing visualization with position tracking
- **Horse Icon**: Custom SVG icon component for horse representation
- **Control Panel**: Central game management interface
- **Results Display**: Structured race data presentation

### Styling System
- **Tailwind CSS 4**: Latest version with enhanced performance
- **CSS Custom Properties**: Theme-able color system
- **Responsive Design**: Mobile-first approach with breakpoint system
- **Animation System**: TW Animate CSS for smooth transitions
- **Component Variants**: Type-safe styling with Class Variance Authority

### Layout Architecture
- **Three-Panel Layout**: Optimized for race management workflow
- **Sticky Controls**: Fixed control panel for easy race management
- **Responsive Grid**: Adapts from mobile stack to desktop columns
- **Scroll Management**: Individual panel scrolling for large datasets

## 🚀 Performance & Optimization

### Vue 3 Performance Features
- **Composition API**: Optimized reactivity and better tree-shaking
- **Efficient Rendering**: Minimal re-renders with computed properties and reactive refs
- **Component Optimization**: Single File Components with script setup syntax
- **Type Safety**: Full TypeScript coverage prevents runtime errors

### Build Optimization
- **Vite Build System**: Lightning-fast development with instant HMR
- **Tree Shaking**: Automatic removal of unused code and dependencies
- **Code Splitting**: Optimized bundle sizes with dynamic imports
- **Asset Optimization**: Automatic optimization of images and static assets

### Runtime Performance
- **Interval Management**: Efficient game loop with proper cleanup
- **Memory Management**: Proper cleanup of intervals and event listeners
- **Reactive Updates**: Minimal DOM manipulation through Vue's virtual DOM
- **State Normalization**: Efficient data structures in Vuex store

## 📋 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build locally

# Type Checking
vue-tsc -b          # TypeScript compilation check
```

## 🔧 Configuration Options

### Game Tuning Parameters
Located in `src/utils/constants.ts` - easily customizable:

```typescript
export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200]; // Race lengths
export const TOTAL_HORSES = 20;           // Size of horse stable
export const HORSES_PER_ROUND = 10;       // Racers per round
export const TOTAL_ROUNDS = 6;            // Number of race rounds
export const HORSE_MAX_SPEED = 17.8;      // Maximum horse speed (m/s)
export const INTERVAL_DURATION = 800;     // Update frequency (ms)
```

### Vite Configuration
Custom configuration in `vite.config.ts`:
- Path aliases for clean imports
- Vue plugin configuration
- TypeScript integration
- Build optimization settings

### Tailwind Configuration
Styled with `components.json` configuration:
- Custom color schemes
- Typography scales
- Component styling
- Animation configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🏆 Credits

Built with modern web technologies and inspired by the excitement of horse racing. Special thanks to the Vue.js community and the creators of the amazing libraries that make this project possible.

---

**Enjoy the races! 🏁**
