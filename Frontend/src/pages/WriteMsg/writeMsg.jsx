import React from 'react';
import '../../App.scss';


const WriteMsg = () => {
  return (
    <div className="writeMsg">

      <form className="form_container">
        <div className="card">
          <input
            type="text"
            placeholder="Skriv ditt meddelande här..."
            className="card__container"
          />
          <div className="card__bottom"></div>
        </div>
    
        <div className="form__bottom">
          <input
            type="text"
            placeholder="Ditt namn"
            className="input_userName"
          />
          <button type="submit" className="submitBtn">
            Publicera
          </button>
        </div>
      </form>
   
    </div>
  );
};

export default WriteMsg;