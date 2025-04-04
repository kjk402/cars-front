import React , { useState }from "react";
import carPlaceholder from "../assets/defualt_car.png";
import CarModal from "./CarModal";
import "./CarCard.css";

function CarCard({ car }) {
const [isModalOpen, setIsModalOpen] = useState(false); 
  return (
    <>
        <div className="car-card" onClick={() => setIsModalOpen(true)}>
        {/* 차량 이미지 */}
        <div className="car-image">
            <img src={carPlaceholder} alt="Car Placeholder" />
        </div>

        {/* 차량 정보 */}
        <div className="car-info">
            <h2>{car.brand}</h2>
            <h3>{car.model} · {car.fuelType}</h3>
            <p className="car-details">
            <span>{car.year}년식</span> · <span>{(car.engineSize * 1000).toLocaleString()} cc</span> · <span>{car.transmission}</span>
            </p>
            <p className="car-mileage">{car.mileage.toLocaleString()} ml</p>
            <p className="car-price">£ {car.price.toLocaleString()}</p>
        </div>
        </div>

        {isModalOpen && <CarModal car={car} onClose={() => setIsModalOpen(false)} />}
    </>

  );
}

export default CarCard;
