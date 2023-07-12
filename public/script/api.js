console.log('api script is connected');

fetch(
  (`https://api.openweathermap.org/data/2.5/weather?q=amsterdam&appid=(${API_KEY})`)
)
  .then((response) => response.json())
  .then((data) => console.log(data))

  .catch((err) => alert('wrong city name'));
