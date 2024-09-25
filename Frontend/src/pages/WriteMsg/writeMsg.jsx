//Skriva ett meddelande.
// Ny info sparas till databasen vi "publicera". Navigering tillbaka till flow-översikt.
//Möjligt att navigera tillbaka till flow-översikt utan att publicera.

import React, { useState } from 'react';
import '../../App.scss';
import { useNavigate } from 'react-router-dom';
import CancelBtn from '../../components/cancelBtn';


const WriteMsg = () => {
  const navigate = useNavigate();
  // State för att lagra meddelandet och användarnamnet
  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  // Funktion för att hantera formulärets submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Förhindrar omdirigering av sidan

    // Skapa ett objekt för att skicka data
    const formData = {
      messageText: message, 
      userName: userName,
    };

    try {
      // Skicka en POST-förfrågan till din AWS API Gateway
      const response = await fetch(
        "https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/",
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
        navigate('/'); // navigera till Flow
      } else {
        console.error('Fel vid skickning:', response.statusText);
      }
    } catch (error) {
      console.error('Nätverksfel:', error);
    }
  };

 const handleClick=() => {
  navigate('/');
};

  return (
    <div className="writeMsg" >
      <div className="header">
       <CancelBtn onClick={handleClick}></CancelBtn>
      </div>
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="card">
          <textarea
            type="text"
            placeholder="Skriv ditt meddelande här..."
            className="card__container"
            value={message} // Koppla inputfältet till state
            onChange={(e) => setMessage(e.target.value)} // Uppdatera state vid ändring
          />
          <div className="card__bottom"></div>
        </div>
    
        <div className="form__bottom">
          <input
            placeholder="Ditt namn"
            className="input_userName"
            value={userName} // Koppla inputfältet till state
            onChange={(e) => setUserName(e.target.value)} // Uppdatera state vid ändring
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
