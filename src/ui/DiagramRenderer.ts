import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { DiagramElement } from './SlideElementTypes';

/**
 * Helper class for rendering educational diagrams and charts
 */
export class DiagramRenderer {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, container: Phaser.GameObjects.Container) {
    this.scene = scene;
    this.container = container;
  }

  renderDiagram(element: DiagramElement): Phaser.GameObjects.GameObject[] {
    const x = element.x || 0;
    const y = element.y || 0;
    const width = element.width || 600;
    const height = element.height || 400;
    const objects: Phaser.GameObjects.GameObject[] = [];

    switch (element.diagramType) {
      case 'ai-hierarchy':
        objects.push(...this.renderAIHierarchy(x, y, width, height));
        break;
      case 'dataset':
        objects.push(...this.renderDataset(x, y, width, height));
        break;
      case 'workflow':
        objects.push(...this.renderWorkflow(x, y, width, height));
        break;
      case 'neuron':
        objects.push(...this.renderNeuron(x, y, width, height));
        break;
      case 'neural-network':
        objects.push(...this.renderNeuralNetwork(x, y, width, height));
        break;
      case 'pipeline':
        objects.push(...this.renderPipeline(x, y, width, height));
        break;
      case 'teachable-flow':
        objects.push(...this.renderTeachableFlow(x, y, width, height));
        break;
    }

    return objects;
  }

  private renderAIHierarchy(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const topY = y - height / 2 + 40;
    const midY = y;
    const spacing = width / 4;

    // AI box (top)
    const aiBox = this.scene.add.rectangle(centerX, topY, 180, 70, COLORS.PRIMARY, 0.9);
    aiBox.setStrokeStyle(3, COLORS.PRIMARY);
    objects.push(aiBox);
    const aiText = this.scene.add.text(centerX, topY, 'Artificial\nIntelligence', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    aiText.setOrigin(0.5);
    objects.push(aiText);

    // Three branches: Rule-Based, ML, DL
    const branches = [
      { x: centerX - spacing, label: 'Rule-Based\nAI', sublabel: '🦎 The Lizard', color: COLORS.BG_LIGHT },
      { x: centerX, label: 'Machine\nLearning', sublabel: '🐅 The Tiger', color: COLORS.SECONDARY },
      { x: centerX + spacing, label: 'Deep\nLearning', sublabel: '🐉 The Dragon', color: COLORS.WARNING }
    ];

    branches.forEach((branch, index) => {
      // Arrow from AI to branch
      const arrow = this.scene.add.graphics();
      arrow.lineStyle(3, branch.color);
      arrow.beginPath();
      arrow.moveTo(centerX, topY + 35);
      arrow.lineTo(branch.x, midY - 50);
      arrow.strokePath();
      // Arrowhead
      arrow.fillStyle(branch.color);
      arrow.beginPath();
      const arrowY = midY - 50;
      arrow.moveTo(branch.x, arrowY);
      arrow.lineTo(branch.x - 8, arrowY - 10);
      arrow.lineTo(branch.x + 8, arrowY - 10);
      arrow.closePath();
      arrow.fillPath();
      objects.push(arrow);

      // Branch box
      const branchBox = this.scene.add.rectangle(branch.x, midY, 160, 100, branch.color, 0.85);
      branchBox.setStrokeStyle(2, branch.color);
      objects.push(branchBox);

      // Branch label
      const branchText = this.scene.add.text(branch.x, midY - 20, branch.label, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      branchText.setOrigin(0.5);
      objects.push(branchText);

      // Branch sublabel (creature)
      const sublabelText = this.scene.add.text(branch.x, midY + 25, branch.sublabel, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial',
        align: 'center'
      });
      sublabelText.setOrigin(0.5);
      objects.push(sublabelText);
    });

    return objects;
  }

  private renderDataset(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const tableX = x - width / 2 + 50;
    const tableY = y - height / 2 + 50;

    // Table background
    const tableBg = this.scene.add.rectangle(x, y, width - 100, height - 100, COLORS.BG_LIGHT, 0.5);
    tableBg.setStrokeStyle(2, COLORS.PRIMARY);
    objects.push(tableBg);

    // Headers
    const featureHeader = this.scene.add.text(tableX, tableY, 'Features', {
      fontSize: '18px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    featureHeader.setOrigin(0, 0.5);
    objects.push(featureHeader);

    const labelHeader = this.scene.add.text(tableX + 200, tableY, 'Label', {
      fontSize: '18px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    labelHeader.setOrigin(0, 0.5);
    objects.push(labelHeader);

    // Sample rows
    const rows = [
      { feature: 'Color: Red, Size: 5', label: 'Apple' },
      { feature: 'Color: Yellow, Size: 3', label: 'Banana' },
      { feature: 'Color: Green, Size: 4', label: 'Apple' }
    ];

    rows.forEach((row, i) => {
      const rowY = tableY + 40 + i * 35;
      const featureText = this.scene.add.text(tableX, rowY, row.feature, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      featureText.setOrigin(0, 0.5);
      objects.push(featureText);

      const labelText = this.scene.add.text(tableX + 200, rowY, row.label, {
        fontSize: '14px',
        color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      labelText.setOrigin(0, 0.5);
      objects.push(labelText);
    });

    return objects;
  }

  private renderWorkflow(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const steps = ['Collect\nData', 'Split\nData', 'Train\nModel', 'Evaluate', 'Improve'];
    const stepWidth = width / steps.length;
    const stepX = x - width / 2 + stepWidth / 2;

    steps.forEach((step, i) => {
      const stepXPos = stepX + i * stepWidth;
      const box = this.scene.add.rectangle(stepXPos, y, stepWidth - 20, 80, COLORS.PRIMARY, 0.7);
      box.setStrokeStyle(2, COLORS.PRIMARY);
      objects.push(box);

      const text = this.scene.add.text(stepXPos, y, step, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      text.setOrigin(0.5);
      objects.push(text);

      // Arrow to next
      if (i < steps.length - 1) {
        const arrow = this.scene.add.graphics();
        arrow.lineStyle(3, COLORS.SECONDARY);
        arrow.beginPath();
        arrow.moveTo(stepXPos + stepWidth / 2 - 10, y);
        arrow.lineTo(stepXPos + stepWidth / 2 + 10, y);
        arrow.strokePath();
        // Arrowhead
        arrow.fillStyle(COLORS.SECONDARY);
        arrow.beginPath();
        arrow.moveTo(stepXPos + stepWidth / 2 + 10, y);
        arrow.lineTo(stepXPos + stepWidth / 2, y - 8);
        arrow.lineTo(stepXPos + stepWidth / 2, y + 8);
        arrow.closePath();
        arrow.fillPath();
        objects.push(arrow);
      }
    });

    return objects;
  }

  private renderNeuron(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Inputs (left)
    const inputs = ['x₁', 'x₂', 'x₃'];
    inputs.forEach((input, i) => {
      const inputX = centerX - 150;
      const inputY = centerY - 60 + i * 60;
      const inputCircle = this.scene.add.circle(inputX, inputY, 20, COLORS.PRIMARY, 0.6);
      inputCircle.setStrokeStyle(2, COLORS.PRIMARY);
      objects.push(inputCircle);
      const inputText = this.scene.add.text(inputX, inputY, input, {
        fontSize: '14px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      inputText.setOrigin(0.5);
      objects.push(inputText);

      // Connection line
      const line = this.scene.add.graphics();
      line.lineStyle(2, COLORS.SECONDARY);
      line.beginPath();
      line.moveTo(inputX + 20, inputY);
      line.lineTo(centerX - 40, centerY - 60 + i * 30);
      line.strokePath();
      objects.push(line);
    });

    // Neuron body (center)
    const neuronBody = this.scene.add.circle(centerX, centerY, 50, COLORS.WARNING, 0.8);
    neuronBody.setStrokeStyle(3, COLORS.WARNING);
    objects.push(neuronBody);
    const neuronText = this.scene.add.text(centerX, centerY, 'Σ + f', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    neuronText.setOrigin(0.5);
    objects.push(neuronText);

    // Output (right)
    const outputX = centerX + 150;
    const outputCircle = this.scene.add.circle(outputX, centerY, 25, COLORS.SUCCESS, 0.8);
    outputCircle.setStrokeStyle(2, COLORS.SUCCESS);
    objects.push(outputCircle);
    const outputText = this.scene.add.text(outputX, centerY, 'y', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    outputText.setOrigin(0.5);
    objects.push(outputText);

    // Connection to output
    const outputLine = this.scene.add.graphics();
    outputLine.lineStyle(2, COLORS.SUCCESS);
    outputLine.beginPath();
    outputLine.moveTo(centerX + 50, centerY);
    outputLine.lineTo(outputX - 25, centerY);
    outputLine.strokePath();
    objects.push(outputLine);

    return objects;
  }

  private renderNeuralNetwork(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const layers = [
      { x: x - 200, nodes: 3, label: 'Input' },
      { x: x, nodes: 4, label: 'Hidden' },
      { x: x + 200, nodes: 2, label: 'Output' }
    ];

    layers.forEach((layer, layerIdx) => {
      // Layer label
      const label = this.scene.add.text(layer.x, y - height / 2 + 20, layer.label, {
        fontSize: '14px',
        color: '#aaaaaa',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      objects.push(label);

      // Nodes
      const nodeSpacing = (height - 100) / (layer.nodes + 1);
      for (let i = 0; i < layer.nodes; i++) {
        const nodeY = y - height / 2 + 50 + (i + 1) * nodeSpacing;
        const node = this.scene.add.circle(layer.x, nodeY, 15, 
          layerIdx === 0 ? COLORS.PRIMARY : layerIdx === 1 ? COLORS.SECONDARY : COLORS.SUCCESS, 0.7);
        node.setStrokeStyle(2, 
          layerIdx === 0 ? COLORS.PRIMARY : layerIdx === 1 ? COLORS.SECONDARY : COLORS.SUCCESS);
        objects.push(node);

        // Connections to next layer
        if (layerIdx < layers.length - 1) {
          const nextLayer = layers[layerIdx + 1];
          const nextNodeSpacing = (height - 100) / (nextLayer.nodes + 1);
          for (let j = 0; j < nextLayer.nodes; j++) {
            const nextNodeY = y - height / 2 + 50 + (j + 1) * nextNodeSpacing;
            const connection = this.scene.add.graphics();
            connection.lineStyle(1, COLORS.BG_LIGHT, 0.3);
            connection.beginPath();
            connection.moveTo(layer.x + 15, nodeY);
            connection.lineTo(nextLayer.x - 15, nextNodeY);
            connection.strokePath();
            objects.push(connection);
          }
        }
      }
    });

    return objects;
  }

  private renderPipeline(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const stages = [
      { name: 'Data\nCollection', color: COLORS.PRIMARY },
      { name: 'Data\nPrep', color: COLORS.SECONDARY },
      { name: 'Model\nTraining', color: COLORS.WARNING },
      { name: 'Evaluation', color: COLORS.SUCCESS },
      { name: 'Deployment', color: COLORS.PRIMARY }
    ];

    const stageWidth = width / stages.length;
    const startX = x - width / 2 + stageWidth / 2;

    stages.forEach((stage, i) => {
      const stageX = startX + i * stageWidth;
      const box = this.scene.add.rectangle(stageX, y, stageWidth - 15, 100, stage.color, 0.7);
      box.setStrokeStyle(2, stage.color);
      objects.push(box);

      const text = this.scene.add.text(stageX, y, stage.name, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      text.setOrigin(0.5);
      objects.push(text);

      // Arrow
      if (i < stages.length - 1) {
        const arrow = this.scene.add.graphics();
        arrow.lineStyle(3, COLORS.SECONDARY);
        arrow.beginPath();
        arrow.moveTo(stageX + stageWidth / 2 - 7.5, y);
        arrow.lineTo(stageX + stageWidth / 2 + 7.5, y);
        arrow.strokePath();
        arrow.fillStyle(COLORS.SECONDARY);
        arrow.beginPath();
        arrow.moveTo(stageX + stageWidth / 2 + 7.5, y);
        arrow.lineTo(stageX + stageWidth / 2, y - 6);
        arrow.lineTo(stageX + stageWidth / 2, y + 6);
        arrow.closePath();
        arrow.fillPath();
        objects.push(arrow);
      }
    });

    return objects;
  }

  private renderTeachableFlow(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const steps = [
      { name: 'Collect\nSamples', icon: '📷', x: x - 200 },
      { name: 'Train\nModel', icon: '🧠', x: x },
      { name: 'Test\nPredictions', icon: '✅', x: x + 200 }
    ];

    steps.forEach((step, i) => {
      // Icon
      const iconText = this.scene.add.text(step.x, y - 40, step.icon, {
        fontSize: '40px',
        fontFamily: 'Arial'
      });
      iconText.setOrigin(0.5);
      objects.push(iconText);

      // Box
      const box = this.scene.add.rectangle(step.x, y + 20, 120, 60, COLORS.PRIMARY, 0.7);
      box.setStrokeStyle(2, COLORS.PRIMARY);
      objects.push(box);

      // Text
      const text = this.scene.add.text(step.x, y + 20, step.name, {
        fontSize: '12px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      text.setOrigin(0.5);
      objects.push(text);

      // Arrow
      if (i < steps.length - 1) {
        const arrow = this.scene.add.graphics();
        arrow.lineStyle(3, COLORS.SECONDARY);
        arrow.beginPath();
        arrow.moveTo(step.x + 60, y + 20);
        arrow.lineTo(steps[i + 1].x - 60, y + 20);
        arrow.strokePath();
        arrow.fillStyle(COLORS.SECONDARY);
        arrow.beginPath();
        arrow.moveTo(steps[i + 1].x - 60, y + 20);
        arrow.lineTo(steps[i + 1].x - 70, y + 15);
        arrow.lineTo(steps[i + 1].x - 70, y + 25);
        arrow.closePath();
        arrow.fillPath();
        objects.push(arrow);
      }
    });

    return objects;
  }
}

