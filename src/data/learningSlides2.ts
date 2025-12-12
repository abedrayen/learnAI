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
      { type: 'paragraph', text: 'Features are the measurable characteristics or attributes of each example. They\'re the "clues" the model uses to make predictions. More relevant features often lead to better predictions.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Label → the correct answer (cat/dog, price, category, sentiment)' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Labels are the "ground truth" — the correct answers we want the model to learn. In supervised learning, labels guide the model; in unsupervised learning, there are no labels.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Real-World Example: A dataset for predicting house prices might have features like square footage, number of bedrooms, location, age, and nearby schools, with labels being the actual sale prices. The model learns which features most influence price.', align: 'center' }
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
        '🔍 Identifies problems early — reveals issues before deployment'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Professional Insight: Data scientists typically use 70-80% for training, 10-15% for validation (tuning), and 10-15% for testing (final evaluation).', align: 'center' }
    ]
  },
  {
    title: 'Understanding Overfitting',
    elements: [
      { type: 'title', text: 'Understanding Overfitting' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What Is Overfitting? (In Simple Terms)' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Overfitting happens when a model memorizes the training examples instead of learning the underlying pattern. It\'s like a student who memorizes answers to specific questions but can\'t solve similar problems.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Signs:' },
      { type: 'bullet', items: [
        '✅ Model performs perfectly on training data (99% accuracy)',
        '❌ Model performs poorly on new, unseen data (60% accuracy)',
        '⚠️ Large gap between training and testing performance'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Real-World Example:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'A spam filter trained only on emails from 2020 might memorize specific senders and keywords from that year. When 2024 emails arrive with new patterns, it fails because it never learned the general concept of "spam."', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'How to Prevent It:' },
      { type: 'bullet', items: [
        '📊 Use more diverse training data',
        '✂️ Always test on separate, unseen data',
        '🎯 Simplify the model if it\'s too complex',
        '🔄 Regularize — add constraints to prevent memorization'
      ]}
    ]
  },
  {
    title: 'How Data Quality Influences Models',
    elements: [
      { type: 'title', text: 'How Data Quality Influences Models' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The quality of your data directly determines the quality of your model. This is one of the most important principles in machine learning.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Garbage In, Garbage Out (GIGO)' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'If you feed a model bad data, it will learn bad patterns. No amount of sophisticated algorithms can fix fundamentally flawed data.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What Makes Good Data?' },
      { type: 'bullet', items: [
        '✅ Accurate — labels are correct and features are reliable',
        '📊 Representative — reflects real-world diversity and scenarios',
        '🧹 Clean — no missing values, errors, or inconsistencies',
        '⚖️ Balanced — sufficient examples for each class or category',
        '🎯 Relevant — features actually relate to the problem',
        '📈 Sufficient — enough examples to learn patterns (typically 100s-1000s+)'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Real-World Impact:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'A medical diagnosis model trained on biased data (e.g., only male patients) will perform poorly on female patients. A recommendation system trained on incomplete data will miss important patterns. Data quality isn\'t just technical — it\'s ethical and practical.', align: 'center' }
    ]
  },
  {
    title: 'Types of Machine Learning',
    elements: [
      { type: 'title', text: 'Types of Machine Learning' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Machine learning has three main paradigms, each suited for different problems. Understanding when to use each is crucial for building effective AI systems.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Supervised Learning 📚' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'The model gets both inputs and correct outputs (labeled data). Like a student with an answer key who learns by comparing their answers to the correct ones.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        'You provide examples with known correct answers',
        'The model learns the relationship between inputs and outputs',
        'It can then predict outputs for new, unseen inputs'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Real-World Applications:', align: 'center' },
      { type: 'bullet', items: [
        '🏥 Medical diagnosis — predicting diseases from symptoms and test results',
        '📧 Email spam detection — learning which emails are spam vs. legitimate',
        '💰 Price prediction — estimating house prices from features',
        '🖼️ Image classification — recognizing objects in photos',
        '📊 Sentiment analysis — determining if text is positive or negative'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Use when: You have examples with known correct answers and want to predict or classify new examples.', align: 'center' }
    ]
  },
  {
    title: 'Unsupervised Learning Deep Dive',
    elements: [
      { type: 'title', text: 'Unsupervised Learning Deep Dive' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Unsupervised Learning 🔍' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'No labels — the model finds patterns and groups things on its own. Like discovering hidden structures in data without a teacher.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        'You provide data without labels or correct answers',
        'The model discovers hidden patterns, clusters, or relationships',
        'It reveals insights you might not have known existed'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Real-World Applications:', align: 'center' },
      { type: 'bullet', items: [
        '👥 Customer segmentation — grouping customers by behavior patterns (e.g., "frequent buyers," "bargain hunters," "luxury shoppers")',
        '🔍 Anomaly detection — finding unusual patterns (fraud, system failures)',
        '📚 Topic modeling — discovering themes in large text collections',
        '🛒 Market basket analysis — finding products frequently bought together',
        '🧬 Gene clustering — grouping similar genes in biology research'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Use when: You want to discover unknown patterns, group similar items, or explore data without predefined categories.', align: 'center' }
    ]
  },
  {
    title: 'Reinforcement Learning',
    elements: [
      { type: 'title', text: 'Reinforcement Learning' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Reinforcement Learning 🎮' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'The model learns by trial, error, and rewards. Like training a pet with treats for good behavior — it tries different actions, receives feedback, and learns which actions lead to rewards.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'How It Works:', align: 'center' },
      { type: 'bullet', items: [
        'Agent takes actions in an environment',
        'Receives rewards (positive) or penalties (negative)',
        'Learns to maximize rewards over time',
        'Develops strategies through repeated interactions'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Real-World Applications:', align: 'center' },
      { type: 'bullet', items: [
        '🤖 Robot learning — robots learn to walk, grasp objects, or navigate by trying actions and receiving feedback',
        '🎮 Game-playing AI — AlphaGo, chess engines learn optimal strategies through millions of games',
        '🚗 Autonomous vehicles — learn to drive safely by experiencing different traffic scenarios',
        '📊 Recommendation systems — learn to suggest content that keeps users engaged',
        '🏭 Industrial control — optimizing energy usage, manufacturing processes'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Use when: The model can interact with an environment, receive feedback, and learn through exploration. Perfect for sequential decision-making problems.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎮', size: 50 }
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
      { type: 'bold', text: 'Intuitive Ways to Think About ML Tasks:' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '🔍 Classification — "Is this a cat or dog?" (choosing categories)',
        '📊 Regression — "What will the price be?" (predicting numbers)',
        '👥 Clustering — "Which customers are similar?" (finding groups)',
        '🎯 Recommendation — "What would this user like?" (suggesting items)',
        '🔮 Forecasting — "What will happen next?" (predicting sequences)'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This workflow powers almost every ML system today, from recommendation engines to medical diagnosis tools. Each step builds on the previous, creating a systematic approach to building intelligent systems.', align: 'center' },
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
      { type: 'paragraph', text: 'Real-World Applications:', align: 'center' },
      { type: 'bullet', items: [
        '💰 Predicting house prices from square footage',
        '📊 Forecasting sales from advertising spend',
        '🌡️ Estimating temperature from time of day',
        '📈 Stock price predictions (with limitations)',
        '🎓 Predicting student performance from study hours',
        '💊 Estimating drug dosage based on patient weight'
      ]}
    ]
  },
  {
    title: 'Why Linear Models Matter',
    elements: [
      { type: 'title', text: 'Why Linear Models Matter' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Linear regression is the foundation of machine learning for good reasons:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Strengths 💪' },
      { type: 'bullet', items: [
        '✅ Simple and interpretable — you can understand exactly what it learned',
        '⚡ Fast — trains in milliseconds, even with large datasets',
        '🎯 Reliable — works well when relationships are roughly linear',
        '📊 Transparent — coefficients tell you how each feature affects predictions',
        '🔧 Versatile — foundation for more complex models',
        '📈 Excellent baseline — always start here before trying complex models'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Limitations ⚠️' },
      { type: 'bullet', items: [
        '📉 Assumes linear relationships — fails when patterns are curved or complex',
        '🔗 Can\'t capture interactions — doesn\'t model how features combine',
        '📊 Sensitive to outliers — extreme values can skew the line',
        '🎯 Limited complexity — can\'t learn non-linear patterns'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Professional Insight: Most data scientists start with linear regression as a baseline. If it works well, great! If not, they move to more complex models. Simple models often outperform complex ones when data is limited.', align: 'center' }
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
      { type: 'paragraph', text: 'Visual Metaphor: Like adjusting a telescope lens — you twist it slightly, check if the image is clearer, and keep adjusting until it\'s perfectly focused. The algorithm does this mathematically, finding the "focus" that makes predictions most accurate.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 This process is called "optimization" — finding the best possible values for slope and intercept that minimize prediction errors.', align: 'center' }
    ]
  },
  {
    title: 'Interpreting Coefficients',
    elements: [
      { type: 'title', text: 'Interpreting Coefficients' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'One of linear regression\'s greatest strengths is interpretability — you can understand exactly what the model learned.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Formula: y = slope × x + intercept' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Slope (Rate of Change):' },
      { type: 'paragraph', text: 'Tells you how much y changes when x increases by 1 unit.', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Example: If slope = 50 for house prices (price = 50 × square_feet + 10000), then each additional square foot adds $50 to the price.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Intercept (Starting Point):' },
      { type: 'paragraph', text: 'The predicted value when x = 0 (the baseline).', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Example: If intercept = 10000, a house with 0 square feet (theoretical) would cost $10,000 — this represents the base value before size is considered.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Real-World Interpretation:' },
      { type: 'paragraph', text: 'In medical diagnosis: "For each year of age, risk increases by 2% (slope), with a baseline risk of 5% (intercept)." This makes the model\'s reasoning transparent and trustworthy.', align: 'center' }
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
    title: 'Errors and Optimization',
    elements: [
      { type: 'title', text: 'Errors and Optimization' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Every prediction has an error — the difference between what the model predicted and what actually happened. The goal is to minimize these errors.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Types of Errors:' },
      { type: 'bullet', items: [
        '📏 Prediction Error — difference between predicted and actual value',
        '📊 Mean Squared Error (MSE) — average of squared errors (penalizes large errors more)',
        '📈 Mean Absolute Error (MAE) — average of absolute errors (easier to interpret)'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Optimization Process:' },
      { type: 'paragraph', text: 'The algorithm tries different slopes and intercepts, calculates total error for each, and chooses the combination with the smallest error. This is like finding the lowest point in a valley — you keep adjusting until you reach the bottom.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Why Squared Errors? Squaring makes large errors much more costly, so the model prioritizes avoiding big mistakes over small ones. This creates a more robust line.', align: 'center' }
    ]
  },
  {
    title: 'Prediction Reliability',
    elements: [
      { type: 'title', text: 'Prediction Reliability' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Not all predictions are equally reliable. Understanding when to trust your model is crucial.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'When Predictions Are Reliable:' },
      { type: 'bullet', items: [
        '✅ New data is similar to training data',
        '✅ The relationship is actually linear',
        '✅ You have enough training examples',
        '✅ Data quality is good (no errors, outliers handled)'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'When to Be Cautious:' },
      { type: 'bullet', items: [
        '⚠️ Predicting far outside the training range (extrapolation)',
        '⚠️ Data has changed significantly since training',
        '⚠️ Relationship is clearly non-linear (curved patterns)',
        '⚠️ High error on test data indicates poor fit'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Example: A model trained on house prices from 2020 might predict poorly for 2024 if the market changed dramatically. Always validate predictions with domain knowledge.', align: 'center' }
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
      { type: 'paragraph', text: 'This pipeline — from data to prediction — is the foundation of all supervised machine learning. Linear regression teaches you the core principles that apply to all ML models.', align: 'center' },
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
    title: 'Understanding Weights',
    elements: [
      { type: 'title', text: 'Understanding Weights' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Weights are the "importance scores" that determine how much each input influences the neuron\'s decision. They\'re the key to learning.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What Are Weights?' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Weights are numbers that multiply each input. A high weight means "this input is very important." A low (or negative) weight means "this input is less important" or "ignore this input."', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Example:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'In a face recognition neuron, inputs might be pixel values. The weight for a pixel in the "eye region" would be high (important for recognizing faces), while a pixel in the background would have a low weight.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'How Weights Are Learned:' },
      { type: 'paragraph', text: 'During training, the network adjusts weights automatically. It starts with random weights, makes predictions, sees errors, and updates weights to reduce errors. This is the essence of learning!', align: 'center' }
    ]
  },
  {
    title: 'Activation Functions',
    elements: [
      { type: 'title', text: 'Activation Functions' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Activation functions are the "decision-makers" in neurons. They determine whether and how strongly a neuron should fire based on its weighted inputs.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why We Need Them:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Without activation functions, neural networks would just be linear transformations — no matter how many layers, they\'d still only learn linear patterns. Activations introduce non-linearity, enabling networks to learn complex, curved relationships.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Common Activation Functions:' },
      { type: 'bullet', items: [
        'ReLU (Rectified Linear Unit) — "If input > 0, pass it through; otherwise, output 0" (most common)',
        'Sigmoid — Squashes values to 0-1 range (good for probabilities)',
        'Tanh — Squashes values to -1 to 1 range (centered version)'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Analogy: Think of activation functions like filters on a camera. They transform the raw signal (weighted sum) into a refined output, just like artistic filters transform photos step by step.', align: 'center' }
    ]
  },
  {
    title: 'Why Nonlinear Functions Matter',
    elements: [
      { type: 'title', text: 'Why Nonlinear Functions Matter' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Nonlinear activation functions are what make neural networks powerful. They allow networks to learn complex, curved patterns that linear models cannot.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Problem with Linear Only:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'If neurons only did linear transformations (just adding and multiplying), even 100 layers would still only learn straight-line relationships. Real-world data is rarely linear — it has curves, twists, and complex patterns.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'How Nonlinearity Helps:' },
      { type: 'bullet', items: [
        'Enables learning curved boundaries (e.g., separating cats from dogs in image space)',
        'Allows modeling complex relationships (e.g., price vs. features with interactions)',
        'Creates decision boundaries that aren\'t just straight lines',
        'Enables hierarchical feature learning (simple → complex patterns)'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Visual Metaphor: Linear functions are like drawing only with straight lines. Nonlinear functions let you draw curves, circles, and complex shapes — essential for capturing real-world patterns.', align: 'center' }
    ]
  },
  {
    title: 'Layers: Building Complexity',
    elements: [
      { type: 'title', text: 'Layers: Building Complexity' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'neural-network', width: 600, height: 350 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Neural networks stack neurons into layers, each building on the previous one\'s understanding. Think of layers as artistic filters that transform raw data step by step.', align: 'center' },
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
    title: 'Why Depth Matters',
    elements: [
      { type: 'title', text: 'Why Depth Matters' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Deep networks (many layers) can learn more complex patterns than shallow networks. But why?', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Power of Composition:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Each layer builds on the previous one. Layer 1 finds edges. Layer 2 combines edges into shapes. Layer 3 combines shapes into object parts. Layer 4 combines parts into complete objects. This composition of simple patterns creates complex understanding.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why More Layers Help:' },
      { type: 'bullet', items: [
        '🔍 Deeper abstraction — later layers understand higher-level concepts',
        '🧩 Feature composition — simple features combine into complex ones',
        '📊 Hierarchical learning — mirrors how humans process information',
        '🎯 Better generalization — can capture more nuanced patterns'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'The Trade-off:' },
      { type: 'paragraph', text: 'More layers = more complexity and computation. But for complex tasks like image recognition or language understanding, depth is essential. Modern networks often have 50-100+ layers!', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Analogy: Like reading a book — you start with letters (Layer 1), combine them into words (Layer 2), words into sentences (Layer 3), sentences into paragraphs (Layer 4), and paragraphs into meaning (Output). Each layer adds understanding.', align: 'center' }
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
      { type: 'paragraph', text: 'Visual Metaphor: Like a sculptor carving a statue, each layer removes unnecessary information and reveals the essential structure beneath. Or like artistic filters that transform raw data step by step into meaningful understanding.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: '💡 Insight:', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'This transformation happens automatically during training. The network learns which features matter most for the task at hand.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Backpropagation: How Networks Learn',
    elements: [
      { type: 'title', text: 'Backpropagation: How Networks Learn' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Backpropagation is the algorithm that teaches neural networks. It\'s how the network learns from mistakes and improves over time.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Process (Simplified):' },
      { type: 'spacer', height: 15 },
      { type: 'bullet', items: [
        '1️⃣ Forward Pass — data flows through the network, making a prediction',
        '2️⃣ Calculate Error — compare prediction to correct answer',
        '3️⃣ Backward Pass — error flows backward through layers',
        '4️⃣ Update Weights — adjust weights to reduce error',
        '5️⃣ Repeat — do this thousands of times until accurate'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'The Analogy:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Like learning to throw darts: you throw (forward pass), see where it lands (error), figure out what went wrong (backward pass), adjust your aim (update weights), and try again. Over time, you get better.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why It Works:' },
      { type: 'paragraph', text: 'Backpropagation calculates how much each weight contributed to the error, then adjusts weights proportionally. Weights that caused big errors get adjusted more. This is the mathematical foundation of learning in neural networks.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Key Insight: This happens automatically — you don\'t program the network to recognize cats. You show it cat images, and backpropagation teaches it to recognize them through thousands of adjustments.', align: 'center' }
    ]
  },
  {
    title: 'Major Deep Learning Applications',
    elements: [
      { type: 'title', text: 'Major Deep Learning Applications' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Deep learning has revolutionized many fields. Here\'s why depth matters in real applications:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Computer Vision 👁️' },
      { type: 'bullet', items: [
        '🖼️ Image classification — recognizing objects in photos',
        '🚗 Self-driving cars — detecting pedestrians, signs, obstacles',
        '🏥 Medical imaging — detecting tumors, analyzing X-rays',
        '🔒 Face recognition — security systems, photo organization'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Natural Language Processing 📝' },
      { type: 'bullet', items: [
        '🌐 Translation — Google Translate, language understanding',
        '💬 Chatbots — customer service, virtual assistants',
        '📊 Sentiment analysis — understanding emotions in text',
        '✍️ Text generation — GPT models, creative writing'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Speech & Audio 🎤' },
      { type: 'bullet', items: [
        '🗣️ Speech recognition — Siri, Alexa, voice commands',
        '🎵 Music generation — creating new compositions',
        '🔊 Audio classification — identifying sounds, music genres'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Why Depth Matters: These tasks require understanding hierarchical patterns. Shallow networks can\'t capture the complexity needed for real-world AI applications.', align: 'center' }
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
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why This Works:' },
      { type: 'paragraph', text: 'The pre-trained network already knows how to extract useful features from images (edges, textures, shapes). You just teach it which combinations of features represent your classes. This is much faster than training from scratch!', align: 'center' }
    ]
  },
  {
    title: 'How Inputs Become Features',
    elements: [
      { type: 'title', text: 'How Inputs Become Features' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Understanding how models convert raw inputs into features helps you create better training data.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Image Models:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Images → Pixels → Edges → Shapes → Objects', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Your photo is converted to pixels (numbers), then the network detects edges, combines them into shapes, and recognizes complete objects. This happens automatically through the neural network layers.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Audio Models:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Sound Waves → Frequencies → Patterns → Recognized Sounds', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Audio is converted to frequency patterns, then the network learns which frequency combinations represent different sounds (e.g., "meow" vs "bark").', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Pose Models:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Body Position → Key Points → Joint Angles → Poses', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'The camera detects body key points (shoulders, elbows, knees), calculates joint angles, and recognizes poses based on these geometric relationships.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Key Insight: Models don\'t "see" images or "hear" sounds like humans do. They process numerical patterns. Understanding this helps you create training data that emphasizes the right features.', align: 'center' }
    ]
  },
  {
    title: 'Data Variety and Balance',
    elements: [
      { type: 'title', text: 'Data Variety and Balance' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Why Data Variety Matters:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Models learn from what you show them. If you only show cats in bright sunlight, the model won\'t recognize cats in shadows. Variety teaches the model what features are truly important vs. what\'s just coincidence.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'For Images, Include:' },
      { type: 'bullet', items: [
        '🌞 Different lighting conditions (bright, dim, shadows)',
        '📐 Various angles and perspectives',
        '🎨 Different backgrounds and settings',
        '👥 Multiple examples of the same class (different cats, not just one)',
        '📏 Different sizes and distances'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Why Balance Matters:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'If you have 100 "cat" examples but only 10 "dog" examples, the model will be biased toward predicting "cat." Balanced classes (similar numbers) ensure fair predictions.', align: 'center' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Rule of Thumb: Aim for at least 50 examples per class, with roughly equal numbers across classes. More is better, but quality and variety matter more than quantity alone.', align: 'center' }
    ]
  },
  {
    title: 'Model Generalization',
    elements: [
      { type: 'title', text: 'Model Generalization' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Generalization is the ability to perform well on new, unseen examples — the ultimate test of whether your model truly learned.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'What Is Generalization?' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'A model that generalizes well can recognize examples it has never seen before. A model that doesn\'t generalize has memorized the training data but can\'t handle new situations.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'How to Improve Generalization:' },
      { type: 'bullet', items: [
        '📊 More diverse training data — covers more scenarios',
        '⚖️ Balanced classes — prevents bias toward common examples',
        '🧪 Test on new examples — validates real-world performance',
        '🔄 Iterate based on failures — add examples for cases that fail',
        '🎯 Focus on relevant features — avoid memorizing irrelevant details'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Real-World Example:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'A model trained only on photos of cats in living rooms might fail on cats outdoors. Adding outdoor examples teaches the model that "location" isn\'t a defining feature of "cat" — improving generalization.', align: 'center' }
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
        'Test thoroughly = catch mistakes before deployment',
        'Start simple = add complexity gradually',
        'Document failures = learn what the model struggles with'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Model Misuse and Limitations',
    elements: [
      { type: 'title', text: 'Model Misuse and Limitations' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Understanding model limitations is crucial for responsible AI use. Models can fail in predictable ways if not used correctly.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Common Misuses:' },
      { type: 'bullet', items: [
        '❌ Using models outside their training domain (e.g., medical diagnosis model for non-medical images)',
        '❌ Trusting predictions without validation (models can be confidently wrong)',
        '❌ Ignoring bias in training data (biased data → biased predictions)',
        '❌ Over-relying on models for critical decisions without human oversight'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Understanding Bias:' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'If your training data only includes certain groups (e.g., only young people, only one ethnicity), the model will perform poorly on excluded groups. This is data bias — the model reflects the biases in your data.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Model Limitations:' },
      { type: 'bullet', items: [
        '⚠️ Can only recognize patterns it was trained on',
        '⚠️ May fail on edge cases or unusual examples',
        '⚠️ Can be fooled by adversarial examples (specially crafted inputs)',
        '⚠️ Requires quality, representative training data',
        '⚠️ Performance depends on similarity between training and real-world data'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: '💡 Ethical Consideration: Always test models on diverse examples, especially for applications affecting people. Bias in AI can perpetuate real-world inequalities.', align: 'center' }
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

