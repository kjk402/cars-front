import React from "react";
const useNavigate = require("react-router-dom").useNavigate;



import "./Main.css";

function Main() {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1 className="title">전체</h1>

      <div className="buttons">
        <button onClick={() => navigate("/chat")} className="main-btn">채팅 문의하기</button>
        <button onClick={() => navigate("/faq")} className="main-btn">자주 묻는 질문</button>
      </div>

      <div className="menu-list">
        <div className="menu-item" onClick={() => navigate("/sell")}>
          <img src="/images/sell.png" alt="내차팔기" />
          <span>내차팔기</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/buy")}>
          <img src="/images/buy.png" alt="내차사기" />
          <span>내차사기</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/history")}>
          <img src="/images/history.png" alt="이력조회" />
          <span>이력조회</span>
        </div>
        <div className="menu-item" onClick={() => navigate("/review")}>
          <img src="/images/review.png" alt="차구경" />
          <span>차구경</span>
        </div>
      </div>

      <h2 className="subtitle">리뷰</h2>
      <div className="car-list">
        <img src="/images/car1.png" alt="car1" />
        <img src="/images/car2.png" alt="car2" />
      </div>
    </div>
  );
}

export default Main;
