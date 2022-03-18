console.log('api script is connected');

// Nog mee bezig

fetch(
  ('https://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=(apiKeyEvenWeg)')
)
  .then((response) => response.json())
  .then((data) => console.log(data))

  .catch((err) => alert('wrong city name'));
