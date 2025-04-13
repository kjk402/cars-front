import React from "react";
import SearchPage from "./components/SearchPage";
import "./App.css";
import SellPage from "./components/SellPage"; 
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";



function App() {
  return (
    <Router>
      <div className="app-container">
        {/* 네비게이션 바 */}
        <nav className="navbar">
          <Link to="/" className="logo-link">
            <img src="/logo192.png" alt="중고차 로고" className="logo-image" />
          </Link>
          <div className="nav-links">
            <Link to="/">홈</Link>
            <Link to="/sell">내 차 팔기</Link>
            <Link to="/search">내 차 사기</Link>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sell" element={<SellPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 KIM JOONKI</p>
          <p>
            Project Overview (Portfolio):{" "}
            <a
              href="https://glistening-lady-581.notion.site/Project-Overview-Portfolio-1d4ef3f83b45803fb876c7387e2588a5"
              target="_blank"
              rel="noopener noreferrer"
            >
              Notion
            </a>
          </p>
          <p>
            Car data source:{" "}
            <a
              href="https://www.kaggle.com/datasets/adityadesai13/used-car-dataset-ford-and-mercedes/data"
              target="_blank"
              rel="noopener noreferrer"
            >
              kaggle
            </a>
          </p>
          <p>Contact: <a href="mailto:joonki402@gmail.com">joonki402@gmail.com</a></p>
          <p>
            GitHub:{" "}
            <a
              href="https://github.com/kjk402"
              target="_blank"
              rel="noopener noreferrer"
            >
              kjk402
            </a>
          </p>
          <p>
            Individual repositories:{" "}
            <a
              href="https://github.com/kjk402/cars-front"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend
            </a>{" | "}
            <a
              href="https://github.com/kjk402/cars-server"
              target="_blank"
              rel="noopener noreferrer"
            >
              Server
            </a>{" | "}
            <a
              href="https://github.com/kjk402/cars-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              AI Model
            </a>
          </p>
        </footer>
      </div>
    </Router>
  );
}



// ✅ 홈 페이지 컴포넌트
function Home() {
  return (
    <div className="home-container">
      <h1>중고차 플랫폼</h1>
      <p>내 차량 가격을 예측하고 다양한 중고차 매물을 둘러보세요.</p>
      <Link to="/sell" className="search-link" style={{ marginRight: '40px' }}> 내 차 팔기</Link>
      <Link to="/search" className="search-link"> 내 차 사기</Link>
    </div>
  );
}

export default App;
