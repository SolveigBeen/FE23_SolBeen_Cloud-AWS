import React from 'react'
import './card.scss';

const Card = ({ userName, messageText, createdAt, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card__container">
        <div className="card_date"><p>{createdAt}</p></div>
        <div className="card_message">{messageText}</div>
        <div className="card_userName">{userName}</div>
      </div>
      <div className="card__bottom"></div>
    </div>
  )
}

export default Card