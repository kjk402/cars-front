import React, { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard"; // ✅ CarCard 불러오기
import CarPriceTrend from "./CarPriceTrend";  
import TopBrandPricesChart from "./TopBrandPricesChart";

import "./SearchPage.css";

function SearchPage() {
  const defaultFilters = {
    brand: "",
    model: "",
    fuelType: "",
    min_price: "",
    max_price: "",
    year: "",
    sort: "price_asc",
  };

  const [showTrendModal, setShowTrendModal] = useState(false);
  const [showBrandPriceChart, setShowBrandPriceChart] = useState(false);



  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(defaultFilters);
  const [searchResults, setSearchResults] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [brandDropdownOpen, setBrandDropdownOpen] = useState(false);
  const [modelDropdownOpen, setModelDropdownOpen] = useState(false);

  // ✅ 브랜드 목록 가져오기
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/cars/top-brands/");
        setBrands(response.data.top_brands);
      } catch (error) {
        console.error("브랜드 목록 불러오기 오류:", error);
      }
    };
    fetchBrands();
  }, []);

  // ✅ 브랜드 변경 (선택 해제 기능 추가)
  const handleBrandChange = async (brand) => {
    const newBrand = brand === filters.brand ? "" : brand;
    setFilters((prevFilters) => ({ ...prevFilters, brand: newBrand, model: "" }));
    setBrandDropdownOpen(false);

    if (newBrand) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/cars/brand-models/", {
          params: { brand: newBrand },
        });
        setModels(response.data.models);
      } catch (error) {
        console.error("모델 목록 불러오기 오류:", error);
      }
    } else {
      setModels([]);
    }
  };

  // 🔍 검색 기능
  const handleSearch = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/cars/search/", {
        params: { q: query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("검색 오류:", error);
    }
  };

  // 🎯 필터 검색 기능
  const handleFilterSearch = async () => {
    try {
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );
      const response = await axios.get("http://127.0.0.1:8000/cars/filter-search/", {
        params: activeFilters,
      });
      setFilteredCars(response.data);
    } catch (error) {
      console.error("필터 검색 오류:", error);
    }
  };

  // 🔄 **필터 초기화 기능**
  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setModels([]); // 모델 선택 리스트 초기화
  };

  return (
    <div className="search-container">
      <h1>중고차 검색</h1>

      <button className="trend-button" onClick={() => setShowTrendModal(true)}  style={{ marginRight: '20px' }}>
        <span role="img" aria-label="smile">📈</span> 연식별 가격 추이 보기
      </button>
      <button className="trend-button" onClick={() => setShowBrandPriceChart(true)}>
        <span role="img" aria-label="smile">💰</span> 브랜드별 평균 가격 보기
      </button>
      {showTrendModal && <CarPriceTrend onClose={() => setShowTrendModal(false)} />}
      {showBrandPriceChart && <TopBrandPricesChart onClose={() => setShowBrandPriceChart(false)} />}

      {/* <div className="search-bar">
        <input
          type="text"
          placeholder="브랜드 또는 모델 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>검색</button>
      </div> */}

      <div className="filters">
        {/* ✅ 커스텀 브랜드 드롭다운 */}
        <div className="brand-dropdown">
          <div
            className="dropdown-header"
            onClick={() => setBrandDropdownOpen(!brandDropdownOpen)}
          >
            {filters.brand ? (
              <>
                {brands.find((b) => b.brand === filters.brand)?.logo && (
                  <img
                    src={`data:image/png;base64,${brands.find((b) => b.brand === filters.brand)?.logo}`}
                    alt={filters.brand}
                    className="brand-logo"
                  />
                )}
                {filters.brand.toUpperCase()}
              </>
            ) : (
              "브랜드 선택"
            )}
          </div>
          {brandDropdownOpen && (
            <div className="dropdown-options">
              <div className="dropdown-option" onClick={() => handleBrandChange("")}>
                브랜드 선택
              </div>
              {brands.map((brand, index) => (
                <div
                  key={index}
                  className="dropdown-option"
                  onClick={() => handleBrandChange(brand.brand)}
                >
                  {brand.logo && (
                    <img
                      src={`data:image/png;base64,${brand.logo}`}
                      alt={brand.brand}
                      className="brand-logo"
                    />
                  )}
                  {brand.brand.toUpperCase()} ({brand.count})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ 나머지 필터 UI */}
        <div className="model-dropdown">
            <div
              className="dropdown-header"
              onClick={() => setModelDropdownOpen(!modelDropdownOpen)}
            >
              {filters.model || "모델 선택"}
            </div>
            {modelDropdownOpen && (
              <div className="dropdown-options">
                <div
                  className="dropdown-option"
                  onClick={() => {
                    setFilters((prev) => ({ ...prev, model: "" }));
                    setModelDropdownOpen(false);
                  }}
                >
                  모델 선택
                </div>

                {models.map((modelObj, index) => (
                  <div
                    key={index}
                    className="dropdown-option"
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, model: ` ${modelObj.model}` }));
                      setModelDropdownOpen(false); 
                    }}
                  >
                    {modelObj.model} ({modelObj.model_count})
                  </div>
                ))}
              </div>
            )}
        </div>
        
        <input
          type="number"
          placeholder="최소 가격"
          value={filters.min_price}
          onChange={(e) => setFilters((prev) => ({ ...prev, min_price: e.target.value }))} 
          className="narrow-input"
        />
        <input
          type="number"
          placeholder="최대 가격"
          value={filters.max_price}
          onChange={(e) => setFilters((prev) => ({ ...prev, max_price: e.target.value }))} 
          className="narrow-input"  
        />

        <select
          value={filters.fuelType} // ✅ value 속성 추가
          onChange={(e) => setFilters((prev) => ({ ...prev, fuelType: e.target.value }))}>
          <option value="">연료 유형 선택</option>
          <option value="Petrol">Petrol</option>
          <option value="Diesel">Diesel</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Electric">Electric</option>
          
        </select>

        <input
          type="number"
          placeholder="최소 연식"
          value={filters.year}
          onChange={(e) => setFilters((prev) => ({ ...prev, year: e.target.value }))} 
          className="narrow-input"  
        />

        <select
          value={filters.sort} // ✅ value 속성 추가
          onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value }))}>
          <option value="price_asc">가격 낮은순</option>
          <option value="price_desc">가격 높은순</option>
          <option value="year_asc">과거 연식 순</option>
          <option value="year_desc">최근 연식 순</option>
          <option value="mileage_asc">주행 거리 짧은 순</option>
          <option value="mileage_desc">주행 거리 긴 순</option>
        </select>
        <button onClick={handleFilterSearch} className="filter-button">필터 검색</button>
        <button onClick={handleResetFilters} className="reset-button">필터 초기화</button> {/* ✅ 추가된 버튼 */}
      </div>

      {/* <h2>검색 결과</h2>
      <div className="car-list">
        {searchResults.map((car, index) => (
          <CarCard key={index} car={car._source} />
        ))}
      </div> */}

      <h2> 검색 차량</h2>
      <div className="car-list">
        {filteredCars.map((car, index) => (
          <CarCard key={index} car={car._source} />
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
