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
  private blurOverlay?: Phaser.GameObjects.Rectangle;

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

    // Create blur overlay for tooltips (once per slide)
    this.blurOverlay = this.scene.add.rectangle(0, 0, 1200, 680, 0x000000, 0.85);
    this.blurOverlay.setDepth(2999);
    this.blurOverlay.setVisible(false);
    this.blurOverlay.setAlpha(0);
    this.currentElements.push(this.blurOverlay);

    // Render slide elements
    let currentY = -280;
    const elementSpacing = 25; // Increased base spacing
    const leftMargin = -550;
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
        heightToAdd = this.getTextHeight(titleObj);
      } else if (element.type === 'paragraph') {
        const textObj = rendered[0] as Phaser.GameObjects.Text;
        heightToAdd = this.getTextHeight(textObj);
        // Add extra spacing if paragraph comes after bold
        if (previousElementType === 'bold') {
          spacingToAdd = elementSpacing + 12;
        }
      } else if (element.type === 'bullet') {
        // Calculate actual height of all bullet items
        // Rendered array alternates: [bullet0, text0, bullet1, text1, ...]
        let bulletHeight = 0;
        const bulletItemSpacing = 8;
        for (let i = 1; i < rendered.length; i += 2) {
          const textObj = rendered[i];
          if (textObj instanceof Phaser.GameObjects.Text) {
            const itemHeight = this.getTextHeight(textObj);
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
        heightToAdd = this.getTextHeight(textObj);
        // Add extra spacing if bold is followed by paragraph
        const nextElement = slide.elements[index + 1];
        if (nextElement && nextElement.type === 'paragraph') {
          spacingToAdd = elementSpacing + 12;
        } else {
          spacingToAdd = elementSpacing + 8; // Extra spacing after bold in general
        }
      } else if (element.type === 'diagram' || element.type === 'graph') {
        const diagramEl = element as any;
        heightToAdd = diagramEl.height || 300;
      } else if (element.type === 'icon') {
        const iconEl = element as any;
        heightToAdd = iconEl.size || 40;
      } else if (element.type === 'tooltip') {
        const tooltipEl = element as any;
        const triggerText = this.scene.add.text(0, 0, tooltipEl.triggerText, {
          fontSize: '20px',
          wordWrap: { width: contentWidth - 100 }
        });
        heightToAdd = this.getTextHeight(triggerText);
        triggerText.destroy();
        // Add extra spacing for tooltip trigger
        spacingToAdd = elementSpacing + 5;
      } else if (element.type === 'table') {
        const tableEl = element as any;
        const headerHeight = 60;
        const rowHeight = 55;
        heightToAdd = headerHeight + (tableEl.rows.length * rowHeight);
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
    // Get the actual text height
    // Phaser text height accounts for word wrap, but we need to ensure we get the full height
    const height = textObj.height;
    // For multi-line text, Phaser includes line spacing in height, but add a small safety buffer
    // Check if text likely wraps (rough estimate: if text is long)
    const estimatedLines = Math.ceil(textObj.text.length / 50); // Rough estimate
    const buffer = estimatedLines > 1 ? 4 : 2; // More buffer for multi-line
    return height + buffer;
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
        const boldAlign = boldEl.align || 'center';
        // Position based on alignment
        let boldX: number;
        let boldOriginX: number;
        if (boldAlign === 'center') {
          boldX = x + width / 2;
          boldOriginX = 0.5;
        } else if (boldAlign === 'right') {
          boldX = x + width - 50;
          boldOriginX = 1;
        } else {
          // left alignment
          boldX = x + 50;
          boldOriginX = 0;
        }
        const boldText = this.scene.add.text(boldX, y, boldEl.text, {
          fontSize: '20px',
          color: '#' + COLORS.SECONDARY.toString(16).padStart(6, '0'),
          fontFamily: 'Arial',
          fontStyle: 'bold',
          align: boldAlign
        });
        boldText.setOrigin(boldOriginX, 0);
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

      case 'image':
        const imageEl = element as any;
        const imageX = (imageEl.x !== undefined ? x + imageEl.x : x + width / 2);
        const imageY = (imageEl.y !== undefined ? y + imageEl.y : y);
        const image = this.scene.add.image(imageX, imageY, imageEl.src);
        image.setOrigin(0.5, 0);
        if (imageEl.scale) {
          image.setScale(imageEl.scale);
        } else if (imageEl.width || imageEl.height) {
          const imgWidth = imageEl.width || image.width;
          const imgHeight = imageEl.height || image.height;
          image.setDisplaySize(imgWidth, imgHeight);
        }
        objects.push(image);
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

      case 'tooltip':
        const tooltipEl = element as any;
        const tooltipAlign = tooltipEl.align || 'center';
        let tooltipX: number;
        let tooltipOriginX: number;
        if (tooltipAlign === 'center') {
          tooltipX = x + width / 2;
          tooltipOriginX = 0.5;
        } else if (tooltipAlign === 'right') {
          tooltipX = x + width - 50;
          tooltipOriginX = 1;
        } else {
          tooltipX = x + 50;
          tooltipOriginX = 0;
        }
        
        // Create trigger text with hover indicator
        const triggerText = this.scene.add.text(tooltipX, y, tooltipEl.triggerText, {
          fontSize: '20px',
          color: '#' + COLORS.SECONDARY.toString(16).padStart(6, '0'),
          fontFamily: 'Arial',
          fontStyle: 'bold',
          align: tooltipAlign
        });
        triggerText.setOrigin(tooltipOriginX, 0);
        triggerText.setInteractive({ useHandCursor: true });
        objects.push(triggerText);

        // Create tooltip container (hidden by default) - centered on slide
        const tooltipContainer = this.scene.add.container(x + width / 2, 0);
        tooltipContainer.setVisible(false);
        tooltipContainer.setDepth(3000);
        tooltipContainer.setAlpha(0); // Start invisible for fade-in

        // Calculate tooltip dimensions
        const tooltipWidth = Math.min(600, width - 100);
        const padding = 30;
        const contentWidth = tooltipWidth - (padding * 2);

        // First, calculate total content height to center it
        const titleSpacing = 20;
        const itemSpacing = 12;
        let contentHeight = 0;
        const topPadding = 50;
        const bottomPadding = 50;

        // Calculate title height
        if (tooltipEl.tooltipContent.title) {
          const tempTitle = this.scene.add.text(0, 0, tooltipEl.tooltipContent.title, {
            fontSize: '22px',
            fontFamily: 'Arial',
            fontStyle: 'bold'
          });
          contentHeight += tempTitle.height + 15;
          tempTitle.destroy();
        }

        // Calculate text height
        if (tooltipEl.tooltipContent.text) {
          const tempText = this.scene.add.text(0, 0, tooltipEl.tooltipContent.text, {
            fontSize: '17px',
            fontFamily: 'Arial',
            wordWrap: { width: contentWidth },
            lineSpacing: 4
          });
          contentHeight += tempText.height + titleSpacing;
          tempText.destroy();
        }

        // Calculate items height
        if (tooltipEl.tooltipContent.items) {
          if (tooltipEl.tooltipContent.title || tooltipEl.tooltipContent.text) {
            contentHeight += 8; // Separator spacing
          }
          tooltipEl.tooltipContent.items.forEach((item: string) => {
            const emojiMatch = item.match(/^([^\s—]+)\s*—\s*(.+)$/);
            const text = emojiMatch ? emojiMatch[2] : item;
            const tempItem = this.scene.add.text(0, 0, text, {
              fontSize: '16px',
              fontFamily: 'Arial',
              wordWrap: { width: contentWidth - 50 },
              lineSpacing: 3
            });
            contentHeight += Math.max(25, tempItem.height) + itemSpacing;
            tempItem.destroy();
          });
          contentHeight -= itemSpacing; // Remove last spacing
        }

        // Calculate centered starting position
        const totalHeight = contentHeight + topPadding + bottomPadding;
        const finalHeight = Math.max(200, totalHeight);
        let tooltipY = -contentHeight / 2; // Center the content vertically

        // Tooltip background with shadow effect
        const tooltipBg = this.scene.add.rectangle(0, 0, tooltipWidth, finalHeight, COLORS.BG_DARK, 0.98);
        tooltipBg.setStrokeStyle(4, COLORS.PRIMARY);
        
        // Add subtle inner glow
        const innerGlow = this.scene.add.rectangle(0, 0, tooltipWidth - 8, finalHeight - 8, COLORS.BG_MEDIUM, 0.3);
        tooltipContainer.add([tooltipBg, innerGlow]);

        // Title section
        if (tooltipEl.tooltipContent.title) {
          const tooltipTitle = this.scene.add.text(0, tooltipY, tooltipEl.tooltipContent.title, {
            fontSize: '22px',
            color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'center'
          });
          tooltipTitle.setOrigin(0.5, 0);
          tooltipContainer.add(tooltipTitle);
          
          tooltipY += tooltipTitle.height + 15;
        }

        // Description text
        if (tooltipEl.tooltipContent.text) {
          const tooltipText = this.scene.add.text(0, tooltipY, tooltipEl.tooltipContent.text, {
            fontSize: '17px',
            color: '#e0e0e0',
            fontFamily: 'Arial',
            wordWrap: { width: contentWidth },
            align: 'center',
            lineSpacing: 4
          });
          tooltipText.setOrigin(0.5, 0);
          tooltipContainer.add(tooltipText);
          tooltipY += tooltipText.height + titleSpacing;
        }

        // Items list with enhanced formatting
        if (tooltipEl.tooltipContent.items) {
          // Add a subtle separator before items
          if (tooltipEl.tooltipContent.title || tooltipEl.tooltipContent.text) {
            const separator = this.scene.add.rectangle(0, tooltipY - 8, tooltipWidth - 60, 1, COLORS.PRIMARY, 0.3);
            separator.setOrigin(0.5, 0);
            tooltipContainer.add(separator);
            tooltipY += 8;
          }

          tooltipEl.tooltipContent.items.forEach((item: string) => {
            // Extract emoji and text
            const emojiMatch = item.match(/^([^\s—]+)\s*—\s*(.+)$/);
            const emoji = emojiMatch ? emojiMatch[1] : '';
            const text = emojiMatch ? emojiMatch[2] : item;
            
            // Bullet point with emoji
            const bulletX = -contentWidth / 2 + 10;
            const bulletY = tooltipY;
            
            // Emoji icon
            if (emoji) {
              const emojiText = this.scene.add.text(bulletX, bulletY, emoji, {
                fontSize: '20px',
                fontFamily: 'Arial'
              });
              emojiText.setOrigin(0, 0);
              tooltipContainer.add(emojiText);
            }
            
            // Item text with proper formatting
            const itemTextX = bulletX + (emoji ? 35 : 20);
            const itemText = this.scene.add.text(itemTextX, bulletY, text, {
              fontSize: '16px',
              color: '#ffffff',
              fontFamily: 'Arial',
              wordWrap: { width: contentWidth - (emoji ? 50 : 35) },
              align: 'left',
              lineSpacing: 3
            });
            itemText.setOrigin(0, 0);
            tooltipContainer.add(itemText);
            
            // Calculate height for this item (accounting for wrapping)
            const itemHeight = Math.max(25, itemText.height);
            tooltipY += itemHeight + itemSpacing;
          });
        }

        // Show/hide tooltip on hover with fade animation and background blur
        triggerText.on('pointerover', () => {
          // Show and fade in blur overlay
          if (this.blurOverlay) {
            this.blurOverlay.setVisible(true);
            this.scene.tweens.add({
              targets: this.blurOverlay,
              alpha: 0.85,
              duration: 200,
              ease: 'Power2'
            });
          }
          
          // Blur slide content by reducing opacity of all elements except tooltip
          this.currentElements.forEach(element => {
            if (element !== tooltipContainer && element !== this.blurOverlay && element !== triggerText) {
              this.scene.tweens.add({
                targets: element,
                alpha: 0.2,
                duration: 200,
                ease: 'Power2'
              });
            }
          });
          
          // Show and fade in tooltip
          tooltipContainer.setVisible(true);
          this.scene.tweens.add({
            targets: tooltipContainer,
            alpha: 1,
            duration: 200,
            ease: 'Power2'
          });
        });
        triggerText.on('pointerout', () => {
          // Fade out tooltip
          this.scene.tweens.add({
            targets: tooltipContainer,
            alpha: 0,
            duration: 150,
            ease: 'Power2',
            onComplete: () => {
              tooltipContainer.setVisible(false);
            }
          });
          
          // Restore slide content opacity
          this.currentElements.forEach(element => {
            if (element !== tooltipContainer && element !== this.blurOverlay && element !== triggerText) {
              this.scene.tweens.add({
                targets: element,
                alpha: 1,
                duration: 150,
                ease: 'Power2'
              });
            }
          });
          
          // Fade out blur overlay
          if (this.blurOverlay) {
            this.scene.tweens.add({
              targets: this.blurOverlay,
              alpha: 0,
              duration: 150,
              ease: 'Power2',
              onComplete: () => {
                this.blurOverlay!.setVisible(false);
              }
            });
          }
        });

        objects.push(tooltipContainer);
        break;

      case 'table':
        const tableEl = element as any;
        const tableX = x + width / 2;
        const tableY = y;
        const tableWidth = Math.min(1100, width - 80);
        const numCols = tableEl.headers.length;
        const colWidth = tableWidth / numCols;
        const rowHeight = 55;
        const headerHeight = 60;
        const cellPadding = 15;
        const borderWidth = 3;

        // Calculate total table height
        const tableTotalHeight = headerHeight + (tableEl.rows.length * rowHeight);
        const tableCenterY = tableY + tableTotalHeight / 2;

        // Table outer background with shadow effect
        const tableShadow = this.scene.add.rectangle(tableX + 4, tableCenterY + 4, tableWidth + 8, tableTotalHeight + 8, 0x000000, 0.3);
        objects.push(tableShadow);
        
        // Table main background
        const tableBg = this.scene.add.rectangle(tableX, tableCenterY, tableWidth, tableTotalHeight, COLORS.BG_DARK, 0.95);
        tableBg.setStrokeStyle(borderWidth, COLORS.PRIMARY);
        objects.push(tableBg);

        // Header section with gradient effect
        const headerBg = this.scene.add.rectangle(tableX, tableY + headerHeight / 2, tableWidth, headerHeight, COLORS.PRIMARY, 0.9);
        headerBg.setStrokeStyle(2, COLORS.SECONDARY);
        objects.push(headerBg);

        // Header text with enhanced styling
        tableEl.headers.forEach((header: string, colIndex: number) => {
          const headerX = tableX - tableWidth / 2 + colWidth * (colIndex + 0.5);
          const headerText = this.scene.add.text(headerX, tableY + headerHeight / 2, header, {
            fontSize: '20px',
            color: '#ffffff',
            fontFamily: 'Arial',
            fontStyle: 'bold',
            align: 'center',
            wordWrap: { width: colWidth - cellPadding * 2 },
            lineSpacing: 4
          });
          headerText.setOrigin(0.5);
          objects.push(headerText);
        });

        // Row separator line after header
        const headerSeparator = this.scene.add.rectangle(tableX, tableY + headerHeight, tableWidth, 2, COLORS.SECONDARY, 0.8);
        objects.push(headerSeparator);

        // Rows with alternating colors and enhanced styling
        tableEl.rows.forEach((row: string[], rowIndex: number) => {
          const rowY = tableY + headerHeight + rowHeight * (rowIndex + 0.5);
          const isEven = rowIndex % 2 === 0;
          
          // Row background with alternating colors
          const rowBg = this.scene.add.rectangle(tableX, rowY, tableWidth - borderWidth * 2, rowHeight - 4, 
            isEven ? COLORS.BG_MEDIUM : COLORS.BG_LIGHT, isEven ? 0.6 : 0.4);
          objects.push(rowBg);

          // Row border (subtle)
          if (rowIndex < tableEl.rows.length - 1) {
            const rowSeparator = this.scene.add.rectangle(tableX, rowY + rowHeight / 2, tableWidth - borderWidth * 2, 1, COLORS.PRIMARY, 0.2);
            objects.push(rowSeparator);
          }

          // Cell content with better formatting
          row.forEach((cell: string, colIndex: number) => {
            const cellX = tableX - tableWidth / 2 + colWidth * (colIndex + 0.5);
            
            // Determine text color based on column (first column can be emphasized)
            const cellColor = colIndex === 0 ? '#' + COLORS.SECONDARY.toString(16).padStart(6, '0') : '#ffffff';
            const cellFontSize = colIndex === 0 ? '18px' : '16px';
            const cellFontStyle = colIndex === 0 ? 'bold' : 'normal';
            
            const cellText = this.scene.add.text(cellX, rowY, cell, {
              fontSize: cellFontSize,
              color: cellColor,
              fontFamily: 'Arial',
              fontStyle: cellFontStyle,
              align: 'center',
              wordWrap: { width: colWidth - cellPadding * 2 },
              lineSpacing: 3
            });
            cellText.setOrigin(0.5);
            objects.push(cellText);
          });
        });

        // Outer border enhancement
        const outerBorder = this.scene.add.rectangle(tableX, tableCenterY, tableWidth, tableTotalHeight, 0x000000, 0);
        outerBorder.setStrokeStyle(1, COLORS.SECONDARY, 0.5);
        objects.push(outerBorder);
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
          if (element) {
            try {
              element.destroy();
            } catch (e) {
              // Element might already be destroyed
            }
          }
        });
    this.currentElements = [];
    
    // Clean up blur overlay
    if (this.blurOverlay) {
      this.blurOverlay.destroy();
      this.blurOverlay = undefined;
    }
    
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

