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
            {/* <Link to="/history">이력 조회</Link>
            <Link to="/review">차 리뷰</Link> */}
          </div>
        </nav>

        {/* 라우팅 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sell" element={<SellPage />} />  
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// ✅ 홈 페이지 컴포넌트
function Home() {
  return (
    <div className="home-container">
      <h1>중고차 플랫폼</h1>
      <p>중고차를 사고팔고, 이력을 조회하고 리뷰를 확인하세요.</p>
      <Link to="/sell" className="search-link" style={{ marginRight: '40px' }}> 내 차 팔기</Link>
      <Link to="/search" className="search-link"> 내 차 사기</Link>
    </div>
  );
}

export default App;
