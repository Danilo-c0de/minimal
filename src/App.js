import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [query, setQuery] = useState('minimal');
  const [loading, setLoading] = useState(false);

  // Substitua pela sua chave de acesso do Unsplash
  const ACCESS_KEY = 'K5Dnjn4W7QxELT_6EwUzOPKmIhsXk4wtydwjgNrXbsI';

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    if (!query) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}`,
        {
          headers: {
            Authorization: `Client-ID ${ACCESS_KEY}`,
          },
        }
      );
      setPhotos(response.data.results);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchPhotos();
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Unsplash Minimal</h1>
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for photos..."
            className="search-input"
          />
          <button type="submit" className="search-button" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </header>

      <main className="photo-grid">
        {photos.map((photo) => (
          <div key={photo.id} className="photo-item">
            <img
              src={photo.urls.small}
              alt={photo.alt_description || 'Unsplash photo'}
              className="photo-image"
              loading="lazy"
            />
            <div className="photo-overlay">
              <p className="photo-author">{photo.user.name}</p>
            </div>
          </div>
        ))}
      </main>

      {loading && <div className="loading">Loading...</div>}
    </div>
  );
};

export default App;