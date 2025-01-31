// src/components/pages/ListPage.jsx
import { memo } from 'react';
import { Link } from 'react-router-dom';

function ListPage({ travels, onRemoveTravel, errorMessage }) {
  if (!travels || travels.length === 0) {
    return (
      <div className="list-section">
        <h2>Inga resor sparade ännu.</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    );
  }

  return (
    <div className="list-section">
      <h2>Sparade resor</h2>
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <ul>
        {travels.map(t => (
          <li key={t.id} style={{ marginBottom: '8px' }}>
            <strong>{t.name}</strong> - {t.date} - {t.location}
            {' | '}
            <Link to={`/details/${t.id}`}>Detaljer</Link>
            {' | '}
            <button onClick={() => onRemoveTravel(t.id)}>Ta bort</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default memo(ListPage);
