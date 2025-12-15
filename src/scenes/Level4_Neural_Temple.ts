import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_4_SLIDES_ENHANCED } from '../data/learningSlides2';

interface TrainingExample {
  inputs: number[];
  expected: number;
  predicted?: number;
  correct?: boolean;
}

interface NetworkNode {
  container: Phaser.GameObjects.Container;
  layer: number;
  index: number;
  activation: number;
  weights?: number[];
  bias?: number;
}

interface NetworkConnection {
  line: Phaser.GameObjects.Line;
  from: NetworkNode;
  to: NetworkNode;
  weight: number;
}

export default class Level4_Neural_Temple extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitButton?: Phaser.GameObjects.Rectangle;
  
  // Activity 1: Pattern Recognition Challenge
  private patternContainer?: Phaser.GameObjects.Container;
  private trainingExamples: TrainingExample[] = [];
  private trainingEpoch: number = 0;
  private accuracyText?: Phaser.GameObjects.Text;
  private lossText?: Phaser.GameObjects.Text;
  private patternNetwork: NetworkNode[] = [];
  private patternConnections: NetworkConnection[] = [];
  
  // Activity 2: Activation Function Arena
  private activationContainer?: Phaser.GameObjects.Container;
  private selectedActivation: 'relu' | 'sigmoid' | 'tanh' | 'leaky_relu' = 'relu';
  private activationGraphs: Map<string, Phaser.GameObjects.Graphics> = new Map();
  private testInputSlider?: Phaser.GameObjects.Rectangle;
  private testInputValue: number = 0;
  
  private activityCompleted: { pattern: boolean; activation: boolean } = {
    pattern: false,
    activation: false
  };

  constructor() {
    super({ key: 'Level4_Neural_Temple' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.createExitButton();

    this.slideOverlay.show(LEVEL_4_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          ' Welcome to the Neural Temple! 🏛️\n\n' +
          'Time for some REAL neural network action!\n\n' ,
        );
        this.startPatternRecognition();
      });
    });
  }

  private createExitButton(): void {
    this.exitButton = this.add.rectangle(1200, 650, 120, 60, COLORS.SUCCESS);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);
    this.exitButton.on('pointerdown', () => {
      if (this.activityCompleted.pattern && this.activityCompleted.activation) {
        this.completeLevel();
      } else {
        const remaining = [];
        if (!this.activityCompleted.pattern) remaining.push('🎯 Pattern Recognition Challenge');
        if (!this.activityCompleted.activation) remaining.push('⚡ Activation Function Arena');
        
        this.dialogBox!.show(
          '🚫 Whoa there, Neural Ninja! 🚫\n\n' +
          'Complete these challenges first:\n' +
          remaining.join('\n') + '\n\n' +
          '(Trust us, they\'re actually fun! 🎮)',
          () => {}
        );
      }
    });

    const exitText = this.add.text(1200, 650, 'EXIT', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    exitText.setOrigin(0.5);
    exitText.setDepth(3001);
  }

  // ========== ACTIVITY 1: PATTERN RECOGNITION CHALLENGE ==========
  private startPatternRecognition(): void {
    this.trainingEpoch = 0;
    
    this.patternContainer = this.add.container(640, 360);
    this.patternContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.9);
    this.patternContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, '🎯 Pattern Recognition Challenge 🎯', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.patternContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 
      'Train a network to solve XOR! Watch it learn the pattern!\nXOR: (0,0)→0, (0,1)→1, (1,0)→1, (1,1)→0', {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      align: 'center'
    });
    instructions.setOrigin(0.5);
    this.patternContainer.add(instructions);
    
    // Create XOR training examples display
    const exampleData = [
      { inputs: [0, 0], expected: 0, x: -300, y: -150 },
      { inputs: [0, 1], expected: 1, x: -100, y: -150 },
      { inputs: [1, 0], expected: 1, x: 100, y: -150 },
      { inputs: [1, 1], expected: 0, x: 300, y: -150 }
    ];
    
    this.trainingExamples = exampleData.map(data => ({
      inputs: data.inputs,
      expected: data.expected,
      predicted: Math.random() > 0.5 ? 1 : 0,
      correct: false
    }));
    
    exampleData.forEach((example, idx) => {
      const box = this.add.rectangle(example.x, example.y, 150, 80, COLORS.BG_MEDIUM, 0.8);
      box.setStrokeStyle(2, COLORS.PRIMARY);
      this.patternContainer!.add(box);
      
      const inputText = this.add.text(example.x, example.y - 20, 
        `Input: (${example.inputs[0]}, ${example.inputs[1]})`, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      inputText.setOrigin(0.5);
      this.patternContainer!.add(inputText);
      
      const expectedText = this.add.text(example.x, example.y, 
        `Expected: ${example.expected}`, {
        fontSize: '14px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'Arial'
      });
      expectedText.setOrigin(0.5);
      this.patternContainer!.add(expectedText);
      
      const predictedText = this.add.text(example.x, example.y + 20, 
        `Predicted: ${this.trainingExamples[idx].predicted}`, {
        fontSize: '14px',
        color: '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      predictedText.setOrigin(0.5);
      predictedText.setName(`predicted_${idx}`);
      this.patternContainer!.add(predictedText);
    });
    
    // Training metrics
    this.accuracyText = this.add.text(0, 0, 'Accuracy: 0%', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    this.accuracyText.setOrigin(0.5);
    this.patternContainer.add(this.accuracyText);
    
    this.lossText = this.add.text(0, 40, 'Loss: High', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    this.lossText.setOrigin(0.5);
    this.patternContainer.add(this.lossText);
    
    const epochText = this.add.text(0, 80, 'Epoch: 0', {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    epochText.setOrigin(0.5);
    epochText.setName('epochText');
    this.patternContainer.add(epochText);
    
    // Train button
    const trainBtn = this.add.rectangle(0, 180, 200, 60, COLORS.SUCCESS, 0.9);
    trainBtn.setInteractive({ useHandCursor: true });
    const trainText = this.add.text(0, 180, 'TRAIN!', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    trainText.setOrigin(0.5);
    trainBtn.on('pointerdown', () => {
      this.trainPatternNetwork();
    });
    trainBtn.on('pointerover', () => trainBtn.setScale(1.1));
    trainBtn.on('pointerout', () => trainBtn.setScale(1));
    this.patternContainer.add([trainBtn, trainText]);
    
    // Progress info
    const progressInfo = this.add.text(0, 250, 
      '💡 Click TRAIN to run training epochs!\nWatch the network learn!', {
      fontSize: '14px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      align: 'center',
      fontStyle: 'italic'
    });
    progressInfo.setOrigin(0.5);
    this.patternContainer.add(progressInfo);
    
    // Close button
    const closeBtn = this.add.rectangle(600, -320, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -320, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      if (this.activityCompleted.pattern) {
        this.patternContainer!.destroy();
        this.dialogBox!.show(
          '🎉 Awesome! You trained a neural network! 🎉\n\n' +
          'That\'s machine learning in action! The network learned the XOR pattern!\n\n' +
          'Ready for the next challenge? ⚡',
          () => {
            this.startActivationArena();
          }
        );
      } else {
        this.dialogBox!.show(
          '⏳ Not quite ready yet!\n\n' +
          'Train the network until accuracy reaches 100%!\n' +
          '(Hint: Keep clicking TRAIN!) 🎯',
          () => {}
        );
      }
    });
    this.patternContainer.add([closeBtn, closeText]);
  }

  private trainPatternNetwork(): void {
    // Simulate training
    this.trainingEpoch += 10;
    
    // Gradually improve predictions (simulate learning)
    const progress = Math.min(this.trainingEpoch / 50, 1);
    
    this.trainingExamples.forEach((example, idx) => {
      // Simulate network learning XOR
      const correctPrediction = example.expected;
      const randomness = Math.random();
      
      // As training progresses, predictions become more accurate
      if (randomness < progress) {
        example.predicted = correctPrediction;
        example.correct = true;
      } else {
        example.predicted = 1 - correctPrediction;
        example.correct = false;
      }
      
      // Update displayed prediction
      const predictedText = this.patternContainer!.getByName(`predicted_${idx}`) as Phaser.GameObjects.Text;
      if (predictedText) {
        predictedText.setText(`Predicted: ${example.predicted}`);
        predictedText.setColor(example.correct ? 
          '#' + COLORS.SUCCESS.toString(16).padStart(6, '0') :
          '#' + COLORS.ERROR.toString(16).padStart(6, '0')
        );
        
        // Animate
        this.tweens.add({
          targets: predictedText,
          scale: 1.3,
          duration: 200,
          yoyo: true
        });
      }
    });
    
    // Calculate accuracy
    const correct = this.trainingExamples.filter(e => e.correct).length;
    const accuracy = (correct / this.trainingExamples.length) * 100;
    
    // Update metrics
    if (this.accuracyText) {
      this.accuracyText.setText(`Accuracy: ${accuracy.toFixed(0)}%`);
      this.accuracyText.setColor(accuracy === 100 ? 
        '#' + COLORS.SUCCESS.toString(16).padStart(6, '0') : '#ffffff'
      );
    }
    
    const loss = 1 - progress;
    if (this.lossText) {
      this.lossText.setText(`Loss: ${loss < 0.3 ? 'Low' : loss < 0.7 ? 'Medium' : 'High'} (${loss.toFixed(2)})`);
    }
    
    const epochText = this.patternContainer!.getByName('epochText') as Phaser.GameObjects.Text;
    if (epochText) {
      epochText.setText(`Epoch: ${this.trainingEpoch}`);
    }
    
    // Check if training is complete
    if (accuracy === 100 && !this.activityCompleted.pattern) {
      this.activityCompleted.pattern = true;
      
      // Celebration
      const celebration = this.add.text(0, -50, 
        '🎉 PERFECT! Network Trained! 🎉\n100% Accuracy Achieved!', {
        fontSize: '24px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      celebration.setOrigin(0.5);
      this.patternContainer!.add(celebration);
      
      // Confetti
      for (let i = 0; i < 20; i++) {
        const confetti = this.add.circle(
          (Math.random() - 0.5) * 400,
          -300,
          Math.random() * 4 + 2,
          [COLORS.PRIMARY, COLORS.SUCCESS, COLORS.WARNING][Math.floor(Math.random() * 3)]
        );
        this.patternContainer!.add(confetti);
        
        this.tweens.add({
          targets: confetti,
          y: 400,
          x: confetti.x + (Math.random() - 0.5) * 100,
          rotation: Math.random() * Math.PI * 4,
          alpha: 0,
          duration: 1500 + Math.random() * 500,
          onComplete: () => confetti.destroy()
        });
      }
    }
  }

  // ========== ACTIVITY 2: ACTIVATION FUNCTION ARENA ==========
  private startActivationArena(): void {
    this.activationContainer = this.add.container(640, 360);
    this.activationContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.9);
    this.activationContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, '⚡ Activation Function Arena ⚡', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.activationContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 
      'Select activation functions and drag the slider to see how they transform inputs!', {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      align: 'center'
    });
    instructions.setOrigin(0.5);
    this.activationContainer.add(instructions);
    
    // Input slider
    const sliderLabel = this.add.text(0, -220, 'Input Value:', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    sliderLabel.setOrigin(0.5);
    this.activationContainer.add(sliderLabel);
    
    const sliderBg = this.add.rectangle(0, -180, 400, 10, COLORS.BG_LIGHT, 0.5);
    this.activationContainer.add(sliderBg);
    
    this.testInputSlider = this.add.rectangle(-200, -180, 20, 30, COLORS.PRIMARY);
    this.testInputSlider.setInteractive({ useHandCursor: true, draggable: true });
    this.activationContainer.add(this.testInputSlider);
    
    const inputValueText = this.add.text(0, -140, '0.00', {
      fontSize: '24px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    inputValueText.setOrigin(0.5);
    inputValueText.setName('inputValue');
    this.activationContainer.add(inputValueText);
    
    // Slider drag handler
    this.input.setDraggable(this.testInputSlider);
    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number, dragY: number) => {
      if (gameObject === this.testInputSlider) {
        // Convert world coordinates to container-local coordinates
        const localX = dragX - 640; // Container is at 640, so subtract to get local coords
        const clampedX = Phaser.Math.Clamp(localX, -200, 200);
        this.testInputSlider!.x = clampedX;
        this.testInputValue = (clampedX + 200) / 400 * 4 - 2; // Range -2 to 2
        
        const valueText = this.activationContainer!.getByName('inputValue') as Phaser.GameObjects.Text;
        if (valueText) {
          valueText.setText(this.testInputValue.toFixed(2));
        }
        
        this.updateActivationOutputs();
      }
    });
    
    // Activation function buttons
    const functions = [
      { name: 'ReLU', key: 'relu', color: COLORS.SUCCESS, y: 0 },
      { name: 'Sigmoid', key: 'sigmoid', color: COLORS.PRIMARY, y: 60 },
      { name: 'Tanh', key: 'tanh', color: COLORS.WARNING, y: 120 },
      { name: 'Leaky ReLU', key: 'leaky_relu', color: COLORS.SECONDARY, y: 180 }
    ];
    
    functions.forEach(func => {
      const btn = this.add.rectangle(-500, func.y, 180, 45, func.color, 0.7);
      btn.setInteractive({ useHandCursor: true });
      btn.setName(`btn_${func.key}`);
      
      const text = this.add.text(-500, func.y, func.name, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      text.setOrigin(0.5);
      
      const outputText = this.add.text(-390, func.y, 'Output: 0.00', {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      outputText.setOrigin(0, 0.5);
      outputText.setName(`output_${func.key}`);
      
      btn.on('pointerdown', () => {
        this.selectedActivation = func.key as any;
        // Reset all buttons
        functions.forEach(f => {
          const b = this.activationContainer!.getByName(`btn_${f.key}`) as Phaser.GameObjects.Rectangle;
          if (b) b.setAlpha(0.7);
        });
        btn.setAlpha(1);
        this.drawActivationGraph(func.key as any);
      });
      
      this.activationContainer!.add([btn, text, outputText]);
    });
    
    // Graph area
    const graphBg = this.add.rectangle(200, 90, 500, 400, COLORS.BG_MEDIUM, 0.3);
    graphBg.setStrokeStyle(2, COLORS.PRIMARY);
    this.activationContainer.add(graphBg);
    
    const graphLabel = this.add.text(200, -120, 'Function Graph', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    graphLabel.setOrigin(0.5);
    this.activationContainer.add(graphLabel);
    
    // Test All button
    const testAllBtn = this.add.rectangle(0, 270, 200, 50, COLORS.SUCCESS, 0.9);
    testAllBtn.setInteractive({ useHandCursor: true });
    const testAllText = this.add.text(0, 270, 'Test All!', {
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    testAllText.setOrigin(0.5);
    testAllBtn.on('pointerdown', () => {
      this.testAllActivations();
    });
    testAllBtn.on('pointerover', () => testAllBtn.setScale(1.1));
    testAllBtn.on('pointerout', () => testAllBtn.setScale(1));
    this.activationContainer.add([testAllBtn, testAllText]);
    
    // Close button
    const closeBtn = this.add.rectangle(600, -320, 120, 40, COLORS.ERROR);
    closeBtn.setInteractive({ useHandCursor: true });
    const closeText = this.add.text(600, -320, 'Close', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    closeText.setOrigin(0.5);
    closeBtn.on('pointerdown', () => {
      if (this.activityCompleted.activation) {
        this.activationContainer!.destroy();
        this.dialogBox!.show(
          '🏆 ARENA CHAMPION! 🏆\n\n' +
          'You\'ve mastered activation functions!\n\n',
          () => {}
        );
      } else {
        this.dialogBox!.show(
          '🎮 Keep Playing!\n\n' +
          'Click "Test All!" to see all functions in action!\n\n' +
          'Understanding these is key to neural networks! 🔑',
          () => {}
        );
      }
    });
    this.activationContainer.add([closeBtn, closeText]);
    
    // Initialize with ReLU
    this.drawActivationGraph('relu');
    this.updateActivationOutputs();
  }

  private updateActivationOutputs(): void {
    const functions = ['relu', 'sigmoid', 'tanh', 'leaky_relu'];
    
    functions.forEach(funcKey => {
      let output = 0;
      const input = this.testInputValue;
      
      switch(funcKey) {
        case 'relu':
          output = Math.max(0, input);
          break;
        case 'sigmoid':
          output = 1 / (1 + Math.exp(-input));
          break;
        case 'tanh':
          output = Math.tanh(input);
          break;
        case 'leaky_relu':
          output = input > 0 ? input : input * 0.1;
          break;
      }
      
      const outputText = this.activationContainer!.getByName(`output_${funcKey}`) as Phaser.GameObjects.Text;
      if (outputText) {
        outputText.setText(`Output: ${output.toFixed(2)}`);
      }
    });
  }

  private drawActivationGraph(funcKey: string): void {
    // Clear old graph
    if (this.activationGraphs.has('current')) {
      this.activationGraphs.get('current')!.destroy();
    }
    
    const graph = this.add.graphics();
    const graphX = -50;
    const graphY = 90;
    const graphWidth = 400;
    const graphHeight = 300;
    
    // Draw axes
    graph.lineStyle(2, COLORS.TEXT, 0.5);
    graph.beginPath();
    graph.moveTo(graphX, graphY);
    graph.lineTo(graphX + graphWidth, graphY);
    graph.moveTo(graphX + graphWidth / 2, graphY - graphHeight / 2);
    graph.lineTo(graphX + graphWidth / 2, graphY + graphHeight / 2);
    graph.strokePath();
    
    // Draw function
    const color = funcKey === 'relu' ? COLORS.SUCCESS :
                  funcKey === 'sigmoid' ? COLORS.PRIMARY :
                  funcKey === 'tanh' ? COLORS.WARNING : COLORS.SECONDARY;
                  
    graph.lineStyle(3, color);
    graph.beginPath();
    
    for (let x = 0; x <= graphWidth; x++) {
      const input = (x / graphWidth) * 4 - 2;
      let output = 0;
      
      switch(funcKey) {
        case 'relu':
          output = Math.max(0, input);
          break;
        case 'sigmoid':
          output = 1 / (1 + Math.exp(-input));
          break;
        case 'tanh':
          output = Math.tanh(input);
          break;
        case 'leaky_relu':
          output = input > 0 ? input : input * 0.1;
          break;
      }
      
      const plotX = graphX + x;
      const plotY = funcKey === 'sigmoid' 
        ? graphY - (output * graphHeight / 2)
        : graphY - (output / 2 * graphHeight / 2);
      
      if (x === 0) {
        graph.moveTo(plotX, plotY);
      } else {
        graph.lineTo(plotX, plotY);
      }
    }
    
    graph.strokePath();
    this.activationContainer!.add(graph);
    this.activationGraphs.set('current', graph);
  }

  private testAllActivations(): void {
    // Animate testing all functions
    const functions = ['relu', 'sigmoid', 'tanh', 'leaky_relu'];
    
    functions.forEach((funcKey, idx) => {
      this.time.delayedCall(idx * 500, () => {
        const btn = this.activationContainer!.getByName(`btn_${funcKey}`) as Phaser.GameObjects.Rectangle;
        if (btn) {
          this.tweens.add({
            targets: btn,
            scale: 1.2,
            duration: 300,
            yoyo: true
          });
        }
        
        this.drawActivationGraph(funcKey);
      });
    });
    
    this.time.delayedCall(2500, () => {
      if (!this.activityCompleted.activation) {
        this.activityCompleted.activation = true;
        
        const celebration = this.add.text(200, -80, 
          '🎊 ALL FUNCTIONS TESTED! 🎊', {
          fontSize: '20px',
          color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
          fontFamily: 'Arial',
          fontStyle: 'bold'
        });
        celebration.setOrigin(0.5);
        celebration.setAlpha(0);
        this.activationContainer!.add(celebration);
        
        this.tweens.add({
          targets: celebration,
          alpha: 1,
          y: -60,
          duration: 500,
          ease: 'Back.Out'
        });
      }
    });
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Neural Temple',
      concepts: [
        'Neural networks consist of layers of neurons',
        'Each neuron performs a weighted sum and applies an activation function',
        'Deep learning is powerful for images, speech, and text'
      ],
      labLink: {
        title: 'Tiny Neural Net Lab',
        description: 'Build your first neural network',
        url: 'https://colab.research.google.com/tiny_neural_net_mnist'
      },
      nextLevel: {
        key: 'Level5_Teachable_Ritual',
        name: 'Level 5: Teachable Ritual'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level4_Neural_Temple');
      this.scene.start('MenuScene');
    }, undefined, (levelKey: string) => {
      ProgressManager.completeLevel('Level4_Neural_Temple');
      this.scene.start(levelKey);
    });
  }
}
