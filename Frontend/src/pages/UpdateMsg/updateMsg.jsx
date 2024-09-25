// Meddelande kan uppdateras, text och eller userName/författare.
// Ny info sparas till databasen vi "publicera". Navigering tillbaka till flow-översikt.
//Möjligt att navigera tillbaka till flow-översikt utan att publicera.


import React, { useState, useEffect } from 'react';
import '../../App.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import CancelBtn from '../../components/cancelBtn';

const UpdateMsg = () => {
  const { state } = useLocation(); // Hämtar messageId, messageText och userName från state
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [userName, setUserName] = useState('');

  // Sätt det befintliga meddelandet och användarnamnet när komponenten laddas
  useEffect(() => {
    if (state) {
      setMessage(state.messageText);
      setUserName(state.userName);
    }
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      messageText: message,
      userName: userName,
    };

    try {
      const response = await fetch(`https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/message/${state.messageId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Meddelande uppdaterat!');
        navigate('/'); // Navigera tillbaka till Flow-sidan
      } else {
        console.error('Fel vid uppdatering:', response.statusText);
      }
    } catch (error) {
      console.error('Nätverksfel:', error);
    }
  };

  //Navigera tillbaka till flow -översikt av meddelande.
  const handleClick=() => {
    navigate('/');
  };


  return (
    <div className="writeMsg">
     <div className="header">
       <CancelBtn onClick={handleClick}></CancelBtn>
      </div>
      <form className="form_container" onSubmit={handleSubmit}>
      
        <div className="card">
          <textarea
            className="card__container"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="card__bottom"></div>
        </div>

        <div className="form__bottom">
          <input
            type="text"
       
            className="input_userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <button type="submit" className="submitBtn">Uppdatera</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateMsg;