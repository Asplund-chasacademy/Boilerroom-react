// src/components/pages/Details.jsx
import { useParams, useNavigate } from 'react-router-dom';
import { memo, useState } from 'react';

function Details({ travels, onEditTravel }) {
  // Den här sidan ("/details/:id") visar och låter användaren
  // uppdatera en vald resa, inkl. en egen "detaljkommentar".

  const { id } = useParams();
  const navigate = useNavigate();

  // Leta upp rätt resa
  const travel = travels.find((t) => t.id === id);

  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(travel.name);
  const [date, setDate] = useState(travel.date);
  const [location, setLocation] = useState(travel.location);
  const [description, setDescription] = useState(travel.description || '');

  // Eget felmeddelande
  const [detailError, setDetailError] = useState('');

  // Om ingen resa hittas
  if (!travel) {
    return (
      <div className="list-section">
        <h2>Ingen resa hittades med ID: {id}</h2>
      </div>
    );
  }

  const handleSave = () => {
    // Kolla att de viktigaste fälten inte är tomma
    if (!name.trim() || !date.trim() || !location.trim()) {
      setDetailError('Namn, Datum och Plats måste fyllas i.');
      return;
    }

    const updatedTravel = {
      ...travel,
      name,
      date,
      location,
      description,
    };
    onEditTravel(travel.id, updatedTravel);

    // Rensa fel, stäng redigeringsläge
    setDetailError('');
    setEditMode(false);
  };

  const handleCancel = () => {
    // Återställ
    setEditMode(false);
    setName(travel.name);
    setDate(travel.date);
    setLocation(travel.location);
    setDescription(travel.description || '');
    setDetailError('');
  };

  return (
    <div className="list-section">
      <h2>Detaljer för resa: {travel.name}</h2>

      {detailError && <div className="error-message">{detailError}</div>}

      {editMode ? (
        <>
          <label>Namn:</label>
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

          <button onClick={handleSave}>Spara ändringar</button>
          <button onClick={handleCancel}>Avbryt</button>
        </>
      ) : (
        <>
          <p><strong>Datum:</strong> {travel.date}</p>
          <p><strong>Plats:</strong> {travel.location}</p>
          <p><strong>Beskrivning:</strong> {travel.description}</p>
          <button onClick={() => setEditMode(true)}>Redigera</button>
        </>
      )}

      <button onClick={() => navigate('/list')}>Tillbaka till listan</button>
    </div>
  );
}

export default memo(Details);
