import React, { useState } from 'react';
import UploadPage from './UploadPage';
import SummaryPage from './SummaryPage';
import SemesterTable from './SemesterTable';
import { parseNCCUGradeHTML } from '../utils/htmlParser';
import { calculateSemesterGPA, calculateCumulativeGPA, calculateGradeDistribution } from '../utils/gpaCalc';
import '../styles/GPACalculator.css';

const GPACalculator = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [studentInfo, setStudentInfo] = useState(null);
  const [gradesData, setGradesData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file) => {
    if (!file.name.endsWith('.html') && !file.name.endsWith('.htm')) {
      alert('請上傳 HTML 檔案！');
      return;
    }

    setIsProcessing(true);

    try {
      const text = await file.text();
      const { studentInfo: info, gradesData: grades } = await parseNCCUGradeHTML(text);
      
      setStudentInfo(info);
      setGradesData(grades);
      setActiveTab('all');
    } catch (error) {
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setGradesData(null);
    setStudentInfo(null);
    setActiveTab('upload');
  };

  // 如果還沒上傳檔案，顯示上傳頁面
  if (!gradesData) {
    return <UploadPage onFileUpload={handleFileUpload} isProcessing={isProcessing} />;
  }

  const cumulative = calculateCumulativeGPA(gradesData);
  const gradeDistribution = calculateGradeDistribution(gradesData);

  return (
    <div className="gpa-calculator">
      <div className="calculator-container">
        <div className="calculator-header">
          <div className="header-info">
            <h1 className="header-title">GPA 試算表</h1>
            <p className="header-subtitle">
              {studentInfo?.studentName} - {studentInfo?.studentId} - {studentInfo?.department}
            </p>
          </div>
          <div className='button-area'>
            <button onClick={handleReset} className="reset-button">
                重新上傳
            </button>
            <button 
                onClick={() => window.location.href = 'mailto:wjwjleona@gmail.com?subject=GPA計算器問題回報'}
                className="report-button"
                >
                問題回報
            </button>
          </div>
          
        </div>

        <div className="tabs-container">
          <div className="tabs">
            <button
              onClick={() => setActiveTab('all')}
              className={`tab ${activeTab === 'all' ? 'tab-active' : ''}`}
            >
              總覽
            </button>
            {Object.keys(gradesData).sort().map(semester => (
              <button
                key={semester}
                onClick={() => setActiveTab(semester)}
                className={`tab ${activeTab === semester ? 'tab-active' : ''}`}
              >
                {semester}
              </button>
            ))}
          </div>
        </div>

        <div className="content-area">
          {activeTab === 'all' ? (
            <SummaryPage
              gradesData={gradesData}
              cumulative={cumulative}
              gradeDistribution={gradeDistribution}
            />
          ) : (
            <SemesterTable
              semester={activeTab}
              courses={gradesData[activeTab]}
              stats={calculateSemesterGPA(gradesData[activeTab])}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;