# 🐎 Vue Horse Racing Game

A dynamic and interactive horse racing simulation game built with Vue 3, TypeScript, and Tailwind CSS. Watch as virtual horses compete across multiple rounds with realistic racing mechanics and real-time updates.

## ✨ Features

### 🎮 Game Mechanics
- **20 Unique Horses**: Each with distinctive names, colors, and condition stats
- **6 Racing Rounds**: Progressive distances from 1200m to 2200m
- **Dynamic Horse Selection**: 10 randomly selected horses per round
- **Real-time Racing**: Live position updates with realistic physics
- **Horse Condition System**: Fatigue affects performance over time
- **Exhaustion Mechanics**: Horses can become too tired to continue

### 🎯 Core Features
- **Interactive Control Panel**: Start, pause, and generate race programs
- **Live Race Visualization**: Watch horses move across the track in real-time
- **Comprehensive Horse Stable**: View all horses with their current conditions
- **Race Program**: Detailed schedule showing participants for each round
- **Results Tracking**: Complete race history with rankings and times
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎨 User Interface
- **Modern UI Components**: Built with Reka UI and styled with Tailwind CSS
- **Tabbed Navigation**: Switch between race programs and results
- **Accordion Layouts**: Expandable sections for detailed information
- **Real-time Updates**: Live progress bars and position indicators
- **Color-coded Elements**: Visual distinction for horses and race status

## 🛠️ Technology Stack

### Frontend Framework
- **Vue 3** - Modern reactive framework with Composition API
- **TypeScript** - Type-safe development with enhanced IDE support
- **Vite** - Fast build tool and development server

### State Management
- **Vuex 4** - Centralized state management for game logic
- **Modular Store Architecture** - Organized game state in dedicated modules

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Reka UI** - Accessible component library
- **Lucide Vue Icons** - Beautiful, customizable icons
- **Custom CSS Variables** - Theme system with light/dark mode support

### Development Tools
- **Vue TSC** - TypeScript compiler for Vue
- **ESLint** - Code linting and formatting
- **Path Aliases** - Clean import statements with @ alias

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

## 🏗️ Project Structure

```
src/
├── components/           # Vue components
│   ├── GameLayout.vue   # Main layout wrapper
│   ├── ControlPanel.vue # Game controls
│   ├── RaceTrack.vue    # Racing visualization
│   ├── HorseListPanel.vue      # Horse stable display
│   ├── ProgramResultsPanel.vue # Race info tabs
│   └── ui/              # Reusable UI components
├── stores/              # Vuex state management
│   ├── index.ts         # Store configuration
│   └── modules/
│       └── game.ts      # Game state module
├── types/               # TypeScript definitions
│   └── game.ts          # Game-related types
├── utils/               # Utility functions
│   ├── constants.ts     # Game constants
│   ├── horse-generator.ts # Horse creation logic
│   └── race-simulator.ts  # Racing physics
└── lib/                 # Shared utilities
    └── utils.ts         # Common helper functions
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

### Horse Generation
- 20 unique horses with predefined names and colors
- Each horse starts with 100% condition
- Random assignment ensures variety in each session

### Racing Physics
- Speed calculation based on horse condition and random factors
- Progressive fatigue reduces horse performance over time
- Distance-based positioning with realistic movement

### Round Management
- Automatic progression through 6 rounds
- Random horse selection (10 out of 20) per round
- Increasing distances test horse endurance

### State Management
- Centralized game state with Vuex
- Real-time updates across all components
- Persistent race history and results

## 🎨 Styling System

### Design Principles
- **Responsive First**: Mobile-friendly layouts
- **Accessibility**: ARIA-compliant components
- **Performance**: Optimized animations and transitions
- **Consistency**: Unified color scheme and typography

### Theme Configuration
- CSS custom properties for easy theming
- Light and dark mode support
- Consistent spacing and sizing scales
- Semantic color naming conventions

## 🚀 Performance Features

- **Efficient Rendering**: Vue 3's optimized reactivity system
- **Minimal Bundle Size**: Tree-shaking and code splitting
- **Fast Development**: Vite's lightning-fast HMR
- **Type Safety**: Full TypeScript coverage prevents runtime errors

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
