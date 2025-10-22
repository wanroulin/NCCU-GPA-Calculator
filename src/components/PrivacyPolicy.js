import React from "react";
import '../styles/PrivacyPolicy.css';

const PrivacyPolicy = ({ onclose }) => {
    return (
        <div className="privacy-modal-overlay" onClick={ onclose }>
            <div className="privacy-modal" onClick={(e) => e.stopPropagation()}>
                <div className="privacy-header">
                    <h2>隱私權政策</h2>
                    <button onClick={ onclose } className="close-button">x</button>
                </div>

                <div className="privacy-content">
                    <section>
                        <h3>資料收集</h3>
                        <p>政大 GPA 計算器<strong>「不保留、不儲存、不上傳」</strong>任何個人資料。您上傳的成績 HTML 檔案只會在您的瀏覽器本地端進行計算與使用。</p>
                    </section>

                    <section>
                        <h3>資料處理</h3>
                        <ul>
                            <li>所有成績資料處理均在<strong>瀏覽器本地端</strong>完成操作</li>
                            <li>不會傳送任何資料到遠端伺服器</li>
                            <li>關閉網頁後所有資料即刻清除</li>
                        </ul>
                    </section>

                    <section>
                        <h3>Cookie 使用</h3>
                        <p>本網站不使用 Cookie 或任何追蹤技術。</p>
                    </section>

                    <section>
                        <h3>第三方服務</h3>
                        <p>本網站託管於 Vercel，僅會記錄基本的訪問日誌（IP 位址、訪問時間）用於服務監控，不會與您的成績資料關聯。</p>
                    </section>

                    <section>
                        <h3>資料安全</h3>
                        <ul>
                            <li>使用 HTTPS 加密連線</li>
                            <li>所有計算在客戶端完成</li>
                            <li>不會儲存或快取任何個人資料</li>
                        </ul>
                    </section>

                    <section>
                        <h3>開源透明</h3>
                        <p>本專案完全開源，您可以在 <a href="https://github.com/wanroulin/NCCU-GPA-Calculator" target="_blank" rel="noopener noreferrer">GitHub</a> 檢視完整原始碼。</p>
                    </section>

                    <section>
                        <h3>聯絡方式</h3>
                        <p>如有任何疑問，請透過 <a href='mailto:wjwjleona@gmail.com?subject=GPA計算器問題回報'>電子郵件</a> 聯繫我們。</p>
                    </section>

                    <div className="privacy-footer">
                        <p>最後更新日期：2024 年 10 月</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;