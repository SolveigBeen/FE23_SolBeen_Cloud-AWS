import React, { useState } from 'react';
import '../../App.scss';


const WriteMsg = () => {

  // State för att lagra meddelandet och användarnamnet
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

// Funktion för att hantera formulärets submit
const handleSubmit = async (e) => {
  e.preventDefault(); // Förhindrar omdirigering av sidan

  // Skapa ett objekt för att skicka data
  const formData = {
    message: message,
    userName: userName,
  };

  try {
    // Skicka en POST-förfrågan till din AWS API Gateway
    const response = await fetch(
      "https://p2jcoqgoj0.execute-api.eu-north-1.amazonaws.com/upload",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      console.log('Meddelande skickat!');
      // Återställer inputfälten 
      setMessage('');
      setUserName('');
    } else {
      console.error('Fel vid skickning:', response.statusText);
    }
  } catch (error) {
    console.error('Nätverksfel:', error);
  }
};


  return (
    <div className="writeMsg">

      <form className="form_container" onSubmit={handleSubmit}>
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