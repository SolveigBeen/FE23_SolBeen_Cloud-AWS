const { sendResponse, sendError } = require('../../responses/index');
const { db } = require('../../services/db');

exports.handler = async (event) => {
  try {
    // Hämta message-ID från URL:en
    const { id: messageId } = event.pathParameters;

    // Ta bort meddelandet från DynamoDB
    await db.delete({
      TableName: 'my-messages',
      Key: { messageId },
    });

    // Returnera ett meddelande oavsett om meddelandet fanns eller inte
    return sendResponse({ message: 'Meddelandet har tagits bort' });
  } catch (error) {
    console.error('Fel när meddelande skulle tas bort:', error);
    return sendError(500, 'Internal Server Error');
  }
};