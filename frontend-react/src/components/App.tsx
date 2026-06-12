import React, { useMemo, useState, ChangeEvent, KeyboardEvent } from 'react';

function UrlShortener() {
  const [originalUrl, setOriginalUrl] = useState<string>('');
  const [shortUrl, setShortUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOriginalUrl(e.target.value);
  };

  const normalizedUrl = useMemo(() => originalUrl.trim(), [originalUrl]);

  const handleSubmit = async () => {
    if (!normalizedUrl) {
      setError('Введите ссылку, чтобы продолжить.');
      setShortUrl('');
      return;
    }

    setError('');
    setShortUrl('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/reduce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: normalizedUrl })
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      void handleSubmit();
    }
  };

  return (
    <main className="page">
      <section className="card">
        <div className="card-header">
          <h1 className="title">Сократите ссылку за секунду</h1>
          <p className="subtitle">
            Вставьте полный URL и получите короткий адрес.
          </p>
        </div>

        <label className="input-label" htmlFor="url-input">Исходная ссылка</label>
        <input
          id="url-input"
          type="url"
          placeholder="https://example.com/very/long/link"
          value={originalUrl}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="url-input"
          autoComplete="off"
        />

        <button onClick={() => void handleSubmit()} className="submit-button" disabled={isLoading}>
          {isLoading ? 'Сокращаем...' : 'Сократить'}
        </button>

        {shortUrl && (
          <div className="result-box" role="status">
            <span className="result-label">Короткая ссылка</span>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer">
              {shortUrl}
            </a>
          </div>
        )}

        {error && (
          <div className="error-box" role="alert">
            {error}
          </div>
        )}
      </section>
    </main>
  );
}

export default UrlShortener;