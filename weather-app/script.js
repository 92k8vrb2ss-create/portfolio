const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

async function getWeather() {
  const city = cityInput.value.trim();
  const apiKey = "b03aed5da577153eceebdc6ef9005cfa";

  const cityText = document.getElementById("city");
  const tempText = document.getElementById("temp");
  const descText = document.getElementById("desc");
  const iconImg = document.getElementById("icon");
  const errorText = document.getElementById("error");

  if (city === "") {
    errorText.textContent = "Bitte gib eine Stadt ein.";
    cityText.textContent = "";
    tempText.textContent = "";
    descText.textContent = "";
    iconImg.style.display = "none";
    cityInput.focus();
    return;
  }

  try {
    errorText.textContent = "";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    const response = await fetch(url);
    const data = await response.json();

    if (String(data.cod) !== "200") {
      cityText.textContent = "";
      tempText.textContent = "";
      descText.textContent = "";
      iconImg.style.display = "none";
      errorText.textContent = "Stadt nicht gefunden ❌";
      return;
    }

    cityText.textContent = data.name;
    tempText.textContent = `🌡️ ${data.main.temp}°C`;
    descText.textContent = data.weather[0].description;

    const icon = data.weather[0].icon;
    iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    iconImg.style.display = "block";

  } catch (error) {
    cityText.textContent = "";
    tempText.textContent = "";
    descText.textContent = "";
    iconImg.style.display = "none";
    errorText.textContent = "Fehler beim Laden der Daten.";
    console.log(error);
  }
}

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    getWeather();
  }
});