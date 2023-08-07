import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";

export default function ShortUrl() {
  const [longUrl, setLongUrl] = useState(() =>
    localStorage.getItem("id2") ? JSON.parse(localStorage.getItem("id2")) : ""
  );
  const [shortUrl, setShortUrl] = useState(() =>
    localStorage.getItem("id") ? JSON.parse(localStorage.getItem("id")) : ""
  );

  console.log(shortUrl, longUrl);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <UrlGenerator
              longUrl={longUrl}
              shortUrl={shortUrl}
              setLongUrl={setLongUrl}
              setShortUrl={setShortUrl}
            />
          }
        />

        <Route path="/:id" element={<ShortUrlGenrator longUrl={longUrl} />} />
      </Routes>
    </BrowserRouter>
  );
}

function UrlGenerator({ longUrl, shortUrl, setLongUrl, setShortUrl }) {
  function handleSubmit(e) {
    e.preventDefault();
    const shortUrl = `${window.location.href}${crypto.randomUUID().slice(-4)}`;

    localStorage.setItem("id", JSON.stringify(shortUrl));
    localStorage.setItem("id2", JSON.stringify(longUrl));

    setShortUrl(shortUrl);
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
        />
        <input type="submit" value="submit" />
        {shortUrl !== "" && (
          <div>
            <h2>{shortUrl}</h2>
          </div>
        )}
      </form>
    </div>
  );
}

function ShortUrlGenrator({ longUrl, shortUrl }) {
  useEffect(function () {
    console.log(longUrl);
    window.location.replace(longUrl);
  }, []);

  return null;
}
