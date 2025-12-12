import Phaser from 'phaser';
import { COLORS } from '../GameConfig';
import { EnhancedSlide, SlideElement } from './SlideElementTypes';
import { DiagramRenderer } from './DiagramRenderer';
import { GraphRenderer } from './GraphRenderer';

/**
 * Enhanced SlideOverlay 2.0 with rich content support, transitions, and layout management
 */
export class SlideOverlay2 {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;
  private slides: EnhancedSlide[] = [];
  private currentSlideIndex: number = 0;
  private onComplete?: () => void;
  private inputManager?: any;
  private keyH?: Phaser.Input.Keyboard.Key;
  private diagramRenderer?: DiagramRenderer;
  private graphRenderer?: GraphRenderer;
  private currentElements: Phaser.GameObjects.GameObject[] = [];
  private transitionTween?: Phaser.Tweens.Tween;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(2000);
  }

  show(slides: EnhancedSlide[], onComplete: () => void, inputManager?: any): void {
    if (slides.length === 0) {
      if (onComplete) onComplete();
      return;
    }

    this.slides = slides;
    this.currentSlideIndex = 0;
    this.onComplete = onComplete;
    this.inputManager = inputManager;
    this.isVisible = true;
    this.container!.setVisible(true);

    if (this.inputManager) {
      this.inputManager.setBlocked(true);
    }

    // Initialize renderers
    if (!this.diagramRenderer) {
      this.diagramRenderer = new DiagramRenderer(this.scene, this.container!);
    }
    if (!this.graphRenderer) {
      this.graphRenderer = new GraphRenderer(this.scene, this.container!);
    }

    // Set up H key to reopen slides
    if (!this.keyH) {
      this.keyH = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.H);
      this.keyH.on('down', () => {
        if (!this.isVisible && this.slides.length > 0) {
          this.show(this.slides, this.onComplete!, this.inputManager);
        }
      });
    }

    this.renderCurrentSlide();
  }

  private renderCurrentSlide(): void {
    // Stop any ongoing transition
    if (this.transitionTween) {
      this.transitionTween.stop();
    }

    // Clear previous elements
    this.clearCurrentElements();

    if (this.currentSlideIndex >= this.slides.length) {
      this.hide();
      if (this.onComplete) {
        this.onComplete();
      }
      return;
    }

    const slide = this.slides[this.currentSlideIndex];
    const isFirst = this.currentSlideIndex === 0;
    const isLast = this.currentSlideIndex === this.slides.length - 1;

    // Background
    const bg = this.scene.add.rectangle(0, 0, 1200, 680, 
      slide.backgroundColor || COLORS.BG_MEDIUM, 0.98);
    bg.setStrokeStyle(4, COLORS.PRIMARY);
    this.currentElements.push(bg);

    // Render slide elements
    let currentY = -280;
    const elementSpacing = 20;
    const leftMargin = -550;
    const rightMargin = 550;
    const contentWidth = 1100;
    const maxContentY = 220; // Maximum Y before navigation buttons
    let previousElementType: string | null = null;

    slide.elements.forEach((element, index) => {
      const rendered = this.renderElement(element, leftMargin, currentY, contentWidth);
      this.currentElements.push(...rendered);
      
      // Calculate next Y position based on actual rendered heights
      let heightToAdd = 0;
      let spacingToAdd = elementSpacing;
      
      if (element.type === 'spacer') {
        heightToAdd = (element as any).height;
        spacingToAdd = 0; // Spacers don't need extra spacing
      } else if (element.type === 'title') {
        const titleObj = rendered[0] as Phaser.GameObjects.Text;
        // Use displayHeight which accounts for line spacing
        heightToAdd = titleObj.displayHeight || titleObj.height;
      } else if (element.type === 'paragraph') {
        const textObj = rendered[0] as Phaser.GameObjects.Text;
        // Use displayHeight and add a small buffer for line spacing
        const textHeight = textObj.displayHeight || textObj.height;
        heightToAdd = textHeight + 2; // Small buffer for line spacing
        // Add extra spacing if paragraph comes after bold
        if (previousElementType === 'bold') {
          spacingToAdd = elementSpacing + 10;
        }
      } else if (element.type === 'bullet') {
        // Calculate actual height of all bullet items
        // Rendered array alternates: [bullet0, text0, bullet1, text1, ...]
        let bulletHeight = 0;
        const bulletItemSpacing = 8;
        for (let i = 1; i < rendered.length; i += 2) {
          const textObj = rendered[i];
          if (textObj instanceof Phaser.GameObjects.Text) {
            const itemHeight = textObj.displayHeight || textObj.height;
            bulletHeight += Math.max(itemHeight, 25) + bulletItemSpacing;
          }
        }
        // Remove last spacing
        if (bulletHeight > 0) {
          bulletHeight -= bulletItemSpacing;
        }
        heightToAdd = bulletHeight;
      } else if (element.type === 'bold') {
        const textObj = rendered[0] as Phaser.GameObjects.Text;
        const textHeight = textObj.displayHeight || textObj.height;
        heightToAdd = textHeight + 2; // Small buffer
        // Add extra spacing if bold is followed by paragraph
        const nextElement = slide.elements[index + 1];
        if (nextElement && nextElement.type === 'paragraph') {
          spacingToAdd = elementSpacing + 10;
        } else {
          spacingToAdd = elementSpacing + 5; // Extra spacing after bold in general
        }
      } else if (element.type === 'diagram' || element.type === 'graph') {
        const diagramEl = element as any;
        heightToAdd = diagramEl.height || 300;
      } else if (element.type === 'icon') {
        const iconEl = element as any;
        heightToAdd = iconEl.size || 40;
      }
      
      currentY += heightToAdd + spacingToAdd;
      previousElementType = element.type;
      
      // Prevent content from going beyond navigation buttons
      if (currentY > maxContentY) {
        currentY = maxContentY;
      }
    });

    // Navigation buttons
    this.renderNavigationButtons(isFirst, isLast);

    // Add all elements to container
    this.container!.add(this.currentElements);

    // Fade in animation
    this.container!.setAlpha(0);
    this.transitionTween = this.scene.tweens.add({
      targets: this.container,
      alpha: 1,
      duration: 300,
      ease: 'Power2'
    });
  }

  private getTextHeight(textObj: Phaser.GameObjects.Text): number {
    // Ensure text is updated and get accurate height
    // Phaser text height should account for word wrap, but add a small buffer
    const height = textObj.height;
    // Add buffer for line spacing (approximately 20% of font size)
    const lineSpacing = textObj.style.fontSize ? parseInt(textObj.style.fontSize) * 0.2 : 4;
    return height + lineSpacing;
  }

  private renderElement(element: SlideElement, x: number, y: number, width: number): Phaser.GameObjects.GameObject[] {
    const objects: Phaser.GameObjects.GameObject[] = [];

    switch (element.type) {
      case 'title':
        const titleEl = element as any;
        const titleText = this.scene.add.text(x + width / 2, y, titleEl.text, {
          fontSize: (titleEl.size || 32) + 'px',
          color: titleEl.color ? '#' + titleEl.color.toString(16).padStart(6, '0') : 
                 '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
          fontFamily: 'Arial',
          fontStyle: 'bold',
          align: 'center'
        });
        titleText.setOrigin(0.5, 0);
        objects.push(titleText);
        break;

      case 'paragraph':
        const paraEl = element as any;
        const align = paraEl.align || 'left';
        // Position based on alignment
        let paraX: number;
        let originX: number;
        if (align === 'center') {
          paraX = x + width / 2;
          originX = 0.5;
        } else if (align === 'right') {
          paraX = x + width - 50;
          originX = 1;
        } else {
          // left alignment
          paraX = x + 50;
          originX = 0;
        }
        const paraText = this.scene.add.text(paraX, y, paraEl.text, {
          fontSize: '20px',
          color: '#ffffff',
          fontFamily: 'Arial',
          wordWrap: { width: width - 100 },
          align: align
        });
        paraText.setOrigin(originX, 0);
        objects.push(paraText);
        break;

      case 'bullet':
        const bulletEl = element as any;
        let bulletYOffset = 0;
        const bulletItemSpacing = 8;
        bulletEl.items.forEach((item: string, index: number) => {
          const bulletX = x + (bulletEl.indent || 0) + 30;
          const bulletY = y + bulletYOffset;
          const bullet = this.scene.add.text(bulletX, bulletY, '•', {
            fontSize: '20px',
            color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
            fontFamily: 'Arial',
            fontStyle: 'bold'
          });
          bullet.setOrigin(0, 0);
          objects.push(bullet);

          const itemText = this.scene.add.text(bulletX + 25, bulletY, item, {
            fontSize: '18px',
            color: '#ffffff',
            fontFamily: 'Arial',
            wordWrap: { width: width - 150 }
          });
          itemText.setOrigin(0, 0);
          objects.push(itemText);
          
          // Update Y offset for next item based on actual text height
          bulletYOffset += Math.max(itemText.height, 25) + bulletItemSpacing;
        });
        break;

      case 'bold':
        const boldEl = element as any;
        const boldText = this.scene.add.text(x + width / 2, y, boldEl.text, {
          fontSize: '20px',
          color: '#' + COLORS.SECONDARY.toString(16).padStart(6, '0'),
          fontFamily: 'Arial',
          fontStyle: 'bold',
          align: 'center'
        });
        boldText.setOrigin(0.5, 0);
        objects.push(boldText);
        break;

      case 'icon':
        const iconEl = element as any;
        const iconX = (iconEl.x !== undefined ? x + iconEl.x : x + width / 2);
        const iconY = (iconEl.y !== undefined ? y + iconEl.y : y);
        const iconText = this.scene.add.text(iconX, iconY, iconEl.icon, {
          fontSize: (iconEl.size || 40) + 'px',
          fontFamily: 'Arial'
        });
        iconText.setOrigin(0.5);
        objects.push(iconText);
        break;

      case 'diagram':
        const diagramEl = element as any;
        let diagramWidth = diagramEl.width || 600;
        const diagramHeight = diagramEl.height || 400;
        // Ensure diagram fits within content width (with padding)
        const maxDiagramWidth = width - 100;
        if (diagramWidth > maxDiagramWidth) {
          diagramWidth = maxDiagramWidth;
        }
        // Center horizontally, position vertically so top edge starts at y
        const diagramX = (diagramEl.x !== undefined ? x + diagramEl.x : x + width / 2);
        const diagramY = (diagramEl.y !== undefined ? y + diagramEl.y : y + diagramHeight / 2);
        const diagramObjects = this.diagramRenderer!.renderDiagram({
          ...diagramEl,
          x: diagramX,
          y: diagramY,
          width: diagramWidth,
          height: diagramHeight
        });
        objects.push(...diagramObjects);
        break;

      case 'graph':
        const graphEl = element as any;
        let graphWidth = graphEl.width || 500;
        const graphHeight = graphEl.height || 300;
        // Ensure graph fits within content width (with padding)
        const maxGraphWidth = width - 100;
        if (graphWidth > maxGraphWidth) {
          graphWidth = maxGraphWidth;
        }
        // Center horizontally, position vertically so top edge starts at y
        const graphX = (graphEl.x !== undefined ? x + graphEl.x : x + width / 2);
        const graphY = (graphEl.y !== undefined ? y + graphEl.y : y + graphHeight / 2);
        const graphObjects = this.graphRenderer!.renderGraph({
          ...graphEl,
          x: graphX,
          y: graphY,
          width: graphWidth,
          height: graphHeight
        });
        objects.push(...graphObjects);
        break;

      case 'spacer':
        // Spacer is handled in layout calculation
        break;
    }

    return objects;
  }

  private renderNavigationButtons(isFirst: boolean, isLast: boolean): void {
    const buttonY = 280;
    const buttonHeight = 50;
    const buttonWidth = 150;

    // Back button
    if (!isFirst) {
      const backBtn = this.scene.add.rectangle(-200, buttonY, buttonWidth, buttonHeight, COLORS.BG_LIGHT);
      backBtn.setOrigin(0.5, 0.5);
      backBtn.setInteractive({ useHandCursor: true });
      backBtn.on('pointerdown', () => {
        this.navigateToSlide(this.currentSlideIndex - 1);
      });
      this.currentElements.push(backBtn);

      const backText = this.scene.add.text(-200, buttonY, 'Back', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      backText.setOrigin(0.5);
      this.currentElements.push(backText);
    }

    // Next/Start button
    const nextBtn = this.scene.add.rectangle(200, buttonY, buttonWidth, buttonHeight, COLORS.PRIMARY);
    nextBtn.setOrigin(0.5, 0.5);
    nextBtn.setInteractive({ useHandCursor: true });
    nextBtn.on('pointerdown', () => {
      if (isLast) {
        this.hide();
        if (this.onComplete) {
          this.onComplete();
        }
      } else {
        this.navigateToSlide(this.currentSlideIndex + 1);
      }
    });
    this.currentElements.push(nextBtn);

    const nextText = this.scene.add.text(200, buttonY, isLast ? 'Start' : 'Next', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    nextText.setOrigin(0.5);
    this.currentElements.push(nextText);

    // Slide indicator
    const indicatorText = this.scene.add.text(0, buttonY + 50, 
      `${this.currentSlideIndex + 1} / ${this.slides.length}`, {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    indicatorText.setOrigin(0.5);
    this.currentElements.push(indicatorText);

    // Keyboard navigation
    this.setupKeyboardNavigation(isFirst, isLast);
  }

  private navigateToSlide(index: number): void {
    if (index < 0 || index >= this.slides.length) return;

    // Slide out animation
    if (this.transitionTween) {
      this.transitionTween.stop();
    }

    this.transitionTween = this.scene.tweens.add({
      targets: this.container,
      x: index > this.currentSlideIndex ? 740 : 540,
      alpha: 0,
      duration: 200,
      ease: 'Power2',
      onComplete: () => {
        this.currentSlideIndex = index;
        this.renderCurrentSlide();
        // Reset position and slide in
        this.container!.x = 640;
        this.transitionTween = this.scene.tweens.add({
          targets: this.container,
          alpha: 1,
          duration: 200,
          ease: 'Power2'
        });
      }
    });
  }

  private setupKeyboardNavigation(isFirst: boolean, isLast: boolean): void {
    const keySpace = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    const keyEnter = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    const keyRight = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    const keyLeft = this.scene.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);

    const handleNext = () => {
      if (isLast) {
        this.hide();
        if (this.onComplete) {
          this.onComplete();
        }
      } else {
        this.navigateToSlide(this.currentSlideIndex + 1);
      }
    };

    const handleBack = () => {
      if (!isFirst) {
        this.navigateToSlide(this.currentSlideIndex - 1);
      }
    };

    keySpace.once('down', handleNext);
    keyEnter.once('down', handleNext);
    keyRight.once('down', handleNext);
    keyLeft.once('down', handleBack);
  }

  private clearCurrentElements(): void {
    this.currentElements.forEach(element => {
      if (element && !element.destroyed) {
        element.destroy();
      }
    });
    this.currentElements = [];
    if (this.container) {
      this.container.removeAll(true);
    }
  }

  hide(): void {
    this.isVisible = false;
    this.clearCurrentElements();
    if (this.container) {
      this.container.setVisible(false);
      this.container.setAlpha(1);
      this.container.x = 640;
    }

    if (this.transitionTween) {
      this.transitionTween.stop();
    }

    if (this.inputManager) {
      this.inputManager.setBlocked(false);
    }
  }

  isShowing(): boolean {
    return this.isVisible;
  }

  destroy(): void {
    this.clearCurrentElements();
    if (this.container) {
      this.container.destroy();
    }
    if (this.keyH) {
      this.keyH.destroy();
    }
    if (this.transitionTween) {
      this.transitionTween.stop();
    }
  }
}

