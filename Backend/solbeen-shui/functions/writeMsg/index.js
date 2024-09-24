//Sparar ett meddelande från FE som innehåller Text och Användarnamn. Till posten som sparas i databas adderas ett unikt Id och "createdAt".


const {sendResponse} = require ('../../responses/index')
const {db} = require ('../../services/db')
const { v4: uuidv4 } = require('uuid');


  exports.handler = async (event)=> {
    const body = JSON.parse(event.body);

    // Skapa ett unikt message-ID
    const messageId = uuidv4();

    // Hämta aktuell tid som en ISO-sträng
    const createdAt = new Date().toISOString();


   try {
    await db.put ({
      TableName: 'my-messages',
      Item:{
        messageId:messageId,
        messageText: body.text,
        userName: body.userName,
        createdAt: createdAt
      },
    });
    return sendResponse({message:'Meddelande sparat'})

   } catch (error){
    console.log(error);
      return sendError(401, {message: 'Kunde inte spara meddelande', error:error})
    }
  };
  
  