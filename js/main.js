var table = document.getElementsByTagName('tbody')[0];
var tableWrapp = document.getElementsByClassName('table_wrapp')[0];
var submit = document.querySelector('button[type="button"]');
var cityInput = document.getElementById('textCity');
var checkbox = document.querySelector('input[type="checkbox"]');
var form = document.getElementById('form_submit');
var userCity = "";

// Toggle placeholder na focus, blur
cityInput.addEventListener("blur", function () {
  this.placeholder = 'Enter any city...';
});
cityInput.addEventListener("focus", function () {
  this.placeholder = '';
});

// Blokiranje Enter key da refresuje stranicu
form.addEventListener('submit', function (e) {
  e.preventDefault();
});

// Submit na Enter key
cityInput.addEventListener('keyup', function (e) {
  if (e.keyCode === 13 && cityInput.value !== "") {
    start();
  }
});

submit.addEventListener('click', start);

if (localStorage.getItem("userCity")) {
  cityInput.value = localStorage.getItem("userCity");
  start();
}

function start(e) {
  tableWrapp.backgroundColor = 'tomato';
  if (checkbox.checked && cityInput.value !== "") {
    console.log("checked");
    userCity = localStorage.setItem("userCity", cityInput.value);
    checkbox.checked = false;
    cityInput.select();
  }
  else if(!checkbox.checked && cityInput.value !== "") {
    console.log("not checked");
    cityInput.placeholder = "";
  }
  // console.log(e.target);
  userCity = 'https://api.openweathermap.org/data/2.5/weather?q='+ cityInput.value +'&APPID=45d2fc7cf56de2feaced82feda756f44';
  var json = new XMLHttpRequest();
  json.addEventListener('readystatechange', function () {
    if (json.status === 200 && json.readyState === 4) {
    getData(json);
    }
  });
  json.open('GET', userCity);
  json.send();
}
function getData(json) {
  var data = json.responseText;
  // console.log(data);
  var root = JSON.parse(data);
  // console.log(root);
  displayTable(root);
}

function displayTable(root) {
  var text = '';
  text += `
    <tr>
      <td>${cityInput.value.replace(/\b\w/g, l => l.toUpperCase())}, ${root.sys.country} </td>
      <td>${root.weather[0].main}
        <img width="32" height="32" alt="Weather in ${cityInput.value.replace(/\b\w/g, l => l.toUpperCase())}, ${root.sys.country}" src="http://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${root.weather[0].icon}.png">
      </td>
      <td>${parseInt(root.main.temp - 273.15)} &deg;C</td>
      <td>${parseInt(root.main.temp_max - 273.15)} &deg;C</td>
      <td>${root.wind.speed} m/s</td>
      <td>${root.main.humidity} %</td>
    </tr>`;
    // value - 273.15 -> pretvara Calvin u Celsius
  table.innerHTML = text;
}
