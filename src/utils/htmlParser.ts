import { Course } from './gpaCalc';

export interface StudentInfo {
  studentId: string;
  studentName: string;
  department: string;
}

export interface ParseResult {
  studentInfo: StudentInfo;
  gradesData: { [key: string]: Course[] };
}

/**
 * 解析 HTML 檔案
 * @param {string} htmlContent - HTML 內容
 * @returns {Promise<Object>} { studentInfo, gradesData }
 */
export const parseNCCUGradeHTML = async (htmlContent: string): Promise<ParseResult> => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlContent, 'text/html');

  // 解析學生資訊
  const studentIdElement = doc.querySelector('.fs-4.fw-bold');
  const studentNameElement = doc.querySelector('.fs-2.fw-bold');
  const departmentElements = doc.querySelectorAll('.fs-4.fw-bold');

  const studentId = studentIdElement?.textContent?.trim() || '';
  const studentName = studentNameElement?.textContent?.split('/')[0]?.trim() || '';
  const department = departmentElements[1]?.textContent?.trim() || '';

  // 解析成績資料 - 只抓取成績紀錄區塊
  const parsedGrades: { [key: string]: Course[] } = {};
  const gradeSection = doc.querySelector('#item-9');

  if (!gradeSection) {
    throw new Error('無法找到成績紀錄區塊，請確認上傳的是完整的成績頁面！');
  }

  const tables = gradeSection.querySelectorAll('.table-responsive-lg table');

  tables.forEach((table) => {
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach((row) => {
      const cells = row.querySelectorAll('td');
      if (cells.length >= 8) {
        const year = cells[0].textContent?.trim() || '';
        const semester = cells[1].textContent?.trim() || '';
        const semesterKey = `${year}-${semester}`;
        const course = cells[3].textContent?.trim() || '';
        const credits = parseFloat(cells[5].textContent?.trim() || '0');
        const scoreText = cells[6].textContent?.trim() || '';
        const score = parseFloat(scoreText);
        const typeText = cells[4].textContent?.trim() || '';

        // 過濾掉不該計入的項目
        if (shouldSkipCourse(course, scoreText)) {
          return;
        }

        // 判斷修別
        const type = getCourseType(typeText);

        if (!isNaN(score) && !isNaN(credits)) {
          if (!parsedGrades[semesterKey]) {
            parsedGrades[semesterKey] = [];
          }
          parsedGrades[semesterKey].push({ course, credits, score, type });
        }
      }
    });
  });

  if (Object.keys(parsedGrades).length === 0) {
    throw new Error('無法從檔案中找到成績資料，請確認上傳的是政大全人系統的成績頁面！');
  }

  return {
    studentInfo: { studentId, studentName, department },
    gradesData: parsedGrades
  };
};

/**
 * 判斷是否應該跳過該課程
 * @param {string} course 
 * @param {string} scoreText 
 * @returns {boolean}
 */
const shouldSkipCourse = (course: string, scoreText: string): boolean => {
  // 停修課程
  if (scoreText.includes('停修') || scoreText.includes('停')) {
    return true;
  }

  // 合計、小計等統計列
  if (course.includes('合計') || course.includes('小計')) {
    return true;
  }

  // 空白或無效的課程名稱
  if (course === '' || course === '-') {
    return true;
  }

  return false;
};

/**
 * 判斷課程類型
 * @param {string} typeText 
 * @returns {string} '必' | '群' | '選'
 */
const getCourseType = (typeText: string): string => {
  if (typeText.includes('必')) return '必';
  if (typeText.includes('群')) return '群';
  return '選';
};