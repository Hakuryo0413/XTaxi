import React from 'react';
import './Book.css';
import MapComponent from './MapComponent';

import imgTaxi1 from '@src/image/sedan10.png';
import imgTaxi2 from '@src/image/van10.png';

/*7f3JGEevFUfR7Og8SvonyvJym2HAzhFF*/
const Book: React.FC = () => {
  return (
    <div className="book-container">
      <div className="book-left">
        <MapComponent />
      </div>
      <div className="book-right">
        <div className="book-right-top">
          <div className="book-right-item">
            <img src={imgTaxi1} alt="Image 1" className="item-image" />
            <p className="item-text">10.000đ / Km</p>
            <p className="item-text"> 1-4 passengers</p>
            <button className="item-button">CHOOSE</button>
          </div>
          <div className="book-right-item">
            <img src={imgTaxi2} alt="Image 2" className="item-image" />
            <p className="item-text">15.000đ / Km</p>
            <p className="item-text"> 4-7 passengers</p>
            <button className="item-button">CHOOSE</button>
          </div>
        </div>
        <div className="book-right-bottom">
          <div className="book-right-item">
            <p className="item-text">FARE: </p>
            <button className="item-button">BOOK</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Book;
