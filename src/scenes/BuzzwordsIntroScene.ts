import Phaser from 'phaser';
import { COLORS } from '../GameConfig';

interface Buzzword {
  text: string;
  hint: string;
  size: 'large' | 'medium' | 'small';
}

export default class BuzzwordsIntroScene extends Phaser.Scene {
  private buzzwords: Buzzword[] = [
    { text: 'Artificial Intelligence', hint: 'Machines that can think and learn', size: 'large' },
    { text: 'Machine Learning', hint: 'Teaching computers through data', size: 'large' },
    { text: 'Deep Learning', hint: 'Learning through layered neural networks', size: 'large' },
    { text: 'Neural Networks', hint: 'Brain-inspired computing structures', size: 'medium' },
    { text: 'Large Language Models', hint: 'AI that understands and generates text', size: 'medium' },
    { text: 'ChatGPT', hint: 'Conversational AI assistant', size: 'medium' },
    { text: 'Generative AI', hint: 'AI that creates new content', size: 'medium' },
    { text: 'Computer Vision', hint: 'Teaching computers to see', size: 'small' },
    { text: 'Natural Language Processing', hint: 'AI that understands human language', size: 'small' },
    { text: 'Data', hint: 'The fuel for AI systems', size: 'small' },
    { text: 'Model', hint: 'The brain of an AI system', size: 'small' },
    { text: 'Training', hint: 'Teaching AI from examples', size: 'small' },
    { text: 'Inference', hint: 'AI making predictions', size: 'small' },
  ];

  private buzzwordCards: Phaser.GameObjects.Container[] = [];
  private tooltips: Map<Phaser.GameObjects.Container, Phaser.GameObjects.Container> = new Map();

  constructor() {
    super({ key: 'BuzzwordsIntroScene' });
  }

  create(): void {
    // Background with gradient effect
    const bg = this.add.rectangle(640, 360, 1280, 720, COLORS.BG_DARK);
    
    // Add decorative tech pattern in background
    this.createTechPattern();

    // Title
    const title = this.add.text(640, 60, 'AI Buzzwords Explorer', {
      fontSize: '56px',
      color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    title.setOrigin(0.5);
    title.setAlpha(0);
    
    // Subtitle
    const subtitle = this.add.text(640, 120, 'What do you already recognize?', {
      fontSize: '24px',
      color: '#cccccc',
      fontFamily: 'Arial'
    });
    subtitle.setOrigin(0.5);
    subtitle.setAlpha(0);

    // Animate title and subtitle
    this.tweens.add({
      targets: title,
      alpha: 1,
      duration: 800,
      ease: 'Power2'
    });

    this.tweens.add({
      targets: subtitle,
      alpha: 1,
      duration: 800,
      delay: 300,
      ease: 'Power2'
    });

    // Create floating buzzword cards
    this.createBuzzwordCards();

    // Start Discussion button
    const btnY = 650;
    const btnContainer = this.add.container(640, btnY);
    
    const btnBg = this.add.rectangle(0, 0, 350, 70, COLORS.PRIMARY);
    btnBg.setInteractive(new Phaser.Geom.Rectangle(-175, -35, 350, 70), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
    
    const btnText = this.add.text(0, 0, '▶ Start Discussion', {
      fontSize: '26px',
      color: '#ffffff',
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    btnText.setOrigin(0.5);

    btnContainer.add([btnBg, btnText]);
    btnContainer.setAlpha(0);

    // Animate button entrance
    this.tweens.add({
      targets: btnContainer,
      alpha: 1,
      duration: 600,
      delay: 1000,
      ease: 'Power2'
    });

    // Button hover effect
    btnBg.on('pointerover', () => {
      this.tweens.add({
        targets: btnBg,
        scaleX: 1.05,
        scaleY: 1.05,
        duration: 200,
        ease: 'Power2'
      });
      btnBg.setFillStyle(COLORS.SECONDARY);
    });

    btnBg.on('pointerout', () => {
      this.tweens.add({
        targets: btnBg,
        scaleX: 1,
        scaleY: 1,
        duration: 200,
        ease: 'Power2'
      });
      btnBg.setFillStyle(COLORS.PRIMARY);
    });

    btnBg.on('pointerdown', () => {
      // Flash effect
      this.cameras.main.flash(300, 255, 255, 255, false);
      
      // Transition to menu
      this.time.delayedCall(300, () => {
        this.scene.start('MenuScene');
      });
    });

    // Footer instruction
    const instruction = this.add.text(640, 600, 'Hover over the buzzwords to see tooltips', {
      fontSize: '16px',
      color: '#888888',
      fontFamily: 'Arial',
      fontStyle: 'italic'
    });
    instruction.setOrigin(0.5);
    instruction.setAlpha(0);

    this.tweens.add({
      targets: instruction,
      alpha: 1,
      duration: 600,
      delay: 1200,
      ease: 'Power2'
    });
  }

  private createTechPattern(): void {
    // Create subtle tech-inspired background pattern
    const graphics = this.add.graphics();
    graphics.lineStyle(1, COLORS.PRIMARY, 0.1);

    // Draw grid pattern
    for (let x = 0; x < 1280; x += 100) {
      graphics.lineBetween(x, 0, x, 720);
    }
    for (let y = 0; y < 720; y += 100) {
      graphics.lineBetween(0, y, 1280, y);
    }

    // Add some diagonal lines for visual interest
    for (let i = 0; i < 10; i++) {
      const x = Phaser.Math.Between(0, 1280);
      const y = Phaser.Math.Between(0, 720);
      graphics.strokeCircle(x, y, Phaser.Math.Between(20, 60));
    }
  }

  private createBuzzwordCards(): void {
    const startY = 180;
    const spacing = 60;
    const columns = 3;
    const cardWidth = 350;
    const cardHeight = 50;

    this.buzzwords.forEach((buzzword, index) => {
      const col = index % columns;
      const row = Math.floor(index / columns);
      
      const x = 220 + col * 420;
      const y = startY + row * spacing;

      // Size-based styling
      let fontSize = '18px';
      let width = cardWidth;
      let height = cardHeight;
      
      switch (buzzword.size) {
        case 'large':
          fontSize = '22px';
          width = 380;
          height = 55;
          break;
        case 'medium':
          fontSize = '20px';
          width = 360;
          height = 52;
          break;
        case 'small':
          fontSize = '18px';
          width = 340;
          height = 48;
          break;
      }

      // Create card container
      const card = this.add.container(x, y);
      
      // Card background with gradient effect
      const bg = this.add.rectangle(0, 0, width, height, 0x1a1a2e);
      bg.setStrokeStyle(2, COLORS.PRIMARY, 0.5);
      
      // Card text
      const text = this.add.text(0, 0, buzzword.text, {
        fontSize: fontSize,
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      text.setOrigin(0.5);

      card.add([bg, text]);

      // Make card interactive
      bg.setInteractive(
        new Phaser.Geom.Rectangle(-width/2, -height/2, width, height),
        Phaser.Geom.Rectangle.Contains,
        { useHandCursor: true }
      );

      // Create tooltip (initially hidden)
      const tooltip = this.createTooltip(x, y - height/2 - 10, buzzword.hint, width);
      this.tooltips.set(card, tooltip);

      // Hover effects
      bg.on('pointerover', () => {
        this.tweens.add({
          targets: card,
          scaleX: 1.08,
          scaleY: 1.08,
          duration: 200,
          ease: 'Back.easeOut'
        });
        
        bg.setFillStyle(COLORS.PRIMARY, 0.3);
        bg.setStrokeStyle(2, COLORS.SECONDARY, 1);
        
        // Show tooltip
        const tooltip = this.tooltips.get(card);
        if (tooltip) {
          tooltip.setDepth(1000); // Ensure tooltip is on top
          this.tweens.add({
            targets: tooltip,
            alpha: 1,
            y: tooltip.y - 5,
            duration: 250,
            ease: 'Back.easeOut'
          });
        }
      });

      bg.on('pointerout', () => {
        this.tweens.add({
          targets: card,
          scaleX: 1,
          scaleY: 1,
          duration: 200,
          ease: 'Power2'
        });
        
        bg.setFillStyle(0x1a1a2e);
        bg.setStrokeStyle(2, COLORS.PRIMARY, 0.5);
        
        // Hide tooltip
        const tooltip = this.tooltips.get(card);
        if (tooltip) {
          const originalY = y - height/2 - 10;
          this.tweens.add({
            targets: tooltip,
            alpha: 0,
            y: originalY,
            duration: 200,
            ease: 'Power2'
          });
        }
      });

      bg.on('pointerdown', () => {
        // Click animation
        this.tweens.add({
          targets: card,
          scaleX: 0.95,
          scaleY: 0.95,
          duration: 100,
          yoyo: true,
          ease: 'Power2'
        });
      });

      // Initial entrance animation with stagger
      card.setAlpha(0);
      card.setScale(0.5);
      
      this.tweens.add({
        targets: card,
        alpha: 1,
        scaleX: 1,
        scaleY: 1,
        duration: 500,
        delay: 400 + (index * 80),
        ease: 'Back.easeOut'
      });

      // Add subtle floating animation
      this.tweens.add({
        targets: card,
        y: y + Phaser.Math.Between(-5, 5),
        duration: Phaser.Math.Between(2000, 3000),
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });

      this.buzzwordCards.push(card);
    });
  }

  private createTooltip(x: number, y: number, text: string, maxWidth: number): Phaser.GameObjects.Container {
    const tooltip = this.add.container(x, y);
    
    // Measure text to size tooltip appropriately
    const tempText = this.add.text(0, 0, text, {
      fontSize: '14px',
      fontFamily: 'Arial',
      wordWrap: { width: maxWidth - 20 }
    });
    const textBounds = tempText.getBounds();
    tempText.destroy();
    
    const padding = 10;
    const tooltipWidth = Math.min(textBounds.width + padding * 2, maxWidth);
    const tooltipHeight = textBounds.height + padding * 2;
    
    // Tooltip background with shadow effect
    const shadow = this.add.rectangle(2, 2, tooltipWidth, tooltipHeight, 0x000000, 0.3);
    shadow.setOrigin(0.5);
    
    const bg = this.add.rectangle(0, 0, tooltipWidth, tooltipHeight, 0x2a2a3e);
    bg.setOrigin(0.5);
    bg.setStrokeStyle(2, COLORS.SECONDARY, 0.8);
    
    // Small arrow pointing down to the card
    const arrow = this.add.triangle(0, tooltipHeight/2, 0, 0, -6, 8, 6, 8, 0x2a2a3e);
    arrow.setStrokeStyle(2, COLORS.SECONDARY, 0.8);
    
    // Tooltip text
    const tooltipText = this.add.text(0, 0, text, {
      fontSize: '14px',
      color: '#ffffff',
      fontFamily: 'Arial',
      align: 'center',
      wordWrap: { width: tooltipWidth - padding * 2 }
    });
    tooltipText.setOrigin(0.5);
    
    tooltip.add([shadow, bg, arrow, tooltipText]);
    tooltip.setAlpha(0);
    
    return tooltip;
  }

  shutdown(): void {
    // Clean up
    this.buzzwordCards = [];
    this.tooltips.clear();
  }
}

