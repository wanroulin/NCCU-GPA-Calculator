import React from 'react';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import StatCard from './StatCard';
import { calculateSemesterGPA } from '../utils/gpaCalc';
import { GRADE_COLORS } from '../utils/constant';
import '../styles/components.css';

const SummaryPage = ({ gradesData, cumulative, gradeDistribution }) => {
  // 各學期 GPA 趨勢資料
  const semesterTrend = Object.keys(gradesData).sort().map(semester => ({
    semester,
    gpa: parseFloat(calculateSemesterGPA(gradesData[semester]).gpa)
  }));

  // 等級分布圓餅圖資料
  const pieData = Object.entries(gradeDistribution).map(([grade, count]) => ({
    name: grade,
    value: count
  }));

  return (
    <div className="summary-page">
      <div className="summary-header">
        <h2 className="summary-title">總成績概覽</h2>
        <div className="summary-stats">
          <StatCard label="累計 GPA" value={cumulative.gpa} unit="滿分 4.3" />
          <StatCard label="總學分" value={cumulative.credits} unit="學分" />
          <StatCard label="總平均" value={cumulative.avgScore} unit="分" />
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-title">GPA 趨勢圖</h3>
          <LineChart width={500} height={300} data={semesterTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 4.3]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="gpa" stroke="#8b5cf6" strokeWidth={2} name="學期 GPA" />
          </LineChart>
        </div>

        <div className="chart-card">
          <h3 className="chart-title">成績等第分布</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={pieData}
              cx={250}
              cy={150}
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={GRADE_COLORS[entry.name]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      <div className="semester-comparison">
        <h3 className="comparison-title">各學期統計比較</h3>
        <table className="comparison-table">
          <thead>
            <tr>
              <th>學期</th>
              <th>GPA</th>
              <th>學分</th>
              <th>平均分數</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(gradesData).sort().map((semester, idx) => {
              const stats = calculateSemesterGPA(gradesData[semester]);
              return (
                <tr key={idx}>
                  <td className="semester-name">{semester}</td>
                  <td className="gpa-cell">{stats.gpa}</td>
                  <td className="text-center">{stats.credits}</td>
                  <td className="text-center">{stats.avgScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryPage;