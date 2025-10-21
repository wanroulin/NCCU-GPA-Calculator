import React from 'react';
import '../styles/UploadPage.css';

const UploadPage = ({ onFileUpload, isProcessing }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <h1 className="upload-title">政大 GPA 計算器</h1>
          <p className="upload-subtitle">
            上傳您的成績 HTML 檔案，立即查看詳細的 GPA 分析
          </p>
        </div>

        <div className="upload-area">
          <input
            type="file"
            accept=".html,.htm"
            onChange={handleFileChange}
            className="upload-input"
            id="fileInput"
            disabled={isProcessing}
          />
          <label htmlFor="fileInput" className="upload-label">
            <div className="upload-icon">📁</div>
            <div className="upload-text">
              {isProcessing ? '處理中...' : '點擊上傳檔案'}
            </div>
            <div className="upload-hint">支援政大全人系統的 HTML 檔案</div>
          </label>
        </div>

        <div className="instructions">
          <h3 className="instructions-title">📖 使用說明</h3>
          <ol className="instructions-list">
            <li>登入<strong>政大全人系統</strong></li>
            <li>進入<strong>「課業學習」→「課業學習歷程」→「成績紀錄」</strong></li>
            <li>在網頁上<strong>按右鍵 → 另存新檔</strong>，存成 HTML 格式</li>
            <li>上傳該 HTML 檔案到<strong>政大 GPA 計算器</strong></li>
            <li>立即查看您的 GPA 分析結果！</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;