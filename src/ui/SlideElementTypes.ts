import Phaser from 'phaser';

/**
 * Types for enhanced slide elements
 */
export type SlideElementType = 
  | 'title'
  | 'paragraph'
  | 'bullet'
  | 'bold'
  | 'icon'
  | 'diagram'
  | 'graph'
  | 'image'
  | 'spacer'
  | 'tooltip'
  | 'table';

export interface BaseSlideElement {
  type: SlideElementType;
  id?: string;
}

export interface TitleElement extends BaseSlideElement {
  type: 'title';
  text: string;
  size?: number;
  color?: number;
}

export interface ParagraphElement extends BaseSlideElement {
  type: 'paragraph';
  text: string;
  align?: 'left' | 'center' | 'right';
}

export interface BulletElement extends BaseSlideElement {
  type: 'bullet';
  items: string[];
  indent?: number;
}

export interface BoldElement extends BaseSlideElement {
  type: 'bold';
  text: string;
  inline?: boolean;
  align?: 'left' | 'center' | 'right';
}

export interface IconElement extends BaseSlideElement {
  type: 'icon';
  icon: string; // emoji or icon identifier
  size?: number;
  x?: number;
  y?: number;
}

export interface DiagramElement extends BaseSlideElement {
  type: 'diagram';
  diagramType: 'ai-hierarchy' | 'dataset' | 'workflow' | 'neuron' | 'neural-network' | 'pipeline' | 'teachable-flow';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  data?: any; // Diagram-specific data
}

export interface GraphElement extends BaseSlideElement {
  type: 'graph';
  graphType: 'scatter' | 'line' | 'accuracy';
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  data?: any; // Graph-specific data
}

export interface ImageElement extends BaseSlideElement {
  type: 'image';
  src: string; // Path to image file
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  scale?: number;
}

export interface SpacerElement extends BaseSlideElement {
  type: 'spacer';
  height: number;
}

export interface TooltipElement extends BaseSlideElement {
  type: 'tooltip';
  triggerText: string;
  tooltipContent: {
    title?: string;
    text?: string;
    items?: string[];
    image?: string;
  };
  align?: 'left' | 'center' | 'right';
}

export interface TableElement extends BaseSlideElement {
  type: 'table';
  headers: string[];
  rows: string[][];
  columnWidths?: number[];
}

export type SlideElement = 
  | TitleElement
  | ParagraphElement
  | BulletElement
  | BoldElement
  | IconElement
  | DiagramElement
  | GraphElement
  | ImageElement
  | SpacerElement
  | TooltipElement
  | TableElement;

export interface EnhancedSlide {
  title: string;
  elements: SlideElement[];
  backgroundColor?: number;
}

