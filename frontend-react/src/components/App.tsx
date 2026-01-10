import React, { useState, ChangeEvent } from 'react';

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };
  
  const handleSubmit = async () => {
    setError('');
    setShortUrl('');
    try {
      const response = await fetch('http://localhost:3000/api/reduce', {
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
    } catch {
      setError('Ошибка сети');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'Arial' }} className='main-app'>
      <h2 className='editor-text'>Введите длинную ссылку</h2>
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