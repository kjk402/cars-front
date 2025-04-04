import React from "react";
import "./CarModal.css";

function CarModal({ car, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>차량 상세정보</h2>
        <ul>
          <li><strong>제조사:</strong> {car.brand}</li>
          <li><strong>모델:</strong> {car.model}</li>
          <li><strong>가격:</strong> {car.price.toLocaleString()} £</li>
          <li><strong>연식:</strong> {car.year}</li>
          <li><strong>주행거리:</strong> {car.mileage.toLocaleString()} ml</li>
          <li><strong>배기량:</strong> {(car.engineSize * 1000).toLocaleString()} cc</li>
          <li><strong>연비:</strong> {car.mpg} mpg (마일/갤런)</li>
          <li><strong>변속기:</strong> {car.transmission}</li>
          <li><strong>연료타입:</strong> {car.fuelType}</li>
        </ul>
      </div>
    </div>
  );
}

export default CarModal;
