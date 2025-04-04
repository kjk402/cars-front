import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SellPage.css";

function SellPage() {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    engineSize: "",
    year: "",
    mileage: "",
    fuelType: "",
  });

  const [imageBase64, setImageBase64] = useState("");
  const [predictedPrice, setPredictedPrice] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/cars/top-brands/")
      .then(res => setBrands(res.data.top_brands))
      .catch(err => console.error("브랜드 가져오기 오류:", err));
  }, []);

  const handleBrandSelect = async (brand) => {
    setFormData({ ...formData, brand, model: "" });

    try {
      const res = await axios.get("http://localhost:8000/cars/brand-models/", {
        params: { brand },
      });
      setModels(res.data.models);
    } catch (error) {
      console.error("모델 목록 오류:", error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/train/predict/", formData);
      setPredictedPrice(res.data.predicted_price);
      setImageBase64(res.data.image_base64);
    } catch (err) {
      console.error("예측 요청 오류:", err);
    }
  };

  return (
    <div className="sell-container">
      <h1>내 차량 가격 예측</h1>

      <div className="sell-field">
        <label>브랜드 선택</label>
        <select onChange={(e) => handleBrandSelect(e.target.value)} value={formData.brand}>
          <option value="">브랜드 선택</option>
          {brands.map((b, i) => (
            <option key={i} value={b.brand}>{b.brand.toUpperCase()}</option>
          ))}
        </select>
      </div>

      <div className="sell-field">
        <label>모델 선택</label>
        <select onChange={(e) => setFormData({ ...formData, model: e.target.value })} value={formData.model}>
          <option value="">모델 선택</option>
          {models.map((m, i) => (
            <option key={i} value={` ${m.model}`}>{m.model}</option> 
          ))}
        </select>
      </div>

      <div className="sell-field">
  <label>엔진사이즈: {formData.engineSize * 1000}cc</label>
  <input
    type="range"
    min={0.6}
    max={7.0}
    step={0.1}
    value={formData.engineSize}
    onChange={(e) => setFormData({ ...formData, engineSize: parseFloat(e.target.value) })}
  />
</div>

      <div className="sell-field">
        <label>연식: {formData.year}년</label>
        <input
            type="range"
            min="1990"
            max={new Date().getFullYear()}
            step="1"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
        />
      </div>

      <div className="sell-field">
        <label>주행거리 (mile): {formData.mileage.toLocaleString()} ml</label>
        <input
            type="range"
            min="0"
            max="200000"
            step="100"
            value={formData.mileage}
            onChange={(e) => setFormData({ ...formData, mileage: parseInt(e.target.value) })}
        />
       </div>

      <div className="sell-field">
        <label>연료 타입</label>
        <select onChange={(e) => setFormData({ ...formData, fuelType: e.target.value })} value={formData.fuelType}>
          <option value="">연료 선택</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      <button
        className="predict-button"
        onClick={handleSubmit}
        disabled={
          !formData.brand ||
          !formData.model ||
          !formData.engineSize ||
          !formData.year ||
          !formData.mileage ||
          !formData.fuelType
        }
      >
        예상 가격 확인
      </button>

      {predictedPrice && (
        <div className="result-section">
          <h2>예상 가격: £{predictedPrice.toLocaleString()}</h2>
          {imageBase64 && <img src={`data:image/jpeg;base64,${imageBase64}`} alt="예측 시각화" />}
        </div>
      )}
    </div>
  );
}

export default SellPage;
