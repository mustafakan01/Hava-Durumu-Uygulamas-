import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [sehir, setSehir] = useState('');
  const [havaDurumu, setHavaDurumu] = useState(null);

  // OpenWeatherMap API anahtarınızı buraya girin
  const API_KEY = '4fac3a6fb7e44255a5fa19b0aa837d8c';

  const havaDurumuGetir = async () => {
    if (!sehir) {
      console.error("Şehir adı boş bırakılamaz.");
      return;
    }

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&units=metric`);
      setHavaDurumu(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Hava durumu getirme hatası: API anahtarınız yanlış veya eksik.");
      } else {
        console.error("Hava durumu getirme hatası:", error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Hava Durumu Uygulaması</h1>
      <div>
        <label>
          Şehir:
          <input 
            type="text" 
            placeholder="Şehir adı girin..."
            value={sehir}
            onChange={(e) => setSehir(e.target.value)}
          />
        </label>
      </div>
      <button onClick={havaDurumuGetir}>Hava Durumu Getir</button>

      {havaDurumu && (
        <div>
          <h2>{havaDurumu.name} - {havaDurumu.sys.country}</h2>
          <p>Sıcaklık: {havaDurumu.main.temp}°C</p>
          <p>Hissedilen Sıcaklık: {havaDurumu.main.feels_like}°C</p>
          <p>Hava Durumu: {havaDurumu.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default App;
