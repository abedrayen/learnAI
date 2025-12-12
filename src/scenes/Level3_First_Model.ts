import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { ProgressManager } from '../systems/ProgressManager';
import { DialogBox } from '../ui/DialogBox';
import { LabLinkOverlay, LabLinkInfo } from '../ui/LabLinkOverlay';
import { RecapScreen, RecapData } from '../ui/RecapScreen';
import { SlideOverlay2 } from '../ui/SlideOverlay2';
import { LEVEL_3_SLIDES_ENHANCED } from '../data/learningSlides2';

interface DataPoint {
  x: number;
  y: number;
  worldX: number;
  worldY: number;
}

interface PipelineBlock {
  container: Phaser.GameObjects.Container;
  name: string;
  order: number;
  isPlaced: boolean;
  originalX: number;
  originalY: number;
}

export default class Level3_First_Model extends Phaser.Scene {
  private dialogBox?: DialogBox;
  private labLinkOverlay?: LabLinkOverlay;
  private recapScreen?: RecapScreen;
  private slideOverlay?: SlideOverlay2;
  private exitButton?: Phaser.GameObjects.Rectangle;
  
  // Activity 1: Interactive Regression Plot
  private regressionContainer?: Phaser.GameObjects.Container;
  private dataPoints: DataPoint[] = [];
  private userLine?: Phaser.GameObjects.Line;
  private machineLine?: Phaser.GameObjects.Line;
  private isDraggingLine: boolean = false;
  private lineStart?: { x: number; y: number };
  private lineEnd?: { x: number; y: number };
  private plotBounds: { x: number; y: number; width: number; height: number } = { x: 0, y: 0, width: 0, height: 0 };
  private errorText?: Phaser.GameObjects.Text;
  private r2Text?: Phaser.GameObjects.Text;
  private showMachineFit: boolean = false;
  
  // Activity 2: Pipeline Constructor
  private pipelineContainer?: Phaser.GameObjects.Container;
  private pipelineBlocks: PipelineBlock[] = [];
  private pipelineCanvas?: Phaser.GameObjects.Container;
  private placedBlocks: PipelineBlock[] = [];
  private correctOrder: string[] = ['Load Data', 'Clean Data', 'Split', 'Train', 'Evaluate', 'Predict'];
  
  private activityCompleted: { regression: boolean; pipeline: boolean } = {
    regression: false,
    pipeline: false
  };

  constructor() {
    super({ key: 'Level3_First_Model' });
  }

  create(): void {
    this.dialogBox = new DialogBox(this);
    this.labLinkOverlay = new LabLinkOverlay(this);
    this.recapScreen = new RecapScreen(this);
    this.slideOverlay = new SlideOverlay2(this);

    this.add.rectangle(640, 360, 1280, 720, 0x0a1929);

    this.createExitButton();

    this.slideOverlay.show(LEVEL_3_SLIDES_ENHANCED, () => {
      this.time.delayedCall(500, () => {
        this.dialogBox!.show(
          'Welcome to Data Scrolls! Complete two activities:\n\n' +
          '1. Interactive Regression Plot - Drag a line to fit the data\n' +
          '2. Pipeline Constructor - Build an ML pipeline flowchart',
          () => {
            this.startRegressionActivity();
          }
        );
      });
    });
  }

  private createExitButton(): void {
    this.exitButton = this.add.rectangle(1200, 650, 120, 60, COLORS.SUCCESS);
    this.exitButton.setInteractive({ useHandCursor: true });
    this.exitButton.setDepth(3000);
    this.exitButton.on('pointerdown', () => {
      if (this.activityCompleted.regression && this.activityCompleted.pipeline) {
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

  // ========== ACTIVITY 1: INTERACTIVE REGRESSION PLOT ==========
  private startRegressionActivity(): void {
    this.showMachineFit = false;
    
    this.regressionContainer = this.add.container(640, 360);
    this.regressionContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.regressionContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Interactive Regression Plot', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.regressionContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Click and drag to draw a line that fits the data points', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.regressionContainer.add(instructions);
    
    // Plot area
    const plotX = 0;
    const plotY = 0;
    const plotWidth = 800;
    const plotHeight = 500;
    const padding = 60;
    
    this.plotBounds = {
      x: plotX - plotWidth / 2 + padding,
      y: plotY - plotHeight / 2 + padding,
      width: plotWidth - 2 * padding,
      height: plotHeight - 2 * padding
    };
    
    // Plot background
    const plotBg = this.add.rectangle(plotX, plotY, plotWidth, plotHeight, COLORS.BG_MEDIUM, 0.8);
    plotBg.setStrokeStyle(3, COLORS.PRIMARY);
    this.regressionContainer.add(plotBg);
    
    // Axes
    const axes = this.add.graphics();
    axes.lineStyle(2, COLORS.TEXT);
    axes.beginPath();
    axes.moveTo(this.plotBounds.x, this.plotBounds.y + this.plotBounds.height);
    axes.lineTo(this.plotBounds.x, this.plotBounds.y);
    axes.moveTo(this.plotBounds.x, this.plotBounds.y + this.plotBounds.height);
    axes.lineTo(this.plotBounds.x + this.plotBounds.width, this.plotBounds.y + this.plotBounds.height);
    axes.strokePath();
    this.regressionContainer.add(axes);
    
    // Axis labels
    const xLabel = this.add.text(plotX, plotY + plotHeight / 2 + 30, 'X (Input)', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    xLabel.setOrigin(0.5);
    this.regressionContainer.add(xLabel);
    
    const yLabel = this.add.text(plotX - plotWidth / 2 + 20, plotY, 'Y (Output)', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      angle: -90
    });
    yLabel.setOrigin(0.5);
    this.regressionContainer.add(yLabel);
    
    // Generate data points
    this.generateDataPoints();
    
    // Draw data points
    this.dataPoints.forEach(point => {
      const circle = this.add.circle(point.worldX, point.worldY, 6, COLORS.PRIMARY);
      circle.setStrokeStyle(2, COLORS.TEXT);
      this.regressionContainer.add(circle);
    });
    
    // User line (initially hidden)
    this.userLine = this.add.line(0, 0, 0, 0, 0, 0, COLORS.WARNING, 1);
    this.userLine.setLineWidth(3);
    this.userLine.setVisible(false);
    this.regressionContainer.add(this.userLine);
    
    // Machine line (best fit, initially hidden)
    this.calculateMachineFit();
    
    // Error and R² display
    this.errorText = this.add.text(plotX + plotWidth / 2 - 100, plotY - plotHeight / 2 + 20, 'Error: --', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    this.errorText.setOrigin(0, 0);
    this.regressionContainer.add(this.errorText);
    
    this.r2Text = this.add.text(plotX + plotWidth / 2 - 100, plotY - plotHeight / 2 + 50, 'R²: --', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    this.r2Text.setOrigin(0, 0);
    this.regressionContainer.add(this.r2Text);
    
    // Toggle button for machine fit
    const toggleBtn = this.add.rectangle(plotX + plotWidth / 2 - 100, plotY + plotHeight / 2 - 30, 200, 40, COLORS.SECONDARY);
    toggleBtn.setInteractive({ useHandCursor: true });
    const toggleText = this.add.text(plotX + plotWidth / 2 - 100, plotY + plotHeight / 2 - 30, 'Show Machine Fit', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    toggleText.setOrigin(0.5);
    toggleBtn.on('pointerdown', () => {
      this.showMachineFit = !this.showMachineFit;
      if (this.machineLine) {
        this.machineLine.setVisible(this.showMachineFit);
      }
      toggleText.setText(this.showMachineFit ? 'Hide Machine Fit' : 'Show Machine Fit');
    });
    this.regressionContainer.add([toggleBtn, toggleText]);
    
    // Mouse interaction
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      const localX = pointer.x - 640;
      const localY = pointer.y - 360;
      
      if (localX >= this.plotBounds.x && localX <= this.plotBounds.x + this.plotBounds.width &&
          localY >= this.plotBounds.y && localY <= this.plotBounds.y + this.plotBounds.height) {
        this.isDraggingLine = true;
        this.lineStart = { x: localX, y: localY };
        this.lineEnd = { x: localX, y: localY };
        
        if (this.userLine) {
          this.userLine.setVisible(true);
        }
      }
    });
    
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (this.isDraggingLine && this.lineStart) {
        const localX = pointer.x - 640;
        const localY = pointer.y - 360;
        
        // Constrain to plot bounds
        const constrainedX = Phaser.Math.Clamp(localX, this.plotBounds.x, this.plotBounds.x + this.plotBounds.width);
        const constrainedY = Phaser.Math.Clamp(localY, this.plotBounds.y, this.plotBounds.y + this.plotBounds.height);
        
        this.lineEnd = { x: constrainedX, y: constrainedY };
        
        if (this.userLine) {
          this.userLine.setTo(this.lineStart.x, this.lineStart.y, this.lineEnd.x, this.lineEnd.y);
        }
        
        this.calculateError();
      }
    });
    
    this.input.on('pointerup', () => {
      if (this.isDraggingLine) {
        this.isDraggingLine = false;
        this.calculateError();
        
        // Check if error is reasonable
        if (this.errorText && this.errorText.text.includes('Error:')) {
          const errorValue = parseFloat(this.errorText.text.split(':')[1].trim());
          if (errorValue < 50) { // Reasonable threshold
            this.activityCompleted.regression = true;
            const success = this.add.text(0, 280, '✓ Good fit! Now try the Pipeline Constructor!', {
              fontSize: '24px',
              color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
              fontFamily: 'Arial',
              fontStyle: 'bold'
            });
            success.setOrigin(0.5);
            this.regressionContainer!.add(success);
          }
        }
      }
    });
    
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
      if (this.activityCompleted.regression) {
        this.regressionContainer!.destroy();
        this.dialogBox!.show('Great! Now try the Pipeline Constructor!', () => {
          this.startPipelineActivity();
        });
      } else {
        this.dialogBox!.show('Draw a line to fit the data first!', () => {});
      }
    });
    this.regressionContainer.add([closeBtn, closeText]);
  }

  private generateDataPoints(): void {
    // Generate sample data points with some noise
    const numPoints = 15;
    const minX = 0;
    const maxX = 10;
    const slope = 2;
    const intercept = 1;
    
    this.dataPoints = [];
    
    for (let i = 0; i < numPoints; i++) {
      const x = minX + (maxX - minX) * (i / (numPoints - 1));
      const y = slope * x + intercept + (Math.random() - 0.5) * 2; // Add noise
      
      // Convert to plot coordinates
      const worldX = this.plotBounds.x + ((x - minX) / (maxX - minX)) * this.plotBounds.width;
      const worldY = this.plotBounds.y + this.plotBounds.height - ((y - 0) / (maxX * slope + intercept)) * this.plotBounds.height;
      
      this.dataPoints.push({ x, y, worldX, worldY });
    }
  }

  private calculateMachineFit(): void {
    // Calculate linear regression (best fit line)
    const n = this.dataPoints.length;
    const sumX = this.dataPoints.reduce((sum, p) => sum + p.x, 0);
    const sumY = this.dataPoints.reduce((sum, p) => sum + p.y, 0);
    const sumXY = this.dataPoints.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumX2 = this.dataPoints.reduce((sum, p) => sum + p.x * p.x, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;
    
    // Draw machine line
    const minX = 0;
    const maxX = 10;
    const startX = this.plotBounds.x;
    const startY = this.plotBounds.y + this.plotBounds.height - ((slope * minX + intercept) / (maxX * 2 + intercept)) * this.plotBounds.height;
    const endX = this.plotBounds.x + this.plotBounds.width;
    const endY = this.plotBounds.y + this.plotBounds.height - ((slope * maxX + intercept) / (maxX * 2 + intercept)) * this.plotBounds.height;
    
    this.machineLine = this.add.line(0, 0, startX, startY, endX, endY, COLORS.SUCCESS, 1);
    this.machineLine.setLineWidth(3);
    this.machineLine.setVisible(false);
    this.regressionContainer!.add(this.machineLine);
  }

  private calculateError(): void {
    if (!this.lineStart || !this.lineEnd || !this.userLine) return;
    
    // Calculate line equation
    const dx = this.lineEnd.x - this.lineStart.x;
    const dy = this.lineEnd.y - this.lineStart.y;
    
    // Convert plot coordinates to data coordinates
    const minX = 0;
    const maxX = 10;
    const maxY = maxX * 2 + 1;
    
    const startDataX = minX + ((this.lineStart.x - this.plotBounds.x) / this.plotBounds.width) * (maxX - minX);
    const startDataY = maxY - ((this.lineStart.y - this.plotBounds.y) / this.plotBounds.height) * maxY;
    const endDataX = minX + ((this.lineEnd.x - this.plotBounds.x) / this.plotBounds.width) * (maxX - minX);
    const endDataY = maxY - ((this.lineEnd.y - this.plotBounds.y) / this.plotBounds.height) * maxY;
    
    const lineSlope = (endDataY - startDataY) / (endDataX - startDataX);
    const lineIntercept = startDataY - lineSlope * startDataX;
    
    // Calculate mean squared error
    let mse = 0;
    let totalVariance = 0;
    const meanY = this.dataPoints.reduce((sum, p) => sum + p.y, 0) / this.dataPoints.length;
    
    this.dataPoints.forEach(point => {
      const predictedY = lineSlope * point.x + lineIntercept;
      const error = point.y - predictedY;
      mse += error * error;
      totalVariance += (point.y - meanY) * (point.y - meanY);
    });
    
    mse /= this.dataPoints.length;
    
    // Calculate R²
    const r2 = 1 - (mse * this.dataPoints.length) / totalVariance;
    
    if (this.errorText) {
      this.errorText.setText(`Error: ${mse.toFixed(2)}`);
    }
    
    if (this.r2Text) {
      this.r2Text.setText(`R²: ${r2.toFixed(3)}`);
    }
  }

  // ========== ACTIVITY 2: PIPELINE CONSTRUCTOR ==========
  private startPipelineActivity(): void {
    this.placedBlocks = [];
    
    this.pipelineContainer = this.add.container(640, 360);
    this.pipelineContainer.setDepth(500);
    
    // Background
    const bg = this.add.rectangle(0, 0, 1280, 720, 0x000000, 0.85);
    this.pipelineContainer.add(bg);
    
    // Title
    const title = this.add.text(0, -320, 'Pipeline Constructor', {
      fontSize: '36px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    this.pipelineContainer.add(title);
    
    // Instructions
    const instructions = this.add.text(0, -270, 'Drag blocks into the flowchart canvas in the correct order', {
      fontSize: '20px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    instructions.setOrigin(0.5);
    this.pipelineContainer.add(instructions);
    
    // Canvas area
    this.pipelineCanvas = this.add.container(0, 50);
    const canvasBg = this.add.rectangle(0, 0, 900, 400, COLORS.BG_MEDIUM, 0.5);
    canvasBg.setStrokeStyle(3, COLORS.PRIMARY);
    this.pipelineCanvas.add(canvasBg);
    this.pipelineContainer.add(this.pipelineCanvas);
    
    // Create pipeline blocks
    this.createPipelineBlocks();
    
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
      if (this.activityCompleted.pipeline) {
        this.pipelineContainer!.destroy();
        this.dialogBox!.show('Perfect! All activities complete!', () => {});
      } else {
        this.dialogBox!.show('Complete the pipeline first!', () => {});
      }
    });
    this.pipelineContainer.add([closeBtn, closeText]);
  }

  private createPipelineBlocks(): void {
    const blockNames = ['Load Data', 'Clean Data', 'Split', 'Train', 'Evaluate', 'Predict'];
    const colors = [COLORS.PRIMARY, COLORS.SECONDARY, COLORS.WARNING, COLORS.SUCCESS, COLORS.PRIMARY, COLORS.SECONDARY];
    
    // Arrange blocks on the left side
    const startX = -550;
    const startY = -200;
    const spacing = 100;
    
    blockNames.forEach((name, index) => {
      const container = this.add.container(startX, startY + index * spacing);
      
      // Block background
      const bg = this.add.rectangle(0, 0, 180, 80, colors[index], 0.8);
      bg.setStrokeStyle(3, colors[index]);
      container.add(bg);
      
      // Block text
      const text = this.add.text(0, 0, name, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 160 }
      });
      text.setOrigin(0.5);
      container.add(text);
      
      container.setInteractive(new Phaser.Geom.Rectangle(-90, -40, 180, 80), Phaser.Geom.Rectangle.Contains);
      this.input.setDraggable(container);
      
      const block: PipelineBlock = {
        container,
        name,
        order: index,
        isPlaced: false,
        originalX: startX,
        originalY: startY + index * spacing
      };
      
      this.pipelineBlocks.push(block);
      this.pipelineContainer!.add(container);
      
      // Drag events
      this.input.on('dragstart', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !block.isPlaced) {
          container.setScale(1.1);
          container.setDepth(1000);
        }
      });
      
      this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container, dragX: number, dragY: number) => {
        if (gameObject === container && !block.isPlaced) {
          container.x = dragX;
          container.y = dragY;
        }
      });
      
      this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.Container) => {
        if (gameObject === container && !block.isPlaced) {
          container.setScale(1);
          
          const worldX = container.x;
          const worldY = container.y;
          
          // Check if dropped in canvas area
          if (Math.abs(worldX) < 450 && worldY > -150 && worldY < 250) {
            // Place in sequence
            const order = this.placedBlocks.length;
            block.isPlaced = true;
            container.x = -300 + order * 150;
            container.y = 50;
            container.setAlpha(0.9);
            
            this.placedBlocks.push(block);
            
            // Draw arrows between blocks
            this.updatePipelineArrows();
            
            // Check if complete and correct
            if (this.placedBlocks.length === this.correctOrder.length) {
              const isCorrect = this.placedBlocks.every((b, i) => b.name === this.correctOrder[i]);
              if (isCorrect) {
                this.activityCompleted.pipeline = true;
                this.animatePipelineFlow();
              }
            }
          } else {
            // Return to original position
            container.x = block.originalX;
            container.y = block.originalY;
          }
        }
      });
    });
  }

  private updatePipelineArrows(): void {
    // Remove old arrows
    if (this.pipelineCanvas) {
      this.pipelineCanvas.list.forEach((child, index) => {
        if (index > 0) { // Skip background
          if (child instanceof Phaser.GameObjects.Graphics) {
            child.destroy();
          }
        }
      });
    }
    
    // Draw new arrows
    for (let i = 0; i < this.placedBlocks.length - 1; i++) {
      const current = this.placedBlocks[i];
      const next = this.placedBlocks[i + 1];
      
      const arrow = this.add.graphics();
      arrow.lineStyle(4, COLORS.SUCCESS);
      arrow.beginPath();
      arrow.moveTo(current.container.x + 90, current.container.y);
      arrow.lineTo(next.container.x - 90, next.container.y);
      arrow.strokePath();
      
      // Arrowhead
      arrow.fillStyle(COLORS.SUCCESS);
      arrow.beginPath();
      arrow.moveTo(next.container.x - 90, next.container.y);
      arrow.lineTo(next.container.x - 100, next.container.y - 8);
      arrow.lineTo(next.container.x - 100, next.container.y + 8);
      arrow.closePath();
      arrow.fillPath();
      
      this.pipelineContainer!.add(arrow);
    }
  }

  private animatePipelineFlow(): void {
    // Animate glowing data flowing through pipeline
    const flowGraphics = this.add.graphics();
    flowGraphics.lineStyle(6, COLORS.SUCCESS);
    
    this.placedBlocks.forEach((block, index) => {
      this.tweens.add({
        targets: block.container,
        alpha: 1,
        scale: 1.1,
        duration: 300,
        yoyo: true,
        delay: index * 200
      });
    });
    
    // Show success message
    const success = this.add.text(0, 280, '✓ Pipeline Complete! Data flowing through!', {
      fontSize: '28px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    success.setOrigin(0.5);
    this.pipelineContainer!.add(success);
  }

  private completeLevel(): void {
    const recapData: RecapData = {
      levelName: 'Data Scrolls & First Spell',
      concepts: [
        'Models learn patterns from data by fitting lines/curves',
        'The ML pipeline: Load Data → Split → Train → Test → Predict',
        'Linear regression is a simple but powerful model'
      ],
      labLink: {
        title: 'First Model Lab',
        description: 'Train your first model in Python',
        url: 'https://colab.research.google.com/first_linear_model'
      },
      nextLevel: {
        key: 'Level4_Neural_Temple',
        name: 'Level 4: Neural Temple'
      }
    };

    this.recapScreen!.show(recapData, () => {
      ProgressManager.completeLevel('Level3_First_Model');
      this.scene.start('MenuScene');
    }, undefined, (levelKey: string) => {
      ProgressManager.completeLevel('Level3_First_Model');
      this.scene.start(levelKey);
    });
  }

}
