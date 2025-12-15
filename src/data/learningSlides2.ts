import { EnhancedSlide } from '../ui/SlideElementTypes';

export const LEVEL_1_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Welcome to the AI Jungle',
    elements: [
      { type: 'title', text: 'Welcome to the AI Jungle' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Welcome, Explorer!', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'You\'ve entered a vibrant ecosystem where different forms of intelligence thrive — from simple rule-followers to powerful deep learners. Each creature in this jungle represents a unique approach to solving problems.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'By the end of this journey, you\'ll understand how AI systems work, why they evolved, and which type to use for different challenges.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🌴', size: 60 }
    ]
  },
  {
    title: 'What is Artificial Intelligence?',
    elements: [
      { type: 'title', text: 'What is Artificial Intelligence?' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Artificial Intelligence (AI) =' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Machines performing tasks that typically require human intelligence: recognizing faces, understanding language, making decisions, and learning from experience.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Key Insight: AI doesn\'t "think" like humans do. Instead, it finds patterns in data and uses mathematical relationships to make predictions and decisions.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Think of AI as a pattern-recognition engine: it observes, learns correlations, and applies what it learned to new situations — often faster and more consistently than humans.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🤖', size: 50 }
    ]
  },

  {
    title: 'Where Do You Meet AI Daily?',
    elements: [
      { type: 'title', text: 'Where Do You Meet AI Daily?' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'AI is woven into your daily life more than you realize:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🔍 Search engines — ranking billions of web pages',
        '🎬 Movie/music recommendations — learning your preferences',
        '📱 Face unlock — recognizing your unique features',
        '🗣️ Smart assistants — understanding natural language',
        '🚗 Self-driving cars — navigating complex environments',
        '📧 Spam filters — protecting your inbox',
        '🏥 Medical diagnosis — detecting diseases in scans',
        '📸 Photo organization — automatically tagging faces'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Did you know? Every time you use Google Search, multiple AI systems work together to understand your query, rank results, and personalize answers.', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'But here\'s the key: not all AI works the same way. Different problems require different approaches.', align: 'center' }
    ]
  },
  {
    title: 'Types of AI Creatures',
    elements: [
      { type: 'title', text: 'Types of AI Creatures' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Just as the jungle has different species, AI has evolved into distinct types, each with unique capabilities:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'ai-hierarchy', width: 600, height: 400 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'These three main types form a hierarchy of complexity and capability. Let\'s explore each one in detail.', align: 'center' }
    ]
  },
  {
    title: 'Understanding the AI Family',
    elements: [
      { type: 'title', text: 'Understanding the AI Family' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Not all AI is the same! Let\'s visualize how different types of AI relate to each other:', align: 'center' },
      { type: 'spacer', height: 5 },
      { type: 'diagram', diagramType: 'ai-subset', width: 600, height: 450 },
      { type: 'spacer', height: 25 },
    ]
  },
  {
    title: 'Rule-Based AI: The Lizard',
    elements: [
      { type: 'title', text: 'Rule-Based AI: The Lizard' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Rule-Based AI (The Lizard) 🦎' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Visual Metaphor: Think of Rule-Based AI as a cookbook with fixed recipes. If the recipe says "add salt when water boils," it always does exactly that — no variation, no learning, just following instructions.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        'Programmers write explicit rules: "IF condition THEN action"',
        'The system checks conditions and executes matching rules',
        'No learning happens — behavior is predetermined',
        'Fast, predictable, and transparent'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'tooltip', triggerText: 'Real-World Examples (hover to see)', align: 'center', tooltipContent: {
        title: 'Rule-Based AI Examples',
        items: [
          '💰 Tax calculation systems — income brackets and rates follow predefined rules',
          '🚦 Traffic lights — timed sequences based on fixed logic',
          '🏦 ATM machines — predefined transaction rules',
        ]
      }}
    ]
  },
  {
    title: 'Rule-Based AI: Limitations & History',
    elements: [
      { type: 'title', text: 'Rule-Based AI: Limitations & History' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Limitations 🚫' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        'Cannot handle uncertainty or ambiguity',
        'Cannot learn from new data',
        'Breaks when encountering situations not covered by rules',
        'Requires programmers to anticipate every scenario'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: '💡 Why It Evolved' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'The earliest form of AI, dating back to expert systems in the 1970s. Simple, reliable, and still widely used for well-defined problems where rules can be clearly specified.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🦎', size: 50 }
    ]
  },
  {
    title: 'Machine Learning: The Tiger',
    elements: [
      { type: 'title', text: 'Machine Learning: The Tiger' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Machine Learning (The Tiger) 🐅' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Visual Metaphor: Imagine a student learning to recognize cats. Instead of memorizing every cat photo, they see many examples, notice patterns (whiskers, pointy ears, tails), and gradually develop an intuitive understanding. Machine Learning works similarly — it learns patterns from examples.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        'Learns from data — given examples with correct answers',
        'Finds statistical patterns and relationships',
        'Builds a mathematical model that generalizes to new data',
        'Improves performance as it sees more examples'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'tooltip', triggerText: 'Real-World Examples (hover to see)', align: 'center', tooltipContent: {
        title: 'Machine Learning Examples',
        items: [
          '📊 Netflix recommendations — learns from your viewing history',
          '💰 Credit scoring — learns patterns of good vs bad borrowers',
          '🎯 Fraud detection — learns suspicious transaction patterns',
        ]
      }}
    ]
  },
  {
    title: 'Machine Learning: Advantages & Evolution',
    elements: [
      { type: 'title', text: 'Machine Learning: Advantages & Evolution' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Key Advantage ⚡' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Adapts to new situations without reprogramming. The more quality data it receives, the better it performs.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: '💡 Why It Evolved' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Rule-based systems couldn\'t handle complex, pattern-rich problems like image recognition or natural language. ML emerged in the 1980s-90s as a way to learn from data rather than hardcode rules.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🐅', size: 50 }
    ]
  },
  {
    title: 'Deep Learning: The Dragon',
    elements: [
      { type: 'title', text: 'Deep Learning: The Dragon' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Deep Learning (The Dragon) 🐉' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Visual Metaphor: Picture a multi-layered factory. Raw materials (pixels, sounds) enter the first layer, which extracts basic features (edges, tones). Each subsequent layer builds on the previous one, creating increasingly complex representations. By the final layer, the system recognizes complete objects or concepts.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        'Uses artificial neural networks with many layers (hence "deep")',
        'Each layer extracts increasingly abstract features',
        'Learns hierarchical representations automatically',
        'Excels at unstructured data: images, audio, text, video'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'tooltip', triggerText: 'Real-World Examples (hover to see)', align: 'center', tooltipContent: {
        title: 'Deep Learning Examples',
        items: [
          '📱 Face unlock — identifying unique facial features',
          '🖼️ Medical imaging — detecting tumors in X-rays',
          '🌐 Language translation — understanding meaning across languages',
        ]
      }}
    ]
  },
  {
    title: 'Deep Learning: Power & Evolution',
    elements: [
      { type: 'title', text: 'Deep Learning: Power & Evolution' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why It\'s Powerful 💪' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Can automatically discover complex patterns that would be impossible to program manually. The "deep" layers allow it to understand context and nuance.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: '💡 Why It Evolved' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Traditional ML struggled with high-dimensional data like images (millions of pixels). Deep Learning, powered by modern GPUs and large datasets, revolutionized AI in the 2010s, enabling breakthroughs in computer vision, speech recognition, and natural language processing.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🐉', size: 50 }
    ]
  },
  {
    title: 'Comparing the Three Types',
    elements: [
      { type: 'title', text: 'Comparing the Three Types' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Understanding when to use each approach:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'table', headers: ['AI Type', 'Best For'], rows: [
        ['Rule-Based AI 🦎', 'Well-defined problems with clear logic'],
        ['Machine Learning 🐅', 'Pattern recognition with structured data'],
        ['Deep Learning 🐉', 'Complex unstructured data (images, speech, language, video)']
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Insight: Most real-world AI systems combine multiple approaches. For example, a self-driving car uses rule-based logic for traffic laws, ML for route optimization, and Deep Learning for recognizing objects.', align: 'center' }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Ready for your first challenge?', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'You\'ll encounter two interactive activities:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🗺️ AI Ecosystem Map — Drag AI examples to their correct zones',
        '🧠 AI Guess-the-Brain — Choose the right AI type for each scenario'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'These activities will reinforce your understanding and help you recognize AI types in the wild!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🚀', size: 60 }
    ]
  }
];

export const LEVEL_2_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Welcome to the Machine Whisperer Zone',
    elements: [
      { type: 'title', text: 'Welcome to the Machine Whisperer Zone' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Now that you understand AI types, let\'s dive deeper into how machines actually learn.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Here, machines learn just like students — from examples, patterns, and trial and error. This zone reveals the fundamental principles that power every machine learning system.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'You\'ll discover how data becomes knowledge, how models learn from experience, and how to evaluate whether learning actually worked.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '⚙️', size: 60 }
    ]
  },
  {
    title: 'What Is a Dataset?',
    elements: [
      { type: 'title', text: 'What Is a Dataset?' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'A dataset is the foundation of machine learning — a collection of examples that teach the model what to learn.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Visual Metaphor: Think of it like a study guide with practice problems and their answers. Each row is an example, and the model learns the pattern connecting questions to answers.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Features → the inputs (color, size, speed, temperature, text…)' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Features are the measurable characteristics or attributes of each example. They\'re the "clues" the model uses to make predictions. More relevant features often lead to better predictions.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Label → the correct answer (cat/dog, price, category, sentiment)' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Labels are the "ground truth" — the correct answers we want the model to learn. In supervised learning, labels guide the model; in unsupervised learning, there are no labels.', align: 'center' }
    ]
  },
  {
    title: 'Training vs Testing',
    elements: [
      { type: 'title', text: 'Training vs Testing' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'To teach a machine properly, we must separate learning from evaluation — just like students study with practice tests, then take a final exam.', align: 'center' },
      { type: 'spacer', height: 5 },
      { type: 'diagram', diagramType: 'train-test-split', width: 700, height: 400 },
    ]
  },
  {
    title: 'Why Splitting Data Matters',
    elements: [
      { type: 'title', text: 'Why Splitting Data Matters' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Splitting data is crucial because it reveals whether your model truly learned patterns or just memorized examples.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Analogy: Practice vs. Final Exam' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Imagine studying for a test. If you only practice with questions you\'ve already seen, you might memorize answers without understanding concepts. But if you practice with new questions, you prove you actually learned the material.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why It Matters:' },
      { type: 'bullet', items: [
        '🎯 Tests real learning — ensures the model generalizes to new data',
        '🛡️ Prevents overfitting — catches models that memorized instead of learned',
        '📊 Measures true performance — shows how well it will work in production',
      ]},
    ]
  },
  {
    title: 'Underfitting vs Overfitting',
    elements: [
      { type: 'title', text: 'Underfitting vs Overfitting' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Finding the right model complexity is like Goldilocks finding the perfect porridge — not too simple, not too complex, but just right!', align: 'center' },
      { type: 'spacer', height: 5 },
      { type: 'diagram', diagramType: 'fitting-comparison', width: 800, height: 350 },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: '🎯 Goal: Find the sweet spot where your model generalizes well to new, unseen data.', align: 'center' }
    ]
  },
  {
    title: 'How Data Quality Influences Models',
    elements: [
      { type: 'title', text: 'How Data Quality Influences Models' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'The quality of your data directly determines the quality of your model. This is one of the most important principles in machine learning.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'diagram', diagramType: 'data-quality-impact', width: 700, height: 400 },
    ]
  },

  {
    title: 'What Makes Good Data?',
    elements: [
      { type: 'title', text: 'What Makes Good Data?' },
      { type: 'spacer', height: -10 },
      { type: 'paragraph', text: 'Quality data has six essential characteristics. Check all boxes for ML success!', align: 'center' },
      { type: 'spacer', height: -30},
      { type: 'diagram', diagramType: 'data-quality-checklist', width: 600, height: 500 }
    ]
  },
  {
    title: 'Data Cleaning Pipeline',
    elements: [
      { type: 'title', text: 'Data Cleaning Pipeline' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Before training any model, raw data must go through a systematic cleaning process:', align: 'center' },
      { type: 'spacer', height: -20 },
      { type: 'diagram', diagramType: 'data-cleaning-steps', width: 700, height: 450 },
      { type: 'spacer', height: 15 },
      ]
  },
  {
    title: 'Types of Machine Learning',
    elements: [
      { type: 'title', text: 'Types of Machine Learning' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Machine learning has three main paradigms, each suited for different problems. Understanding when to use each is crucial for building effective AI systems.', align: 'center' },
      { type: 'spacer', height: -70 },
      { type: 'diagram', diagramType: 'ml-types-overview', width: 900, height: 550 },
    ]
  },
  {
    title: 'The ML Workflow',
    elements: [
      { type: 'title', text: 'The ML Workflow' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Every machine learning project follows a systematic workflow — a cycle of improvement that professionals use daily:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'workflow', width: 800, height: 150 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'ML lets machines improve by themselves instead of following fixed rules. This makes them flexible, adaptable, and smarter over time — but only when built correctly with quality data and proper evaluation.', align: 'center' },
  
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Ready to practice what you\'ve learned?', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your mission:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '📋 Sort data into features and labels',
        '🎯 Choose the correct ML type for each scenario',
        '🧠 Understand why each approach fits the problem'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'These hands-on activities will solidify your understanding of how machine learning works in practice!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_3_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Inside the Data Scroll Room',
    elements: [
      { type: 'title', text: 'Inside the Data Scroll Room' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Now you\'ll learn your first ML model: Linear Regression — the foundation of predictive machine learning.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This room contains the secrets of teaching machines to find mathematical relationships in data. You\'ll discover how models learn patterns, not just memorize numbers.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'By the end, you\'ll understand how machines make predictions and why they can sometimes outperform human intuition.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '📜', size: 60 }
    ]
  },
  {
    title: 'Models Learn Patterns',
    elements: [
      { type: 'title', text: 'Models Learn Patterns' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 A model learns the underlying pattern, not memorized values', align: 'center' },
      { type: 'spacer', height: 30 },
      { 
        type: 'graph', 
        graphType: 'line',
        width: 500,
        height: 300,
        data: {
          points: [
            { x: 1, y: 2 },
            { x: 2, y: 4 },
            { x: 3, y: 6 },
            { x: 4, y: 8 },
            { x: 5, y: 10 }
          ],
          xLabel: 'Input (x)',
          yLabel: 'Output (y)',
          showPoints: true
        }
      },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'Pattern: y = 2 × x + 1', align: 'center' },

    ]
  },
  {
    title: 'Linear Regression',
    elements: [
      { type: 'title', text: 'Linear Regression' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Linear Regression is the simplest and most widely-used predictive model. It finds the best straight line through your data points — think of it as the "trend compass" that points to the underlying relationship.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Visual Metaphor: Imagine drawing a line through scattered points on a graph. Linear regression finds the line that best represents the overall trend — the one that minimizes how far off it is from all the points.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        '📊 Finds the best line through your data — minimizes distance from all points',
        '📈 Learns a slope (how fast values grow) — the rate of change',
        '📍 Learns an intercept (where the line starts) — the baseline value',
        '🔮 The model becomes a "predictor" — can estimate future values'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'tooltip', triggerText: 'Real-World Applications (hover to see)', align: 'center', tooltipContent: {
        title: 'Linear Regression Applications',
        items: [
          '💰 Predicting house prices from square footage',
          '📊 Forecasting sales from advertising spend',
          '🌡️ Estimating temperature from time of day',
          '📈 Stock price predictions (with limitations)',
          '🎓 Predicting student performance from study hours',
          '💊 Estimating drug dosage based on patient weight'
        ]
      }}
    ]
  },
  {
    title: 'Fitting a Model: The Learning Process',
    elements: [
      { type: 'title', text: 'Fitting a Model: The Learning Process' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Fitting a model means finding the best line that represents your data. This is the core of machine learning — the algorithm adjusts the line until it minimizes errors.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Process:' },
      { type: 'bullet', items: [
        '1️⃣ Start with a random line (guess)',
        '2️⃣ Measure how far off predictions are from actual values (errors)',
        '3️⃣ Adjust the line to reduce errors',
        '4️⃣ Repeat until errors are minimized',
        '5️⃣ The final line is your trained model'
      ]},
      { type: 'spacer', height: 20 },

      { type: 'paragraph', text: '💡 This process is called "optimization" — finding the best possible values for slope and intercept that minimize prediction errors.', align: 'center' }
    ]
  },  
  {
    title: 'Prediction Errors',
    elements: [
      { type: 'title', text: 'Prediction Errors' },
      { type: 'spacer', height: 0 },
      { type: 'paragraph', text: 'Every prediction has an error. The goal is to minimize these errors.', align: 'center' },
      { type: 'spacer', height: -10 },
      { type: 'diagram', diagramType: 'error-visualization', width: 700, height: 400 },
     ]
  },
  {
    title: 'Error Metrics',
    elements: [
      { type: 'title', text: 'Error Metrics' },
      { type: 'spacer', height: 0 },
      { type: 'diagram', diagramType: 'error-metrics-combined', width: 700, height: 400 },
      { type: 'spacer', height: 0 },
      { type: 'bullet', items: [
        '📊 R²: 0-1, variance explained',
        '📈 MSE: Squared errors (penalizes large)',
        '📏 MAE: Absolute errors (easier to interpret)'
      ]}
    ]
  },
  {
    title: 'Optimization Process',
    elements: [
      { type: 'title', text: 'Optimization Process' },
       { type: 'spacer', height: -90 },
      { type: 'diagram', diagramType: 'optimization-landscape', width: 700, height: 400 },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: '🎯 Optimization: The algorithm adjusts parameters to find the minimum error (valley bottom)', align: 'center' },
     ]
  },

  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Ready to put theory into practice?', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your challenge:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🧩 Complete the ML pipeline puzzle — arrange steps in order',
        '🔮 Compare your prediction vs the machine\'s prediction',
        '📊 See how the model learns from data in real-time'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This hands-on experience will make the abstract concept of machine learning concrete and understandable!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_4_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Enter the Neural Temple',
    elements: [
      { type: 'title', text: 'Enter the Neural Temple' },
      { type: 'spacer', height: 0 },
      { type: 'diagram', diagramType: 'neural-temple-intro', width: 800, height: 450 },
      { type: 'spacer', height: 5 },
      { type: 'bullet', items: [
        '🔗 Layers of neurons transform raw data → understanding',
        '⚡ Simple units combine to solve complex problems',
        '🎯 Powers vision, speech, and language AI'
      ]}
    ]
  },
  {
    title: 'Deep Learning Architectures',
    elements: [
      { type: 'title', text: 'Deep Learning Architectures' },
      { type: 'spacer', height: -90 },
      { type: 'diagram', diagramType: 'deep-learning-fields', width: 900, height: 500 },
      { type: 'spacer', height: -50 },
      { type: 'bullet', items: [
        '🧠 ANN: Multi-layer networks for complex unstructured data',
        '👁️ CNN: Convolutional filters for image recognition',
        '🔄 RNN: Recurrent connections for sequences & language'
      ]}
    ]
  },
  {
    title: 'What Is a Neuron?',
    elements: [
      { type: 'title', text: 'What Is a Neuron?' },
      { type: 'spacer', height: 0 },
      { type: 'diagram', diagramType: 'neuron-detailed', width: 800, height: 400 },
      { type: 'spacer', height: -50 },
      { type: 'bullet', items: [
        '📥 Inputs × Weights: Each input multiplied by importance',
        '🔢 Sum: Add all weighted inputs',
        '⚡ Activation: Decide if neuron "fires"'
      ]}
    ]
  },
  {
    title: 'How Neurons Learn',
    elements: [
      { type: 'title', text: 'How Neurons Learn' },
      { type: 'spacer', height: 0 },
      { type: 'diagram', diagramType: 'neuron-learning', width: 800, height: 400 },
      { type: 'spacer', height: -50 },
      { type: 'bullet', items: [
        '📊 Compare output to expected result',
        '⚖️ Adjust weights to reduce error',
        '🔄 Repeat: Learn through practice',
        '✅ Lower error = Better predictions'
      ]}
    ]
  },
  {
    title: 'From Neurons to Networks',
    elements: [
      { type: 'title', text: 'From Neurons to Networks' },
      { type: 'spacer', height: 0 },
      { type: 'diagram', diagramType: 'neurons-to-network', width: 900, height: 400 },
      { type: 'spacer', height: -30 },
      { type: 'bullet', items: [
        '🔵 Single neuron: Simple linear patterns',
        '🟢 Few neurons: Combine features',
        '🟣 Deep network: Complex hierarchies',
        '🚀 More layers = More capability'
      ]}
    ]
  },
  {
    title: 'Understanding Weights',
    elements: [
      { type: 'title', text: 'Understanding Weights' },
      { type: 'spacer', height: -20 },
      { type: 'diagram', diagramType: 'weights-visualization', width: 900, height: 500 },
      { type: 'spacer', height: 0 },
    ]
  },

  {
    title: 'Why Nonlinear Functions Matter',
    elements: [
      { type: 'title', text: 'Why Nonlinear Functions Matter' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Nonlinear activation functions are what make neural networks powerful. They allow networks to learn complex, curved patterns that linear models cannot.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'linear-nonlinear-comparison', width: 900, height: 400 },
     ]
  },

  {
    title: 'How Nonlinearity Helps',
    elements: [
      { type: 'title', text: 'How Nonlinearity Helps' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Nonlinear activation functions enable:' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        'Enables learning curved boundaries (e.g., separating cats from dogs in image space)',
        'Allows modeling complex relationships (e.g., price vs. features with interactions)',
        'Creates decision boundaries that aren\'t just straight lines',
        'Enables hierarchical feature learning (simple → complex patterns)'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Visual Metaphor: Linear functions are like drawing only with straight lines. Nonlinear functions let you draw curves, circles, and complex shapes — essential for capturing real-world patterns.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Bottom Line:' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Without nonlinearity, neural networks would be no more powerful than simple linear models. Activation functions are the key that unlocks the true power of deep learning.', align: 'center' }
    ]
  },
  {
    title: 'Layers: Building Complexity',
    elements: [
      { type: 'title', text: 'Layers: Building Complexity' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Neural networks stack neurons into layers, each building on the previous one\'s understanding. Think of layers as artistic filters that transform raw data step by step.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'neural-network', width: 800, height: 400 },
  ]
  },
  {
    title: 'Example of hierarchical Feature Learning',
    elements: [
      { type: 'title', text: 'Hierarchical Feature Learning' },
      { type: 'spacer', height: -20 },
      { type: 'diagram', diagramType: 'hierarchical-features', width: 900, height: 500 },

    ]
  },
  {
    title: 'Why Depth Matters',
    elements: [
      { type: 'title', text: 'Why Depth Matters' },
      { type: 'spacer', height: 40 },
      { type: 'paragraph', text: 'Deep networks (many layers) can learn more complex patterns than shallow networks.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'bold', text: 'The Power of Composition', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Each layer builds on the previous: Edges → Shapes → Objects → Understanding', align: 'center' },
      { type: 'spacer', height: 30 },

      { type: 'paragraph', text: '💡 Analogy: Like reading a book — letters → words → sentences → paragraphs → meaning', align: 'center' }
    ]
  },
  {
    title: 'Forward Propagation: Making Predictions',
    elements: [
      { type: 'title', text: 'Forward Propagation: Making Predictions' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Forward propagation is how neural networks make predictions. Data flows from input to output, layer by layer.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'forward-propagation', width: 900, height: 400 },
      { type: 'spacer', height: 20 },
     ]
  },
  {
    title: 'Backpropagation: The Learning Process',
    elements: [
      { type: 'title', text: 'Backpropagation: The Learning Process' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Backpropagation is the algorithm that teaches neural networks. It\'s how the network learns from mistakes and improves over time.', align: 'center' },
      { type: 'spacer', height: -10 },
      { type: 'diagram', diagramType: 'backpropagation', width: 900, height: 400 },

  ]
  },
  {
    title: 'Why Backpropagation Works',
    elements: [
      { type: 'title', text: 'Why Backpropagation Works' },
      { type: 'bold', text: 'The Learning Process:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '1️⃣ Forward Pass — data flows through, making a prediction',
        '2️⃣ Calculate Error — compare prediction to correct answer',
        '3️⃣ Backward Pass — error flows backward through layers',
        '4️⃣ Update Weights — adjust weights to reduce error',
        '5️⃣ Repeat — thousands of times until accurate'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 This cycle repeats thousands of times, each iteration making the network slightly better at its task.', align: 'center' }
    ]
  },

  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Time to interact with neural networks!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your mission:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🔌 Route a signal through the correct path of layers',
        '🧩 Solve the neuron switch puzzle',
        '🎯 Understand how information flows through networks'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'These interactive challenges will make abstract neural network concepts tangible and memorable!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_5_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Welcome to the Ritual Chamber',
    elements: [
      { type: 'title', text: 'Welcome to the Ritual Chamber' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This is where theory meets practice — you\'ll create your own intelligent system using Teachable Machine.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Here you\'ll experience the complete machine learning workflow: collecting data, training a model, and seeing it make predictions in real-time.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'No coding required — just your creativity and understanding of how machines learn from examples.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🔮', size: 60 }
    ]
  },
  {
    title: 'How Teachable Machine Works',
    elements: [
      { type: 'title', text: 'How Teachable Machine Works' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'teachable-flow', width: 700, height: 200 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Teachable Machine is a web-based tool that makes machine learning accessible to everyone. Here\'s how it works:', align: 'center' },
      { type: 'spacer', height: 15 },
    
]
  },
  
  {
    title: 'How Models Learn From Examples',
    elements: [
      { type: 'title', text: 'How Models Learn From Examples' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'When you provide examples to Teachable Machine, the model learns patterns through a process called "transfer learning."', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Learning Process:' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '1️⃣ Pre-trained Base — Uses a neural network already trained on millions of images',
        '2️⃣ Feature Extraction — Converts your images into numerical features (edges, shapes, colors)',
        '3️⃣ Pattern Recognition — Learns which features distinguish your classes',
        '4️⃣ Fine-tuning — Adjusts weights to recognize your specific examples',
        '5️⃣ Generalization — Can recognize new examples it hasn\'t seen before'
      ]},
     ]
  },
  

];

export const LEVEL_6_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'The Final Chamber',
    elements: [
      { type: 'title', text: 'The Final Chamber' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Congratulations! You\'ve mastered AI fundamentals. Now synthesize everything into the complete ML pipeline.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🏛️', size: 60 }
    ]
  },
  {
    title: 'The Complete ML Pipeline',
    elements: [
      { type: 'title', text: 'The Complete ML Pipeline' },
      { type: 'spacer', height: 10 },
      { type: 'diagram', diagramType: 'pipeline', width: 900, height: 200 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '🔄 Iterative cycle: Most projects repeat this process multiple times to achieve desired performance.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '✅ More accurate & reliable',
        '🛡️ Easier to debug & improve',
        '🔄 Reproducible & maintainable'
      ]}
    ]
  },
  {
    title: 'Data Collection & Preprocessing',
    elements: [
      { type: 'title', text: 'Data Collection & Preprocessing' },
      { type: 'spacer', height: 10 },
      { type: 'diagram', diagramType: 'data-cleaning-steps', width: 800, height: 400 },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Data collection takes 50-80% of project time. Quality data > sophisticated algorithms.', align: 'center' }
    ]
  },
  {
    title: 'Evaluation Metrics',
    elements: [
      { type: 'title', text: 'Evaluation Metrics' },
      { type: 'spacer', height: 10 },
      { type: 'diagram', diagramType: 'error-metrics-combined', width: 800, height: 400 },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '📊 Classification: Accuracy, Precision, Recall, F1-Score',
        '📈 Regression: MSE, MAE, R²',
        '💡 Use multiple metrics for complete understanding'
      ]}
    ]
  },
  {
    title: 'Model Selection & Deployment',
    elements: [
      { type: 'title', text: 'Model Selection & Deployment' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Selection Process:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bullet', items: [
        '🔍 Try multiple algorithms',
        '⚙️ Tune hyperparameters',
        '📊 Compare on validation set',
        '🎯 Balance accuracy, speed, interpretability'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Deployment Challenges:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bullet', items: [
        '⚡ Performance & Scalability',
        '🔄 Model updates & Reliability',
        '🔒 Security & Cost'
      ]}
    ]
  },
  {
    title: 'Monitoring & Iteration Cycle',
    elements: [
      { type: 'title', text: 'Monitoring & Iteration Cycle' },
      { type: 'spacer', height: 10 },
      { type: 'diagram', diagramType: 'workflow', width: 800, height: 200 },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Monitor:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bullet', items: [
        '📊 Prediction accuracy & data drift',
        '⚡ System performance',
        '⚠️ Edge cases & failures'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Models degrade over time. Continuous monitoring and retraining are essential.', align: 'center' }
    ]
  },
  {
    title: 'Real-World Applications',
    elements: [
      { type: 'title', text: 'Real-World Applications' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Recommendation Systems:', align: 'center' },
      { type: 'bullet', items: [
        '📥 User history → 🧹 Normalize → 🎓 Train → 📊 A/B test → 🚀 Deploy → 📈 Monitor'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Fraud Detection:', align: 'center' },
      { type: 'bullet', items: [
        '📥 Transactions → 🧹 Feature engineering → 🎓 Classify → 📊 Precision/Recall → 🚀 Real-time → 📈 Adapt'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Medical Imaging:', align: 'center' },
      { type: 'bullet', items: [
        '📥 Scans → 🧹 Normalize → 🎓 CNN → 📊 Sensitivity → 🚀 Hospital systems → 📈 Track accuracy'
      ]}
    ]
  },
  {
    title: 'Your Final Mission',
    elements: [
      { type: 'title', text: 'Your Final Mission' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Complete the full ML pipeline:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '📊 Data Chamber — prepare and split dataset',
        '🔨 Model Forge — train and configure model',
        '🔍 Evaluation Lens — assess performance'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Then demonstrate mastery in the final assessment!', align: 'center' }
    ]
  },
  {
    title: 'Final Assessment',
    elements: [
      { type: 'title', text: 'Final Assessment' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Test your understanding of:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'AI types & applications',
        'ML fundamentals',
        'Model training & evaluation',
        'Neural networks',
        'Complete ML workflows'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  },
  {
    title: 'Graduation',
    elements: [
      { type: 'title', text: 'Graduation' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '🎉 Congratulations! 🎉', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'graph', graphType: 'accuracy', width: 500, height: 300 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'You\'ve mastered AI & ML fundamentals. Your journey continues!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What You\'ve Learned:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bullet', items: [
        '🤖 AI Types — Rule-based, ML, Deep Learning',
        '📊 ML Fundamentals — data, training, evaluation',
        '📈 Linear Models & Neural Networks',
        '🔄 Complete Pipeline — data to deployment'
      ]}
    ]
  },
  {
    title: 'Your Next Steps',
    elements: [
      { type: 'title', text: 'Your Next Steps' },
      { type: 'spacer', height: 30 },
      { type: 'bold', text: 'Immediate Actions:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🎯 Build Teachable Machine projects',
        '📚 Complete Colab exercises',
        '💡 Start your own ML project'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Long-term Goals:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '📖 Advanced ML & Deep Learning',
        '💻 Learn Python & ML libraries',
        '🌐 Join AI communities',
        '🚀 Build your portfolio'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🚀', size: 60 }
    ]
  }
];


