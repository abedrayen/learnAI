/**
 * Manages achievements/badges system
 */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number; // timestamp
}

export class AchievementManager {
  private static readonly STORAGE_KEY = 'ai_explorer_achievements';
  private static readonly ACHIEVEMENTS: Achievement[] = [
    {
      id: 'first_level',
      name: 'Jungle Explorer',
      description: 'Complete Level 1: AI Jungle',
      icon: '🌴',
      unlocked: false
    },
    {
      id: 'ml_master',
      name: 'Machine Whisperer',
      description: 'Complete Level 2: Machine Learning Basics',
      icon: '🤖',
      unlocked: false
    },
    {
      id: 'first_model',
      name: 'Model Creator',
      description: 'Complete Level 3: First Model',
      icon: '📊',
      unlocked: false
    },
    {
      id: 'neural_network',
      name: 'Neural Architect',
      description: 'Complete Level 4: Neural Temple',
      icon: '🧠',
      unlocked: false
    },
    {
      id: 'teachable_master',
      name: 'Teachable Master',
      description: 'Complete Level 5: Teachable Ritual',
      icon: '🎓',
      unlocked: false
    },
    {
      id: 'final_artifact',
      name: 'AI Explorer Champion',
      description: 'Complete Level 6: Final Artifact',
      icon: '🏆',
      unlocked: false
    },
    {
      id: 'perfect_ecosystem',
      name: 'Ecosystem Master',
      description: 'Place all AI examples correctly on first try',
      icon: '⭐',
      unlocked: false
    },
    {
      id: 'brain_expert',
      name: 'Brain Expert',
      description: 'Answer all AI Guess-the-Brain questions correctly',
      icon: '🧩',
      unlocked: false
    },
    {
      id: 'speed_learner',
      name: 'Speed Learner',
      description: 'Complete a level in under 5 minutes',
      icon: '⚡',
      unlocked: false
    },
    {
      id: 'all_levels',
      name: 'AI Master',
      description: 'Complete all 6 levels',
      icon: '👑',
      unlocked: false
    }
  ];

  static getAchievements(): Achievement[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      const storedData: { [key: string]: { unlocked: boolean; unlockedAt?: number } } = JSON.parse(stored);
      return this.ACHIEVEMENTS.map(achievement => {
        const storedAchievement = storedData[achievement.id];
        if (storedAchievement) {
          return {
            ...achievement,
            unlocked: storedAchievement.unlocked,
            unlockedAt: storedAchievement.unlockedAt
          };
        }
        return achievement;
      });
    }
    return this.ACHIEVEMENTS.map(a => ({ ...a }));
  }

  static unlockAchievement(achievementId: string): boolean {
    const achievements = this.getAchievements();
    const achievement = achievements.find(a => a.id === achievementId);
    
    if (!achievement || achievement.unlocked) {
      return false;
    }

    achievement.unlocked = true;
    achievement.unlockedAt = Date.now();
    
    this.saveAchievements(achievements);
    return true;
  }

  static isUnlocked(achievementId: string): boolean {
    const achievements = this.getAchievements();
    const achievement = achievements.find(a => a.id === achievementId);
    return achievement?.unlocked || false;
  }

  static getUnlockedCount(): number {
    return this.getAchievements().filter(a => a.unlocked).length;
  }

  static getTotalCount(): number {
    return this.ACHIEVEMENTS.length;
  }

  private static saveAchievements(achievements: Achievement[]): void {
    const data: { [key: string]: { unlocked: boolean; unlockedAt?: number } } = {};
    achievements.forEach(achievement => {
      data[achievement.id] = {
        unlocked: achievement.unlocked,
        unlockedAt: achievement.unlockedAt
      };
    });
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  static resetAchievements(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Helper methods for common achievement triggers
  static checkLevelComplete(levelName: string): Achievement | null {
    const levelMap: { [key: string]: string } = {
      'Level1_AI_Jungle': 'first_level',
      'Level2_ML_Basics': 'ml_master',
      'Level3_First_Model': 'first_model',
      'Level4_Neural_Temple': 'neural_network',
      'Level5_Teachable_Ritual': 'teachable_master',
      'Level6_Final_Artifact': 'final_artifact'
    };

    const achievementId = levelMap[levelName];
    if (achievementId && this.unlockAchievement(achievementId)) {
      return this.getAchievements().find(a => a.id === achievementId) || null;
    }

    // Check if all levels completed
    const { ProgressManager } = require('./ProgressManager');
    const progress = ProgressManager.getProgress();
    if (progress.completedLevels.length >= 6) {
      if (this.unlockAchievement('all_levels')) {
        return this.getAchievements().find(a => a.id === 'all_levels') || null;
      }
    }

    return null;
  }
}

