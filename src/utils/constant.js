export const GPA_SCALE = {
  'A+': 4.3,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'E': 0.0
};

export const GRADE_COLORS = {
  'A+': '#10b981',
  'A': '#34d399',
  'A-': '#6ee7b7',
  'B+': '#fbbf24',
  'B': '#fcd34d',
  'B-': '#fde68a',
  'C+': '#f97316',
  'C': '#fb923c',
  'C-': '#fdba74',
  'D': '#ef4444',
  'E': '#dc2626'
};

export const SCORE_RANGES = [
  { min: 90, max: 100, grade: 'A+', gpa: 4.3 },
  { min: 85, max: 89, grade: 'A', gpa: 4.0 },
  { min: 80, max: 84, grade: 'A-', gpa: 3.7 },
  { min: 77, max: 79, grade: 'B+', gpa: 3.3 },
  { min: 73, max: 76, grade: 'B', gpa: 3.0 },
  { min: 70, max: 72, grade: 'B-', gpa: 2.7 },
  { min: 67, max: 69, grade: 'C+', gpa: 2.3 },
  { min: 63, max: 66, grade: 'C', gpa: 2.0 },
  { min: 60, max: 62, grade: 'C-', gpa: 1.7 },
  { min: 50, max: 59, grade: 'D', gpa: 1.0 },
  { min: 0, max: 49, grade: 'E', gpa: 0.0 }
];