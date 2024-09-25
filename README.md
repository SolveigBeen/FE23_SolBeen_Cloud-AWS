# FE23_SolBeen_Cloud-AWS

Examinationsuppgift i kursen "Utveckling & driftsättning i molnmiljö" i Frontendutvecklar utbildning.

Appen är en enkel anslagstavla där det går att posta meddelanden. Åtkomlig via : http://solbeen-shui.s3-website.eu-north-1.amazonaws.com/

## Funktionalitet
- På index-sidan visas samtliga meddelanden.
- Det går att skriva nytt meddelande genom att trycka på "penna"-knappen.
- Ett meddelande kan uppdateras genom att klicka på det.
- Det går att slänga ett meddelande via "papperskorg"-knapp.
- Meddelanden kan sorteras i tidsordning. 
- Det går att filtrera meddelanden utifrån userName/författare.


## Frontend
Fronten är kodad med react -vite. Följande koncept och bibliotek har anväts:
- React-rouer för navigering och routing av applikationen
- navigate -för att navigera mellan sidor.
- location - för att hålla information om aktuell URL.
- SASS  - styling med variabler.

Frontend-koden är Deployad på AWS i en S3 bucket och nåbar via URL.

  ## Backend
  För backend har AWS serverless använts.
  Lambda funktioner för API anrop har definierats tillsammans med svar/responses.
  Följande endpoints finns definierade för API gateway: 
  ### GET - https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/
  Svarar med samtliga meddelanden som finns sparade.
  ### POST - https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/
  Sparar ett meddelande som användare anger "meddelande-text" och "användarnamn". Meddelandet sparas med datumstämpel samt unikt id. 
  ### PUT - https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/message/{id}
  Uppdatering av ett specifikt meddelande. 
  ### DELETE - https://jv3o7j7xx4.execute-api.eu-north-1.amazonaws.com/message/{id} 
  Tar bort ett specifikt meddelande.
  
  AWS - DynamoDB används för att lagra och hämta information via anrop från Frontend.

  UUID har installerats för att generera unika id:n till meddelanden.
  

