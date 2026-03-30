export type Category = 'Quantitative Aptitude' | 'Logical Reasoning' | 'Data Interpretation' | 'Verbal Ability';
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: string;
  category: Category;
  topic: string;
  difficulty: Difficulty;
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const TOPICS = {
  'Quantitative Aptitude': [
    { name: 'Percentage', questions: 25 },
    { name: 'Profit & Loss', questions: 30 },
    { name: 'Simple Interest', questions: 15 },
    { name: 'Compound Interest', questions: 20 },
    { name: 'Time & Work', questions: 35 },
    { name: 'Time Speed Distance', questions: 40 },
    { name: 'Ratio & Proportion', questions: 20 },
    { name: 'Averages', questions: 15 },
  ],
  'Logical Reasoning': [
    { name: 'Syllogism', questions: 45 },
    { name: 'Blood Relations', questions: 20 },
    { name: 'Direction Sense', questions: 15 },
    { name: 'Seating Arrangement', questions: 30 },
    { name: 'Coding-Decoding', questions: 25 },
    { name: 'Number Series', questions: 40 },
  ],
  'Data Interpretation': [
    { name: 'Bar Graphs', questions: 25 },
    { name: 'Pie Charts', questions: 20 },
    { name: 'Line Graphs', questions: 15 },
    { name: 'Tables', questions: 30 },
  ],
  'Verbal Ability': [
    { name: 'Reading Comprehension', questions: 50 },
    { name: 'Fill in the Blanks', questions: 25 },
    { name: 'Synonyms & Antonyms', questions: 60 },
    { name: 'Sentence Correction', questions: 30 },
  ]
};

export const PRACTICE_SETS = [
  { id: 'easy-1', name: 'Beginner Set 1', difficulty: 'Easy', time: '20 Mins', questions: 20 },
  { id: 'easy-2', name: 'Beginner Set 2', difficulty: 'Easy', time: '20 Mins', questions: 20 },
  { id: 'easy-3', name: 'Beginner Set 3', difficulty: 'Easy', time: '20 Mins', questions: 20 },
  { id: 'med-1', name: 'Intermediate Set 1', difficulty: 'Medium', time: '30 Mins', questions: 25 },
  { id: 'med-2', name: 'Intermediate Set 2', difficulty: 'Medium', time: '30 Mins', questions: 25 },
  { id: 'med-3', name: 'Intermediate Set 3', difficulty: 'Medium', time: '30 Mins', questions: 25 },
  { id: 'hard-1', name: 'Advanced Set 1', difficulty: 'Hard', time: '45 Mins', questions: 30 },
  { id: 'hard-2', name: 'Advanced Set 2', difficulty: 'Hard', time: '45 Mins', questions: 30 },
  { id: 'hard-3', name: 'Advanced Set 3', difficulty: 'Hard', time: '45 Mins', questions: 30 },
];

export const QUESTION_BANK: Question[] = [
  {
    id: 'q1',
    category: 'Quantitative Aptitude',
    topic: 'Percentage',
    difficulty: 'Easy',
    questionText: 'If 20% of a number is 50, what is 30% of that number?',
    options: ['60', '75', '80', '90'],
    correctAnswerIndex: 1,
    explanation: 'Let the number be x. 20% of x = 50 => x = 250. 30% of 250 = 75.'
  },
  {
    id: 'q2',
    category: 'Quantitative Aptitude',
    topic: 'Time Speed Distance',
    difficulty: 'Easy',
    questionText: 'A train travels 300 km in 5 hours. Find its speed in km/hr.',
    options: ['50', '60', '70', '80'],
    correctAnswerIndex: 1,
    explanation: 'Speed = Distance / Time = 300 / 5 = 60 km/hr.'
  },
  {
    id: 'q3',
    category: 'Quantitative Aptitude',
    topic: 'Profit & Loss',
    difficulty: 'Medium',
    questionText: 'A man buys an article for ₹27.50 and sells it for ₹28.60. Find his gain percent.',
    options: ['1%', '2%', '3%', '4%'],
    correctAnswerIndex: 3,
    explanation: 'Gain = 28.60 - 27.50 = 1.10. Gain % = (1.10 / 27.50) * 100 = 4%.'
  },
  {
    id: 'q4',
    category: 'Quantitative Aptitude',
    topic: 'Time & Work',
    difficulty: 'Medium',
    questionText: 'A can do a piece of work in 10 days and B can do the same work in 15 days. How long will they take if both work together?',
    options: ['5 days', '6 days', '8 days', '9 days'],
    correctAnswerIndex: 1,
    explanation: 'A\'s 1 day work = 1/10. B\'s 1 day work = 1/15. (A+B)\'s 1 day work = 1/10 + 1/15 = 5/30 = 1/6. So they take 6 days.'
  },
  {
    id: 'q5',
    category: 'Logical Reasoning',
    topic: 'Syllogism',
    difficulty: 'Medium',
    questionText: 'Statements: All roses are flowers. Some flowers are red.\nConclusion: Some roses are red.',
    options: ['True', 'False', 'Cannot be determined', 'Either True or False'],
    correctAnswerIndex: 2,
    explanation: 'Just because roses are flowers and some flowers are red, we cannot definitively say that roses are the red flowers.'
  },
  {
    id: 'q6',
    category: 'Logical Reasoning',
    topic: 'Blood Relations',
    difficulty: 'Easy',
    questionText: 'Pointing to a photograph, a man said, "I have no brother or sister but that man\'s father is my father\'s son." Whose photograph was it?',
    options: ['His own', 'His son\'s', 'His father\'s', 'His nephew\'s'],
    correctAnswerIndex: 1,
    explanation: 'Since he has no brother or sister, "my father\'s son" is the man himself. So, the man in the photograph\'s father is himself. Thus, it\'s his son\'s photo.'
  },
  {
    id: 'q7',
    category: 'Logical Reasoning',
    topic: 'Coding-Decoding',
    difficulty: 'Medium',
    questionText: 'If CAT is coded as 3120, how is MAT coded?',
    options: ['13120', '14120', '12120', '13220'],
    correctAnswerIndex: 0,
    explanation: 'Letters are replaced by their alphabetical positions: C=3, A=1, T=20. So MAT = M(13) A(1) T(20) = 13120.'
  },
  {
    id: 'q8',
    category: 'Logical Reasoning',
    topic: 'Number Series',
    difficulty: 'Hard',
    questionText: 'Look at this series: 2, 6, 18, 54, ... What number should come next?',
    options: ['108', '148', '162', '216'],
    correctAnswerIndex: 2,
    explanation: 'Each number is multiplied by 3. 54 * 3 = 162.'
  },
  {
    id: 'q9',
    category: 'Verbal Ability',
    topic: 'Synonyms & Antonyms',
    difficulty: 'Easy',
    questionText: 'Choose the correct synonym for "DILIGENT".',
    options: ['Lazy', 'Hardworking', 'Careless', 'Slow'],
    correctAnswerIndex: 1,
    explanation: 'Diligent means having or showing care and conscientiousness in one\'s work or duties, which is hardworking.'
  },
  {
    id: 'q10',
    category: 'Verbal Ability',
    topic: 'Fill in the Blanks',
    difficulty: 'Medium',
    questionText: 'Despite his _____ schedule, he always found time to read.',
    options: ['Relaxed', 'Hectic', 'Boring', 'Light'],
    correctAnswerIndex: 1,
    explanation: '"Hectic" implies busy, which contrasts with finding free time.'
  },
  {
    id: 'q11',
    category: 'Verbal Ability',
    topic: 'Sentence Correction',
    difficulty: 'Hard',
    questionText: 'Identify the error: "Each of the boys have their own book."',
    options: ['Each of', 'the boys', 'have', 'their own book'],
    correctAnswerIndex: 2,
    explanation: '"Each" is a singular subject, so it should be "has" instead of "have".'
  },
  {
    id: 'q12',
    category: 'Data Interpretation',
    topic: 'Bar Graphs',
    difficulty: 'Medium',
    questionText: 'If a company made $100k in Q1 and $120k in Q2, what is the percentage increase in revenue?',
    options: ['10%', '15%', '20%', '25%'],
    correctAnswerIndex: 2,
    explanation: 'Increase = 120k - 100k = 20k. Percentage = (20k / 100k) * 100 = 20%.'
  },
  {
    id: 'q13',
    category: 'Data Interpretation',
    topic: 'Pie Charts',
    difficulty: 'Easy',
    questionText: 'If a pie chart sector represents 25% of the total, what is the angle of that sector?',
    options: ['45 degrees', '90 degrees', '120 degrees', '180 degrees'],
    correctAnswerIndex: 1,
    explanation: '25% of 360 degrees = 0.25 * 360 = 90 degrees.'
  },
  {
    id: 'q14',
    category: 'Quantitative Aptitude',
    topic: 'Number System',
    difficulty: 'Medium',
    questionText: 'What is the sum of the first 50 natural numbers?',
    options: ['1250', '1275', '2500', '2550'],
    correctAnswerIndex: 1,
    explanation: 'Sum = n(n+1)/2 = 50(51)/2 = 25 * 51 = 1275.'
  },
  {
    id: 'q15',
    category: 'Logical Reasoning',
    topic: 'Analogy',
    difficulty: 'Easy',
    questionText: 'Odometer is to mileage as compass is to:',
    options: ['Speed', 'Hiking', 'Needle', 'Direction'],
    correctAnswerIndex: 3,
    explanation: 'An odometer measures mileage; a compass determines direction.'
  }
];

export function getRandomQuestions(count: number, filter?: { category?: string, topic?: string, difficulty?: string }): Question[] {
  let filtered = [...QUESTION_BANK];
  
  if (filter?.category) {
    filtered = filtered.filter(q => q.category === filter.category);
  }
  if (filter?.topic) {
    filtered = filtered.filter(q => q.topic === filter.topic);
  }
  if (filter?.difficulty) {
    filtered = filtered.filter(q => q.difficulty === filter.difficulty);
  }

  // Shuffle
  filtered.sort(() => Math.random() - 0.5);
  
  // Return requested amount, or all if we have less
  return filtered.slice(0, Math.min(count, filtered.length));
}
