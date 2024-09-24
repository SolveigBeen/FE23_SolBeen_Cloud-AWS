// Frontend kan uppdatera text eller användarnamn för ett existerande meddelande i databasen genom att ange dess id i anropet.
//Kontroll att meddelande som ska ändras verkligen finns.

const {sendResponse, sendError} = require ('../../responses/index')
const {db} = require ('../../services/db')

exports.handler = async (event) => {

  try {
    //hämta messageId från path parameter
    const {id:messageId} =  event.pathParameters;

     // Validate messageId
    if (!messageId || messageId.trim() === '') {
      return sendError(400, { message: 'Message Id är felaktigt eller saknas.' });
    }

    // Parse request body
    const  {messageText, userName } = JSON.parse(event.body);


    // Kontrollera om det finns något att uppdatera
    if (!messageText && !userName) {
      return sendError(400, { message: 'Inget att uppdatera' });
    } 
  

    // Uppdatera meddelandet i DynamoDB
    await db.update({
      TableName: 'my-messages',
      Key: { messageId}, // Hitta rätt meddelande via messageId
      UpdateExpression: `SET messageText =:messageText, userName =:userName`,
      ExpressionAttributeValues: {
        ':messageText': messageText,
        ':userName': userName,
      }
    });

    return sendResponse({ message: 'Meddelande uppdaterat' });
  } catch (error) {
    console.error('Error updating message:', error);
    return sendError(500, { message: 'Kunde inte uppdatera meddelandet', error: error.message });
  }
}
