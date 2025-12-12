import { Slide } from '../ui/SlideOverlay';

export const LEVEL_1_SLIDES: Slide[] = [
  {
    title: 'Welcome to the AI Jungle',
    body: [
      'Welcome, Explorer!',
      'You\'ve entered the AI Jungle, where different forms of intelligence roam — from simple rule-followers to powerful deep learners.'
    ]
  },
  {
    title: 'What is Artificial Intelligence?',
    body: [
      'Artificial Intelligence (AI) =',
      'Machines doing tasks that normally require human intelligence, like recognizing faces or making decisions.',
      '',
      'AI doesn\'t "think" like us — it finds patterns and uses them to act.'
    ]
  },
  {
    title: 'Where Do You Meet AI Daily?',
    body: [
      'You interact with AI more than you think:',
      '',
      'Search engines',
      '',
      'Movie/music recommendations',
      '',
      'Face unlock',
      '',
      'Smart assistants',
      '',
      'Self-driving cars',
      '',
      'Spam filters',
      '',
      'AI is everywhere — but not all AI works the same way.'
    ]
  },
  {
    title: 'Types of AI Creatures',
    body: [
      'Rule-Based AI (The Lizard)',
      'Follows strict instructions:',
      '"If this happens → do that."',
      'No learning, just rules.',
      '',
      'Machine Learning (The Tiger)',
      'Learns from data and improves over time.',
      'Recognizes patterns.',
      '',
      'Deep Learning (The Dragon)',
      'A powerful form of ML that uses neural networks.',
      'Great for images, sound, language.'
    ]
  },
  {
    title: 'Why It Matters',
    body: [
      'Understanding the types of AI helps us recognize strengths, weaknesses, and where to use which approach.'
    ]
  },
  {
    title: 'Prepare Your Mind',
    body: [
      'Your goal in this jungle:',
      '',
      'Spot examples of AI',
      '',
      'Decide which kind they belong to',
      '',
      'Train your explorer brain!'
    ]
  },
  {
    title: 'Activity Reminder',
    body: [
      'In the next challenge, collect AI icons and classify them into Rule-based, ML, or DL platforms.'
    ]
  }
];

export const LEVEL_2_SLIDES: Slide[] = [
  {
    title: 'Welcome to the Machine Whisperer Zone',
    body: [
      'Here, machines learn just like students — from examples, patterns, and trial and error.'
    ]
  },
  {
    title: 'What Is a Dataset?',
    body: [
      'A dataset is a collection of examples.',
      'Think of it like a table:',
      '',
      'Features → the inputs (color, size, speed…)',
      '',
      'Label → the correct answer (cat/dog, price, category)'
    ]
  },
  {
    title: 'Training vs Testing',
    body: [
      'To teach a machine properly:',
      '',
      'Training Data: examples used to learn',
      '',
      'Testing Data: fresh examples used to measure how well the model learned',
      '',
      'Never use the same data for both — it would be cheating!'
    ]
  },
  {
    title: 'Types of Machine Learning',
    body: [
      'Supervised Learning',
      'The model gets both inputs and correct outputs.',
      '',
      'Unsupervised Learning',
      'No labels — the model groups things on its own.',
      '',
      'Reinforcement Learning',
      'The model learns by trial, error, and rewards.'
    ]
  },
  {
    title: 'The ML Workflow',
    body: [
      'The Machine Whisperer uses a simple cycle:',
      '',
      'Collect Data',
      '',
      'Split Data',
      '',
      'Train Model',
      '',
      'Evaluate Model',
      '',
      'Improve and Repeat',
      '',
      'This cycle powers almost every ML system today.'
    ]
  },
  {
    title: 'Why It Matters',
    body: [
      'ML lets machines improve by themselves instead of following fixed rules.',
      'This makes them flexible, adaptable, and smarter over time.'
    ]
  },
  {
    title: 'Activity Reminder',
    body: [
      'Your mission:',
      '',
      'Sort data into features and labels',
      '',
      'Choose the correct ML type for each scenario'
    ]
  }
];

export const LEVEL_3_SLIDES: Slide[] = [
  {
    title: 'Inside the Data Scroll Room',
    body: [
      'You will learn your first ML spell: how to teach a machine a simple mathematical relationship.'
    ]
  },
  {
    title: 'Models Learn Patterns',
    body: [
      'A model doesn\'t memorize values — it learns the pattern behind them.',
      'Example:',
      'If the pattern is "double the number",',
      'the model learns something like:',
      'y = 2 × x'
    ]
  },
  {
    title: 'Linear Regression',
    body: [
      'The simplest model type:',
      '',
      'Finds the best line through your data',
      '',
      'Learns a slope (how fast values grow)',
      '',
      'Learns an intercept (where the line starts)',
      '',
      'The model becomes a "predictor" of future values.'
    ]
  },
  {
    title: 'Data → Model → Prediction',
    body: [
      'To cast your spell:',
      '',
      'Give the model data (X, y)',
      '',
      'Let it find the pattern',
      '',
      'Ask it to predict a new value',
      '',
      'If trained well, predictions will match reality.'
    ]
  },
  {
    title: 'Human vs Machine',
    body: [
      'Sometimes humans guess patterns better…',
      'But for large datasets, the machine wins.'
    ]
  },
  {
    title: 'Activity Reminder',
    body: [
      'Your challenge:',
      '',
      'Complete the ML pipeline puzzle',
      '',
      'Compare your prediction vs the machine\'s prediction'
    ]
  }
];

export const LEVEL_4_SLIDES: Slide[] = [
  {
    title: 'Enter the Neural Temple',
    body: [
      'This temple holds the secrets of neurons — the building blocks of deep learning.'
    ]
  },
  {
    title: 'What Is a Neuron?',
    body: [
      'A neuron:',
      '',
      'Takes inputs',
      '',
      'Combines them using weights',
      '',
      'Applies an activation function',
      '',
      'Produces an output',
      '',
      'It\'s like a tiny decision-maker.'
    ]
  },
  {
    title: 'Layers',
    body: [
      'Stack neurons together to make:',
      '',
      'Input Layer',
      '',
      'Hidden Layers',
      '',
      'Output Layer',
      '',
      'Each layer transforms the data into something more meaningful.'
    ]
  },
  {
    title: 'Why Deep Learning Works',
    body: [
      'DL shines when data is complex:',
      '',
      'Images',
      '',
      'Speech',
      '',
      'Handwriting',
      '',
      'Language',
      '',
      'Each layer extracts deeper features—like edges → shapes → objects.'
    ]
  },
  {
    title: 'Data Transformations',
    body: [
      'As data moves through layers:',
      'Raw pixels → edges → shapes → object identity',
      'Each step refines the understanding.'
    ]
  },
  {
    title: 'Activity Reminder',
    body: [
      'Your mission:',
      '',
      'Route a signal through the correct path of layers',
      '',
      'Solve the neuron switch puzzle'
    ]
  }
];

export const LEVEL_5_SLIDES: Slide[] = [
  {
    title: 'Welcome to the Ritual Chamber',
    body: [
      'Here you will learn to create your own intelligent creature.'
    ]
  },
  {
    title: 'How Teachable Machine Works',
    body: [
      'You provide examples:',
      '',
      'Images',
      '',
      'Sounds',
      '',
      'Poses',
      '',
      'The system learns patterns…',
      'and becomes capable of recognizing new ones.'
    ]
  },
  {
    title: 'Why This Is Powerful',
    body: [
      'You can train a model without coding —',
      'using just your webcam or microphone.',
      'Perfect for experimentation and creativity.'
    ]
  },
  {
    title: 'How Training Works',
    body: [
      'Collect samples',
      '',
      'Teach the model the difference between them',
      '',
      'Test the model on new examples',
      '',
      'Improve it by adding more data'
    ]
  },
  {
    title: 'Real Teachable Machine',
    body: [
      'To build a real model, go to:',
      'https://teachablemachine.withgoogle.com/',
      'Create your own project in minutes.'
    ]
  },
  {
    title: 'Activity Reminder',
    body: [
      'Inside the game:',
      '',
      'Choose your shrine',
      '',
      'Collect example icons',
      '',
      'Train your simulated model',
      '',
      'Test its predictions'
    ]
  }
];

export const LEVEL_6_SLIDES: Slide[] = [
  {
    title: 'The Final Chamber',
    body: [
      'You have learned many skills, Explorer.',
      'Now it\'s time to combine them all.'
    ]
  },
  {
    title: 'The Complete ML Pipeline',
    body: [
      'Data Collection',
      '',
      'Data Preparation',
      '',
      'Model Training',
      '',
      'Model Evaluation',
      '',
      'Improvement',
      '',
      'Deployment',
      '',
      'Every AI project follows this flow.'
    ]
  },
  {
    title: 'Why the Pipeline Matters',
    body: [
      'A good pipeline makes models:',
      '',
      'More accurate',
      '',
      'More reliable',
      '',
      'Easier to debug',
      '',
      'Easier to improve',
      '',
      'Professionals use this pipeline every day.'
    ]
  },
  {
    title: 'Your Final Mission',
    body: [
      'Activate the chambers:',
      '',
      'Data Chamber',
      '',
      'Model Forge',
      '',
      'Evaluation Lens',
      '',
      'Then answer final questions to prove mastery.'
    ]
  },
  {
    title: 'Graduation',
    body: [
      'You will receive:',
      '',
      'Your AI Explorer Certificate',
      '',
      'Complete list of Colab links',
      '',
      'Link to Teachable Machine',
      '',
      'Encouragement to build your own AI project'
    ]
  }
];

