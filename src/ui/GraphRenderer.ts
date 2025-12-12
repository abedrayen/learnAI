import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { GraphElement } from './SlideElementTypes';

/**
 * Helper class for rendering educational graphs and charts
 */
export class GraphRenderer {
  private scene: Phaser.Scene;
  private container: Phaser.GameObjects.Container;

  constructor(scene: Phaser.Scene, container: Phaser.GameObjects.Container) {
    this.scene = scene;
    this.container = container;
  }

  renderGraph(element: GraphElement): Phaser.GameObjects.GameObject[] {
    const x = element.x || 0;
    const y = element.y || 0;
    const width = element.width || 500;
    const height = element.height || 300;
    const objects: Phaser.GameObjects.GameObject[] = [];

    switch (element.graphType) {
      case 'scatter':
        objects.push(...this.renderScatterPlot(x, y, width, height, element.data));
        break;
      case 'line':
        objects.push(...this.renderLineGraph(x, y, width, height, element.data));
        break;
      case 'accuracy':
        objects.push(...this.renderAccuracyCurve(x, y, width, height, element.data));
        break;
    }

    return objects;
  }

  private renderScatterPlot(x: number, y: number, width: number, height: number, data?: any): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    
    // Generate sample data if not provided
    const points = data?.points || [
      { x: 1, y: 2 }, { x: 2, y: 4 }, { x: 3, y: 6 }, { x: 4, y: 8 },
      { x: 5, y: 10 }, { x: 6, y: 12 }, { x: 7, y: 14 }
    ];

    // Axes
    const padding = 40;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

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

    // Find min/max for scaling
    const xValues = points.map(p => p.x);
    const yValues = points.map(p => p.y);
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Draw points
    points.forEach(point => {
      const plotX = graphX + ((point.x - minX) / (maxX - minX)) * graphWidth;
      const plotY = graphY - ((point.y - minY) / (maxY - minY)) * graphHeight;
      
      const pointCircle = this.scene.add.circle(plotX, plotY, 5, COLORS.PRIMARY);
      objects.push(pointCircle);
    });

    // Draw best-fit line (y = 2x for this example)
    const line = this.scene.add.graphics();
    line.lineStyle(2, COLORS.SUCCESS);
    line.beginPath();
    const startX = graphX;
    const startY = graphY - ((2 * minX - minY) / (maxY - minY)) * graphHeight;
    const endX = graphX + graphWidth;
    const endY = graphY - ((2 * maxX - minY) / (maxY - minY)) * graphHeight;
    line.moveTo(startX, startY);
    line.lineTo(endX, endY);
    line.strokePath();
    objects.push(line);

    // Labels
    const xLabel = this.scene.add.text(graphX + graphWidth / 2, graphY + 20, 'X (Input)', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    xLabel.setOrigin(0.5);
    objects.push(xLabel);

    const yLabel = this.scene.add.text(graphX - 20, graphY - graphHeight / 2, 'Y (Output)', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial',
      angle: -90
    });
    yLabel.setOrigin(0.5);
    objects.push(yLabel);

    return objects;
  }

  private renderLineGraph(x: number, y: number, width: number, height: number, data?: any): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    
    // Sample data
    const dataPoints = data?.points || [
      { x: 0, y: 0.5 }, { x: 1, y: 0.6 }, { x: 2, y: 0.7 }, { x: 3, y: 0.75 },
      { x: 4, y: 0.8 }, { x: 5, y: 0.82 }, { x: 6, y: 0.85 }
    ];

    const padding = 40;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Axes
    const axes = this.scene.add.graphics();
    axes.lineStyle(2, COLORS.TEXT);
    axes.beginPath();
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX, graphY - graphHeight);
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX + graphWidth, graphY);
    axes.strokePath();
    objects.push(axes);

    // Draw line
    const line = this.scene.add.graphics();
    line.lineStyle(3, COLORS.PRIMARY);
    line.beginPath();
    
    dataPoints.forEach((point, i) => {
      const plotX = graphX + (point.x / dataPoints[dataPoints.length - 1].x) * graphWidth;
      const plotY = graphY - point.y * graphHeight;
      
      if (i === 0) {
        line.moveTo(plotX, plotY);
      } else {
        line.lineTo(plotX, plotY);
      }
    });
    line.strokePath();
    objects.push(line);

    // Draw points
    dataPoints.forEach(point => {
      const plotX = graphX + (point.x / dataPoints[dataPoints.length - 1].x) * graphWidth;
      const plotY = graphY - point.y * graphHeight;
      const pointCircle = this.scene.add.circle(plotX, plotY, 4, COLORS.PRIMARY);
      objects.push(pointCircle);
    });

    return objects;
  }

  private renderAccuracyCurve(x: number, y: number, width: number, height: number, data?: any): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];
    
    // Sample training accuracy data
    const trainingData = data?.training || [
      { epoch: 0, acc: 0.5 }, { epoch: 1, acc: 0.65 }, { epoch: 2, acc: 0.75 },
      { epoch: 3, acc: 0.82 }, { epoch: 4, acc: 0.88 }, { epoch: 5, acc: 0.92 }
    ];

    const padding = 50;
    const graphX = x - width / 2 + padding;
    const graphY = y + height / 2 - padding;
    const graphWidth = width - 2 * padding;
    const graphHeight = height - 2 * padding;

    // Axes
    const axes = this.scene.add.graphics();
    axes.lineStyle(2, COLORS.TEXT);
    axes.beginPath();
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX, graphY - graphHeight);
    axes.moveTo(graphX, graphY);
    axes.lineTo(graphX + graphWidth, graphY);
    axes.strokePath();
    objects.push(axes);

    // Training curve
    const trainingLine = this.scene.add.graphics();
    trainingLine.lineStyle(3, COLORS.PRIMARY);
    trainingLine.beginPath();
    
    trainingData.forEach((point, i) => {
      const plotX = graphX + (point.epoch / trainingData[trainingData.length - 1].epoch) * graphWidth;
      const plotY = graphY - point.acc * graphHeight;
      
      if (i === 0) {
        trainingLine.moveTo(plotX, plotY);
      } else {
        trainingLine.lineTo(plotX, plotY);
      }
    });
    trainingLine.strokePath();
    objects.push(trainingLine);

    // Labels
    const xLabel = this.scene.add.text(graphX + graphWidth / 2, graphY + 25, 'Epochs', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });
    xLabel.setOrigin(0.5);
    objects.push(xLabel);

    const yLabel = this.scene.add.text(graphX - 25, graphY - graphHeight / 2, 'Accuracy', {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial',
      angle: -90
    });
    yLabel.setOrigin(0.5);
    objects.push(yLabel);

    // Legend
    const legend = this.scene.add.text(graphX + graphWidth - 50, graphY - graphHeight + 20, 'Training', {
      fontSize: '12px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    legend.setOrigin(1, 0);
    objects.push(legend);

    return objects;
  }
}

