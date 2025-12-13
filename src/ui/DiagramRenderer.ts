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
      case 'ai-subset':
        objects.push(...this.renderAISubset(x, y, width, height));
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
      case 'train-test-split':
        objects.push(...this.renderTrainTestSplit(x, y, width, height));
        break;
      case 'fitting-comparison':
        objects.push(...this.renderFittingComparison(x, y, width, height));
        break;
      case 'data-quality-impact':
        objects.push(...this.renderDataQualityImpact(x, y, width, height));
        break;
      case 'data-cleaning-steps':
        objects.push(...this.renderDataCleaningSteps(x, y, width, height));
        break;
      case 'data-quality-checklist':
        objects.push(...this.renderDataQualityChecklist(x, y, width, height));
        break;
      case 'ml-types-overview':
        objects.push(...this.renderMLTypesOverview(x, y, width, height));
        break;
      case 'error-visualization':
        objects.push(...this.renderErrorVisualization(x, y, width, height));
        break;
      case 'mse-mae-comparison':
        objects.push(...this.renderMSEMAEComparison(x, y, width, height));
        break;
      case 'optimization-landscape':
        objects.push(...this.renderOptimizationLandscape(x, y, width, height));
        break;
      case 'r2-visualization':
        objects.push(...this.renderR2Visualization(x, y, width, height));
        break;
      case 'error-metrics-combined':
        objects.push(...this.renderErrorMetricsCombined(x, y, width, height));
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

  private renderAISubset(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Draw three nested circles showing AI ⊃ ML ⊃ DL
    // Outer circle: AI (largest)
    const aiRadius = Math.min(width, height) * 0.45;
    const aiCircle = this.scene.add.circle(centerX, centerY, aiRadius);
    aiCircle.setStrokeStyle(4, COLORS.PRIMARY, 0.8);
    aiCircle.setFillStyle(COLORS.PRIMARY, 0.1);
    objects.push(aiCircle);

    const aiLabel = this.scene.add.text(centerX, centerY - aiRadius + 30, 'AI', {
      fontSize: '22px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    aiLabel.setOrigin(0.5);
    objects.push(aiLabel);

    const aiSubtext = this.scene.add.text(centerX, centerY - aiRadius + 60, 'All intelligent systems', {
      fontSize: '14px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'center'
    });
    aiSubtext.setOrigin(0.5);
    objects.push(aiSubtext);

    // Middle circle: ML (subset of AI)
    const mlRadius = aiRadius * 0.65;
    const mlCircle = this.scene.add.circle(centerX, centerY + 20, mlRadius);
    mlCircle.setStrokeStyle(4, COLORS.SECONDARY, 0.9);
    mlCircle.setFillStyle(COLORS.SECONDARY, 0.15);
    objects.push(mlCircle);

    const mlLabel = this.scene.add.text(centerX, centerY - mlRadius + 50, 'ML', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    mlLabel.setOrigin(0.5);
    objects.push(mlLabel);

    const mlSubtext = this.scene.add.text(centerX, centerY - mlRadius + 75, 'Learns from data', {
      fontSize: '13px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'center'
    });
    mlSubtext.setOrigin(0.5);
    objects.push(mlSubtext);

    // Inner circle: DL (subset of ML)
    const dlRadius = mlRadius * 0.55;
    const dlCircle = this.scene.add.circle(centerX, centerY + 40, dlRadius);
    dlCircle.setStrokeStyle(4, COLORS.WARNING, 1);
    dlCircle.setFillStyle(COLORS.WARNING, 0.2);
    objects.push(dlCircle);

    const dlLabel = this.scene.add.text(centerX, centerY + 10, 'DL', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    dlLabel.setOrigin(0.5);
    objects.push(dlLabel);

    const dlSubtext = this.scene.add.text(centerX, centerY + 35, 'Neural networks', {
      fontSize: '12px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'center'
    });
    dlSubtext.setOrigin(0.5);
    objects.push(dlSubtext);

    // Add relationship indicators
    // Arrow/text showing subset relationship
    const relationText1 = this.scene.add.text(centerX + aiRadius - 80, centerY - aiRadius / 2, 'ML ⊂ AI', {
      fontSize: '16px',
      color: '#' + COLORS.SECONDARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    relationText1.setOrigin(0.5);
    objects.push(relationText1);

    const relationText2 = this.scene.add.text(centerX + mlRadius - 60, centerY + mlRadius / 2, 'DL ⊂ ML', {
      fontSize: '16px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    relationText2.setOrigin(0.5);
    objects.push(relationText2);

    return objects;
  }

  private renderTrainTestSplit(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Original dataset box (left side)
    const datasetX = centerX - width / 3;
    const datasetY = centerY;
    const datasetBox = this.scene.add.rectangle(datasetX, datasetY, 180, 250, COLORS.PRIMARY, 0.3);
    datasetBox.setStrokeStyle(3, COLORS.PRIMARY);
    objects.push(datasetBox);

    const datasetLabel = this.scene.add.text(datasetX, datasetY - 100, 'Full Dataset', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    datasetLabel.setOrigin(0.5);
    objects.push(datasetLabel);

    const datasetIcon = this.scene.add.text(datasetX, datasetY - 40, '📊', {
      fontSize: '50px'
    });
    datasetIcon.setOrigin(0.5);
    objects.push(datasetIcon);

    const datasetInfo = this.scene.add.text(datasetX, datasetY + 30, '100%\nAll Data', {
      fontSize: '16px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'center'
    });
    datasetInfo.setOrigin(0.5);
    objects.push(datasetInfo);

    // Split arrow
    const arrowX = centerX - width / 6;
    const arrow = this.scene.add.graphics();
    arrow.lineStyle(4, COLORS.WARNING);
    arrow.beginPath();
    arrow.moveTo(datasetX + 90, datasetY);
    arrow.lineTo(arrowX, datasetY);
    arrow.strokePath();
    // Arrowhead
    arrow.fillStyle(COLORS.WARNING);
    arrow.fillTriangle(arrowX, datasetY, arrowX - 12, datasetY - 8, arrowX - 12, datasetY + 8);
    objects.push(arrow);

    const splitLabel = this.scene.add.text(datasetX + 90 + (arrowX - datasetX - 90) / 2, datasetY - 25, 'SPLIT', {
      fontSize: '14px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    splitLabel.setOrigin(0.5);
    objects.push(splitLabel);

    // Training set (top right)
    const trainX = centerX + width / 4;
    const trainY = centerY - 80;
    const trainBox = this.scene.add.rectangle(trainX, trainY, 200, 160, COLORS.SUCCESS, 0.3);
    trainBox.setStrokeStyle(3, COLORS.SUCCESS);
    objects.push(trainBox);

    const trainLabel = this.scene.add.text(trainX, trainY - 60, 'Training Set', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    trainLabel.setOrigin(0.5);
    objects.push(trainLabel);

    const trainIcon = this.scene.add.text(trainX, trainY - 10, '🎓', {
      fontSize: '40px'
    });
    trainIcon.setOrigin(0.5);
    objects.push(trainIcon);

    const trainInfo = this.scene.add.text(trainX, trainY + 40, '80-90%\nLearn patterns', {
      fontSize: '15px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'center'
    });
    trainInfo.setOrigin(0.5);
    objects.push(trainInfo);

    // Testing set (bottom right)
    const testX = centerX + width / 4;
    const testY = centerY + 80;
    const testBox = this.scene.add.rectangle(testX, testY, 200, 160, COLORS.SECONDARY, 0.3);
    testBox.setStrokeStyle(3, COLORS.SECONDARY);
    objects.push(testBox);

    const testLabel = this.scene.add.text(testX, testY - 60, 'Testing Set', {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    testLabel.setOrigin(0.5);
    objects.push(testLabel);

    const testIcon = this.scene.add.text(testX, testY - 10, '📝', {
      fontSize: '40px'
    });
    testIcon.setOrigin(0.5);
    objects.push(testIcon);

    const testInfo = this.scene.add.text(testX, testY + 40, '10-20%\nEvaluate model', {
      fontSize: '15px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'center'
    });
    testInfo.setOrigin(0.5);
    objects.push(testInfo);

    // Connecting lines from split to train/test
    const splitConnector = this.scene.add.graphics();
    splitConnector.lineStyle(3, COLORS.BG_LIGHT);
    splitConnector.beginPath();
    splitConnector.moveTo(arrowX, datasetY);
    splitConnector.lineTo(trainX - 100, trainY);
    splitConnector.strokePath();
    splitConnector.beginPath();
    splitConnector.moveTo(arrowX, datasetY);
    splitConnector.lineTo(testX - 100, testY);
    splitConnector.strokePath();
    objects.push(splitConnector);

    // Warning note
    const warningNote = this.scene.add.text(testX, testY + 90, '⚠️ Never train on test data!', {
      fontSize: '14px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    warningNote.setOrigin(0.5);
    objects.push(warningNote);

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

  private renderFittingComparison(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Three plots side by side
    const plotWidth = 220;
    const plotHeight = 180;
    const spacing = 250;
    const startX = centerX - spacing;

    const plots = [
      { 
        title: 'Underfitting', 
        subtitle: 'Too Simple',
        x: startX, 
        color: COLORS.ERROR,
        icon: '📉',
        type: 'underfit' as const
      },
      { 
        title: 'Good Fit', 
        subtitle: 'Just Right',
        x: centerX, 
        color: COLORS.SUCCESS,
        icon: '✅',
        type: 'goodfit' as const
      },
      { 
        title: 'Overfitting', 
        subtitle: 'Too Complex',
        x: startX + spacing * 2, 
        color: COLORS.WARNING,
        icon: '📈',
        type: 'overfit' as const
      }
    ];

    plots.forEach(plot => {
      // Plot background
      const plotBg = this.scene.add.rectangle(plot.x, centerY, plotWidth, plotHeight, 0x1a1a2e, 0.6);
      plotBg.setStrokeStyle(2, plot.color);
      objects.push(plotBg);

      // Title
      const titleText = this.scene.add.text(plot.x, centerY - plotHeight/2 - 30, plot.title, {
        fontSize: '18px',
        color: '#' + plot.color.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      titleText.setOrigin(0.5);
      objects.push(titleText);

      // Subtitle
      const subtitleText = this.scene.add.text(plot.x, centerY - plotHeight/2 - 10, plot.subtitle, {
        fontSize: '13px',
        color: '#aaaaaa',
        fontFamily: 'Arial',
        align: 'center'
      });
      subtitleText.setOrigin(0.5);
      objects.push(subtitleText);

      // Icon
      const iconText = this.scene.add.text(plot.x, centerY + plotHeight/2 + 25, plot.icon, {
        fontSize: '24px'
      });
      iconText.setOrigin(0.5);
      objects.push(iconText);

      // Draw axes
      const graphics = this.scene.add.graphics();
      graphics.lineStyle(2, 0x666666);
      
      // X-axis
      graphics.beginPath();
      graphics.moveTo(plot.x - plotWidth/2 + 20, centerY + plotHeight/2 - 20);
      graphics.lineTo(plot.x + plotWidth/2 - 20, centerY + plotHeight/2 - 20);
      graphics.strokePath();
      
      // Y-axis
      graphics.beginPath();
      graphics.moveTo(plot.x - plotWidth/2 + 20, centerY + plotHeight/2 - 20);
      graphics.lineTo(plot.x - plotWidth/2 + 20, centerY - plotHeight/2 + 20);
      graphics.strokePath();
      
      objects.push(graphics);

      // Generate sample data points (same for all three)
      const dataPoints: Array<{x: number, y: number}> = [];
      const numPoints = 8;
      for (let i = 0; i < numPoints; i++) {
        const xPos = plot.x - plotWidth/2 + 30 + (i * (plotWidth - 50) / (numPoints - 1));
        // Create a curved pattern with some noise
        const normalizedX = i / (numPoints - 1);
        const baseY = Math.sin(normalizedX * Math.PI * 1.5) * 50 + Math.random() * 15 - 7.5;
        const yPos = centerY + plotHeight/2 - 30 - baseY;
        dataPoints.push({ x: xPos, y: yPos });
      }

      // Draw data points
      dataPoints.forEach(point => {
        const circle = this.scene.add.circle(point.x, point.y, 4, 0xffffff);
        objects.push(circle);
      });

      // Draw fitting curves
      const curveGraphics = this.scene.add.graphics();
      curveGraphics.lineStyle(3, plot.color);
      
      if (plot.type === 'underfit') {
        // Simple straight line (doesn't follow the curve)
        curveGraphics.beginPath();
        curveGraphics.moveTo(dataPoints[0].x, dataPoints[0].y + 20);
        curveGraphics.lineTo(dataPoints[dataPoints.length - 1].x, dataPoints[dataPoints.length - 1].y - 10);
        curveGraphics.strokePath();
      } else if (plot.type === 'goodfit') {
        // Smooth curve that captures general trend
        curveGraphics.beginPath();
        
        // Create a smooth approximation of the data trend
        const smoothPoints: Array<{x: number, y: number}> = [];
        for (let i = 0; i < dataPoints.length; i++) {
          // Apply simple moving average for smoothing
          let sumY = 0;
          let count = 0;
          for (let j = Math.max(0, i - 1); j <= Math.min(dataPoints.length - 1, i + 1); j++) {
            sumY += dataPoints[j].y;
            count++;
          }
          smoothPoints.push({ x: dataPoints[i].x, y: sumY / count });
        }
        
        curveGraphics.moveTo(smoothPoints[0].x, smoothPoints[0].y);
        for (let i = 1; i < smoothPoints.length; i++) {
          curveGraphics.lineTo(smoothPoints[i].x, smoothPoints[i].y);
        }
        curveGraphics.strokePath();
      } else if (plot.type === 'overfit') {
        // Wiggly curve that goes through every point
        curveGraphics.beginPath();
        curveGraphics.moveTo(dataPoints[0].x, dataPoints[0].y);
        
        for (let i = 1; i < dataPoints.length; i++) {
          const currPoint = dataPoints[i];
          curveGraphics.lineTo(currPoint.x, currPoint.y);
        }
        curveGraphics.strokePath();
      }
      
      objects.push(curveGraphics);
    });

    // Performance indicators below
    const perfY = centerY + plotHeight/2 + 55;
    
    // Underfitting performance
    const underPerf = this.scene.add.text(startX, perfY, 'Training: 60%\nTesting: 58%', {
      fontSize: '12px',
      color: '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      align: 'center'
    });
    underPerf.setOrigin(0.5);
    objects.push(underPerf);

    // Good fit performance
    const goodPerf = this.scene.add.text(centerX, perfY, 'Training: 92%\nTesting: 90%', {
      fontSize: '12px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      align: 'center'
    });
    goodPerf.setOrigin(0.5);
    objects.push(goodPerf);

    // Overfitting performance
    const overPerf = this.scene.add.text(startX + spacing * 2, perfY, 'Training: 99%\nTesting: 65%', {
      fontSize: '12px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      align: 'center'
    });
    overPerf.setOrigin(0.5);
    objects.push(overPerf);

    return objects;
  }

  private renderDataQualityImpact(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Two parallel flows: Good data path (top) and Bad data path (bottom)
    const pathSpacing = 110;
    const goodY = centerY - pathSpacing;
    const badY = centerY + pathSpacing;

    // === GOOD DATA PATH (TOP) ===
    const goodStartX = centerX - 280;

    // Good data input
    const goodDataBox = this.scene.add.rectangle(goodStartX, goodY, 140, 80, COLORS.SUCCESS, 0.3);
    goodDataBox.setStrokeStyle(3, COLORS.SUCCESS);
    objects.push(goodDataBox);

    const goodDataIcon = this.scene.add.text(goodStartX, goodY - 20, '✓ 📊', {
      fontSize: '30px'
    });
    goodDataIcon.setOrigin(0.5);
    objects.push(goodDataIcon);

    const goodDataLabel = this.scene.add.text(goodStartX, goodY + 15, 'Quality Data', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    goodDataLabel.setOrigin(0.5);
    objects.push(goodDataLabel);

    // Arrow 1
    const arrow1Good = this.scene.add.graphics();
    arrow1Good.lineStyle(3, COLORS.SUCCESS);
    arrow1Good.beginPath();
    arrow1Good.moveTo(goodStartX + 70, goodY);
    arrow1Good.lineTo(centerX - 90, goodY);
    arrow1Good.strokePath();
    arrow1Good.fillStyle(COLORS.SUCCESS);
    arrow1Good.fillTriangle(centerX - 90, goodY, centerX - 100, goodY - 6, centerX - 100, goodY + 6);
    objects.push(arrow1Good);

    // ML Training (middle)
    const goodMLBox = this.scene.add.rectangle(centerX, goodY, 140, 80, COLORS.PRIMARY, 0.3);
    goodMLBox.setStrokeStyle(3, COLORS.PRIMARY);
    objects.push(goodMLBox);

    const goodMLIcon = this.scene.add.text(centerX, goodY - 20, '🧠', {
      fontSize: '30px'
    });
    goodMLIcon.setOrigin(0.5);
    objects.push(goodMLIcon);

    const goodMLLabel = this.scene.add.text(centerX, goodY + 15, 'ML Training', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    goodMLLabel.setOrigin(0.5);
    objects.push(goodMLLabel);

    // Arrow 2
    const arrow2Good = this.scene.add.graphics();
    arrow2Good.lineStyle(3, COLORS.SUCCESS);
    arrow2Good.beginPath();
    arrow2Good.moveTo(centerX + 70, goodY);
    arrow2Good.lineTo(centerX + 210, goodY);
    arrow2Good.strokePath();
    arrow2Good.fillStyle(COLORS.SUCCESS);
    arrow2Good.fillTriangle(centerX + 210, goodY, centerX + 200, goodY - 6, centerX + 200, goodY + 6);
    objects.push(arrow2Good);

    // Good model output
    const goodEndX = centerX + 280;
    const goodModelBox = this.scene.add.rectangle(goodEndX, goodY, 140, 80, COLORS.SUCCESS, 0.3);
    goodModelBox.setStrokeStyle(3, COLORS.SUCCESS);
    objects.push(goodModelBox);

    const goodModelIcon = this.scene.add.text(goodEndX, goodY - 20, '⭐', {
      fontSize: '30px'
    });
    goodModelIcon.setOrigin(0.5);
    objects.push(goodModelIcon);

    const goodModelLabel = this.scene.add.text(goodEndX, goodY + 15, 'Quality Model', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    goodModelLabel.setOrigin(0.5);
    objects.push(goodModelLabel);

    // === BAD DATA PATH (BOTTOM) ===
    const badStartX = centerX - 280;

    // Bad data input
    const badDataBox = this.scene.add.rectangle(badStartX, badY, 140, 80, COLORS.ERROR, 0.3);
    badDataBox.setStrokeStyle(3, COLORS.ERROR);
    objects.push(badDataBox);

    const badDataIcon = this.scene.add.text(badStartX, badY - 20, '🗑️ ', {
      fontSize: '28px'
    });
    badDataIcon.setOrigin(0.5);
    objects.push(badDataIcon);

    const badDataLabel = this.scene.add.text(badStartX, badY + 15, 'Garbage Data', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    badDataLabel.setOrigin(0.5);
    objects.push(badDataLabel);

    // Arrow 1
    const arrow1Bad = this.scene.add.graphics();
    arrow1Bad.lineStyle(3, COLORS.ERROR);
    arrow1Bad.beginPath();
    arrow1Bad.moveTo(badStartX + 70, badY);
    arrow1Bad.lineTo(centerX - 90, badY);
    arrow1Bad.strokePath();
    arrow1Bad.fillStyle(COLORS.ERROR);
    arrow1Bad.fillTriangle(centerX - 90, badY, centerX - 100, badY - 6, centerX - 100, badY + 6);
    objects.push(arrow1Bad);

    // ML Training (middle)
    const badMLBox = this.scene.add.rectangle(centerX, badY, 140, 80, COLORS.PRIMARY, 0.3);
    badMLBox.setStrokeStyle(3, COLORS.PRIMARY);
    objects.push(badMLBox);

    const badMLIcon = this.scene.add.text(centerX, badY - 20, '🧠', {
      fontSize: '30px'
    });
    badMLIcon.setOrigin(0.5);
    objects.push(badMLIcon);

    const badMLLabel = this.scene.add.text(centerX, badY + 15, 'ML Training', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    badMLLabel.setOrigin(0.5);
    objects.push(badMLLabel);

    // Arrow 2
    const arrow2Bad = this.scene.add.graphics();
    arrow2Bad.lineStyle(3, COLORS.ERROR);
    arrow2Bad.beginPath();
    arrow2Bad.moveTo(centerX + 70, badY);
    arrow2Bad.lineTo(centerX + 210, badY);
    arrow2Bad.strokePath();
    arrow2Bad.fillStyle(COLORS.ERROR);
    arrow2Bad.fillTriangle(centerX + 210, badY, centerX + 200, badY - 6, centerX + 200, badY + 6);
    objects.push(arrow2Bad);

    // Bad model output
    const badEndX = centerX + 280;
    const badModelBox = this.scene.add.rectangle(badEndX, badY, 140, 80, COLORS.ERROR, 0.3);
    badModelBox.setStrokeStyle(3, COLORS.ERROR);
    objects.push(badModelBox);

    const badModelIcon = this.scene.add.text(badEndX, badY - 20, '❌', {
      fontSize: '30px'
    });
    badModelIcon.setOrigin(0.5);
    objects.push(badModelIcon);

    const badModelLabel = this.scene.add.text(badEndX, badY + 15, 'Poor Model', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    badModelLabel.setOrigin(0.5);
    objects.push(badModelLabel);

    // Title at top
    const titleText = this.scene.add.text(centerX, centerY - 180, 'Garbage In, Garbage Out (GIGO)', {
      fontSize: '20px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    titleText.setOrigin(0.5);
    objects.push(titleText);

    // Data quality examples
    const goodExamples = this.scene.add.text(goodStartX, goodY - 60, 'Clean, accurate,\nrepresentative', {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      align: 'center'
    });
    goodExamples.setOrigin(0.5);
    objects.push(goodExamples);

    const badExamples = this.scene.add.text(badStartX, badY + 60, 'Biased, incomplete,\ninaccurate', {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      align: 'center'
    });
    badExamples.setOrigin(0.5);
    objects.push(badExamples);

    return objects;
  }

  private renderDataCleaningSteps(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Vertical pipeline showing data cleaning steps
    const steps = [
      { 
        title: '1. Raw Data', 
        icon: '📁', 
        description: 'Messy, unprocessed',
        color: COLORS.ERROR,
        y: centerY - 150
      },
      { 
        title: '2. Remove Duplicates', 
        icon: '🗑️', 
        description: 'Delete repeated entries',
        color: COLORS.WARNING,
        y: centerY - 90
      },
      { 
        title: '3. Handle Missing Values', 
        icon: '🔧', 
        description: 'Fill gaps or remove',
        color: COLORS.WARNING,
        y: centerY - 30
      },
      { 
        title: '4. Fix Errors & Outliers', 
        icon: '🎯', 
        description: 'Correct inconsistencies',
        color: COLORS.SECONDARY,
        y: centerY + 30
      },
      { 
        title: '5. Standardize Format', 
        icon: '⚙️', 
        description: 'Normalize & encode',
        color: COLORS.SECONDARY,
        y: centerY + 90
      },
      { 
        title: '6. Clean Data Ready!', 
        icon: '✅', 
        description: 'Ready for ML',
        color: COLORS.SUCCESS,
        y: centerY + 150
      }
    ];

    steps.forEach((step, index) => {
      // Step box
      const box = this.scene.add.rectangle(centerX, step.y, 400, 50, step.color, 0.2);
      box.setStrokeStyle(3, step.color);
      objects.push(box);

      // Icon
      const iconText = this.scene.add.text(centerX - 170, step.y, step.icon, {
        fontSize: '28px'
      });
      iconText.setOrigin(0.5);
      objects.push(iconText);

      // Title
      const titleText = this.scene.add.text(centerX - 120, step.y - 10, step.title, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      titleText.setOrigin(0, 0.5);
      objects.push(titleText);

      // Description
      const descText = this.scene.add.text(centerX - 120, step.y + 10, step.description, {
        fontSize: '13px',
        color: '#aaaaaa',
        fontFamily: 'Arial'
      });
      descText.setOrigin(0, 0.5);
      objects.push(descText);

      // Arrow to next step (except for last step)
      if (index < steps.length - 1) {
        const arrow = this.scene.add.graphics();
        arrow.lineStyle(3, 0x888888);
        arrow.beginPath();
        arrow.moveTo(centerX, step.y + 25);
        arrow.lineTo(centerX, steps[index + 1].y - 25);
        arrow.strokePath();
        
        // Arrowhead
        arrow.fillStyle(0x888888);
        const nextY = steps[index + 1].y - 25;
        arrow.fillTriangle(centerX, nextY, centerX - 6, nextY - 10, centerX + 6, nextY - 10);
        objects.push(arrow);
      }
    });

    // Add side annotations showing before/after quality
    const beforeLabel = this.scene.add.text(centerX - 250, centerY - 150, 'Dirty ', {
      fontSize: '14px',
      color: '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    beforeLabel.setOrigin(0.5);
    objects.push(beforeLabel);

    const afterLabel = this.scene.add.text(centerX + 250, centerY + 150, 'Clean ✨', {
      fontSize: '14px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    afterLabel.setOrigin(0.5);
    objects.push(afterLabel);

    // Examples of issues (left side)
    const issuesBox = this.scene.add.rectangle(centerX - 280, centerY - 20, 140, 160, 0x1a1a2e, 0.5);
    issuesBox.setStrokeStyle(2, COLORS.ERROR, 0.5);
    objects.push(issuesBox);

    const issuesTitle = this.scene.add.text(centerX - 280, centerY - 80, 'Common Issues:', {
      fontSize: '13px',
      color: '#' + COLORS.ERROR.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    issuesTitle.setOrigin(0.5);
    objects.push(issuesTitle);

    const issuesList = this.scene.add.text(centerX - 280, centerY - 10, '• Duplicates\n• Missing: ???\n• Typos\n• Outliers\n• Wrong format', {
      fontSize: '11px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'left',
      lineSpacing: 6
    });
    issuesList.setOrigin(0.5);
    objects.push(issuesList);

    // Result quality indicators (right side)
    const resultBox = this.scene.add.rectangle(centerX + 280, centerY + 20, 140, 160, 0x1a1a2e, 0.5);
    resultBox.setStrokeStyle(2, COLORS.SUCCESS, 0.5);
    objects.push(resultBox);

    const resultTitle = this.scene.add.text(centerX + 280, centerY - 40, 'Result Quality:', {
      fontSize: '13px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    resultTitle.setOrigin(0.5);
    objects.push(resultTitle);

    const resultList = this.scene.add.text(centerX + 280, centerY + 30, '✓ Complete\n✓ Consistent\n✓ Accurate\n✓ Structured\n✓ ML-Ready', {
      fontSize: '11px',
      color: '#cccccc',
      fontFamily: 'Arial',
      align: 'left',
      lineSpacing: 6
    });
    resultList.setOrigin(0.5);
    objects.push(resultList);

    return objects;
  }

  private renderDataQualityChecklist(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // 6 characteristics in a 2x3 grid
    const characteristics = [
      { 
        icon: '✅', 
        title: 'Accurate', 
        desc: 'Labels correct\nFeatures reliable',
        color: COLORS.SUCCESS,
        x: centerX - 200,
        y: centerY - 120
      },
      { 
        icon: '📊', 
        title: 'Representative', 
        desc: 'Real-world diversity\nAll scenarios',
        color: COLORS.PRIMARY,
        x: centerX + 200,
        y: centerY - 120
      },
      { 
        icon: '🧹', 
        title: 'Clean', 
        desc: 'No missing values\nNo errors',
        color: COLORS.SECONDARY,
        x: centerX - 200,
        y: centerY
      },
      { 
        icon: '⚖️', 
        title: 'Balanced', 
        desc: 'Sufficient examples\nPer category',
        color: COLORS.WARNING,
        x: centerX + 200,
        y: centerY
      },
      { 
        icon: '🎯', 
        title: 'Relevant', 
        desc: 'Features relate\nto problem',
        color: COLORS.PRIMARY,
        x: centerX - 200,
        y: centerY + 120
      },
      { 
        icon: '📈', 
        title: 'Sufficient', 
        desc: '100s-1000s+\nexamples',
        color: COLORS.SUCCESS,
        x: centerX + 200,
        y: centerY + 120
      }
    ];

    characteristics.forEach(char => {
      // Card background
      const card = this.scene.add.rectangle(char.x, char.y, 180, 100, char.color, 0.15);
      card.setStrokeStyle(2, char.color);
      objects.push(card);

      // Icon
      const iconText = this.scene.add.text(char.x, char.y - 30, char.icon, {
        fontSize: '32px'
      });
      iconText.setOrigin(0.5);
      objects.push(iconText);

      // Title
      const titleText = this.scene.add.text(char.x, char.y + 5, char.title, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      titleText.setOrigin(0.5);
      objects.push(titleText);

      // Description
      const descText = this.scene.add.text(char.x, char.y + 30, char.desc, {
        fontSize: '12px',
        color: '#aaaaaa',
        fontFamily: 'Arial',
        align: 'center',
        lineSpacing: 4
      });
      descText.setOrigin(0.5);
      objects.push(descText);
    });

    // Central title/header
    const headerText = this.scene.add.text(centerX, centerY - 200, 'Quality Data Checklist', {
      fontSize: '22px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    headerText.setOrigin(0.5);
    objects.push(headerText);

    // Bottom note
    const noteText = this.scene.add.text(centerX, centerY + 200, '💡 Data scientists spend 60-80% of time on data quality!', {
      fontSize: '14px',
      color: '#888888',
      fontFamily: 'Arial',
      fontStyle: 'italic',
      align: 'center'
    });
    noteText.setOrigin(0.5);
    objects.push(noteText);

    return objects;
  }

  private renderMLTypesOverview(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const centerX = x;
    const centerY = y;

    // Three main ML types arranged horizontally
    const mainTypes = [
      {
        title: 'Supervised Learning',
        icon: '📚',
        color: COLORS.SUCCESS,
        x: centerX - 300,
        y: centerY - 100,
        description: 'With labels',
        subtypes: [
          { name: 'Classification', icon: '🏷️', desc: 'Categorize data' },
          { name: 'Regression', icon: '📈', desc: 'Predict numbers' }
        ]
      },
      {
        title: 'Unsupervised Learning',
        icon: '🔍',
        color: COLORS.PRIMARY,
        x: centerX,
        y: centerY - 100,
        description: 'No labels',
        subtypes: [
          { name: 'Clustering', icon: '👥', desc: 'Find groups' },
          { name: 'Association Rules', icon: '🔗', desc: 'Find patterns' }
        ]
      },
      {
        title: 'Reinforcement Learning',
        icon: '🎮',
        color: COLORS.WARNING,
        x: centerX + 300,
        y: centerY - 100,
        description: 'Trial & reward',
        subtypes: []
      }
    ];

    mainTypes.forEach((mainType) => {
      // Main type box
      const mainBox = this.scene.add.rectangle(mainType.x, mainType.y, 200, 120, mainType.color, 0.2);
      mainBox.setStrokeStyle(3, mainType.color);
      objects.push(mainBox);

      // Icon
      const iconText = this.scene.add.text(mainType.x, mainType.y - 35, mainType.icon, {
        fontSize: '40px'
      });
      iconText.setOrigin(0.5);
      objects.push(iconText);

      // Title
      const titleText = this.scene.add.text(mainType.x, mainType.y + 10, mainType.title, {
        fontSize: '16px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center',
        wordWrap: { width: 180 }
      });
      titleText.setOrigin(0.5);
      objects.push(titleText);

      // Description
      const descText = this.scene.add.text(mainType.x, mainType.y + 35, mainType.description, {
        fontSize: '13px',
        color: '#aaaaaa',
        fontFamily: 'Arial',
        align: 'center'
      });
      descText.setOrigin(0.5);
      objects.push(descText);

      // Subtypes (for Supervised and Unsupervised)
      if (mainType.subtypes.length > 0) {
        const subtypeY = centerY + 60;
        const subtypeSpacing = 330 / (mainType.subtypes.length + 1);
        const startX = mainType.x - (mainType.subtypes.length - 1) * subtypeSpacing / 2;

        mainType.subtypes.forEach((subtype, subIndex) => {
          const subX = startX + subIndex * subtypeSpacing;

          // Arrow from main to subtype
          const arrow = this.scene.add.graphics();
          arrow.lineStyle(2, mainType.color, 0.6);
          arrow.beginPath();
          arrow.moveTo(mainType.x, mainType.y + 60);
          arrow.lineTo(subX, subtypeY - 20);
          arrow.strokePath();
          arrow.fillStyle(mainType.color, 0.6);
          arrow.fillTriangle(subX, subtypeY - 20, subX - 5, subtypeY - 28, subX + 5, subtypeY - 28);
          objects.push(arrow);

          // Subtype box
          const subBox = this.scene.add.rectangle(subX, subtypeY, 140, 70, mainType.color, 0.15);
          subBox.setStrokeStyle(2, mainType.color);
          objects.push(subBox);

          // Subtype icon
          const subIcon = this.scene.add.text(subX, subtypeY - 20, subtype.icon, {
            fontSize: '24px'
          });
          subIcon.setOrigin(0.5);
          objects.push(subIcon);

          // Subtype name
          const subName = this.scene.add.text(subX, subtypeY + 5, subtype.name, {
            fontSize: '12px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: 130 }
          });
          subName.setOrigin(0.5);
          objects.push(subName);

          // Subtype description
          const subDesc = this.scene.add.text(subX, subtypeY + 25, subtype.desc, {
            fontSize: '11px',
            color: '#aaaaaa',
            fontFamily: 'Arial',
            align: 'center'
          });
          subDesc.setOrigin(0.5);
          objects.push(subDesc);
        });
      } else {
        // For Reinforcement Learning, show key concept
        const rlDesc = this.scene.add.text(mainType.x, centerY + 60, 'Agent learns through\nrewards & penalties', {
          fontSize: '13px',
          color: '#aaaaaa',
          fontFamily: 'Arial',
          align: 'center',
          lineSpacing: 4
        });
        rlDesc.setOrigin(0.5);
        objects.push(rlDesc);
      }
    });

    // Examples section at bottom
    const examplesY = centerY + 180;
    const examples = [
      { type: 'Supervised', examples: 'Spam detection, Price prediction', color: COLORS.SUCCESS },
      { type: 'Unsupervised', examples: 'Customer segments, Anomaly detection', color: COLORS.PRIMARY },
      { type: 'Reinforcement', examples: 'Game AI, Robot control', color: COLORS.WARNING }
    ];

    examples.forEach((example, index) => {
      const exX = centerX - 300 + index * 300;
      const exBox = this.scene.add.rectangle(exX, examplesY, 250, 50, 0x1a1a2e, 0.5);
      exBox.setStrokeStyle(2, example.color);
      objects.push(exBox);

      const exType = this.scene.add.text(exX, examplesY - 12, example.type + ':', {
        fontSize: '13px',
        color: '#' + example.color.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold',
        align: 'center'
      });
      exType.setOrigin(0.5);
      objects.push(exType);

      const exText = this.scene.add.text(exX, examplesY + 12, example.examples, {
        fontSize: '11px',
        color: '#cccccc',
        fontFamily: 'Arial',
        align: 'center',
        wordWrap: { width: 230 }
      });
      exText.setOrigin(0.5);
      objects.push(exText);
    });

    return objects;
  }

  private renderErrorVisualization(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const padding = 50;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Sample data points
    const dataPoints = [
      { x: 1, y: 2.5 }, { x: 2, y: 4.2 }, { x: 3, y: 5.8 }, { x: 4, y: 7.5 },
      { x: 5, y: 9.2 }, { x: 6, y: 11.1 }, { x: 7, y: 12.8 }
    ];

    // Best fit line (y = 2x + 0.5)
    const slope = 2;
    const intercept = 0.5;

    // Find min/max for scaling
    const xValues = dataPoints.map(p => p.x);
    const yValues = dataPoints.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Draw axes
    const axes = this.scene.add.graphics();
    axes.lineStyle(2, COLORS.TEXT);
    axes.beginPath();
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX, graphY - graphHeight);
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX + graphWidth, graphY);
    axes.strokePath();
    objects.push(axes);

    // Draw best-fit line
    const line = this.scene.add.graphics();
    line.lineStyle(3, COLORS.SUCCESS);
    line.beginPath();
    const startX = graphX;
    const startY = graphY - ((slope * minX + intercept - minY) / (maxY - minY)) * graphHeight;
    const endX = graphX + graphWidth;
    const endY = graphY - ((slope * maxX + intercept - minY) / (maxY - minY)) * graphHeight;
    line.moveTo(startX, startY);
    line.lineTo(endX, endY);
    line.strokePath();
    objects.push(line);

    // Draw data points and error lines
    dataPoints.forEach(point => {
      const plotX = graphX + ((point.x - minX) / (maxX - minX)) * graphWidth;
      const plotY = graphY - ((point.y - minY) / (maxY - minY)) * graphHeight;
      
      // Predicted y value on the line
      const predictedY = slope * point.x + intercept;
      const predictedPlotY = graphY - ((predictedY - minY) / (maxY - minY)) * graphHeight;
      
      // Draw error line (red dashed)
      const errorLine = this.scene.add.graphics();
      errorLine.lineStyle(2, COLORS.ERROR, 0.7);
      errorLine.lineBetween(plotX, plotY, plotX, predictedPlotY);
      objects.push(errorLine);
      
      // Draw data point
      const pointCircle = this.scene.add.circle(plotX, plotY, 6, COLORS.PRIMARY);
      pointCircle.setStrokeStyle(2, COLORS.TEXT);
      objects.push(pointCircle);
    });

    // Labels
    const xLabel = this.scene.add.text(graphX + graphWidth / 2, graphY + 25, 'X (Input)', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    xLabel.setOrigin(0.5);
    objects.push(xLabel);

    const yLabel = this.scene.add.text(graphX - 25, graphY - graphHeight / 2, 'Y (Output)', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    yLabel.setOrigin(0.5);
    yLabel.setAngle(-90);
    objects.push(yLabel);

    // Title
    const title = this.scene.add.text(x, y - height / 2 + 20, 'Prediction Errors', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    objects.push(title);

    // Legend
    const legendY = graphY + 50;
    const legend1 = this.scene.add.text(graphX + 20, legendY, '● Data Point', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    legend1.setOrigin(0, 0.5);
    objects.push(legend1);

    const legend2 = this.scene.add.graphics();
    legend2.lineStyle(2, COLORS.SUCCESS);
    legend2.lineBetween(graphX + 100, legendY, graphX + 150, legendY);
    objects.push(legend2);
    const legend2Text = this.scene.add.text(graphX + 160, legendY, 'Prediction Line', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    legend2Text.setOrigin(0, 0.5);
    objects.push(legend2Text);

    const legend3 = this.scene.add.graphics();
    legend3.lineStyle(2, COLORS.ERROR, 0.7);
    legend3.lineBetween(graphX + 250, legendY, graphX + 300, legendY);
    objects.push(legend3);
    const legend3Text = this.scene.add.text(graphX + 310, legendY, 'Error', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    legend3Text.setOrigin(0, 0.5);
    objects.push(legend3Text);

    return objects;
  }

  private renderMSEMAEComparison(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const padding = 50;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Sample errors: [1, 2, 3, 5, 8] to show how MSE penalizes large errors more
    const errors = [1, 2, 3, 5, 8];
    const maxError = Math.max(...errors);
    const maxMSE = Math.max(...errors.map(e => e * e));

    // Draw axes
    const axes = this.scene.add.graphics();
    axes.lineStyle(2, COLORS.TEXT);
    axes.beginPath();
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX, graphY - graphHeight);
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX + graphWidth, graphY);
    axes.strokePath();
    objects.push(axes);

    const barWidth = graphWidth / (errors.length * 2 + 1);
    const spacing = barWidth;

    // Draw MAE bars (absolute errors)
    errors.forEach((error, index) => {
      const barX = graphX + index * (barWidth + spacing) + spacing;
      const barHeight = (error / maxError) * graphHeight * 0.8;
      
      const maeBar = this.scene.add.rectangle(barX, graphY - barHeight / 2, barWidth, barHeight, COLORS.PRIMARY, 0.7);
      objects.push(maeBar);
      
      const maeLabel = this.scene.add.text(barX, graphY + 15, error.toString(), {
        fontSize: '11px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      maeLabel.setOrigin(0.5);
      objects.push(maeLabel);
    });

    // Draw MSE bars (squared errors) - shifted to the right
    errors.forEach((error, index) => {
      const barX = graphX + (errors.length + 1) * spacing + index * (barWidth + spacing) + barWidth / 2;
      const squaredError = error * error;
      const barHeight = (squaredError / maxMSE) * graphHeight * 0.8;
      
      const mseBar = this.scene.add.rectangle(barX, graphY - barHeight / 2, barWidth, barHeight, COLORS.WARNING, 0.7);
      objects.push(mseBar);
      
      const mseLabel = this.scene.add.text(barX, graphY + 15, (error * error).toString(), {
        fontSize: '11px',
        color: '#ffffff',
        fontFamily: 'Arial'
      });
      mseLabel.setOrigin(0.5);
      objects.push(mseLabel);
    });

    // Labels
    const maeLabel = this.scene.add.text(graphX + graphWidth / 4, graphY - graphHeight - 10, 'MAE (Absolute)', {
      fontSize: '14px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    maeLabel.setOrigin(0.5);
    objects.push(maeLabel);

    const mseLabel = this.scene.add.text(graphX + 3 * graphWidth / 4, graphY - graphHeight - 10, 'MSE (Squared)', {
      fontSize: '14px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    mseLabel.setOrigin(0.5);
    objects.push(mseLabel);

    const yLabel = this.scene.add.text(graphX - 30, graphY - graphHeight / 2, 'Error Value', {
      fontSize: '12px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    yLabel.setOrigin(0.5);
    yLabel.setAngle(-90);
    objects.push(yLabel);

    // Title
    const title = this.scene.add.text(x, y - height / 2 + 20, 'MSE vs MAE: Large Errors Penalized More', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    objects.push(title);

    // Explanation text
    const explanation = this.scene.add.text(x, graphY + 50, 'Notice how MSE grows much faster for large errors!', {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    explanation.setOrigin(0.5);
    objects.push(explanation);

    return objects;
  }

  private renderOptimizationLandscape(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const padding = 50;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Draw a 3D-like valley landscape
    const landscape = this.scene.add.graphics();
    
    // Draw valley curve (parabolic shape representing error landscape)
    landscape.lineStyle(3, COLORS.PRIMARY);
    landscape.beginPath();
    
    const numPoints = 50;
    for (let i = 0; i <= numPoints; i++) {
      const t = i / numPoints;
      const paramX = graphX + t * graphWidth;
      // Parabolic valley: error = (x - center)^2 + minError
      const centerX = 0.5;
      const minError = 0.2;
      const errorValue = Math.pow(t - centerX, 2) * 0.8 + minError;
      const paramY = graphY - errorValue * graphHeight;
      
      if (i === 0) {
        landscape.moveTo(paramX, paramY);
      } else {
        landscape.lineTo(paramX, paramY);
      }
    }
    landscape.strokePath();
    objects.push(landscape);

    // Fill the valley with gradient effect
    const valleyFill = this.scene.add.graphics();
    for (let i = 0; i < numPoints; i++) {
      const t1 = i / numPoints;
      const t2 = (i + 1) / numPoints;
      const x1 = graphX + t1 * graphWidth;
      const x2 = graphX + t2 * graphWidth;
      
      const centerX = 0.5;
      const error1 = Math.pow(t1 - centerX, 2) * 0.8 + 0.2;
      const error2 = Math.pow(t2 - centerX, 2) * 0.8 + 0.2;
      const y1 = graphY - error1 * graphHeight;
      const y2 = graphY - error2 * graphHeight;
      
      const alpha = 0.3 - (error1 + error2) / 2 * 0.2;
      valleyFill.fillStyle(COLORS.SUCCESS, alpha);
      valleyFill.fillTriangle(x1, graphY, x1, y1, x2, y2);
      valleyFill.fillTriangle(x1, graphY, x2, graphY, x2, y2);
    }
    objects.push(valleyFill);

    // Mark the minimum point (optimal solution)
    const optimalX = graphX + 0.5 * graphWidth;
    const optimalY = graphY - 0.2 * graphHeight;
    const optimalPoint = this.scene.add.circle(optimalX, optimalY, 8, COLORS.SUCCESS);
    optimalPoint.setStrokeStyle(3, COLORS.TEXT);
    objects.push(optimalPoint);

    const optimalLabel = this.scene.add.text(optimalX, optimalY - 25, 'Optimal\nSolution', {
      fontSize: '12px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    optimalLabel.setOrigin(0.5);
    objects.push(optimalLabel);

    // Draw arrows showing optimization path
    const arrows = this.scene.add.graphics();
    arrows.lineStyle(2, COLORS.WARNING, 0.6);
    
    // Left side - descending
    for (let i = 0; i < 3; i++) {
      const startX = graphX + 0.2 * graphWidth + i * 0.1 * graphWidth;
      const startY = graphY - (0.4 + i * 0.1) * graphHeight;
      const endX = startX + 0.05 * graphWidth;
      const endY = graphY - (0.35 + i * 0.1) * graphHeight;
      
      arrows.beginPath();
      arrows.moveTo(startX, startY);
      arrows.lineTo(endX, endY);
      arrows.strokePath();
      
      // Arrowhead
      arrows.fillStyle(COLORS.WARNING, 0.6);
      arrows.fillTriangle(endX, endY, endX - 3, endY - 5, endX + 3, endY - 5);
    }
    
    // Right side - descending
    for (let i = 0; i < 3; i++) {
      const startX = graphX + 0.8 * graphWidth - i * 0.1 * graphWidth;
      const startY = graphY - (0.4 + i * 0.1) * graphHeight;
      const endX = startX - 0.05 * graphWidth;
      const endY = graphY - (0.35 + i * 0.1) * graphHeight;
      
      arrows.beginPath();
      arrows.moveTo(startX, startY);
      arrows.lineTo(endX, endY);
      arrows.strokePath();
      
      // Arrowhead
      arrows.fillStyle(COLORS.WARNING, 0.6);
      arrows.fillTriangle(endX, endY, endX - 3, endY - 5, endX + 3, endY - 5);
    }
    
    objects.push(arrows);

    // Labels
    const xLabel = this.scene.add.text(graphX + graphWidth / 2, graphY + 25, 'Model Parameters (Slope & Intercept)', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    xLabel.setOrigin(0.5);
    objects.push(xLabel);

    const yLabel = this.scene.add.text(graphX - 30, graphY - graphHeight / 2, 'Total Error', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    yLabel.setOrigin(0.5);
    yLabel.setAngle(-90);
    objects.push(yLabel);

    // Title
    const title = this.scene.add.text(x, y - height / 2 + 20, 'Optimization: Finding the Valley Bottom', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    objects.push(title);

    // Explanation
    const explanation = this.scene.add.text(x, graphY + 50, 'Algorithm adjusts parameters to find minimum error', {
      fontSize: '12px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    explanation.setOrigin(0.5);
    objects.push(explanation);

    return objects;
  }

  private renderR2Visualization(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const padding = 50;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Split into two side-by-side comparisons: High R² vs Low R²
    const leftX = graphX;
    const rightX = graphX + graphWidth / 2 + 20;
    const centerY = graphY - graphHeight / 2;

    // Left side: High R² (good fit)
    const highR2Points = [
      { x: 1, y: 2.1 }, { x: 2, y: 4.0 }, { x: 3, y: 5.9 }, { x: 4, y: 7.8 },
      { x: 5, y: 9.7 }, { x: 6, y: 11.6 }, { x: 7, y: 13.5 }
    ];
    const highR2Slope = 2;
    const highR2Intercept = 0.1;

    // Right side: Low R² (poor fit)
    const lowR2Points = [
      { x: 1, y: 3.5 }, { x: 2, y: 2.8 }, { x: 3, y: 6.2 }, { x: 4, y: 4.9 },
      { x: 5, y: 8.1 }, { x: 6, y: 7.3 }, { x: 7, y: 10.5 }
    ];
    const lowR2Slope = 1.2;
    const lowR2Intercept = 2;

    const plotWidth = graphWidth / 2 - 30;
    const plotHeight = graphHeight * 0.7;

    // Helper function to render one side
    const renderSide = (points: { x: number; y: number }[], slope: number, intercept: number, 
                       centerX: number, r2Value: number, r2Label: string) => {
      const minX = Math.min(...points.map(p => p.x));
      const maxX = Math.max(...points.map(p => p.x));
      const minY = Math.min(...points.map(p => p.y));
      const maxY = Math.max(...points.map(p => p.y));

      // Axes
      const axes = this.scene.add.graphics();
      axes.lineStyle(2, COLORS.TEXT, 0.5);
      axes.beginPath();
      axes.moveTo(centerX - plotWidth / 2, centerY + plotHeight / 2);
      axes.lineTo(centerX - plotWidth / 2, centerY - plotHeight / 2);
      axes.moveTo(centerX - plotWidth / 2, centerY + plotHeight / 2);
      axes.lineTo(centerX + plotWidth / 2, centerY + plotHeight / 2);
      axes.strokePath();
      objects.push(axes);

      // Best-fit line
      const line = this.scene.add.graphics();
      const lineColor = r2Value > 0.8 ? COLORS.SUCCESS : COLORS.WARNING;
      line.lineStyle(3, lineColor);
      line.beginPath();
      const startX = centerX - plotWidth / 2;
      const startY = centerY + plotHeight / 2 - ((slope * minX + intercept - minY) / (maxY - minY)) * plotHeight;
      const endX = centerX + plotWidth / 2;
      const endY = centerY + plotHeight / 2 - ((slope * maxX + intercept - minY) / (maxY - minY)) * plotHeight;
      line.moveTo(startX, startY);
      line.lineTo(endX, endY);
      line.strokePath();
      objects.push(line);

      // Data points
      points.forEach(point => {
        const plotX = centerX - plotWidth / 2 + ((point.x - minX) / (maxX - minX)) * plotWidth;
        const plotY = centerY + plotHeight / 2 - ((point.y - minY) / (maxY - minY)) * plotHeight;
        
        const pointCircle = this.scene.add.circle(plotX, plotY, 5, COLORS.PRIMARY);
        pointCircle.setStrokeStyle(2, COLORS.TEXT);
        objects.push(pointCircle);
      });

      // R² label
      const r2Text = this.scene.add.text(centerX, centerY + plotHeight / 2 + 30, `${r2Label}: ${r2Value.toFixed(2)}`, {
        fontSize: '18px',
        color: '#' + lineColor.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      r2Text.setOrigin(0.5);
      objects.push(r2Text);
    };

    // Render both sides
    renderSide(highR2Points, highR2Slope, highR2Intercept, leftX + plotWidth / 2, 0.95, 'R²');
    renderSide(lowR2Points, lowR2Slope, lowR2Intercept, rightX + plotWidth / 2, 0.45, 'R²');

    // Title
    const title = this.scene.add.text(x, y - height / 2 + 20, 'R²: How Well Does the Model Fit?', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    objects.push(title);

    // Labels
    const leftLabel = this.scene.add.text(leftX + plotWidth / 2, centerY - plotHeight / 2 - 20, 'High R² ≈ 1.0', {
      fontSize: '14px',
      color: '#' + COLORS.SUCCESS.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    leftLabel.setOrigin(0.5);
    objects.push(leftLabel);

    const rightLabel = this.scene.add.text(rightX + plotWidth / 2, centerY - plotHeight / 2 - 20, 'Low R² ≈ 0.0', {
      fontSize: '14px',
      color: '#' + COLORS.WARNING.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    rightLabel.setOrigin(0.5);
    objects.push(rightLabel);

    return objects;
  }

  private renderErrorMetricsCombined(x: number, y: number, width: number, height: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    const padding = 40;
    const sectionWidth = width / 3 - 20;
    const sectionHeight = height * 0.7;
    const startY = y - height / 2 + 60;

    // Three sections: R², MSE, MAE
    const sections = [
      { x: x - width / 2 + sectionWidth / 2 + padding, label: 'R²', color: COLORS.SUCCESS, value: '0.95', desc: 'Variance explained' },
      { x: x, label: 'MSE', color: COLORS.WARNING, value: '2.4', desc: 'Squared errors' },
      { x: x + width / 2 - sectionWidth / 2 - padding, label: 'MAE', color: COLORS.PRIMARY, value: '1.2', desc: 'Absolute errors' }
    ];

    sections.forEach((section, index) => {
      // Section box
      const box = this.scene.add.rectangle(section.x, startY + sectionHeight / 2, sectionWidth, sectionHeight, section.color, 0.15);
      box.setStrokeStyle(3, section.color);
      objects.push(box);

      // Label
      const label = this.scene.add.text(section.x, startY + 20, section.label, {
        fontSize: '24px',
        color: '#' + section.color.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      objects.push(label);

      // Value
      const value = this.scene.add.text(section.x, startY + 60, section.value, {
        fontSize: '32px',
        color: '#' + section.color.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      value.setOrigin(0.5);
      objects.push(value);

      // Description
      const desc = this.scene.add.text(section.x, startY + 100, section.desc, {
        fontSize: '12px',
        color: '#aaaaaa',
        fontFamily: 'Arial'
      });
      desc.setOrigin(0.5);
      objects.push(desc);

      // Visual representation
      if (index === 0) {
        // R²: Show two scatter plots side by side (high vs low)
        const plotSize = sectionWidth * 0.6;
        const plotY = startY + sectionHeight - 80;
        
        // High R² (left)
        const highX = section.x - plotSize / 3;
        const highBox = this.scene.add.rectangle(highX, plotY, plotSize / 2, plotSize / 2, section.color, 0.1);
        highBox.setStrokeStyle(2, section.color);
        objects.push(highBox);
        
        // Points showing good fit
        for (let i = 0; i < 5; i++) {
          const px = highX - plotSize / 6 + (i / 4) * (plotSize / 3);
          const py = plotY - plotSize / 6 + (i / 4) * (plotSize / 3);
          const point = this.scene.add.circle(px, py, 3, section.color);
          objects.push(point);
        }
        
        // Low R² (right)
        const lowX = section.x + plotSize / 3;
        const lowBox = this.scene.add.rectangle(lowX, plotY, plotSize / 2, plotSize / 2, COLORS.WARNING, 0.1);
        lowBox.setStrokeStyle(2, COLORS.WARNING);
        objects.push(lowBox);
        
        // Points showing poor fit (scattered)
        for (let i = 0; i < 5; i++) {
          const px = lowX - plotSize / 6 + (i / 4) * (plotSize / 3);
          const py = plotY - plotSize / 6 + (Math.random() - 0.5) * (plotSize / 3);
          const point = this.scene.add.circle(px, py, 3, COLORS.WARNING);
          objects.push(point);
        }
      } else if (index === 1) {
        // MSE: Show bar chart with squared errors
        const barWidth = sectionWidth * 0.15;
        const errors = [1, 2, 3];
        const maxSquared = 9;
        const barY = startY + sectionHeight - 60;
        
        errors.forEach((error, i) => {
          const barX = section.x - sectionWidth / 3 + i * (sectionWidth / 3);
          const barHeight = (error * error / maxSquared) * (sectionHeight * 0.4);
          const bar = this.scene.add.rectangle(barX, barY - barHeight / 2, barWidth, barHeight, section.color, 0.7);
          objects.push(bar);
          
          const label = this.scene.add.text(barX, barY + 15, (error * error).toString(), {
            fontSize: '10px',
            color: '#ffffff',
            fontFamily: 'Arial'
          });
          label.setOrigin(0.5);
          objects.push(label);
        });
      } else {
        // MAE: Show bar chart with absolute errors
        const barWidth = sectionWidth * 0.15;
        const errors = [1, 2, 3];
        const maxError = 3;
        const barY = startY + sectionHeight - 60;
        
        errors.forEach((error, i) => {
          const barX = section.x - sectionWidth / 3 + i * (sectionWidth / 3);
          const barHeight = (error / maxError) * (sectionHeight * 0.4);
          const bar = this.scene.add.rectangle(barX, barY - barHeight / 2, barWidth, barHeight, section.color, 0.7);
          objects.push(bar);
          
          const label = this.scene.add.text(barX, barY + 15, error.toString(), {
            fontSize: '10px',
            color: '#ffffff',
            fontFamily: 'Arial'
          });
          label.setOrigin(0.5);
          objects.push(label);
        });
      }
    });

    // Title
    const title = this.scene.add.text(x, y - height / 2 + 20, 'Error Metrics: R², MSE, MAE', {
      fontSize: '16px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    objects.push(title);

    return objects;
  }
}

