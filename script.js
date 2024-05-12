// Declaring the variables
let Input = document.getElementById("input_text");
let Body = document.getElementById("body");
let keynum;

// Clearing the input value on load
Input.value = "";

// Adding event listener for keyboard input
Body.addEventListener("keydown", function (e) {
    const searchcontainer = document.getElementsByClassName("search-bar")[0];

    // Expanding search bar on typing alphanumeric characters
    if (event.key.length === 1 && event.key.match(/[a-z0-9]/i)) {
        searchcontainer.style.width = '50vw';
        searchcontainer.style.transition = 'width 0.2s ease-in-out';
    }
    Input.focus(); // Focusing on input field

    if (window.event) {
        keynum = e.keyCode;
    }

    // Handling Enter key press
    if (keynum == 13) {
        handleDropDown(Input.value);
    }

    // Clearing results and resetting search bar width if input is empty
    Input.addEventListener("input", function (e) {
        if (Input.value == "") {
            document.getElementById("content").innerHTML = "";
            document.getElementById('result').innerHTML = '';
            searchcontainer.style.width = '4.5vw';
        }
    }
    )
})

// Displaying calculation result
async function showCalcResult(params) {
    console.log(params);
    let result = document.getElementById("result");
    let res = result.innerHTML = "<h1>" + params + "</h1>";
    console.log(res);
}

// Displaying word search result
async function showWordSearchResult(params) {
    console.log(params);
    let result = document.getElementById("result");

    if (params.title != "No Definitions Found") {
        let res = result.innerHTML = "<h1>" + params[0].meanings[0].definitions[0].definition + "</h1>";
    } else {
        let res = result.innerHTML = "<h1>" + params.title + "</h1>";
    }
}

// Displaying Wikipedia search result
async function showWikiResult(params) {
    document.getElementById('loader').classList.add('loader')

    setTimeout(function () {
        document.getElementById('loader').classList.remove('loader')
    }, 1000);

    let result = document.getElementById("result");
    result.innerHTML = "";
    let list = params.query.search;
    result.innerHTML = "<h1>Wikipedia Search Results</h1>";

    list.map((item, i) => {
        let res = result.innerHTML += `<li class="wiki-result"><a onclick="loadwiki(${list[i].pageid})">` + list[i].title + "</a></li>";
    }
    )
}

// Function to load Wikipedia page
function loadwiki(params) {
    // Loading Wikipedia page in an iframe
    let result = document.getElementById("result");
    result.innerHTML = "";
    result.innerHTML = `<iframe src="https://en.wikipedia.org/?curid=${params}" width="1500vw" height="900px"></iframe>`;
}

// Handling different types of searches
function handleDropDown(search) {
    // Handling different search types based on input
    if (search.includes("*") || search.includes("-") || search.includes("/") || search.includes("+")) {
        showCalcResult(performCalculation(search));
    } else if (hasOnlyOneWord(search)) {
        console.log("Word Search");
        document.getElementById('loader').classList.add('loader')
        setTimeout(function () {
            document.getElementById('loader').classList.remove('loader')
        }, 1000);
        performWordSearch(search)
    } else if (search.includes("set") || search.includes("add") || search.includes("todo")) {
        console.log("Set Todo");
        performTodoSet(search);
    } else if (search.includes("remove") || search.includes("delete") || search.includes("remove todo")) {
        console.log("remove Todo");
        performToDoUpdate(search);
    } else if (search.includes("google") || search.includes("search google") || search.includes("how") || search.includes("what") || search.includes("why") || search.includes("how") || search.includes("when") || search.includes("where") || search.includes("who") || search.includes("which") || search.includes("whom") || search.includes("whose") || search.includes("google search")) {
        performGoogleSearch(search);
    } else if (search.includes("youtube") || search.includes("search youtube") || search.includes("youtube search")) {
        performYouTubeSearch(search);
    } else if (search.includes("wikipedia") || search.includes("search wikipedia") || search.includes("wikipedia search") || search.includes("wiki")) {
        performWikipediaSearch(search);
        document.getElementById('loader').classList.add('loader')
        setTimeout(function () {
            document.getElementById('loader').classList.remove('loader')
        }, 1000);
    }
    else {
        performGoogleSearch(search, true);
    }
}

// Function to check if input has only one word
function hasOnlyOneWord(inputString) {
    var wordRegex = /^\w+$/;
    return wordRegex.test(inputString);
}

// Function to perform calculation
function performCalculation(expression) {
    var calculate = new Function('return ' + expression);
    var result = calculate();
    return result;
}

// Function to perform word search
function performWordSearch(word) {
    let result = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(response => {
        response.json().then(data => {
            showWordSearchResult(data);
        })
    })
}

// Function to add a todo
function performTodoSet(cmd) {
    let res = cmd.split("add ");
    let alltodo = JSON.parse(localStorage.getItem("todolist")) || [];
    let newTodo = res[1].trim();
    alltodo.push(newTodo);
    console.log(alltodo);
    localStorage.setItem("todolist", JSON.stringify(alltodo));
}

// Function to remove a todo
function performToDoUpdate(cmd) {
    let res = cmd.split("remove ");
    let alltodoRemove = JSON.parse(localStorage.getItem("todolist")) || [];
    let indexToRemove = alltodoRemove.indexOf(res[1]);
    if (indexToRemove !== -1) {
        alltodoRemove.splice(indexToRemove, 1);
        localStorage.setItem("todolist", JSON.stringify(alltodoRemove));
    } else {
        console.log("The word to remove is not in the list.");
    }
}

// Function to perform Google search
function performGoogleSearch(search, isit) {
    let res = search.split("google");
    if (isit) {
        document.location = `https://www.google.com/search?q=${encodeURIComponent(search)}`
    } else {
        document.location = `https://www.google.com/search?q=${encodeURIComponent(res[1].trim())}`
    }
    search = "";
}

// Function to perform YouTube search
function performYouTubeSearch(search) {
    let res = search.split("youtube");
    document.location = `https://www.youtube.com/results?search_query=${encodeURIComponent(res[1].trim())}`
    search = "";
}

// Function to perform DuckDuckGo search
function performDuckDuckGoSearch(search) {
    document.location = `https://duckduckgo.com/?q=${encodeURIComponent(search)}`
    search = "";
}

// Function to perform Bing search
function performBingSearch(search) {
    document.location = `https://www.bing.com/search?q=${encodeURIComponent(search)}`
    search = "";
}

// Function to perform Wolfram Alpha search
function performWolframAlphaSearch(search) {
    document.location = `https://www.wolframalpha.com/input/?i=${encodeURIComponent(search)}`
    search = "";
}

// Function to perform Wikipedia search
function performWikipediaSearch(search) {
    fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${encodeURIComponent(search)}`).then(response => {
        response.json().then(data => {
            console.log(data);
            showWikiResult(data);
        })
    })
    search = "";
}

// Function to perform weather check
function performWhetherCheck(search) {
    search = "";
}

// Function to perform image search on Pexels
function performImageSearchOnPexels(search) {
    document.location = `https://www.pexels.com/?s=${encodeURIComponent(search)}`
    search = "";
}

// Function to perform image search on Unsplash
function performImageSearchOnUnsplashes(search) {
    document.location = `https://unsplash.com/s/photos/${encodeURIComponent(search)}`
    search = "";
}


function updateRealTimeDate() {
  var currentDate = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var formattedDate = currentDate.toLocaleDateString('en-US', options);

  document.getElementById('date').innerHTML = formattedDate;
}

// Call the function initially
updateRealTimeDate();

// Update the date every second
setInterval(updateRealTimeDate, 1000);

function updateRealTimeTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();

  // Add leading zero if necessary
  hours = (hours < 10 ? "0" : "") + hours;
  minutes = (minutes < 10 ? "0" : "") + minutes;
  seconds = (seconds < 10 ? "0" : "") + seconds;

  var formattedTime = hours + ":" + minutes + ":" + seconds;
  
  document.getElementById('time').innerHTML =formattedTime;
}

// Call the function initially
updateRealTimeTime();

// Update the time every second
setInterval(updateRealTimeTime, 1000);

function fetchTemperature(latitude, longitude) {
  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  var apiKey = 'd9a829013d78be9ac8e3d61d03f7b820';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          var temperature = data.main.temp;
          document.getElementById('whether').innerHTML = 'Current temperature is: ' + temperature + '°C';
      })
      .catch(error => {
          console.error('Error fetching temperature:', error);
      });
}
function fetchWind(latitude, longitude) {
  // Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key
  var apiKey = 'd9a829013d78be9ac8e3d61d03f7b820';
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          var windSpeed = data.wind.speed;
          var windDirection = data.wind.deg;

          // Convert wind direction to cardinal direction
          var cardinalDirection = getCardinalDirection(windDirection);

          document.getElementById('wind').innerHTML = 'Current wind speed is: ' + windSpeed + ' m/s, Direction: ' + cardinalDirection;
      })
      .catch(error => {
          console.error('Error fetching wind:', error);
      });
}

function getCardinalDirection(degree) {
  var sectors = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  var index = Math.round(degree / 45);
  return sectors[index % 8];
}


function getLocation() {
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
          var latitude = position.coords.latitude;
          var longitude = position.coords.longitude;
          fetchTemperature(latitude, longitude);
          fetchWind(latitude,longitude);
      }, error => {
          console.error('Error getting location:', error);
      });
  } else {
      console.error('Geolocation is not supported by this browser.');
  }
}

// Call the function to get location and fetch temperature
getLocation();

// Update the temperature every 5 minutes (300000 milliseconds)
setInterval(getLocation, 300000);





