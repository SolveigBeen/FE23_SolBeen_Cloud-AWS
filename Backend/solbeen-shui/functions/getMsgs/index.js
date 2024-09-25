//hämtar alla meddelanden från databasen

const {sendResponse} = require ('../../responses/index')
const {db} = require ('../../services/db')


exports.handler = async (event)=> {
  try {
    const { Items } = await
    db.scan ({
      TableName: 'my-messages',
    });
    return sendResponse (Items);
  } catch (error){
    console.error('Fel inträffat när meddelande hämtades:', error);

    // Returnera ett felmeddelande
    return sendError(500, { message: 'Kunde inte hämta meddelanden', error: error.message });
  }
};
  