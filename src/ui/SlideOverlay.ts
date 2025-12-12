import Phaser from 'phaser';
import { COLORS } from '../GameConfig';

export interface Slide {
  title: string;
  body: string[];
}

/**
 * Slide overlay for displaying educational content before levels
 * Blocks player movement and provides Next/Back/Start navigation
 */
export class SlideOverlay {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;
  private slides: Slide[] = [];
  private currentSlideIndex: number = 0;
  private onComplete?: () => void;
  private inputManager?: any; // Reference to InputManager to block input
  private keyH?: Phaser.Input.Keyboard.Key; // H key to reopen slides

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(2000); // Higher than other overlays
  }

  /**
   * Show slides and block player input
   */
  show(slides: Slide[], onComplete: () => void, inputManager?: any): void {
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

    // Block input by disabling the input manager
    if (this.inputManager) {
      this.inputManager.setBlocked(true);
    }

    // Set up H key to reopen slides (only once)
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
    if (this.container) {
      this.container.removeAll(true);
    }

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
    const bg = this.scene.add.rectangle(0, 0, 1100, 650, COLORS.BG_MEDIUM, 0.98);
    bg.setStrokeStyle(4, COLORS.PRIMARY);

    // Title
    const titleText = this.scene.add.text(0, -250, slide.title, {
      fontSize: '32px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold',
      align: 'center'
    });
    titleText.setOrigin(0.5);

    // Body text - render each line
    const bodyLines: Phaser.GameObjects.Text[] = [];
    let yOffset = -150;
    const lineHeight = 35;
    
    slide.body.forEach((line, index) => {
      if (line.trim() === '') {
        // Empty line - add spacing
        yOffset += lineHeight * 0.5;
        return;
      }
      
      const bodyLine = this.scene.add.text(0, yOffset, line, {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        wordWrap: { width: 1000 },
        align: 'left'
      });
      bodyLine.setOrigin(0.5, 0);
      bodyLines.push(bodyLine);
      yOffset += bodyLine.height + 10;
    });

    // Navigation buttons
    const buttonY = 250;
    const buttonHeight = 50;
    const buttonWidth = 150;

    // Back button (only if not first slide)
    let backBtn: Phaser.GameObjects.Rectangle | undefined;
    let backText: Phaser.GameObjects.Text | undefined;
    if (!isFirst) {
      backBtn = this.scene.add.rectangle(-200, buttonY, buttonWidth, buttonHeight, COLORS.BG_LIGHT);
      backBtn.setOrigin(0.5, 0.5);
      backBtn.setInteractive({ useHandCursor: true });
      backBtn.on('pointerdown', () => {
        this.currentSlideIndex--;
        this.renderCurrentSlide();
      });
      backText = this.scene.add.text(-200, buttonY, 'Back', {
        fontSize: '20px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      backText.setOrigin(0.5);
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
        this.currentSlideIndex++;
        this.renderCurrentSlide();
      }
    });
    const nextText = this.scene.add.text(200, buttonY, isLast ? 'Start' : 'Next', {
      fontSize: '20px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    nextText.setOrigin(0.5);

    // Slide indicator
    const indicatorText = this.scene.add.text(0, buttonY + 50, 
      `${this.currentSlideIndex + 1} / ${this.slides.length}`, {
      fontSize: '16px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
    indicatorText.setOrigin(0.5);

    // Keyboard navigation
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
        this.currentSlideIndex++;
        this.renderCurrentSlide();
      }
    };

    const handleBack = () => {
      if (!isFirst) {
        this.currentSlideIndex--;
        this.renderCurrentSlide();
      }
    };

    keySpace.once('down', handleNext);
    keyEnter.once('down', handleNext);
    keyRight.once('down', handleNext);
    keyLeft.once('down', handleBack);

    // Add all elements to container - buttons last so they're on top for clicking
    const elements: Phaser.GameObjects.GameObject[] = [bg, titleText, ...bodyLines, indicatorText];
    // Add buttons last so they're clickable
    elements.push(nextBtn, nextText);
    if (backBtn && backText) {
      elements.push(backBtn, backText);
    }
    this.container!.add(elements);
  }

  hide(): void {
    this.isVisible = false;
    if (this.container) {
      this.container.removeAll(true);
      this.container.setVisible(false);
    }

    // Unblock input
    if (this.inputManager) {
      this.inputManager.setBlocked(false);
    }
  }

  isShowing(): boolean {
    return this.isVisible;
  }

  destroy(): void {
    if (this.container) {
      this.container.destroy();
    }
    if (this.keyH) {
      this.keyH.destroy();
    }
  }
}

