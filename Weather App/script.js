const apiKey = "7b5a25df2f1792e31fcf1b634e2d0cce";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const box = document.querySelector(".search input");
const btn = document.querySelector(".search button");
const icon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(apiURL + city + `&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/hr";

        if (data.weather[0].main == "Clouds") {
            icon.src = "images/cloudy.png";
          } else if (data.weather[0].main == "Clear") {
            icon.src = "images/clear.png";
          } else if (data.weather[0].main == "Rain") {
            icon.src = "images/rain.png";
          } else if (data.weather[0].main == "Drizzle") {
            icon.src = "images/drizzle.png";
          } else if (data.weather[0].main == "Mist") {
            icon.src = "images/mist.png";
          } else if (data.weather[0].main == "Snow") {
            icon.src = "images/snow.png";
          }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error("Error fetching weather:", error);
    }
}

btn.addEventListener("click", function () {
    if (box.value.trim() !== "") {
        checkWeather(box.value);
    }
});
