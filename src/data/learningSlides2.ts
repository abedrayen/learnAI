import { EnhancedSlide } from '../ui/SlideElementTypes';

export const LEVEL_1_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Welcome to the AI Jungle',
    elements: [
      { type: 'title', text: 'Welcome to the AI Jungle' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Welcome, Explorer!', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'You\'ve entered the AI Jungle, where different forms of intelligence roam — from simple rule-followers to powerful deep learners.', align: 'center' },
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
      { type: 'paragraph', text: 'Machines doing tasks that normally require human intelligence, like recognizing faces or making decisions.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'AI doesn\'t "think" like us — it finds patterns and uses them to act.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🤖', size: 50 }
    ]
  },
  {
    title: 'Where Do You Meet AI Daily?',
    elements: [
      { type: 'title', text: 'Where Do You Meet AI Daily?' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'You interact with AI more than you think:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🔍 Search engines',
        '🎬 Movie/music recommendations',
        '📱 Face unlock',
        '🗣️ Smart assistants',
        '🚗 Self-driving cars',
        '📧 Spam filters'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'AI is everywhere — but not all AI works the same way.', align: 'center' }
    ]
  },
  {
    title: 'Types of AI Creatures',
    elements: [
      { type: 'title', text: 'Types of AI Creatures' },
      { type: 'spacer', height: 30 },
      { type: 'diagram', diagramType: 'ai-hierarchy', width: 600, height: 400 },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'AI can be categorized into three main types:', align: 'center' }
    ]
  },
  {
    title: 'Types of AI Creatures Explained',
    elements: [
      { type: 'title', text: 'Types of AI Creatures Explained' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Rule-Based AI (The Lizard)' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Follows strict instructions: "If this happens → do that." No learning, just rules.' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Machine Learning (The Tiger)' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Learns from data and improves over time. Recognizes patterns.' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Deep Learning (The Dragon)' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'A powerful form of ML that uses neural networks. Great for images, sound, language.' }
    ]
  },
  {
    title: 'Why It Matters',
    elements: [
      { type: 'title', text: 'Why It Matters' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Understanding the types of AI helps us recognize strengths, weaknesses, and where to use which approach.', align: 'center' },
      { type: 'spacer', height: 40 },
      { type: 'icon', icon: '💡', size: 60 }
    ]
  },
  {
    title: 'Prepare Your Mind',
    elements: [
      { type: 'title', text: 'Prepare Your Mind' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your goal in this jungle:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Spot examples of AI',
        'Decide which kind they belong to',
        'Train your explorer brain!'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'In the next challenge, collect AI icons and classify them into Rule-based, ML, or DL platforms.', align: 'center' },
      { type: 'spacer', height: 40 },
      { type: 'icon', icon: '🚀', size: 60 }
    ]
  }
];

export const LEVEL_2_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Welcome to the Machine Whisperer Zone',
    elements: [
      { type: 'title', text: 'Welcome to the Machine Whisperer Zone' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Here, machines learn just like students — from examples, patterns, and trial and error.', align: 'center' },
      { type: 'spacer', height: 40 },
      { type: 'icon', icon: '⚙️', size: 60 }
    ]
  },
  {
    title: 'What Is a Dataset?',
    elements: [
      { type: 'title', text: 'What Is a Dataset?' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'A dataset is a collection of examples.', align: 'center' },
      { type: 'paragraph', text: 'Think of it like a table:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'dataset', width: 500, height: 300 },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Features → the inputs (color, size, speed…)' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'Label → the correct answer (cat/dog, price, category)' }
    ]
  },
  {
    title: 'Training vs Testing',
    elements: [
      { type: 'title', text: 'Training vs Testing' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'To teach a machine properly:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Training Data: examples used to learn' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Testing Data: fresh examples used to measure how well the model learned' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Never use the same data for both — it would be cheating!', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '⚠️', size: 40 }
    ]
  },
  {
    title: 'Types of Machine Learning',
    elements: [
      { type: 'title', text: 'Types of Machine Learning' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Supervised Learning' },
      { type: 'paragraph', text: 'The model gets both inputs and correct outputs.' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Unsupervised Learning' },
      { type: 'paragraph', text: 'No labels — the model groups things on its own.' },
      { type: 'spacer', height: 15 },
      { type: 'bold', text: 'Reinforcement Learning' },
      { type: 'paragraph', text: 'The model learns by trial, error, and rewards.' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '📚', size: 50 }
    ]
  },
  {
    title: 'The ML Workflow',
    elements: [
      { type: 'title', text: 'The ML Workflow' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The Machine Whisperer uses a simple cycle:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'workflow', width: 800, height: 150 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'This cycle powers almost every ML system today.', align: 'center' }
    ]
  },
  {
    title: 'Why It Matters',
    elements: [
      { type: 'title', text: 'Why It Matters' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'ML lets machines improve by themselves instead of following fixed rules.', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'This makes them flexible, adaptable, and smarter over time.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🌟', size: 60 }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your mission:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Sort data into features and labels',
        'Choose the correct ML type for each scenario'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_3_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Inside the Data Scroll Room',
    elements: [
      { type: 'title', text: 'Inside the Data Scroll Room' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'You will learn your first ML spell: how to teach a machine a simple mathematical relationship.', align: 'center' },
      { type: 'spacer', height: 40 },
      { type: 'icon', icon: '📜', size: 60 }
    ]
  },
  {
    title: 'Models Learn Patterns',
    elements: [
      { type: 'title', text: 'Models Learn Patterns' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'A model doesn\'t memorize values — it learns the pattern behind them.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Example:', align: 'center' },
      { type: 'paragraph', text: 'If the pattern is "double the number",', align: 'center' },
      { type: 'paragraph', text: 'the model learns something like:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'y = 2 × x', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🧮', size: 50 }
    ]
  },
  {
    title: 'Linear Regression',
    elements: [
      { type: 'title', text: 'Linear Regression' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'The simplest model type:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Finds the best line through your data',
        'Learns a slope (how fast values grow)',
        'Learns an intercept (where the line starts)',
        'The model becomes a "predictor" of future values.'
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
      { type: 'paragraph', text: 'To cast your spell:', align: 'center' },
      { type: 'bullet', items: [
        'Give the model data (X, y)',
        'Let it find the pattern',
        'Ask it to predict a new value',
        'If trained well, predictions will match reality.'
      ]}
    ]
  },
  {
    title: 'Human vs Machine',
    elements: [
      { type: 'title', text: 'Human vs Machine' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Sometimes humans guess patterns better…', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'But for large datasets, the machine wins.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🤖', size: 50 }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your challenge:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Complete the ML pipeline puzzle',
        'Compare your prediction vs the machine\'s prediction'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_4_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Enter the Neural Temple',
    elements: [
      { type: 'title', text: 'Enter the Neural Temple' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'This temple holds the secrets of neurons — the building blocks of deep learning.', align: 'center' },
      { type: 'spacer', height: 40 },
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
      { type: 'paragraph', text: 'A neuron:', align: 'center' },
      { type: 'bullet', items: [
        'Takes inputs',
        'Combines them using weights',
        'Applies an activation function',
        'Produces an output',
        'It\'s like a tiny decision-maker.'
      ]}
    ]
  },
  {
    title: 'Layers',
    elements: [
      { type: 'title', text: 'Layers' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'neural-network', width: 600, height: 350 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Stack neurons together to make:', align: 'center' },
      { type: 'bullet', items: [
        'Input Layer',
        'Hidden Layers',
        'Output Layer',
        'Each layer transforms the data into something more meaningful.'
      ]}
    ]
  },
  {
    title: 'Why Deep Learning Works',
    elements: [
      { type: 'title', text: 'Why Deep Learning Works' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'DL shines when data is complex:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '🖼️ Images',
        '🎤 Speech',
        '✍️ Handwriting',
        '📝 Language'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Each layer extracts deeper features—like edges → shapes → objects.', align: 'center' }
    ]
  },
  {
    title: 'Data Transformations',
    elements: [
      { type: 'title', text: 'Data Transformations' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'As data moves through layers:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bold', text: 'Raw pixels → edges → shapes → object identity' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Each step refines the understanding.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Your mission:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Route a signal through the correct path of layers',
        'Solve the neuron switch puzzle'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_5_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'Welcome to the Ritual Chamber',
    elements: [
      { type: 'title', text: 'Welcome to the Ritual Chamber' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'Here you will learn to create your own intelligent creature.', align: 'center' },
      { type: 'spacer', height: 40 },
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
      { type: 'paragraph', text: 'You provide examples:', align: 'center' },
      { type: 'bullet', items: [
        '📷 Images',
        '🎤 Sounds',
        '🤸 Poses'
      ]},
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'The system learns patterns…', align: 'center' },
      { type: 'paragraph', text: 'and becomes capable of recognizing new ones.', align: 'center' }
    ]
  },
  {
    title: 'Why This Is Powerful',
    elements: [
      { type: 'title', text: 'Why This Is Powerful' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'You can train a model without coding —', align: 'center' },
      { type: 'paragraph', text: 'using just your webcam or microphone.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Perfect for experimentation and creativity.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '✨', size: 60 }
    ]
  },
  {
    title: 'How Training Works',
    elements: [
      { type: 'title', text: 'How Training Works' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '📥 Collect samples',
        '🎓 Teach the model the difference between them',
        '🧪 Test the model on new examples',
        '📈 Improve it by adding more data'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🔄', size: 50 }
    ]
  },
  {
    title: 'Real Teachable Machine',
    elements: [
      { type: 'title', text: 'Real Teachable Machine' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'To build a real model, go to:', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'bold', text: 'https://teachablemachine.withgoogle.com/' },
      { type: 'spacer', height: 15 },
      { type: 'paragraph', text: 'Create your own project in minutes.', align: 'center' },
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🌐', size: 50 }
    ]
  },
  {
    title: 'Activity Reminder',
    elements: [
      { type: 'title', text: 'Activity Reminder' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Inside the game:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        'Choose your shrine',
        'Collect example icons',
        'Train your simulated model',
        'Test its predictions'
      ]},
      { type: 'spacer', height: 30 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  }
];

export const LEVEL_6_SLIDES_ENHANCED: EnhancedSlide[] = [
  {
    title: 'The Final Chamber',
    elements: [
      { type: 'title', text: 'The Final Chamber' },
      { type: 'spacer', height: 30 },
      { type: 'paragraph', text: 'You have learned many skills, Explorer.', align: 'center' },
      { type: 'spacer', height: 10 },
      { type: 'paragraph', text: 'Now it\'s time to combine them all.', align: 'center' },
      { type: 'spacer', height: 40 },
      { type: 'icon', icon: '🏛️', size: 60 }
    ]
  },
  {
    title: 'The Complete ML Pipeline',
    elements: [
      { type: 'title', text: 'The Complete ML Pipeline' },
      { type: 'spacer', height: 20 },
      { type: 'diagram', diagramType: 'pipeline', width: 900, height: 150 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Every AI project follows this flow.', align: 'center' }
    ]
  },
  {
    title: 'Why the Pipeline Matters',
    elements: [
      { type: 'title', text: 'Why the Pipeline Matters' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'A good pipeline makes models:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '✅ More accurate',
        '🛡️ More reliable',
        '🐛 Easier to debug',
        '📈 Easier to improve'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Professionals use this pipeline every day.', align: 'center' }
    ]
  },
  {
    title: 'Your Final Mission',
    elements: [
      { type: 'title', text: 'Your Final Mission' },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Activate the chambers:', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'bullet', items: [
        '📊 Data Chamber',
        '🔨 Model Forge',
        '🔍 Evaluation Lens'
      ]},
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'Then answer final questions to prove mastery.', align: 'center' },
      { type: 'spacer', height: 20 },
      { type: 'icon', icon: '🎯', size: 50 }
    ]
  },
  {
    title: 'Graduation',
    elements: [
      { type: 'title', text: 'Graduation' },
      { type: 'spacer', height: 20 },
      { type: 'graph', graphType: 'accuracy', width: 500, height: 300 },
      { type: 'spacer', height: 20 },
      { type: 'paragraph', text: 'You will receive:', align: 'center' },
      { type: 'bullet', items: [
        '🎓 Your AI Explorer Certificate',
        '📚 Complete list of Colab links',
        '🔗 Link to Teachable Machine',
        '💪 Encouragement to build your own AI project'
      ]}
    ]
  }
];

