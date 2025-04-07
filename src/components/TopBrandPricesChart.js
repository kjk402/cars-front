import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "./TopBrandPricesChart.css";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function TopBrandPricesChart({ onClose }) {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const res = await api.get("/cars/brand-avg-prices/");
        const labels = res.data.brand_avg_prices.map((b) => b.brand.toUpperCase());
        const values = res.data.brand_avg_prices.map((b) => b.avg_price);
        setChartData({
          labels,
          datasets: [
            {
              label: "평균 가격 (£)",
              data: values,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        });
      } catch (e) {
        console.error("차트 데이터 로드 실패:", e);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>Top 5 브랜드 평균 가격</h2>
        {chartData ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (ctx) => `${ctx.parsed.y.toLocaleString()} £`,
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  title: { display: true, text: "평균 가격 (£)" },
                },
              },
            }}
          />
        ) : (
          <p>로딩 중...</p>
        )}
      </div>
    </div>
  );
}

export default TopBrandPricesChart;
