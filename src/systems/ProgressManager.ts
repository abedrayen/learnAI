/**
 * Manages game progress using localStorage
 */
export class ProgressManager {
  private static readonly STORAGE_KEY = 'ai_explorer_progress';

  static getProgress(): {
    completedLevels: string[];
    unlockedLevels: string[];
  } {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      completedLevels: [],
      unlockedLevels: ['Level1_AI_Jungle'] // First level always unlocked
    };
  }

  static completeLevel(levelName: string): void {
    const progress = this.getProgress();
    if (!progress.completedLevels.includes(levelName)) {
      progress.completedLevels.push(levelName);
    }
    
    // Unlock next level
    const levelOrder = [
      'Level1_AI_Jungle',
      'Level2_ML_Basics',
      'Level3_First_Model',
      'Level4_Neural_Temple',
      'Level5_Teachable_Ritual',
      'Level6_Final_Artifact'
    ];
    
    const currentIndex = levelOrder.indexOf(levelName);
    if (currentIndex >= 0 && currentIndex < levelOrder.length - 1) {
      const nextLevel = levelOrder[currentIndex + 1];
      if (!progress.unlockedLevels.includes(nextLevel)) {
        progress.unlockedLevels.push(nextLevel);
      }
    }
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(progress));
  }

  static isLevelUnlocked(levelName: string): boolean {
    const progress = this.getProgress();
    return progress.unlockedLevels.includes(levelName);
  }

  static isLevelCompleted(levelName: string): boolean {
    const progress = this.getProgress();
    return progress.completedLevels.includes(levelName);
  }

  static resetProgress(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }
}

