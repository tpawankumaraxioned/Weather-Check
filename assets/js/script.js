//Weather api function starts here
var today, days, week_day, todays_date, months, current_month;
today = new Date();

days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
week_day = days[today.getDay()];
todays_date = today.getDate();
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
cur_month = months[today.getMonth()];

// console.log(week_day);
// console.log(todays_date);
// console.log(current_month);

var city_location, current_temp, weather_icon, weather_humidity, wind_speed, wind_deg;

document.getElementById('current-day').innerHTML = week_day;
document.getElementById('current-date').innerHTML = todays_date+' '+cur_month;
// document.getElementById('city-name').innerHTML = 'Mumbai';
console.log(document.getElementById('city-name').innerHTML);

function get_data() {
  var city_name = 'Mumbai';
  var data_file = 'https://api.openweathermap.org/data/2.5/weather?q='+ city_name +'&units=metric&appid=fcdf0a2960c73aa346b28c532167c49c',
      http_request = new XMLHttpRequest();
  http_request.onreadystatechange = function() {
    var data;
    if (this.readyState == 4 && this.status == 200) {
      data = JSON.parse(this.response);
      console.log(data);
      console.log('Temp in celsius '+data.main.temp); 
      console.log('weather icon '+data.weather[0].main);    
      console.log('umbrella humidity '+data.main.humidity); 
      console.log('wind icon speed '+data.wind.speed); 
      console.log('compass deg '+data.wind.deg); 
      
    }
    else{
      console.log('Something went wrong');
    }
  };
  http_request.open("GET", data_file ,true);
  http_request.send();
}

get_data(); 

//Weather api function ends here
















