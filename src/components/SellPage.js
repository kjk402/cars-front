import React, { useState, useEffect } from "react";
import axios from "axios";
import sampleBMW from "../assets/sample_bmw.json";
import sampleMERCEDES from "../assets/sample_,mercedes.json";
import sampleHYUNDI from "../assets/sample_hyundi.json";
import "./SellPage.css";

function SellPage() {
  const api = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
  });

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [engineSizes, setEngineSizes] = useState([]);
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
  const [isLoading, setIsLoading] = useState(false);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [serverStatus, setServerStatus] = useState(null);

  useEffect(() => {
    api.get("/train/health/")
      .then((res) => {
        if (res.data.status === "ok") setServerStatus("ok");
        else setServerStatus("fail");
      })
      .catch(() => setServerStatus("fail"));
  }, []);

  useEffect(() => {
    api.get("/cars/top-brands/")
      .then(res => setBrands(res.data.top_brands))
      .catch(err => console.error("브랜드 가져오기 오류:", err));
  }, []);

  const handleBrandChange = async (brand) => {
    setFormData({ ...formData, brand, model: "", fuelType: "", engineSize: "" });
    setBrandDropdownOpen(false);
    setEngineSizes([]);

    try {
      const res = await api.get("/cars/brand-models/", {
        params: { brand },
      });
      setModels(res.data.models);
    } catch (error) {
      console.error("모델 목록 오류:", error);
    }
  };

  const handleModelChange = (model) => {
    setFormData({ ...formData, model, fuelType: "", engineSize: "" });
    setEngineSizes([]);
  };

  const handleFuelTypeChange = async (fuelType, sampleEngineSize = null) => {
    const { brand, model } = formData;
    setFormData(prev => ({ ...prev, fuelType, engineSize: "" }));

    if (brand && model && fuelType) {
      try {
        const res = await api.get("/cars/engine-sizes/", {
          params: { brand, model, fuelType },
        });
        const sizes = res.data.engine_sizes.filter(s => s !== 0);
        setEngineSizes(sizes);

        if (sampleEngineSize !== null && sizes.includes(sampleEngineSize)) {
          setFormData(prev => ({ ...prev, engineSize: sampleEngineSize }));
        }

        return sizes;
      } catch (err) {
        console.error("엔진 사이즈 불러오기 실패:", err);
      }
    }
    return [];
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await api.post("/train/predict/", formData);
      setPredictedPrice(res.data.predicted_price);
      setImageBase64(res.data.image_base64);
    } catch (err) {
      console.error("예측 요청 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = async (sample) => {
    try {
      const { formData: sampleData, predicted_price, image_base64 } = sample;
      const { brand, model, fuelType, engineSize, year, mileage } = sampleData;
  
      await handleBrandChange(brand);
  
      setFormData((prev) => ({ ...prev, model }));
  
      const res = await api.get("/cars/engine-sizes/", {
        params: { brand, model, fuelType },
      });
      const sizes = res.data.engine_sizes.filter((s) => s !== 0);
      setEngineSizes(sizes);
  
      setFormData({
        brand,
        model,
        fuelType,
        engineSize: sizes.includes(engineSize) ? engineSize : "",
        year,
        mileage,
      });
  
      setPredictedPrice(predicted_price);
      setImageBase64(image_base64);
    } catch (err) {
      console.error("샘플 로드 실패:", err);
    }
  };
  
  
  return (
    <div className="sell-container">
      <div className="server-status-bar">
        예측 서버 상태:{" "}
        <span className="status-text">
          {serverStatus === "ok" ? "연결됨" : serverStatus === "fail" ? "연결 실패" : "확인 중..."}
        </span>
        <span
        className={`status-indicator ${
          serverStatus === "ok" ? "green" : serverStatus === "fail" ? "red" : "gray"
        }`}
      />
        {serverStatus === "fail" && (
          <span
            className="server-warning"
            onClick={() =>
              alert(
                "예측 서버는 평일 오전 9시부터 오후 7시까지 운영됩니다.\n" +
                "서버가 꺼져있는 경우, 아래 샘플 버튼을 통해 결과를 미리 체험해보실 수 있습니다.\n" +
                "이용에 불편을 드려 죄송합니다."
              )
            }
            style={{ cursor: "pointer", fontSize: "16px", marginLeft: "10px", color: "#d00", fontWeight: "bold" }}
          >
            ⚠ NOTICE
          </span>
        )}
      </div>

      <div style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
        <button className="sample-button" onClick={() => handleLoadSample(sampleBMW)}>
          Sample (BMW 5 Series)
        </button>
        <button className="sample-button" onClick={() => handleLoadSample(sampleMERCEDES)}>
          Sample (MERCEDES S Class)
        </button>
        <button className="sample-button" onClick={() => handleLoadSample(sampleHYUNDI)}>
          Sample (Hyundi Ioniq)
        </button>
      </div>

      <h1>내 차량 가격 예측</h1>

      {/* 브랜드 선택 */}
      <div className="sell-field">
        <label>브랜드 선택</label>
        <div className="dropdown-header" onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}>
          {formData.brand ? (
            <>
              {brands.find((b) => b.brand === formData.brand)?.logo && (
                <img
                  src={`data:image/png;base64,${brands.find((b) => b.brand === formData.brand)?.logo}`}
                  alt={formData.brand}
                  className="brand-logo"
                />
              )}
              {formData.brand.toUpperCase()}
            </>
          ) : "브랜드 선택"}
        </div>

        {brandDropdownOpen && (
          <div className="dropdown-options">
            <div className="dropdown-option" onClick={() => handleBrandChange("")}>브랜드 선택</div>
            {brands.map((brand, index) => (
              <div key={index} className="dropdown-option" onClick={() => handleBrandChange(brand.brand)}>
                {brand.logo && (
                  <img
                    src={`data:image/png;base64,${brand.logo}`}
                    alt={brand.brand}
                    className="brand-logo"
                  />
                )}
                {brand.brand.toUpperCase()}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 모델 선택 */}
      <div className="sell-field">
        <label>모델 선택</label>
        <select onChange={(e) => handleModelChange(e.target.value)} value={formData.model}>
          <option value="">모델 선택</option>
          {models.map((m, i) => (
            <option key={i} value={` ${m.model}`}>{m.model}</option>
          ))}
        </select>
      </div>

      {/* 연료 타입 */}
      <div className="sell-field">
        <label>연료 타입 선택</label>
        <select onChange={(e) => handleFuelTypeChange(e.target.value)} value={formData.fuelType}>
          <option value="">연료 타입</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
        </select>
      </div>

      {/* 엔진 사이즈 */}
      {engineSizes.length > 0 && (
        <div className="sell-field">
          <label>엔진 사이즈 선택</label>
          <select
            value={formData.engineSize}
            onChange={(e) => setFormData({ ...formData, engineSize: parseFloat(e.target.value) })}
          >
            <option value="">엔진 사이즈</option>
            {engineSizes.map((size, i) => (
              <option key={i} value={size}>{(size * 1000).toFixed(0)}cc</option>
            ))}
          </select>
        </div>
      )}

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

      <button
        className="predict-button"
        onClick={handleSubmit}
        disabled={
          isLoading ||
          serverStatus !== "ok" ||
          !formData.brand ||
          !formData.model ||
          !formData.fuelType ||
          !formData.engineSize ||
          !formData.year ||
          !formData.mileage
        }
      >
        {isLoading ? (
          <div className="spinner-container">
            <div className="spinner"></div>
            <span style={{ marginLeft: "10px" }}>예측 중...</span>
          </div>
        ) : (
          "예상 가격 확인"
        )}
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
