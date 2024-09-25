//Card som används för meddelande ruta på flow, update och write sidorna.

import React from 'react'
import './card.scss';

const Card = ({ userName, messageText, createdAt, onClick, deleteMsg }) => {
  const handleDeleteClick = (event) => {
    event.stopPropagation(); // Förhindra att kortets onClick körs
    deleteMsg(); // Anropa delete-funktionen
  };

  return (
    <div className="card" onClick={onClick}>
      <div className="card__container">
        <div className="card_top">
          <div className="card_date">
            <p>{createdAt}</p>
          </div>
          <div className="card_top_image" onClick={handleDeleteClick}></div>
        </div>
        <div className="card_message">{messageText}</div>
        <div className="card_userName">{userName}</div>
      </div>
      <div className="card__bottom"></div>
    </div>
  )
}

export default Card