import React from 'react';
import { getGPA, getGrade } from '../utils/gpaCalc';
import '../styles/components.css';

const SemesterTable = ({ semester, courses, stats }) => {
  return (
    <div className="semester-table-container">
      <div className="semester-header">
        <h2 className="semester-title">{semester} 學期成績</h2>
        <div className="semester-stats">
          <div className="stat-item">
            <div className="stat-label">學期 GPA</div>
            <div className="stat-value-large">{stats.gpa}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">總學分</div>
            <div className="stat-value-large">{stats.credits}</div>
          </div>
          <div className="stat-item">
            <div className="stat-label">平均分數</div>
            <div className="stat-value-large">{stats.avgScore}</div>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="semester-table">
          <thead>
            <tr>
              <th>課程名稱</th>
              <th>學分</th>
              <th>分數</th>
              <th>等第</th>
              <th>GPA</th>
              <th>修別</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, idx) => {
              const gpa = getGPA(course.score);
              const grade = getGrade(course.score);
              
              return (
                <tr key={idx}>
                  <td className="course-name">{course.course}</td>
                  <td className="text-center">{course.credits}</td>
                  <td className="text-center score">{course.score}</td>
                  <td className="text-center">
                    <span className={`grade-badge grade-${grade.replace('+', 'plus').replace('-', 'minus')}`}>
                      {grade}
                    </span>
                  </td>
                  <td className="text-center gpa-value">{gpa.toFixed(1)}</td>
                  <td className="text-center">
                    <span className={`type-badge type-${course.type}`}>
                      {course.type}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SemesterTable;