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
      { type: 'paragraph', text: 'Real-World Examples:', align: 'center' },
      { type: 'bullet', items: [
        '🔢 Calculators — mathematical operations follow strict rules',
        '🚦 Traffic lights — timed sequences based on fixed logic',
        '🏦 ATM machines — predefined transaction rules',
        '📋 Business rule engines — "If customer age > 18, allow purchase"'
      ]}
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
      { type: 'paragraph', text: 'Real-World Examples:', align: 'center' },
      { type: 'bullet', items: [
        '📊 Netflix recommendations — learns from your viewing history',
        '📧 Email spam filters — learns what spam looks like',
        '💰 Credit scoring — learns patterns of good vs bad borrowers',
        '🎯 Fraud detection — learns suspicious transaction patterns',
        '🏥 Disease prediction — learns from medical records'
      ]}
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
      { type: 'paragraph', text: 'Real-World Examples:', align: 'center' },
      { type: 'bullet', items: [
        '🚗 Self-driving cars — recognizing pedestrians, signs, obstacles',
        '📱 Face unlock — identifying unique facial features',
        '🎤 Voice assistants — understanding speech and context',
        '🖼️ Medical imaging — detecting tumors in X-rays',
        '🌐 Language translation — understanding meaning across languages',
        '🎨 AI art generation — creating images from text descriptions'
      ]}
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
      { type: 'bold', text: 'Rule-Based AI 🦎' },
      { type: 'paragraph', text: 'Best for: Well-defined problems with clear logic (calculators, business rules). Fast, predictable, explainable.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Machine Learning 🐅' },
      { type: 'paragraph', text: 'Best for: Pattern recognition with structured data (recommendations, predictions, classification). Adapts to new data.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Deep Learning 🐉' },
      { type: 'paragraph', text: 'Best for: Complex unstructured data (images, speech, language, video). Highest accuracy but requires more data and computing power.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Insight: Most real-world AI systems combine multiple approaches. For example, a self-driving car uses rule-based logic for traffic laws, ML for route optimization, and Deep Learning for recognizing objects.', align: 'center' }
    ]
  },
  {
    title: 'Why It Matters',
    elements: [
      { type: 'title', text: 'Why It Matters' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Understanding AI types empowers you to:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🎯 Choose the right tool for each problem',
        '💼 Make informed decisions in tech careers',
        '🔍 Recognize AI in everyday products',
        '🧠 Understand how modern systems work',
        '🚀 Build better AI solutions yourself'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'As AI becomes more integrated into society, this knowledge helps you navigate the digital world with confidence and make informed choices about technology.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '💡', size: 60 }
    ]
  },
  {
    title: 'Prepare Your Mind',
    elements: [
      { type: 'title', text: 'Prepare Your Mind' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your mission in this jungle:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🔍 Spot real-world AI examples',
        '🧠 Classify them into Rule-based, ML, or DL',
        '🎯 Understand why each uses its specific approach',
        '💪 Train your AI recognition skills!'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Remember: There\'s no "best" AI type — only the right tool for the right job. Your goal is to develop intuition for matching problems to solutions.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
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
      { type: 'diagram', diagramType: 'dataset', width: 500, height: 300 },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Features → the inputs (color, size, speed, temperature, text…)' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'Label → the correct answer (cat/dog, price, category, sentiment)' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Real-World Example: A dataset for predicting house prices might have features like square footage, number of bedrooms, and location, with labels being the actual sale prices.', align: 'center' }
    ]
  },
  {
    title: 'Training vs Testing',
    elements: [
      { type: 'title', text: 'Training vs Testing' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'To teach a machine properly, we must separate learning from evaluation — just like students study with practice tests, then take a final exam.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Training Data (80-90%): examples used to learn patterns' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'The model sees these examples repeatedly, adjusting its understanding until it can predict correctly.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Testing Data (10-20%): fresh examples used to measure real performance' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'The model has never seen these examples. This tests whether it truly learned the pattern or just memorized the training data.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '⚠️', size: 40 }
    ]
  },
  {
    title: 'Training vs Testing: Critical Rules',
    elements: [
      { type: 'title', text: 'Training vs Testing: Critical Rules' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: '⚠️ Critical Rule' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Never use the same data for both — it would be like giving students the exam answers beforehand! This leads to "overfitting," where the model memorizes instead of learning.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: '💡 Did you know?' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This separation is why AI systems can fail in the real world — they might perform perfectly on test data but struggle with truly new situations.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '⚠️', size: 40 }
    ]
  },
  {
    title: 'Types of Machine Learning',
    elements: [
      { type: 'title', text: 'Types of Machine Learning' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Machine learning has three main paradigms, each suited for different problems:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Supervised Learning 📚' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'The model gets both inputs and correct outputs (labeled data). Like a student with an answer key.', align: 'center' },
      { type: 'bullet', items: [
        'Examples: Email spam detection, price prediction, image classification',
        'Use when: You have examples with known correct answers'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Unsupervised Learning 🔍' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'No labels — the model finds patterns and groups things on its own. Like discovering hidden structures in data.', align: 'center' },
      { type: 'bullet', items: [
        'Examples: Customer segmentation, anomaly detection, topic modeling',
        'Use when: You want to discover unknown patterns in data'
      ]}
    ]
  },
  {
    title: 'Reinforcement Learning',
    elements: [
      { type: 'title', text: 'Reinforcement Learning' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Reinforcement Learning 🎮' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'The model learns by trial, error, and rewards. Like training a pet with treats for good behavior.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Examples: Game-playing AI, robotics, autonomous vehicles',
        'Use when: The model can interact with an environment and receive feedback'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '📚', size: 50 }
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
      { type: 'paragraph', text: 'The Cycle:', align: 'center' },
      { type: 'bullet', items: [
        '📥 Collect Data — gather examples relevant to your problem',
        '✂️ Split Data — separate into training and testing sets',
        '🎓 Train Model — let the algorithm learn patterns',
        '📊 Evaluate Model — measure performance on test data',
        '🔄 Improve and Repeat — refine data, adjust model, iterate'
      ]}
    ]
  },
  {
    title: 'The ML Workflow: Iterative Process',
    elements: [
      { type: 'title', text: 'The ML Workflow: Iterative Process' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Insight: This cycle is iterative. Rarely does the first model work perfectly. Data scientists often go through this cycle dozens of times, improving each iteration.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This workflow powers almost every ML system today, from recommendation engines to medical diagnosis tools.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Why It Matters',
    elements: [
      { type: 'title', text: 'Why It Matters' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Understanding these fundamentals empowers you to:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🎯 Choose the right ML approach for your problem',
        '📊 Evaluate whether a model is trustworthy',
        '🔍 Understand why models succeed or fail',
        '💼 Communicate effectively with data scientists',
        '🚀 Build your own ML projects with confidence'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'ML lets machines improve by themselves instead of following fixed rules. This makes them flexible, adaptable, and smarter over time — but only when built correctly with quality data and proper evaluation.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🌟', size: 60 }
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
      { type: 'paragraph', text: '💡 Key Insight: A model doesn\'t memorize values — it learns the underlying pattern or relationship behind them.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Visual Metaphor: Imagine teaching someone to recognize the pattern "double the number." After seeing examples (2→4, 3→6, 5→10), they learn the rule, not just the specific pairs. They can then predict 7→14 without ever seeing that example.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Example Pattern:', align: 'center' },
      { type: 'paragraph', text: 'If the relationship is "double the number",', align: 'center' },
      { type: 'paragraph', text: 'the model learns the mathematical formula:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'y = 2 × x', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This formula captures the pattern, allowing predictions for any input value, not just the training examples.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🧮', size: 50 }
    ]
  },
  {
    title: 'Linear Regression',
    elements: [
      { type: 'title', text: 'Linear Regression' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Linear Regression is the simplest and most widely-used predictive model. It finds the best straight line through your data points.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        '📊 Finds the best line through your data — minimizes distance from all points',
        '📈 Learns a slope (how fast values grow) — the rate of change',
        '📍 Learns an intercept (where the line starts) — the baseline value',
        '🔮 The model becomes a "predictor" — can estimate future values'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Real-World Applications:', align: 'center' },
      { type: 'bullet', items: [
        '💰 Predicting house prices from square footage',
        '📊 Forecasting sales from advertising spend',
        '🌡️ Estimating temperature from time of day',
        '📈 Stock price predictions (with limitations)'
      ]}
    ]
  },
  {
    title: 'Why Linear Regression Works',
    elements: [
      { type: 'title', text: 'Why Linear Regression Works' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Why It\'s Powerful:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        'Simple — easy to understand and implement',
        'Fast — quick to train and make predictions',
        'Interpretable — you can see exactly what it learned',
        'Works well when relationships are roughly linear',
        'Starting point for most ML projects'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '📈', size: 50 }
    ]
  },
  {
    title: 'Data → Model → Prediction',
    elements: [
      { type: 'title', text: 'Data → Model → Prediction' },
      { type: 'spacer', height: 20 },
      { type: 'graph', graphType: 'scatter', width: 500, height: 350 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The Complete Pipeline:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '📥 Give the model data (X, y) — input features and target values',
        '🎓 Let it find the pattern — algorithm adjusts line to fit data',
        '✅ Validate the model — test on unseen data to check accuracy',
        '🔮 Ask it to predict — input new X, get predicted y',
        '📊 Evaluate performance — compare predictions to reality'
      ]}
    ]
  },
  {
    title: 'Making Good Predictions',
    elements: [
      { type: 'title', text: 'Making Good Predictions' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Critical Point:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'If trained well, predictions will match reality. If trained poorly (overfitting, bad data), predictions will fail on new examples.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This pipeline — from data to prediction — is the foundation of all supervised machine learning.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🔮', size: 50 }
    ]
  },
  {
    title: 'Human vs Machine',
    elements: [
      { type: 'title', text: 'Human vs Machine' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'When it comes to pattern recognition, both humans and machines have strengths:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Human Advantages 🧠' },
      { type: 'bullet', items: [
        'Intuition for complex, non-linear patterns',
        'Context understanding and common sense',
        'Ability to spot outliers and anomalies',
        'Creative problem-solving'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Machine Advantages 🤖' },
      { type: 'bullet', items: [
        'Processes massive datasets (millions of points)',
        'Consistent, unbiased pattern detection',
        'Finds subtle correlations humans miss',
        'Works 24/7 without fatigue'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Insight: The best approach often combines both — humans define problems and interpret results, machines find patterns in large-scale data.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🤖', size: 50 }
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
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Welcome to the heart of Deep Learning — where artificial neurons work together to solve complex problems.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This temple holds the secrets of neural networks: how simple units combine to create powerful intelligence. You\'ll discover how layers of neurons transform raw data into meaningful understanding.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'By understanding neurons and layers, you\'ll grasp how Deep Learning achieves its remarkable capabilities in vision, speech, and language.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🧠', size: 60 }
    ]
  },
  {
    title: 'What Is a Neuron?',
    elements: [
      { type: 'title', text: 'What Is a Neuron?' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'neuron', width: 600, height: 300 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Visual Metaphor: Think of a neuron as a tiny voting committee. It receives multiple inputs (opinions), weighs their importance (weights), combines them, and makes a decision (output).', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How a Neuron Works:', align: 'center' },
      { type: 'bullet', items: [
        '📥 Takes inputs — receives signals from other neurons or data',
        '⚖️ Combines them using weights — multiplies each input by its importance',
        '🔢 Applies an activation function — decides whether to "fire" (send signal)',
        '📤 Produces an output — passes the result to the next layer',
        '🧠 It\'s like a tiny decision-maker — simple but powerful when combined'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Key Insight: A single neuron is simple, but thousands working together can recognize faces, understand speech, and translate languages.', align: 'center' }
    ]
  },
  {
    title: 'Layers: Building Complexity',
    elements: [
      { type: 'title', text: 'Layers: Building Complexity' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'neural-network', width: 600, height: 350 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Neural networks stack neurons into layers, each building on the previous one\'s understanding:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Input Layer 📥' },
      { type: 'paragraph', text: 'Receives raw data (pixels, words, sounds). Each neuron represents one feature.', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'Hidden Layers 🧩' },
      { type: 'paragraph', text: 'Extract increasingly abstract patterns. Early layers detect simple features (edges), later layers detect complex concepts (faces, objects).', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'Output Layer 📤' },
      { type: 'paragraph', text: 'Produces the final prediction or classification (e.g., "this is a cat" or "price = $250,000").', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Why Layers Matter: Each layer transforms the data into something more meaningful. This hierarchical processing is what makes deep learning so powerful for complex data.', align: 'center' }
    ]
  },
  {
    title: 'Why Deep Learning Works',
    elements: [
      { type: 'title', text: 'Why Deep Learning Works' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Deep Learning excels when data is complex, high-dimensional, and rich in patterns:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🖼️ Images — millions of pixels with spatial relationships',
        '🎤 Speech — audio waveforms with temporal patterns',
        '✍️ Handwriting — stroke sequences and shapes',
        '📝 Language — words with syntax, semantics, and context',
        '🎥 Video — sequences of images with motion',
        '🧬 Genomics — DNA sequences with biological patterns'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The Hierarchical Feature Extraction:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Layer 1: Raw pixels → edges, lines, colors' },
      { type: 'bold', text: 'Layer 2: Edges → shapes, textures' },
      { type: 'bold', text: 'Layer 3: Shapes → object parts (eyes, wheels)' },
      { type: 'bold', text: 'Layer 4: Parts → complete objects (faces, cars)' }
    ]
  },
  {
    title: 'Automatic Feature Extraction',
    elements: [
      { type: 'title', text: 'Automatic Feature Extraction' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Did you know?', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This automatic feature extraction is why Deep Learning revolutionized AI. Previously, engineers had to manually design features. Now, networks learn them automatically from data.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🧠', size: 50 }
    ]
  },
  {
    title: 'Data Transformations',
    elements: [
      { type: 'title', text: 'Data Transformations' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'As data flows through a neural network, it undergoes a remarkable transformation — from raw, meaningless numbers to rich, meaningful understanding.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Example: Image Recognition Journey', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Input: Raw pixels (millions of numbers)' },
      { type: 'bold', text: '→ Layer 1: Edges and basic patterns' },
      { type: 'bold', text: '→ Layer 2: Shapes and textures' },
      { type: 'bold', text: '→ Layer 3: Object parts (eyes, wheels, doors)' },
      { type: 'bold', text: '→ Layer 4: Complete objects (faces, cars, buildings)' },
      { type: 'bold', text: '→ Output: "This is a cat" or "This is a car"' }
    ]
  },
  {
    title: 'How Transformations Work',
    elements: [
      { type: 'title', text: 'How Transformations Work' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Visual Metaphor: Like a sculptor carving a statue, each layer removes unnecessary information and reveals the essential structure beneath.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Insight:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This transformation happens automatically during training. The network learns which features matter most for the task at hand.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🔄', size: 50 }
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
      { type: 'paragraph', text: 'You provide examples:', align: 'center' },
      { type: 'bullet', items: [
        '📷 Images — photos from your webcam or uploaded files',
        '🎤 Sounds — audio recordings or microphone input',
        '🤸 Poses — body position data from your camera'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'The system learns patterns using deep learning…', align: 'center' },
      { type: 'paragraph', text: 'and becomes capable of recognizing new examples it has never seen before.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Behind the scenes: Teachable Machine uses transfer learning — a pre-trained neural network that you fine-tune with your specific examples. This makes training fast and accessible.', align: 'center' }
    ]
  },
  {
    title: 'Why This Is Powerful',
    elements: [
      { type: 'title', text: 'Why This Is Powerful' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Teachable Machine democratizes AI — making machine learning accessible without coding, complex setup, or expensive hardware.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🚫 No coding required — visual, interactive interface',
        '⚡ Fast training — models ready in minutes, not days',
        '🎨 Creative freedom — build projects limited only by imagination',
        '🌐 Runs in browser — no installation, works on any device',
        '📚 Educational — see ML concepts in action',
        '🔗 Export models — use in your own apps and projects'
      ]}
    ]
  },
  {
    title: 'Real-World Applications',
    elements: [
      { type: 'title', text: 'Real-World Applications' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'What You Can Build:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🎮 Game controllers using hand gestures',
        '🎵 Music instruments triggered by body poses',
        '🏠 Smart home devices activated by voice',
        '🎨 Interactive art installations',
        '📚 Educational tools for classrooms'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '✨', size: 60 }
    ]
  },
  {
    title: 'How Training Works',
    elements: [
      { type: 'title', text: 'How Training Works' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The training process follows the ML workflow you learned earlier:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '📥 Collect samples — record or upload examples for each class (e.g., "cat" vs "dog")',
        '🎓 Train the model — Teachable Machine learns the differences between your classes',
        '🧪 Test the model — try new examples to see if it recognizes them correctly',
        '📈 Improve it — add more diverse examples to increase accuracy',
        '🔄 Iterate — refine your dataset and retrain until satisfied'
      ]}
    ]
  },
  {
    title: 'Pro Tips for Better Models',
    elements: [
      { type: 'title', text: 'Pro Tips for Better Models' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Pro Tips:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'More examples = better accuracy (aim for 50+ per class)',
        'Diverse examples = better generalization (different lighting, angles, backgrounds)',
        'Balanced classes = fair predictions (similar number of examples per class)',
        'Test thoroughly = catch mistakes before deployment'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Real Teachable Machine',
    elements: [
      { type: 'title', text: 'Real Teachable Machine' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Ready to build your own AI model?', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Visit the official Teachable Machine website:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'https://teachablemachine.withgoogle.com/' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'What You Can Build:', align: 'center' },
      { type: 'bullet', items: [
        '🎨 Image classifier — recognize objects, people, or scenes',
        '🎤 Sound classifier — identify sounds, music, or voices',
        '🤸 Pose classifier — detect body positions and movements'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Project Ideas: Rock-paper-scissors detector, pet breed identifier, musical instrument classifier, exercise pose counter, or anything you can imagine!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🌐', size: 50 }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Time to practice training your own model!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Inside the game:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🏛️ Choose your shrine — select a classification task',
        '📦 Collect example icons — gather training data',
        '🎓 Train your simulated model — watch it learn patterns',
        '🧪 Test its predictions — see how well it performs',
        '📊 Evaluate accuracy — understand model performance'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This simulation mirrors the real Teachable Machine experience, preparing you to build actual models!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
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
        '📥 Data Collection — gather relevant examples',
        '🧹 Data Preparation — clean, format, and organize',
        '✂️ Data Splitting — separate training and testing sets',
        '🎓 Model Training — teach the algorithm patterns',
        '📊 Model Evaluation — measure performance on test data',
        '🔧 Model Improvement — refine based on results',
        '🚀 Deployment — integrate into real applications'
      ]}
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
    title: 'Pipeline: Real-World Impact',
    elements: [
      { type: 'title', text: 'Pipeline: Real-World Impact' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Real-World Impact:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🏥 Medical AI — pipelines ensure patient safety',
        '🚗 Autonomous vehicles — systematic testing prevents accidents',
        '💰 Financial systems — proper evaluation prevents costly errors',
        '🌐 Recommendation engines — pipelines enable continuous improvement'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Professional Insight: Data scientists and ML engineers use this pipeline every day. It\'s the foundation of production AI systems.', align: 'center' }
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
      { type: 'paragraph', text: 'You will receive:', align: 'center' },
      { type: 'bullet', items: [
        '🎓 Your AI Explorer Certificate — proof of your achievement',
        '📚 Complete list of Colab links — hands-on coding exercises',
        '🔗 Link to Teachable Machine — build your own models',
        '💪 Resources and encouragement — continue your AI journey',
        '🚀 Project ideas — start building real applications'
      ]}
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
      { type: 'paragraph', text: 'Remember: Every expert was once a beginner. Keep learning, keep building, and keep exploring!', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🚀', size: 60 }
    ]
  }
];

