//Weather api function starts here
var today, days, week_day, todays_date, months, current_month;
today = new Date();

days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
week_day = days[today.getDay()];
todays_date = today.getDate();
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
cur_month = months[today.getMonth()];

var city_location, current_temp, weather_icon, weather_humidity, wind_speed, wind_deg;

document.getElementById('current-day').innerHTML = week_day;
document.getElementById('current-date').innerHTML = todays_date+' '+cur_month;
city_location = document.getElementById('city-loc');
current_temp = document.getElementById('tem');
weather_icon = document.getElementById('weather-icon-img');
weather_humidity = document.getElementById('humidity');
wind_speed =  document.getElementById('wind-speed');
wind_deg =  document.getElementById('compass');
var city_name = 'Mumbai';
function get_data(city_name) {
  
  city_location.innerHTML = city_name;
  var data_file = 'https://api.openweathermap.org/data/2.5/weather?q='+ city_name +'&units=metric&appid=fcdf0a2960c73aa346b28c532167c49c',
      http_request = new XMLHttpRequest();
  http_request.onreadystatechange = function() {
    var data;
    if (this.readyState == 4 ) {
      if(this.status == 200) {
        data = JSON.parse(this.response);
        displayData(data);
      }
      else{
        console.log('Something went wrong');
      }
    }
  };
  http_request.open("GET", data_file ,true);
  http_request.send();
}

get_data(city_name); 


var findBtn = document.querySelector('.findBtn');

findBtn.addEventListener('click', function(ev) {
  ev.preventDefault();
  var find_location = document.getElementById('city-in').value;
console.log(find_location);
  get_data(find_location);
  
});

function displayData(data) {

  current_temp.innerHTML= data.main.temp+ '&deg;C';
  weather_humidity.innerHTML = data.main.humidity+ '%';
  wind_speed.innerHTML = data.wind.speed+'m/sec';
  wind_deg.innerHTML = data.wind.deg;
  
  console.log('weather icon '+weather_icon);  
  if(data.weather[0].main == 'Drizzle') {
    weather_icon.src = 'assets/images/icons/icon-13.svg';
  }
  else if(data.weather[0].main == 'Thunderstorm') {
    weather_icon.src = 'assets/images/icons/icon-12.svg';
  }
  else if(data.weather[0].main == 'Rain') {
    weather_icon.src = 'assets/images/icons/icon-14.svg';
  }
  else if(data.weather[0].main == 'Mist' || data.weather[0].main == 'Smoke' || data.weather[0].main == 'Haze') {
    weather_icon.src = 'assets/images/icons/icon-7.svg';
  }
  else if(data.weather[0].main == 'Clouds') {
    weather_icon.src = 'assets/images/icons/icon-5.svg';
  }
  else if(data.weather[0].main == 'Clear') {
    weather_icon.src = 'assets/images/icons/icon-1.svg';
  }
  else {
    weather_icon.src = 'assets/images/icons/icon-1.svg';
  }
  console.log(weather_icon);
}

//Weather api function ends here
















