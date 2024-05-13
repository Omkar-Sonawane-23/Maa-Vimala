let Input = document.getElementById("input_text");
let Body = document.getElementById("body");
const searchcontainer = document.getElementsByClassName("search-bar")[0];
let searchIcon = document.querySelector('#search-icon');
// let keynum;
Input.value = "";

Body.addEventListener("keydown", function (event) {

  if (event.key.length === 1 && event.key.match(/[a-zA-Z0-9\s]/i)) {
    if(Input.value === ''){
      searchcontainer.style.width = '50vw';
      searchcontainer.style.transition = 'width 0.2s ease-in-out';
    }

    Input.focus();
  }else if(Input.value && event.key==='Backspace' || event.key==='Delete' ){
    Input.focus()
  }

  
  // search only input have some value
  if (event.keyCode == 13 && Input.value) {
    handleDropDown(Input.value);
    Input.blur()
  }

})

Input.addEventListener("input", function (e) {
  if (Input.value == "") {
    document.getElementById("content").innerHTML = "";
    document.getElementById('result').innerHTML = '';
    searchcontainer.style.width = '50px';
    Input.blur()
  } else {
    // updateList();
  }
})

Input.addEventListener('blur', () => {
  if(Input.value === ''){
    searchcontainer.style.width = '50px';
  }
})

searchIcon.addEventListener('click', () => {
  if(Input.value){
    handleDropDown(Input.value);
    return;
  }

  searchcontainer.style.width = '50vw';
  searchcontainer.style.transition = 'width 0.2s ease-in-out';

  Input.focus();
})

// function dropDownHandeler(params) {
//   Body.addEventListener("keydown", function (e) {
//     const dropdowncontent = document.getElementById("content");

//   })
// }



async function showCalcResult(params) {
  console.log(params);
  let result = document.getElementById("result");
  let res = result.innerHTML = "<h1>" + params + "</h1>";
  console.log(res);
}
async function showWordSearchResult(params) {
  console.log(params);
  let result = document.getElementById("result");
  if (params.title != "No Definitions Found") {
    let res = result.innerHTML = "<h1>" + params[0].meanings[0].definitions[0].definition + "</h1>";
  } else {
    let res = result.innerHTML = "<h1>" + params.title + "</h1>";
  }
}
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
  // console.log(res);
}
function loadwiki(params) {
  let result = document.getElementById("result");
  result.innerHTML = "";
  result.innerHTML = `<iframe src="https://en.wikipedia.org/?curid=${params}" width="1500vw" height="900px"></iframe>`;
}

function handleDropDown(search) {
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
  } else if(search.toLowerCase().includes('bing') || search.toLowerCase().includes('search bing') || search.toLowerCase().includes('bing search')){
    performBingSearch(search);
  }else if(search.toLowerCase().includes('wolframalpha')){
    performWolframAlphaSearch(search)
  } else if(search.toLowerCase().includes('duckduckgo') || search.toLowerCase().includes('search duckduckgo') || search.toLowerCase().includes('duckduckgo search')){
    performBingSearch(search);
  }else if(search.toLowerCase().includes('image pexels') || search.toLowerCase().includes('pexels image') || search.toLowerCase().includes('pexels') ){
    performImageSearchOnPexels(search);
  }
  else if(search.toLowerCase().includes('unsplash') || search.toLowerCase().includes('unsplash image') || search.toLowerCase().includes('image unsplash') ){
    performImageSearchOnUnsplashes(search);
  }
  else {
    performGoogleSearch(search , true);
  }
}
function hasOnlyOneWord(inputString) {
  var wordRegex = /^\w+$/;
  return wordRegex.test(inputString);
}
function performCalculation(expression) {
  var calculate = new Function('return ' + expression);
  var result = calculate();
  return result;
}
function performWordSearch(word) {
  let result = fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`).then(response => {
    response.json().then(data => {
      showWordSearchResult(data);
    })
  })
}
function performTodoSet(cmd) {
  let res = cmd.split("add ");
  let alltodo = JSON.parse(localStorage.getItem("todolist")) || [];
  let newTodo = res[1].trim();
  alltodo.push(newTodo);
  console.log(alltodo);
  localStorage.setItem("todolist", JSON.stringify(alltodo));
}
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
function performGoogleSearch(search, isit) {
  let res = search.split("google");
  if(isit){
    document.location = `https://www.google.com/search?q=${encodeURIComponent(search)}`
  }else{
    document.location = `https://www.google.com/search?q=${encodeURIComponent(res[1].trim())}`
  }
  Input.value = "";
}
function performYouTubeSearch(search) {
  let res = search.split("youtube");
  document.location = `https://www.youtube.com/results?search_query=${encodeURIComponent(res[1].trim())}`
  Input.value = "";
}
function performDuckDuckGoSearch(search) {
  document.location = `https://duckduckgo.com/?q=${encodeURIComponent(search)}`
  Input.value = "";
}
function performBingSearch(search) {
  document.location = `https://www.bing.com/search?q=${encodeURIComponent(search)}`
  Input.value = "";
}
function performWolframAlphaSearch(search) {
  document.location = `https://www.wolframalpha.com/input/?i=${encodeURIComponent(search)}`
  Input.value = "";
}
function performWikipediaSearch(search) {
  fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=${encodeURIComponent(search)}`).then(response => {
    response.json().then(data => {
      console.log(data);
      showWikiResult(data);
    })
  })
  search = "";
}
function performWhetherCheck(search) {
  search = "";
}
function performImageSearchOnPexels(search) {
  const searchedText = search.split('pexels')[1].trim();
  document.location = `https://www.pexels.com/?s=${encodeURIComponent(searchedText)}`
  Input.value = "";
}
function performImageSearchOnUnsplashes(search) {
  const searchedText = search.split('unsplash')[1].trim();
  document.location = `https://unsplash.com/s/photos/${encodeURIComponent(searchedText)}`
  Input.value = "";
}
