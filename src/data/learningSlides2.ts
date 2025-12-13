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
          '🔢 Calculators — mathematical operations follow strict rules',
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
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Congratulations, Explorer! You\'ve journeyed through the AI landscape and mastered fundamental concepts.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'You\'ve learned about AI types, machine learning workflows, linear regression, neural networks, and hands-on model training.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Now it\'s time to synthesize everything — to see how all these pieces fit together into a complete machine learning pipeline.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This final challenge will test your understanding and prepare you to build real AI projects.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🏛️', size: 60 }
    ]
  },
  {
    title: 'The Complete ML Pipeline',
    elements: [
      { type: 'title', text: 'The Complete ML Pipeline' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Every successful AI project follows a systematic pipeline — from raw data to deployed model. Understanding this flow is essential for building reliable systems.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'pipeline', width: 900, height: 150 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The Complete Flow:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '📥 Data Collection — gather relevant examples from various sources',
        '🧹 Data Preprocessing — clean, format, handle missing values, normalize',
        '✂️ Data Splitting — separate into training, validation, and testing sets',
        '🎓 Model Training — teach the algorithm patterns using training data',
        '📊 Model Evaluation — measure performance using evaluation metrics',
        '🔧 Model Selection — choose the best model architecture and hyperparameters',
        '🚀 Deployment — integrate into real applications and services',
        '📈 Monitoring — track performance in production and detect issues',
        '🔄 Iteration — continuously improve based on real-world feedback'
      ]}
    ]
  },
  {
    title: 'Real-World Workflows: Data Collection',
    elements: [
      { type: 'title', text: 'Real-World Workflows: Data Collection' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Data collection is the foundation of every ML project. In real-world scenarios, this involves multiple sources and careful planning.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Data Sources:' },
      { type: 'bullet', items: [
        '📊 Databases — existing company data, user interactions',
        '🌐 APIs — external data services, public datasets',
        '📝 Surveys — user feedback, labeled examples',
        '🖼️ Sensors — IoT devices, cameras, microphones',
        '📱 User-generated — app usage, social media',
        '🏥 Medical records — patient data (with privacy considerations)'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Challenges:' },
      { type: 'bullet', items: [
        '⚠️ Privacy and ethics — especially for personal data',
        '⚠️ Data quality — ensuring accuracy and completeness',
        '⚠️ Bias — avoiding skewed or unrepresentative data',
        '⚠️ Volume — collecting enough examples for training',
        '⚠️ Labeling — getting correct labels can be expensive'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Professional Insight: Data collection often takes 50-80% of project time. Quality data is more valuable than sophisticated algorithms.', align: 'center' }
    ]
  },
  {
    title: 'Real-World Workflows: Preprocessing',
    elements: [
      { type: 'title', text: 'Real-World Workflows: Preprocessing' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Raw data is rarely ready for machine learning. Preprocessing transforms messy data into clean, usable formats.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Common Preprocessing Steps:' },
      { type: 'bullet', items: [
        '🧹 Cleaning — remove duplicates, fix errors, handle outliers',
        '🔢 Normalization — scale features to similar ranges (0-1 or -1 to 1)',
        '📊 Encoding — convert categorical data to numbers (e.g., "cat" → 1, "dog" → 2)',
        '🔍 Feature engineering — create new features from existing ones',
        '📉 Handling missing values — fill gaps or remove incomplete examples',
        '🎯 Feature selection — choose most relevant features'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why It Matters:' },
      { type: 'paragraph', text: 'Poor preprocessing leads to poor models. For example, if one feature ranges from 0-1 and another from 0-1000, the model will ignore the smaller feature. Normalization ensures all features contribute equally.', align: 'center' }
    ]
  },
  {
    title: 'The Iterative Pipeline',
    elements: [
      { type: 'title', text: 'The Iterative Pipeline' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Key Insight:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This pipeline is iterative. Most projects cycle through improvement multiple times before achieving desired performance.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Why the Pipeline Matters',
    elements: [
      { type: 'title', text: 'Why the Pipeline Matters' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Following a structured pipeline isn\'t just good practice — it\'s essential for building trustworthy AI systems.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'A well-designed pipeline makes models:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '✅ More accurate — proper data handling improves predictions',
        '🛡️ More reliable — systematic testing catches errors early',
        '🐛 Easier to debug — clear stages help identify problems',
        '📈 Easier to improve — structured approach enables iteration',
        '🔄 Reproducible — others can replicate your work',
        '📚 Maintainable — easier to update and modify'
      ]}
    ]
  },
  {
    title: 'Evaluation Metrics',
    elements: [
      { type: 'title', text: 'Evaluation Metrics' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Evaluation metrics measure how well your model performs. Different problems require different metrics.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Classification Metrics:' },
      { type: 'bullet', items: [
        '✅ Accuracy — percentage of correct predictions (good for balanced classes)',
        '📊 Precision — of predicted positives, how many were actually positive',
        '🔍 Recall — of actual positives, how many were found',
        '📈 F1-Score — balance between precision and recall',
        '📉 Confusion Matrix — detailed breakdown of predictions vs. reality'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Regression Metrics:' },
      { type: 'bullet', items: [
        '📏 Mean Squared Error (MSE) — average squared prediction errors',
        '📊 Mean Absolute Error (MAE) — average absolute errors (easier to interpret)',
        '📈 R-squared — how well model explains variance (0-1, higher is better)'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Key Insight: No single metric tells the whole story. Use multiple metrics to understand model strengths and weaknesses.', align: 'center' }
    ]
  },
  {
    title: 'Model Selection',
    elements: [
      { type: 'title', text: 'Model Selection' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Choosing the right model architecture and hyperparameters is crucial for performance. This is where the iterative nature of ML becomes clear.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Selection Process:' },
      { type: 'bullet', items: [
        '🔍 Try multiple algorithms — linear regression, decision trees, neural networks',
        '⚙️ Tune hyperparameters — learning rate, layer sizes, regularization',
        '📊 Compare performance — use validation set to compare models',
        '🎯 Choose best model — balance accuracy, speed, and interpretability',
        '🧪 Final evaluation — test on held-out test set'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Trade-offs:' },
      { type: 'bullet', items: [
        'Complexity vs. Interpretability — simpler models are easier to understand',
        'Accuracy vs. Speed — more accurate models may be slower',
        'Training time vs. Performance — deep networks take longer but may perform better'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Professional Practice: Start simple (linear models), then increase complexity only if needed. Often, simple models perform well and are easier to deploy.', align: 'center' }
    ]
  },
  {
    title: 'Deployment Challenges',
    elements: [
      { type: 'title', text: 'Deployment Challenges' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Deploying models to production involves challenges beyond just training. Real-world deployment is where many projects fail.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Key Challenges:' },
      { type: 'bullet', items: [
        '⚡ Performance — models must make predictions fast enough for real-time use',
        '📦 Scalability — handle thousands or millions of requests',
        '🔄 Model updates — how to update models without disrupting service',
        '🛡️ Reliability — models must work consistently, handle edge cases',
        '🔒 Security — protect models from attacks, ensure data privacy',
        '💰 Cost — compute resources, storage, maintenance'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Deployment Strategies:' },
      { type: 'bullet', items: [
        '☁️ Cloud deployment — AWS, Google Cloud, Azure ML services',
        '📱 Edge deployment — run models on devices (phones, IoT)',
        '🔄 Batch processing — process data in batches (not real-time)',
        '⚡ Real-time APIs — serve predictions via web APIs'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Reality Check: Many models that work well in testing fail in production due to data drift, performance issues, or deployment complexity. Always plan for production from the start.', align: 'center' }
    ]
  },
  {
    title: 'Monitoring and Iteration',
    elements: [
      { type: 'title', text: 'Monitoring and Iteration' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Deployment isn\'t the end — it\'s the beginning of continuous improvement. Models need monitoring and updates to stay effective.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What to Monitor:' },
      { type: 'bullet', items: [
        '📊 Prediction accuracy — is performance degrading over time?',
        '📈 Data drift — is incoming data different from training data?',
        '⚡ System performance — latency, throughput, error rates',
        '🔍 Prediction distribution — are outputs changing unexpectedly?',
        '⚠️ Edge cases — unusual inputs causing failures'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Iteration Cycle:' },
      { type: 'bullet', items: [
        '1️⃣ Monitor production performance',
        '2️⃣ Identify issues (accuracy drop, new patterns)',
        '3️⃣ Collect new data addressing issues',
        '4️⃣ Retrain model with updated data',
        '5️⃣ Test and validate improvements',
        '6️⃣ Deploy updated model',
        '7️⃣ Repeat — continuous improvement loop'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Professional Insight: Models degrade over time as the world changes. A recommendation system trained in 2020 may perform poorly in 2024. Continuous monitoring and retraining are essential.', align: 'center' }
    ]
  },
  {
    title: 'Pipeline: Real-World Impact',
    elements: [
      { type: 'title', text: 'Pipeline: Real-World Impact' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Real-World Impact:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Recommendation Systems (Netflix, Amazon):' },
      { type: 'bullet', items: [
        '📥 Data Collection — user viewing history, ratings, interactions',
        '🧹 Preprocessing — normalize ratings, handle missing data',
        '🎓 Training — collaborative filtering, deep learning models',
        '📊 Evaluation — A/B testing, click-through rates',
        '🚀 Deployment — serve recommendations in real-time',
        '📈 Monitoring — track engagement, update based on feedback'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Fraud Detection (Banks, Credit Cards):' },
      { type: 'bullet', items: [
        '📥 Data Collection — transaction history, user behavior patterns',
        '🧹 Preprocessing — feature engineering, anomaly detection',
        '🎓 Training — classification models, anomaly detection',
        '📊 Evaluation — precision/recall (false positives cost money)',
        '🚀 Deployment — real-time transaction monitoring',
        '📈 Monitoring — track fraud rates, adapt to new schemes'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Medical Imaging Workflows:' },
      { type: 'bullet', items: [
        '📥 Data Collection — X-rays, MRIs, CT scans with expert labels',
        '🧹 Preprocessing — image normalization, augmentation',
        '🎓 Training — deep learning models (CNNs) for image classification',
        '📊 Evaluation — sensitivity, specificity (patient safety critical)',
        '🚀 Deployment — integrate into hospital systems',
        '📈 Monitoring — track diagnostic accuracy, regulatory compliance'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Professional Insight: Data scientists and ML engineers use this pipeline every day. It\'s the foundation of production AI systems that impact millions of users.', align: 'center' }
    ]
  },
  {
    title: 'Your Final Mission',
    elements: [
      { type: 'title', text: 'Your Final Mission' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your final challenge combines everything you\'ve learned. You\'ll demonstrate mastery by completing the full ML pipeline.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Activate the three chambers:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '📊 Data Chamber — prepare and split your dataset correctly',
        '🔨 Model Forge — train and configure your model',
        '🔍 Evaluation Lens — assess performance and interpret results'
      ]}
    ]
  },
  {
    title: 'Final Assessment',
    elements: [
      { type: 'title', text: 'Final Assessment' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Then answer comprehensive questions that test your understanding of:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'AI types and their applications',
        'Machine learning fundamentals',
        'Model training and evaluation',
        'Neural networks and deep learning',
        'Complete ML workflows'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This final assessment proves you\'re ready to build real AI projects!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  },
  {
    title: 'Graduation',
    elements: [
      { type: 'title', text: 'Graduation' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '🎉 Congratulations on completing your AI learning journey! 🎉', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'graph', graphType: 'accuracy', width: 500, height: 300 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'You\'ve mastered the fundamentals of Artificial Intelligence and Machine Learning. Your journey doesn\'t end here — it\'s just beginning!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What You\'ve Learned:' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🤖 AI Types — Rule-based, Machine Learning, and Deep Learning',
        '📊 ML Fundamentals — datasets, features, labels, training, testing',
        '📈 Linear Models — regression, coefficients, optimization',
        '🧠 Neural Networks — neurons, layers, backpropagation, depth',
        '🎓 Hands-on Training — Teachable Machine, model creation',
        '🔄 Complete Pipeline — from data to deployment, monitoring, iteration'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Next steps for your AI journey:', align: 'center' },
      { type: 'bullet', items: [
        '📚 Practice with Colab notebooks — hands-on coding exercises',
        '🔗 Build with Teachable Machine — create your own models',
        '💪 Continue learning — explore advanced AI topics',
        '🚀 Start real projects — apply what you\'ve learned'
      ]}
    ]
  },
  {
    title: 'Applying Your Knowledge',
    elements: [
      { type: 'title', text: 'Applying Your Knowledge' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Now that you understand AI fundamentals, here\'s how your knowledge applies to real AI scenarios:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'In Your Daily Life:' },
      { type: 'bullet', items: [
        '🔍 Recognize AI systems — understand how recommendation engines, voice assistants, and image recognition work',
        '💼 Career opportunities — data science, ML engineering, AI research',
        '🧠 Critical thinking — evaluate AI claims, understand limitations',
        '🎯 Problem-solving — identify when AI can solve problems effectively'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'In Real Projects:' },
      { type: 'bullet', items: [
        '📊 Choose the right approach — know when to use rule-based vs. ML vs. DL',
        '📈 Build models — use Teachable Machine or coding frameworks',
        '🔍 Evaluate systems — understand metrics, identify issues',
        '🚀 Deploy solutions — follow the complete pipeline you learned'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'In Further Learning:' },
      { type: 'bullet', items: [
        '📚 Advanced ML — deep learning, reinforcement learning, NLP',
        '💻 Programming — Python, TensorFlow, PyTorch',
        '🔬 Research — stay current with AI developments',
        '🌐 Specialization — computer vision, NLP, robotics, etc.'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Remember: Every expert was once a beginner. You now have the foundation to build real AI applications, understand AI news, and continue learning. The AI field evolves rapidly — keep exploring!', align: 'center' }
    ]
  },
  {
    title: 'Your Next Steps',
    elements: [
      { type: 'title', text: 'Your Next Steps' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Next Steps:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Use your knowledge to build something amazing. Whether it\'s a personal project, a startup idea, or further study, you now have the foundation to succeed in the AI world.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Immediate Actions:' },
      { type: 'bullet', items: [
        '🎯 Build a Teachable Machine project — apply what you learned',
        '📚 Complete the Colab exercises — hands-on coding practice',
        '🔍 Explore real AI systems — analyze how they work',
        '💡 Start a project — solve a problem using ML'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Long-term Goals:' },
      { type: 'bullet', items: [
        '📖 Continue learning — advanced courses, research papers',
        '💻 Learn programming — Python, ML libraries',
        '🌐 Join communities — AI forums, meetups, competitions',
        '🚀 Build a portfolio — showcase your AI projects'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Remember: Every expert was once a beginner. Keep learning, keep building, and keep exploring! The AI revolution is just beginning, and you\'re now part of it.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🚀', size: 60 }
    ]
  }
];


