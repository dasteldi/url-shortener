import React, { useState } from 'react';

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setOriginalUrl(e.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    setShortUrl('');
    try {
      const response = await fetch('http://localhost:3000/reduce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: originalUrl })
      });

      if (!response.ok) {
        const errData = await response.json();
        setError(errData.error || 'Ошибка');
        return;
      }

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      setError('Ошибка сети');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }}>
      <h2>Редактор ссылок</h2>
      <input
        type="text"
        placeholder="Введите URL"
        value={originalUrl}
        onChange={handleChange}
      />
      <button onClick={handleSubmit} className='reduce-button'>Сократить</button>

      {shortUrl && (
        <div style={{ marginTop: '20px' }}>
          <p>Короткая ссылка: <a href={shortUrl} target="_blank" rel="noopener noreferrer">{shortUrl}</a></p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>Ошибка: {error}</p>
        </div>
      )}
    </div>
  );
}

export default UrlShortener;