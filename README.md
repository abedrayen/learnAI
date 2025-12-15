# AI Explorer - Educational 2D Platformer Game

An interactive 2D platformer game that teaches AI, Machine Learning, and Deep Learning concepts through gameplay. Players explore different levels, complete activities, and learn by doing.

## 🎮 Game Overview

**AI Explorer** is a browser-based educational game built with TypeScript and Phaser 3. Each level introduces key AI/ML/DL concepts through:

- Interactive gameplay mechanics
- Educational activities and puzzles
- Links to Google Colab notebooks for hands-on Python practice
- Integration with Teachable Machine for real-world model training

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. Clone or download this repository
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for static hosting.

### Deploying to GitHub Pages

See [GITHUB_PAGES.md](./GITHUB_PAGES.md) for detailed instructions, or use the quick start:

```bash
# One-command deployment
npm run deploy
```

Or set up automatic deployment with GitHub Actions (see `.github/workflows/deploy.yml`).

## 🎯 Learning Goals by Level

### Level 1: AI Jungle
**Concepts:**
- What is AI?
- AI examples in everyday life
- Rule-based AI vs Machine Learning vs Deep Learning

**Activities:**
- Collect AI example icons (search, recommendations, face recognition, chatbot, self-driving, tax systems)
- Categorize examples into Rule-based, ML, or DL platforms

**Colab Link:** `https://colab.research.google.com/ai_intro_examples`
- Simple Python notebook listing AI applications
- Classification exercise in Python comments/markdown

### Level 2: Machine Whisperer
**Concepts:**
- Dataset, features, labels
- Training vs testing data
- Supervised vs unsupervised vs reinforcement learning
- ML workflow: Data → Split → Train → Evaluate → Improve

**Activities:**
- Data collection and sorting (features vs labels)
- ML type gate (choose correct door for scenarios)

**Colab Link:** `https://colab.research.google.com/ml_basics_workflow`
- Load a toy dataset
- Demonstrate features/labels
- Train/test split with scikit-learn
- Fit a simple classifier/regressor
- Print accuracy and explanations

### Level 3: Data Scrolls & First Spell
**Concepts:**
- Using data to fit a simple model (linear regression)
- Understanding that models learn patterns

**Activities:**
- Drag-and-drop ML pipeline puzzle
- Predict the output (human vs model comparison)

**Colab Link:** `https://colab.research.google.com/first_linear_model`
- NumPy arrays for X and y
- Train LinearRegression
- Show `.coef_`, `.intercept_`, predictions
- Simple markdown explanations

### Level 4: Neural Temple
**Concepts:**
- Neuron (weighted sum + activation)
- Layers in neural networks
- Why deep learning is useful for images, speech, text

**Activities:**
- Path of the Signal (data transformation through layers)
- Neuron switch puzzle

**Colab Link:** `https://colab.research.google.com/tiny_neural_net_mnist`
- Load MNIST from tf.keras.datasets
- Normalize data
- Build a tiny Sequential model
- Train for a few epochs
- Show accuracy and simple plots
- Explain layers and neurons in markdown

### Level 5: Teachable Ritual
**Concepts:**
- Collecting examples (images/sounds/poses)
- Training a model on custom data
- Testing and interacting with trained models

**Activities:**
- Shrine selection (Image, Audio, Pose)
- Example collection simulation
- Testing simulation

**Teachable Machine Link:** `https://teachablemachine.withgoogle.com/`
- **Note:** The game does NOT embed or execute Teachable Machine directly
- Players open the link in their browser to use the real tool
- Pre-made example project: `https://teachablemachine.withgoogle.com/train/image`

### Level 6: Final Artifact
**Concepts:**
- Full ML pipeline from data → model → evaluation
- Connecting all concepts: AI, ML, DL, and Teachable Machine

**Activities:**
- Pipeline room (activate Data Chamber, Model Forge, Evaluation Lens)
- Final quiz covering all key concepts

**Final Certificate:**
- Summary of all concepts learned
- Complete list of all Colab links and Teachable Machine link

## 🎮 Controls

- **Arrow Keys** or **WASD**: Move left/right
- **Space** or **W/Up Arrow**: Jump
- **Mouse**: Click on interactive elements (Lab Terminals, buttons, etc.)

## 📁 Project Structure

```
learnAI/
├── src/
│   ├── main.ts                 # Game entry point
│   ├── GameConfig.ts           # Game configuration and constants
│   ├── scenes/                 # Game scenes (levels)
│   │   ├── BootScene.ts
│   │   ├── MenuScene.ts
│   │   ├── Level1_AI_Jungle.ts
│   │   ├── Level2_ML_Basics.ts
│   │   ├── Level3_First_Model.ts
│   │   ├── Level4_Neural_Temple.ts
│   │   ├── Level5_Teachable_Ritual.ts
│   │   └── Level6_Final_Artifact.ts
│   ├── ui/                     # UI components
│   │   ├── DialogBox.ts
│   │   ├── QuizOverlay.ts
│   │   ├── LabLinkOverlay.ts
│   │   ├── RecapScreen.ts
│   │   └── AchievementOverlay.ts  # Achievements display
│   └── systems/                # Game systems
│       ├── ProgressManager.ts   # Progress tracking (localStorage)
│       ├── InputManager.ts     # Input handling
│       ├── SoundManager.ts     # Sound effects management
│       └── AchievementManager.ts  # Achievements/badges system
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔗 Colab Notebooks & Teachable Machine

### Important Notes

1. **Colab Links are Placeholders**: The URLs in the game are placeholders. You'll need to create actual Google Colab notebooks and update the URLs, or replace them with your own notebook links.

2. **Teachable Machine**: The game links to the real Teachable Machine website. Players will open it in their browser - the game does not embed it.

3. **No Python Execution in Game**: The game itself does NOT run Python code. It only provides links and guidance. All Python experimentation happens in Google Colab.

### Intended Colab Notebooks

Each level has a corresponding Colab notebook that should cover:

- **Level 1**: Simple AI examples and classification
- **Level 2**: ML workflow with scikit-learn
- **Level 3**: Linear regression example
- **Level 4**: Tiny neural network on MNIST
- **Level 5**: Links to Teachable Machine (no Colab needed)

## 🛠️ Development

### Adding New Levels

1. Create a new scene file in `src/scenes/`
2. Extend `Phaser.Scene`
3. Register it in `src/main.ts`
4. Add it to the level order in `ProgressManager.ts`

### Customizing UI

All UI components are in `src/ui/`. They use Phaser's graphics API and can be styled by modifying the color constants in `GameConfig.ts`.

### Progress Tracking

Progress is saved in `localStorage` using the key `ai_explorer_progress`. To reset progress, call `ProgressManager.resetProgress()` or clear browser localStorage.

## 🎵 Sound Effects

The game includes procedural sound effects generated using the Web Audio API:
- **Success sounds**: Play when completing activities correctly
- **Error sounds**: Play when making mistakes
- **Click sounds**: Play on button interactions
- **Level complete**: Fanfare when finishing a level
- **Achievement unlock**: Special sound when earning achievements
- **Collect sounds**: Play when collecting items

Sound can be toggled via the `SoundManager` class.

## 🏆 Achievements System

The game features a comprehensive achievements/badges system with 10 achievements:

### Level Completion Achievements
- 🌴 **Jungle Explorer**: Complete Level 1
- 🤖 **Machine Whisperer**: Complete Level 2
- 📊 **Model Creator**: Complete Level 3
- 🧠 **Neural Architect**: Complete Level 4
- 🎓 **Teachable Master**: Complete Level 5
- 🏆 **AI Explorer Champion**: Complete Level 6

### Special Achievements
- ⭐ **Ecosystem Master**: Place all AI examples correctly on first try
- 🧩 **Brain Expert**: Answer all AI Guess-the-Brain questions correctly
- ⚡ **Speed Learner**: Complete a level in under 5 minutes
- 👑 **AI Master**: Complete all 6 levels

Achievements are saved in localStorage and can be viewed from the main menu. Unlocking an achievement plays a special sound effect and shows a notification.

## 📝 TODO / Future Enhancements

- [ ] Complete implementation of activities in Levels 2-6
- [ ] Add background music
- [ ] Create actual Colab notebooks and update URLs
- [ ] Add more interactive puzzles and activities
- [ ] Add sprite graphics instead of colored rectangles
- [ ] Add particle effects and animations
- [ ] Implement save/load functionality for mid-level progress

## 🎓 Educational Philosophy

This game follows a **learn-by-doing** approach:

1. **Introduction**: Concepts are introduced through dialog and signs
2. **Interaction**: Players engage with concepts through gameplay
3. **Practice**: Colab notebooks allow hands-on Python experimentation
4. **Application**: Teachable Machine connects learning to real tools
5. **Synthesis**: Final level ties everything together

## 📄 License

MIT License - feel free to use and modify for educational purposes.

## 🤝 Contributing

This is an educational project. Contributions, especially:
- Creating actual Colab notebooks
- Improving activities and puzzles
- Adding more levels
- Bug fixes and improvements

are welcome!

## 📧 Support

For questions or issues, please open an issue in the repository or contact the project maintainers.

---

**Happy Learning! 🚀🤖**

