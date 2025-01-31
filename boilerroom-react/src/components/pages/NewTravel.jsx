// src/components/pages/NewTravel.jsx
import { memo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewTravel({ onAddTravel, errorMessage }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  // Lokalt felmeddelande – ifall något saknas
  const [formError, setFormError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Egna felkontroller: har man fyllt i alla fält?
    if (!name.trim() || !date.trim() || !location.trim()) {
      setFormError('Vänligen fyll i Namn, Datum och Plats.');
      return;
    }

    // Skapa unikt id
    const id = Date.now().toString();
    const newTravel = { id, name, date, location, description };

    onAddTravel(newTravel);

    // Rensa fälten och ev. felmeddelande
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
    setFormError('');

    // Navigera ev. till /list
    navigate('/list');
  };

  return (
    <div className="form-section">
      <h2>Skapa ny resa</h2>
      {/* Om App har ett globalt errorMessage */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Lokalt fel för formuläret */}
      {formError && <div className="error-message">{formError}</div>}

      <form onSubmit={handleSubmit}>
        <label>Namn på resa:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Datum:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Plats:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <label>Beskrivning:</label>
        <textarea
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Spara resa</button>
      </form>
    </div>
  );
}

export default memo(NewTravel);
