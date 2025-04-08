import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import "./CarPriceTrend.css";

function CarPriceTrend({ onClose }) {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchDepreciationData = async () => {
      try {
        const response = await api.get("/cars/depreciation/");
        const depreciationData = response.data.depreciation;

        // 연도 오름차순 정렬
        depreciationData.sort((a, b) => a.year - b.year);

        setChartData({
          labels: depreciationData.map((item) => item.year),
          datasets: [
            {
              label: "연식별 평균 가격",
              data: depreciationData.map((item) => item.avg_price),
              borderColor: "rgb(75, 192, 192)",
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              fill: true,
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        console.error("연식별 가격 데이터 로드 실패:", error);
      }
    };

    fetchDepreciationData();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>연식별 평균 가격 변화</h2>
        {chartData ? <Line data={chartData} /> : <p>데이터 로딩 중...</p>}
      </div>
    </div>
  );
}

export default CarPriceTrend;
