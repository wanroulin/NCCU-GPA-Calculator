/**
 * 根據分數獲取 GPA 值
 * @param {number} score - 分數
 * @returns {number} GPA 值
 */
export const getGPA = (score: number): number => {
  if (score >= 90) return 4.3;
  if (score >= 85) return 4.0;
  if (score >= 80) return 3.7;
  if (score >= 77) return 3.3;
  if (score >= 73) return 3.0;
  if (score >= 70) return 2.7;
  if (score >= 67) return 2.3;
  if (score >= 63) return 2.0;
  if (score >= 60) return 1.7;
  if (score >= 50) return 1.0;
  return 0.0;
};

/**
 * 根據分數獲取等第
 * @param {number} score - 分數
 * @returns {string} 等第 (A+, A, A-, ...)
 */
export const getGrade = (score: number): string => {
  if (score >= 90) return "A+";
  if (score >= 85) return "A";
  if (score >= 80) return "A-";
  if (score >= 77) return "B+";
  if (score >= 73) return "B";
  if (score >= 70) return "B-";
  if (score >= 67) return "C+";
  if (score >= 63) return "C";
  if (score >= 60) return "C-";
  if (score >= 50) return "D";
  return "E";
};

export interface Course {
  course: string;
  credits: number;
  score: number;
  type: string;
}

export interface GradeStats {
  gpa: string;
  credits: number;
  avgScore: string;
}

/**
 * 計算學期 GPA
 * @param {Array} courses - 課程陣列
 * @returns {Object} { gpa, credits, avgScore }
 */
export const calculateSemesterGPA = (courses: Course[]): GradeStats => {
  if (!courses || courses.length === 0) {
    return { gpa: '0.00', credits: 0, avgScore: '0.00' };
  }

  let totalWeighted = 0;
  let totalCredits = 0;
  let totalScoreWeighted = 0;

  courses.forEach(course => {
    const gpa = getGPA(course.score);
    totalWeighted += gpa * course.credits;
    totalScoreWeighted += course.score * course.credits;
    totalCredits += course.credits;
  });

  return {
    gpa: (totalWeighted / totalCredits).toFixed(2),
    avgScore: (totalScoreWeighted / totalCredits).toFixed(2),
    credits: totalCredits
  };
};

/**
 * 計算累計 GPA
 * @param {Object} gradesData - 所有學期的成績資料
 * @returns {Object} { gpa, credits, avgScore }
 */
export const calculateCumulativeGPA = (gradesData: { [key: string]: Course[] }): GradeStats => {
  if (!gradesData) {
    return { gpa: '0.00', credits: 0, avgScore: '0.00' };
  }

  let totalWeighted = 0;
  let totalCredits = 0;
  let totalScoreWeighted = 0;

  Object.values(gradesData).forEach(semesterCourses => {
    semesterCourses.forEach(course => {
      const gpa = getGPA(course.score);
      totalWeighted += gpa * course.credits;
      totalScoreWeighted += course.score * course.credits;
      totalCredits += course.credits;
    });
  });

  return {
    gpa: (totalWeighted / totalCredits).toFixed(2),
    credits: totalCredits,
    avgScore: (totalScoreWeighted / totalCredits).toFixed(2)
  };
};

/**
 * 計算等第分布
 * @param {Object} gradesData - 所有學期的成績資料
 * @returns {Object} 各等第的數量
 */
export const calculateGradeDistribution = (gradesData: { [key: string]: Course[] }): { [key: string]: number } => {
  const distribution: { [key: string]: number } = {};
  
  if (!gradesData) return distribution;

  Object.values(gradesData).flat().forEach(course => {
    const grade = getGrade(course.score);
    distribution[grade] = (distribution[grade] || 0) + 1;
  });

  return distribution;
};