import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_4_SLIDES_ENHANCED } from '../data/learningSlides2';

interface NeuronInput {
  container: Phaser.GameObjects.Container;
  value: number;
  weight: number;
  weightSlider?: Phaser.GameObjects.Rectangle;
}

interface NetworkNode {
  container: Phaser.GameObjects.Container;
  layer: number;
  index: number;
  activation: number;
}

interface NetworkConnection {
  line: Phaser.GameObjects.Line;
  from: NetworkNode;
  to: NetworkNode;
}

export default class Level4_Neural_Temple extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private labTerminal?: Phaser.GameObjects.Rectangle;
  private exitButton?: Phaser.GameObjects.Rectangle;
  
  // Activity 1: Build a Neuron
  private neuronContainer?: Phaser.GameObjects.Container;
  private neuronInputs: NeuronInput[] = [];
  private activationFunction: 'relu' | 'sigmoid' = 'relu';
  private neuronOutput?: Phaser.GameObjects.Text;
  private outputGraph?: Phaser.GameObjects.Graphics;
  
  // Activity 2: Neural Network Layer Forge
  private networkContainer?: Phaser.GameObjects.Container;
  private networkNodes: NetworkNode[] = [];
  private networkConnections: NetworkConnection[] = [];
  private numLayers: number = 3;
  private nodesPerLayer: number[] = [3, 4, 2];
  private isForwardPassing: boolean = false;
  
  private activityCompleted: { neuron: boolean; network: boolean } = {
    neuron: false,
    network: false
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

    this.createLabTerminal();
    this.createExitButton();

    this.slideOverlay.show(LEVEL_4_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to the Neural Temple! Complete two activities:\n\n' +
          '1. Build a Neuron - Adjust weights and activation functions\n' +
          '2. Neural Network Layer Forge - Build and visualize a network',
          () => {
            this.startNeuronActivity();
          }
        );
      });
    });
  }

  private createLabTerminal(): void {
    this.labTerminal = this.add.rectangle(1200, 200, 100, 100, COLORS.SECONDARY);
    this.labTerminal.setStrokeStyle(4, COLORS.PRIMARY);
    this.labTerminal.setInteractive(new Phaser.Geom.Rectangle(-50, -50, 100, 100), Phaser.Geom.Rectangle.Contains);
    this.labTerminal.input!.cursor = 'pointer';
    this.labTerminal.setDepth(3000);
    
    const terminalIcon = this.add.text(1200, 200, '💻', { fontSize: '40px' });
    terminalIcon.setOrigin(0.5);
    terminalIcon.setDepth(3001);
    const terminalLabel = this.add.text(1200, 250, 'Lab Terminal', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    terminalLabel.setOrigin(0.5);
    terminalLabel.setDepth(3001);

    this.labTerminal.on('pointerdown', () => {
      const labInfo: LabLinkInfo = {
        title: 'Tiny Neural Net Lab',
        description: 'Open this Colab to build and train a small neural network on MNIST digits.',
        url: 'https://colab.research.google.com/tiny_neural_net_mnist',
        shortCode: 'colab.link/neural-net-1'
      };
      this.labLinkOverlay!.show(labInfo);
    });
  }

  private createExitButton(): void {
    this.exitButton = this.add.rectangle(1200, 650, 120, 60, COLORS.SUCCESS);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);
    this.exitButton.on('pointerdown', () => {
      if (this.activityCompleted.neuron && this.activityCompleted.network) {
        this.completeLevel();
      } else {
        this.dialogBox!.show('Complete both activities first!', () => {});
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

  // ========== ACTIVITY 1: BUILD A NEURON ==========
  private startNeuronActivity(): void {
    this.neuronInputs = [];
    
    this.neuronContainer = this.add.container(640, 360);
    this.neuronContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.neuronContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Build a Neuron', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.neuronContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Adjust weights with sliders, select activation function, then click FIRE!', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.neuronContainer.add(instructions);
    
    // Create inputs
    this.createNeuronInputs();
    
    // Neuron body (center)
    const neuronBody = this.add.circle(0, 0, 60, COLORS.WARNING, 0.8);
    neuronBody.setStrokeStyle(4, COLORS.WARNING);
    this.neuronContainer.add(neuronBody);
    
    const neuronLabel = this.add.text(0, 0, 'Σ + f', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    neuronLabel.setOrigin(0.5);
    this.neuronContainer.add(neuronLabel);
    
    // Output
    const outputLabel = this.add.text(200, 0, 'Output:', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    outputLabel.setOrigin(0, 0.5);
    this.neuronContainer.add(outputLabel);
    
    this.neuronOutput = this.add.text(200, 30, '0.00', {
      fontSize: '24px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    this.neuronOutput.setOrigin(0, 0.5);
    this.neuronContainer.add(this.neuronOutput);
    
    // Activation function selector
    const activationLabel = this.add.text(-200, 100, 'Activation:', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    activationLabel.setOrigin(0.5);
    this.neuronContainer.add(activationLabel);
    
    const reluBtn = this.add.rectangle(-200, 150, 120, 40, COLORS.PRIMARY, 0.7);
    reluBtn.setInteractive({ useHandCursor: true });
    const reluText = this.add.text(-200, 150, 'ReLU', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    reluText.setOrigin(0.5);
    reluBtn.on('pointerdown', () => {
      this.activationFunction = 'relu';
      reluBtn.setAlpha(1);
      sigmoidBtn.setAlpha(0.5);
    });
    this.neuronContainer.add([reluBtn, reluText]);
    
    const sigmoidBtn = this.add.rectangle(-200, 200, 120, 40, COLORS.SECONDARY, 0.5);
    sigmoidBtn.setInteractive({ useHandCursor: true });
    const sigmoidText = this.add.text(-200, 200, 'Sigmoid', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    sigmoidText.setOrigin(0.5);
    sigmoidBtn.on('pointerdown', () => {
      this.activationFunction = 'sigmoid';
      sigmoidBtn.setAlpha(1);
      reluBtn.setAlpha(0.5);
    });
    this.neuronContainer.add([sigmoidBtn, sigmoidText]);
    
    // FIRE button
    const fireBtn = this.add.rectangle(200, 150, 150, 60, COLORS.ERROR, 0.9);
    fireBtn.setInteractive({ useHandCursor: true });
    const fireText = this.add.text(200, 150, 'FIRE!', {
      fontSize: '28px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    fireText.setOrigin(0.5);
    fireBtn.on('pointerdown', () => {
      this.fireNeuron();
    });
    fireBtn.on('pointerover', () => {
      fireBtn.setScale(1.1);
    });
    fireBtn.on('pointerout', () => {
      fireBtn.setScale(1);
    });
    this.neuronContainer.add([fireBtn, fireText]);
    
    // Output graph area
    const graphBg = this.add.rectangle(0, 250, 600, 200, COLORS.BG_MEDIUM, 0.5);
    graphBg.setStrokeStyle(2, COLORS.PRIMARY);
    this.neuronContainer.add(graphBg);
    
    const graphLabel = this.add.text(0, 180, 'Activation Function Graph', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    graphLabel.setOrigin(0.5);
    this.neuronContainer.add(graphLabel);
    
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
      if (this.activityCompleted.neuron) {
        this.neuronContainer!.destroy();
        this.dialogBox!.show('Great! Now try the Neural Network Layer Forge!', () => {
          this.startNetworkActivity();
        });
      } else {
        this.dialogBox!.show('Fire the neuron at least once to complete this activity!', () => {});
      }
    });
    this.neuronContainer.add([closeBtn, closeText]);
  }

  private createNeuronInputs(): void {
    const numInputs = 3;
    const startY = -100;
    const spacing = 80;
    
    for (let i = 0; i < numInputs; i++) {
      const y = startY + i * spacing;
      const container = this.add.container(-300, y);
      
      // Input circle
      const inputCircle = this.add.circle(0, 0, 25, COLORS.PRIMARY, 0.7);
      inputCircle.setStrokeStyle(3, COLORS.PRIMARY);
      container.add(inputCircle);
      
      // Input label
      const label = this.add.text(0, 0, `x${i + 1}`, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      container.add(label);
      
      // Input value
      const valueText = this.add.text(40, 0, '1.0', {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      valueText.setOrigin(0, 0.5);
      container.add(valueText);
      
      // Weight slider
      const sliderBg = this.add.rectangle(100, 0, 150, 8, COLORS.BG_LIGHT, 0.5);
      container.add(sliderBg);
      
      const weight = 0.5; // Initial weight
      const sliderHandle = this.add.rectangle(100 + (weight - 0.5) * 150, 0, 20, 20, COLORS.WARNING);
      sliderHandle.setInteractive({ useHandCursor: true });
      container.add(sliderHandle);
      
      const weightText = this.add.text(100, 25, `w${i + 1}: ${weight.toFixed(2)}`, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      weightText.setOrigin(0.5, 0);
      container.add(weightText);
      
      // Slider interaction
      let isDragging = false;
      sliderHandle.on('pointerdown', () => {
        isDragging = true;
      });
      
      this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
        if (isDragging) {
          const localX = pointer.x - 640 - (-300 + 100);
          const newWeight = Phaser.Math.Clamp((localX / 150) + 0.5, 0, 1);
          sliderHandle.x = 100 + (newWeight - 0.5) * 150;
          weightText.setText(`w${i + 1}: ${newWeight.toFixed(2)}`);
          
          const neuronInput: NeuronInput = {
            container,
            value: 1.0,
            weight: newWeight
          };
          
          const existingIndex = this.neuronInputs.findIndex(ni => ni.container === container);
          if (existingIndex >= 0) {
            this.neuronInputs[existingIndex] = neuronInput;
          } else {
            this.neuronInputs.push(neuronInput);
          }
        }
      });
      
      this.input.on('pointerup', () => {
        isDragging = false;
      });
      
      // Connection line to neuron
      const connection = this.add.graphics();
      connection.lineStyle(2, COLORS.SECONDARY, 0.6);
      connection.beginPath();
      connection.moveTo(-300 + 25, y);
      connection.lineTo(-60, 0);
      connection.strokePath();
      this.neuronContainer!.add(connection);
      
      const neuronInput: NeuronInput = {
        container,
        value: 1.0,
        weight
      };
      this.neuronInputs.push(neuronInput);
      this.neuronContainer!.add(container);
    }
  }

  private fireNeuron(): void {
    // Calculate weighted sum
    let weightedSum = 0;
    this.neuronInputs.forEach(input => {
      weightedSum += input.value * input.weight;
    });
    
    // Apply activation function
    let output = 0;
    if (this.activationFunction === 'relu') {
      output = Math.max(0, weightedSum);
    } else if (this.activationFunction === 'sigmoid') {
      output = 1 / (1 + Math.exp(-weightedSum));
    }
    
    // Update output display
    if (this.neuronOutput) {
      this.neuronOutput.setText(output.toFixed(3));
      
      // Animate
      this.tweens.add({
        targets: this.neuronOutput,
        scale: 1.5,
        duration: 200,
        yoyo: true
      });
    }
    
    // Draw activation function graph
    this.drawActivationGraph();
    
    // Mark as completed
    this.activityCompleted.neuron = true;
    
    // Visual feedback
    const feedback = this.add.text(0, -200, '⚡ Neuron Fired!', {
      fontSize: '24px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    feedback.setOrigin(0.5);
    this.neuronContainer!.add(feedback);
    this.tweens.add({
      targets: feedback,
      alpha: 0,
      y: feedback.y - 30,
      duration: 1500,
      onComplete: () => feedback.destroy()
    });
  }

  private drawActivationGraph(): void {
    // Remove old graph
    if (this.outputGraph) {
      this.outputGraph.destroy();
    }
    
    this.outputGraph = this.add.graphics();
    this.outputGraph.lineStyle(3, COLORS.SUCCESS);
    
    const graphX = -300;
    const graphY = 250;
    const graphWidth = 600;
    const graphHeight = 150;
    
    // Draw axes
    this.outputGraph.lineStyle(2, COLORS.TEXT);
    this.outputGraph.beginPath();
    this.outputGraph.moveTo(graphX, graphY + graphHeight);
    this.outputGraph.lineTo(graphX, graphY);
    this.outputGraph.moveTo(graphX, graphY + graphHeight);
    this.outputGraph.lineTo(graphX + graphWidth, graphY + graphHeight);
    this.outputGraph.strokePath();
    
    // Draw activation function
    this.outputGraph.lineStyle(3, COLORS.SUCCESS);
    this.outputGraph.beginPath();
    
    for (let x = 0; x < graphWidth; x++) {
      const input = (x / graphWidth) * 4 - 2; // Range from -2 to 2
      let output = 0;
      
      if (this.activationFunction === 'relu') {
        output = Math.max(0, input);
      } else if (this.activationFunction === 'sigmoid') {
        output = 1 / (1 + Math.exp(-input));
      }
      
      const plotX = graphX + x;
      const plotY = graphY + graphHeight - (output * graphHeight);
      
      if (x === 0) {
        this.outputGraph.moveTo(plotX, plotY);
      } else {
        this.outputGraph.lineTo(plotX, plotY);
      }
    }
    this.outputGraph.strokePath();
    
    this.neuronContainer!.add(this.outputGraph);
  }

  // ========== ACTIVITY 2: NEURAL NETWORK LAYER FORGE ==========
  private startNetworkActivity(): void {
    this.networkNodes = [];
    this.networkConnections = [];
    
    this.networkContainer = this.add.container(640, 360);
    this.networkContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.networkContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Neural Network Layer Forge', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.networkContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Build a neural network by connecting nodes. Click Forward Pass to see data flow!', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.networkContainer.add(instructions);
    
    // Create network structure
    this.createNetworkStructure();
    
    // Forward Pass button
    const forwardBtn = this.add.rectangle(0, 280, 200, 50, COLORS.SUCCESS, 0.9);
    forwardBtn.setInteractive({ useHandCursor: true });
    const forwardText = this.add.text(0, 280, 'Forward Pass', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    forwardText.setOrigin(0.5);
    forwardBtn.on('pointerdown', () => {
      this.performForwardPass();
    });
    forwardBtn.on('pointerover', () => {
      forwardBtn.setScale(1.1);
    });
    forwardBtn.on('pointerout', () => {
      forwardBtn.setScale(1);
    });
    this.networkContainer.add([forwardBtn, forwardText]);
    
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
      if (this.activityCompleted.network) {
        this.networkContainer!.destroy();
        this.dialogBox!.show('Perfect! All activities complete!', () => {});
      } else {
        this.dialogBox!.show('Click Forward Pass to complete this activity!', () => {});
      }
    });
    this.networkContainer.add([closeBtn, closeText]);
  }

  private createNetworkStructure(): void {
    const layerSpacing = 300;
    const startX = -400;
    
    this.nodesPerLayer.forEach((numNodes, layerIndex) => {
      const layerX = startX + layerIndex * layerSpacing;
      const nodeSpacing = 400 / (numNodes + 1);
      
      for (let nodeIndex = 0; nodeIndex < numNodes; nodeIndex++) {
        const nodeY = -150 + (nodeIndex + 1) * nodeSpacing;
        
        const container = this.add.container(layerX, nodeY);
        
        // Node circle
        const node = this.add.circle(0, 0, 20, 
          layerIndex === 0 ? COLORS.PRIMARY : layerIndex === this.nodesPerLayer.length - 1 ? COLORS.SUCCESS : COLORS.SECONDARY,
          0.7);
        node.setStrokeStyle(3, 
          layerIndex === 0 ? COLORS.PRIMARY : layerIndex === this.nodesPerLayer.length - 1 ? COLORS.SUCCESS : COLORS.SECONDARY);
        container.add(node);
        
        // Activation bar (initially hidden)
        const activationBar = this.add.rectangle(0, -35, 40, 8, COLORS.WARNING);
        activationBar.setVisible(false);
        container.add(activationBar);
        
        const networkNode: NetworkNode = {
          container,
          layer: layerIndex,
          index: nodeIndex,
          activation: 0
        };
        
        this.networkNodes.push(networkNode);
        this.networkContainer!.add(container);
        
        // Create connections to next layer
        if (layerIndex < this.nodesPerLayer.length - 1) {
          const nextLayerNodes = this.networkNodes.filter(n => n.layer === layerIndex + 1);
          nextLayerNodes.forEach(nextNode => {
            const connection = this.add.line(0, 0, 
              layerX + 20, nodeY,
              layerX + layerSpacing - 20, nextNode.container.y,
              COLORS.BG_LIGHT, 0.3);
            connection.setLineWidth(1);
            
            this.networkConnections.push({
              line: connection,
              from: networkNode,
              to: nextNode
            });
            
            this.networkContainer!.add(connection);
          });
        }
      }
      
      // Layer label
      const layerLabel = this.add.text(layerX, -200, 
        layerIndex === 0 ? 'Input' : layerIndex === this.nodesPerLayer.length - 1 ? 'Output' : 'Hidden',
        {
          fontSize: '18px',
          color: '#ffffff',
          fontFamily: 'Arial',
          fontStyle: 'bold'
        });
      layerLabel.setOrigin(0.5);
      this.networkContainer!.add(layerLabel);
    });
  }

  private performForwardPass(): void {
    if (this.isForwardPassing) return;
    this.isForwardPassing = true;
    
    // Simulate forward pass
    this.networkNodes.forEach((node, index) => {
      if (node.layer === 0) {
        // Input layer - set random activations
        node.activation = Math.random();
      } else {
        // Calculate from previous layer
        const prevLayerNodes = this.networkNodes.filter(n => n.layer === node.layer - 1);
        let sum = 0;
        prevLayerNodes.forEach(prevNode => {
          sum += prevNode.activation * 0.5; // Simplified weight
        });
        node.activation = Math.max(0, sum); // ReLU activation
      }
      
      // Animate node glow
      this.tweens.add({
        targets: node.container,
        scale: 1.3,
        duration: 200,
        delay: index * 50,
        yoyo: true
      });
      
      // Show activation bar
      const activationBar = node.container.list.find((child: any) => child instanceof Phaser.GameObjects.Rectangle) as Phaser.GameObjects.Rectangle;
      if (activationBar) {
        activationBar.setVisible(true);
        activationBar.width = node.activation * 40;
        activationBar.setFillStyle(COLORS.WARNING);
      }
      
      // Pulse connections
      this.networkConnections.forEach(conn => {
        if (conn.from === node || conn.to === node) {
          this.tweens.add({
            targets: conn.line,
            alpha: 1,
            duration: 300,
            delay: index * 50,
            yoyo: true
          });
        }
      });
    });
    
    // Mark as completed
    this.activityCompleted.network = true;
    
    // Success message
    const success = this.add.text(0, 240, '✓ Forward Pass Complete! Data flowed through the network!', {
      fontSize: '24px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    success.setOrigin(0.5);
    this.networkContainer!.add(success);
    
    this.time.delayedCall(2000, () => {
      this.isForwardPassing = false;
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
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level4_Neural_Temple');
      this.scene.start('MenuScene');
    });
  }

}
