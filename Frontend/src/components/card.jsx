import React from 'react'
import './card.scss';

const Card = ({ username, text, createdAt}) => {
  return (
    <div className="card">
      <div className="card__container">
        <div className="card_date"><p>{createdAt}</p></div>
        <div className="card_message">{text}</div>
        <div className="card_userName">{username}</div>
      </div>
      <div className="card__bottom"></div>
    </div>
  )
}

export default Card