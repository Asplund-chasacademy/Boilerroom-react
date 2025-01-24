# Boilerroom-react
boilerroom react vecka 3
# Reseplanerare med Vite + React

Detta projekt är en enkel reseplanerare som innehåller:

- useState (lägga till, ta bort, redigera aktiviteter)
- useEffect (logga ändringar och spara i localStorage)
- Dynamiska felmeddelanden istället för alerts
- Grundläggande filstruktur och kommentarer

## Hur du kör projektet

1. Klona repot och gå in i mappen.
2. Kör `npm install` för att installera alla beroenden.
3. Kör `npm run dev` för att starta en lokal utvecklingsserver (t.ex. (http://localhost:5173)).

## Funktioner

- **Lägg till aktivitet**: Använd formuläret. Tomma fält ger ett rött felmeddelande.
- **Ta bort senaste aktivitet**: Klicka på knappen "Ta bort senaste aktivitet". Om listan är tom visas ett rött felmeddelande.
- **Redigera aktivitet**: Klicka på "Redigera" för en aktivitet, gör dina ändringar i fälten, klicka "Spara" eller "Avbryt".
- **useEffect**: Varje gång listan ändras loggas den i konsolen, samt sparas i `localStorage`.
- **Validering**: Hindrar att man lägger till tomma aktiviteter.

## Filstruktur

