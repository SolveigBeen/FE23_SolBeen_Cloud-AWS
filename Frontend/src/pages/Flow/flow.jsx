//Sida som visar alla meddelanden.
// Funktion för att sortera meddelande i tidsordning.
// Funktion för att filtrera meddelande per userName/författare.
// Funktion för att slänga meddelande
// Knapp för att gå till sida för att skriva nytt meddelande.
// Funktion för att uppdatera meddelande, genom att dirigeras till ny sida när ett meddelande klickas.

import React, { useEffect, useState } from 'react';
import Card from '../../components/card';
import WriteBtn from '../../components/writeBtn';
import { useNavigate } from 'react-router-dom';
import TopBtn from '../../components/topBtn';
import DropDown from '../../components/dropDown';

const Flow = () => {
  const [messages, setMessages] = useState([]); // lagrar meddelanden som hämtas
  const [loading, setLoading] = useState(true); // hanterar laddningsstatus
  const [error, setError] = useState(null); // hanterar fel
  const [isSorted, setIsSorted] = useState(false); // För att sortera i datumordning
  const [selectedUser, setSelectedUser] = useState(''); // För att filtrera meddelanden baserat på userName
  const navigate = useNavigate();

  // Funktion för att hämta meddelanden från API
  const fetchMessages = async () => {
    try {
      const response = await fetch('https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/');
      if (!response.ok) {
        throw new Error('Nätverks fel. Inget svar kunde erhållas.');
      }
      const data = await response.json();
      setMessages(data.data); // Uppdaterar meddelanden
      setLoading(false); // sätt laddningsstatus till false

      // Kontrollera ifall det inte finns några meddelanden och navigera isf till noMsg
      if (data.data.length === 0) {
        navigate('/noMessage'); // Navigera till noMsg.jsx
      }

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  // Funktion för att deleta ett valt meddelande.
  const deleteMessage = async (messageId) => {
    try {
      const response = await fetch(`https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/message/${messageId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Något gick fel med att radera meddelandet.');
      }
      // Hämta meddelandena igen efter radering
      await fetchMessages(); // Anropa fetchMessages för att uppdatera meddelandelistan
    } catch (error) {
      setError(error.message);
    }
  };

  // När meddelande klickas så dirigeras till Uppdatera-sidan. Meddelande info tas med.
  const handleEditMessage = (messageId, messageText, userName) => {
    navigate('/UpdateMsg', {
      state: { messageId, messageText, userName },
    });
  };

  // Sortering av meddelanden i datumordning
  const sortMessages = (messagesToSort) => {
    return isSorted
      ? [...messagesToSort].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Nyast först
      : [...messagesToSort].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Äldst först
  };

  const handleSortMessages = () => {
    setIsSorted((prev) => !prev); // Växla sorteringsstatus
  };
  

  useEffect(() => {
    fetchMessages(); // anropa fetchMessages när komponenten laddas
  }, []); // Tom array innebär att effekten endast körs vid första renderingen

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>; // Rendera felmeddelande om något gick fel
  }

  // Extrahera unika användarnamn från meddelanden
  const uniqueUsers = [...new Set(messages.map((msg) => msg.userName))];

  // Filtrera meddelanden baserat på valt användarnamn
  const filteredMessages = selectedUser
    ? messages.filter((msg) => msg.userName === selectedUser)
    : messages;

  // Sortera meddelanden dynamiskt vid renderingen
  const sortedMessages = sortMessages(filteredMessages);

  return (
    <div className="flow">
      <div className="header">
        <TopBtn isSorted={isSorted} onClick={handleSortMessages}></TopBtn>
        <DropDown 
          users={uniqueUsers} 
          selectedUser={selectedUser} 
          setSelectedUser={setSelectedUser}
        />
      </div>
      <div className="card_flow">
        {sortedMessages.map((message) => (
          <Card
            key={message.messageId} // Använd ett unikt ID för att ge varje kort en key
            userName={message.userName}
            messageText={message.messageText}
            createdAt={message.createdAt}
            onClick={() => handleEditMessage(message.messageId, message.messageText, message.userName)}
            deleteMsg={() => deleteMessage(message.messageId)} // Skicka med delete-funktionen
          />
        ))}
      </div>
      <WriteBtn />
    </div>
  );
};

export default Flow;


