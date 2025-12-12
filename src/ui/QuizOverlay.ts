import Phaser from 'phaser';
import { COLORS } from '../GameConfig';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

/**
 * Quiz overlay for multiple-choice questions
 */
export class QuizOverlay {
  private scene: Phaser.Scene;
  private container?: Phaser.GameObjects.Container;
  private isVisible: boolean = false;
  private onComplete?: (correct: boolean) => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.createContainer();
  }

  private createContainer(): void {
    this.container = this.scene.add.container(640, 360);
    this.container.setVisible(false);
    this.container.setDepth(1000);
  }

  show(question: QuizQuestion, onComplete: (correct: boolean) => void): void {
    if (this.isVisible) {
      this.hide();
    }

    this.isVisible = true;
    this.onComplete = onComplete;
    this.container!.setVisible(true);

    // Background
    const bg = this.scene.add.rectangle(0, 0, 1000, 600, COLORS.BG_MEDIUM, 0.95);
    bg.setStrokeStyle(4, COLORS.PRIMARY);

    // Question text
    const questionText = this.scene.add.text(0, -200, question.question, {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial',
      wordWrap: { width: 900 },
      align: 'center'
    });
    questionText.setOrigin(0.5);

    // Options
    const optionButtons: Phaser.GameObjects.Rectangle[] = [];
    const optionTexts: Phaser.GameObjects.Text[] = [];
    const optionLabels = ['A', 'B', 'C'];

    question.options.forEach((option, index) => {
      const yPos = -50 + index * 120;
      const btn = this.scene.add.rectangle(0, yPos, 800, 80, COLORS.BG_LIGHT);
      const label = this.scene.add.text(-350, yPos, optionLabels[index] + ')', {
        fontSize: '20px',
        color: '#' + COLORS.PRIMARY.toString(16).padStart(6, '0'),
        fontFamily: 'Arial',
        fontStyle: 'bold'
      });
      label.setOrigin(0.5);
      const text = this.scene.add.text(0, yPos, option, {
        fontSize: '18px',
        color: '#ffffff',
        fontFamily: 'Arial',
        wordWrap: { width: 700 }
      });
      text.setOrigin(0.5);

      btn.setInteractive(new Phaser.Geom.Rectangle(-400, -40, 800, 80), Phaser.Geom.Rectangle.Contains, { useHandCursor: true });
      btn.on('pointerdown', () => {
        this.handleAnswer(index, question.correctIndex, question.explanation);
      });

      optionButtons.push(btn);
      optionTexts.push(label, text);
    });

    this.container!.add([bg, questionText, ...optionButtons, ...optionTexts]);
  }

  private handleAnswer(selectedIndex: number, correctIndex: number, explanation: string): void {
    const isCorrect = selectedIndex === correctIndex;
    
    // Show feedback
    const feedbackColor = isCorrect ? COLORS.SUCCESS : COLORS.ERROR;
    const feedbackText = isCorrect ? 'Correct!' : 'Incorrect';
    
    const feedback = this.scene.add.text(0, 250, feedbackText, {
      fontSize: '28px',
      color: '#' + feedbackColor.toString(16).padStart(6, '0'),
      fontFamily: 'Arial',
      fontStyle: 'bold'
    });
    feedback.setOrigin(0.5);

    const explanationText = this.scene.add.text(0, 300, explanation, {
      fontSize: '18px',
      color: '#ffffff',
      fontFamily: 'Arial',
      wordWrap: { width: 900 },
      align: 'center'
    });
    explanationText.setOrigin(0.5);

    this.container!.add([feedback, explanationText]);

    // Close after delay
    this.scene.time.delayedCall(3000, () => {
      this.hide();
      if (this.onComplete) {
        this.onComplete(isCorrect);
      }
    });
  }

  hide(): void {
    this.isVisible = false;
    if (this.container) {
      this.container.removeAll(true);
      this.container.setVisible(false);
    }
  }

  destroy(): void {
    if (this.container) {
      this.container.destroy();
    }
  }
}

