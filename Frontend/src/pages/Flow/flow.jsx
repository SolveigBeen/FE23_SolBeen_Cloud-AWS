import React, { useEffect, useState } from 'react';
import './flow.scss';
import Card from '../../components/card';
import WriteBtn from '../../components/writeBtn';
import { useNavigate } from 'react-router-dom';
import TopBtn from '../../components/topBtn';
import DropDown from '../../components/dropDown';

const Flow = () => {
  const [messages, setMessages] = useState([]); // lagrar meddelanden som hämtas
  const [loading, setLoading] = useState(true); // hanterar laddningsstatus
  const [error, setError] = useState(null); // hanterar fel
  const [isSorted, setIsSorted] = useState(false);  //För att sortera i datumordning
  const [selectedUser, setSelectedUser] = useState(''); // För att filtrera meddelanden baserat på userName
  const navigate = useNavigate();

  const handleEditMessage = (messageId, messageText, userName) => {
    navigate ('/UpdateMsg',  {
      state: { messageId, messageText, userName }
    });
  };

  //Sortering av meddelanden i datumordning när knappen trycks
  const sortMessages = (messages) => {
    return isSorted
    ? [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Nyast först
    : [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // Äldst först
  };

  const handleSortMessages = () => {
    setIsSorted((prev) => !prev); // Växla sorteringsstatus
  };


  useEffect(() => {
    // funktion för att hämta data från API
    const fetchMessages = async () => {
      try {
        const response = await fetch('https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/');
        if (!response.ok) {
          throw new Error('Nätverks fel. Inget svar kunde erhållas.');
        }
        const data = await response.json();
        console.log('API-svar:', data); // Logga API-svaret

        setMessages(data.data);  // Använd data.data för att uppdatera meddelanden
      setLoading(false); // sätt laddningsstatus till false

      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMessages(); // anropa funktion för att hämta meddelanden när komponenten laddas
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
      <div className="flow_header">
        <TopBtn isSorted={isSorted} onClick={handleSortMessages}></TopBtn>
    <DropDown 
      users={uniqueUsers} 
      selectedUser={selectedUser} 
      setSelectedUser={setSelectedUser}
      ></DropDown>
      </div>
      {sortedMessages.map((message) => (
        <Card
          key={message.messageId} // Använd ett unikt ID för att ge varje kort en key
          userName={message.userName}
          messageText={message.messageText}
          createdAt={message.createdAt}
          onClick={() => handleEditMessage(message.messageId, message.messageText, message.userName)}
        />
      ))}
      <WriteBtn />
    </div>
  );
};

export default Flow;

