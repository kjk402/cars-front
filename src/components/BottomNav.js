import React from "react";

import "./BottomNav.css";

const useNavigate = require("react-router-dom").useNavigate;


function BottomNav() {
  const navigate = useNavigate();

  return (
    <div className="bottom-nav">
      <div className="nav-item" onClick={() => navigate("/sell")}>내차팔기</div>
      <div className="nav-item" onClick={() => navigate("/buy")}>내차사기</div>
      <div className="nav-item" onClick={() => navigate("/history")}>이력조회</div>
      <div className="nav-item" onClick={() => navigate("/review")}>차구경</div>
      <div className="nav-item" onClick={() => navigate("/")}>전체</div>
    </div>
  );
}

export default BottomNav;
