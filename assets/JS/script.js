var formEl = document.querySelector("#user-form");
var forecastEl = document.querySelector("#currentForecast");
var forecastTitle = document.querySelector("#forecastTitle")
var fiveDayTitle = document.querySelector("#fiveDayTitle")
var fiveDayForecast = document.querySelector("#fiveDayForecast")
var prevSearched = JSON.parse(localStorage.getItem("cities")) || [];
var historyEl = document.querySelector("#history");
var currentDate = new Date;
var month = currentDate.getMonth();
var day = currentDate.getDate();
var year = currentDate.getFullYear();
var date = (month + "/" + day + "/" + year)





var currentWeather = function (cityName) {
        var apiUrl = "//api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=fcea9ab324bcac47a458a0580dea86c1"
        fetch(apiUrl).then(function (response) {
                if (response.ok) {
                    response.json().then(function (data) {
                        console.log(data)
                        
                        displayWeather(data)
                        var cityName = document.getElementById("search").value.trim();

                    }).then(weekForecast(cityName));
                }
                else {
                    alert("Error!" + response.statusText);
                }
            });
    };
    
    var displayWeather = function(data){
        forecastTitle.innerHTML = "";
        forecastEl.innerHTML = "";
        fiveDayForecast.innerHTML = "";
        fiveDayTitle.innerHTML = "";
        var title = document.createElement("h2");
        title.innerHTML = "Today's Weather: ";
        forecastTitle.appendChild(title);
        var today = document.createElement("h3");
        today.innerHTML = date;
        forecastEl.appendChild(today);
        var name = document.createElement("h3");
        name.textContent = "City's name: " + data.name;
        forecastEl.appendChild(name);
        var temp = document.createElement("h3");
        temp.textContent = "Temperature: " + data.main.temp;
        forecastEl.appendChild(temp);
        var humidity = document.createElement("h3");
        humidity.textContent = "Humidity: " + data.main.humidity;
        forecastEl.appendChild(humidity);
        var wind = document.createElement("h3");
        wind.textContent = "Wind Speed: " + data.wind.speed;
        forecastEl.appendChild(wind);

};

var weekForecast = function (cityName) {
    var apiForecastUrl = "//api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=fcea9ab324bcac47a458a0580dea86c1"
    fetch(apiForecastUrl).then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data)
                    if (!prevSearched.includes(cityName)) {
                        prevSearched.push(cityName);
                        localStorage.setItem("cities", JSON.stringify(prevSearched));
                        searchHistory();
                    }
                    displayForecast(data);
                })
            }
            else {
                alert("Error!" + response.statusText);
            }
        });
};



var displayForecast = function(data){
    fiveDayForecast.innerHTML = "";
    fiveDayTitle.innerHTML = "";
    var dataArr = data.list.splice(0,5);

    for (var i = 0; i < dataArr.length; i++) {

        var day = document.createElement("div");
        day.innerHTML = data.list[i].dt_txt;
        fiveDayForecast.appendChild(day);
        var temp = document.createElement("div");
        temp.textContent = "Temperature: " + data.list[i].main.temp;
        fiveDayForecast.appendChild(temp);
        var humidity = document.createElement("div");
        humidity.textContent = "Humidity: " + data.list[i].main.humidity;
        fiveDayForecast.appendChild(humidity);
        var wind = document.createElement("div");
        wind.textContent = "Wind Speed: " + data.list[i].wind.speed;
        fiveDayForecast.appendChild(wind);

}


};


var searchHistory = function () {
    if (prevSearched) {
        document.querySelector("#history").innerHTML = "";

        for (let i = 0; i < prevSearched.length; i++) {
            
            var listItemEl = document.createElement("li");
            listItemEl.textContent = prevSearched[i];
            listItemEl.classList = "list-group-item text-capitalize";
            listItemEl.setAttribute("data-name", prevSearched[i]);
            historyEl.append(listItemEl);
        }
    }
};
    

var submitHandler = function (event) {
    event.preventDefault();
    var cityName = document.getElementById("search").value.trim();
    document.querySelector("#search").value = "";
    currentWeather(cityName);
}

formEl.addEventListener("submit", submitHandler);

searchHistory()
 






















