// Navigation menu active starts here
var navBtn = document.querySelectorAll('.menu li a');

navBtn.forEach(function(e) {
  e.addEventListener('click', function(){
    navBtn.forEach(function(ev){
      ev.classList.remove('active');
    });
    this.classList.add('active');
  });
});

var path = window.location.href; 
if (path.includes('liveCam')) {
  document.querySelector('.menu li a.active').classList.remove('active');
  document.querySelector('#cam').classList.add('active')
}


// Navigation menu active ends here
// Hamburger menu starts here
var hamburger, memuList, headMenu; 

hamburger = document.getElementById('hamburger-icon');
menuList = document.querySelector('nav .menu');
headMenu = document.querySelector('header');

hamburger.addEventListener('click', function(){
  headMenu.classList.toggle('head-menu');
  hamburger.classList.toggle('active');
  menuList.classList.toggle('active');
});

// Hamburger menu ends here
// Form Validation Starts here
var subscribeBtn = document.getElementById('subscribe');

subscribeBtn.addEventListener('click', function() {
	var formSubmit = document.querySelector('.footer-top .wrapper form');
	formSubmit.setAttribute('onsubmit', 'event.preventDefault(); validateForm();');
});

function validateForm() { 
  var email, regEmail;
  email = document.getElementById('emailid');
  regEmail=  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if(email.value == "") 
  {
    document.querySelector('.emailError').style.display = "inline-block";
  }
	else if(!regEmail.test(email.value)) {
    document.querySelector('.emailError').style.display = "inline-block";
		document.querySelector('.emailError').innerHTML = "Enter proper email-id";
	}
	else {
    document.querySelector('.emailError').style.display = "none";
    resetForm();
  }
}

function resetForm() {
  document.getElementById('emailid').value= "";
}
// Form Validation Ends here
// Weather api function starts here
var today, days, week_day, todays_date, months, current_month;
today = new Date();

days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
week_day = days[today.getDay()];
todays_date = today.getDate();
months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
cur_month = months[today.getMonth()];

var city_name,city_location, current_temp, weather_icon, weather_humidity, wind_speed, wind_deg;

document.getElementById('current-day').innerHTML = week_day;
document.getElementById('current-date').innerHTML = todays_date+' '+cur_month;
city_location = document.getElementById('city-loc');
current_temp = document.getElementById('tem');
weather_icon = document.getElementById('weather-icon-img');
weather_humidity = document.getElementById('humidity');
wind_speed =  document.getElementById('wind-speed');
wind_deg =  document.getElementById('compass');
city_name = 'Mumbai';

function get_data(city_name) {
  var data_file = 'https://api.openweathermap.org/data/2.5/weather?q='+ city_name +'&units=metric&appid=fcdf0a2960c73aa346b28c532167c49c',
  http_request = new XMLHttpRequest();
  http_request.open("GET", data_file ,true);
  http_request.send();
  http_request.onreadystatechange = function() {
    var data;
    if (this.readyState == 4 ) {
      if(this.status == 200) {
        document.querySelector('.weather-data').style.display = "block";
        document.querySelector('#errorMsg').style.display = "none";
        data = JSON.parse(this.response);
        city_location.innerHTML = city_name;
        displayData(data);
      }
      else{
        document.querySelector('.weather-data').style.display = "none";
        document.querySelector('#errorMsg').style.display = "block";
      }
    }
  }
}

get_data(city_name); 

// OnClick search function starts here
var findBtn = document.querySelector('.findBtn');

findBtn.addEventListener('click', function(ev) {
  ev.preventDefault();
  var find_location = document.getElementById('city-in').value;
  get_data(find_location);
});
// OnClick search function ends here

function displayData(data) {
  current_temp.innerHTML= data.main.temp+ '&deg;C';
  weather_humidity.innerHTML = data.main.humidity+ '%';
  wind_speed.innerHTML = data.wind.speed+'m/sec';
  wind_deg.innerHTML = data.wind.deg;
    
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
}
// Weather api function ends here
// Modal Starts here
var closeBtn = document.querySelector('.popup-close');
var playBtn = document.querySelectorAll(".playvideobtn");

for (var i = 0; i < playBtn.length; i++) {
  playBtn[i].addEventListener('click', function(e) {
    e.preventDefault();
    var video = e.target.parentElement.getAttribute("data-video");
    var video_tag = '<video controls autoplay><source id="video-source" src="'+video+'" type="video/mp4"></video>';
    document.querySelector('.video-container').innerHTML = document.querySelector('.video-container').innerHTML + video_tag;
    document.getElementById('popup-video').style.display= "block";
  });
}

closeBtn.setAttribute('onclick', 'test()');

function test() {
  document.getElementById('popup-video').style.display= "none";
  document.querySelector('.video-container video').remove();
}
// Modal ends here