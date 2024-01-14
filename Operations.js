function performGoogleSearch(search) {
    document.location = `https://www.google.com/search?q=${encodeURIComponent(search)}`
    search = "";
}
function performYouTubeSearch(search) {
    document.location = `https://www.youtube.com/results?search_query=${encodeURIComponent(search)}`
    search = "";
}
function performDuckDuckGoSearch(search) {
    document.location = `https://duckduckgo.com/?q=${encodeURIComponent(search)}`
    search = "";
}
function performBingSearch(search) {
    document.location = `https://www.bing.com/search?q=${encodeURIComponent(search)}`
    search = "";
}
function performCalculation(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return a / b;
            break;
        default:
            return document.location = `https://www.google.com/search?q=${encodeURIComponent(search)}`;
    }
    search = "";
}
function performWolframAlphaSearch(search) {
    document.location = `https://www.wolframalpha.com/input/?i=${encodeURIComponent(search)}`
    search = "";
}
function performWikipediaSearch(search) {
    document.location = `https://en.wikipedia.org/wiki/${encodeURIComponent(search)}`
    search = "";
}
function performWhetherCheck(search) {
    document.location = `https://www.google.com/search?q=${encodeURIComponent(search)}`
    search = "";
}
function performImageSearchOnPexels(search) {
    document.location = `https://www.pexels.com/?s=${encodeURIComponent(search)}`
    search = "";
}
function performImageSearchOnUnsplashes(search) {
    document.location = `https://unsplash.com/s/photos/${encodeURIComponent(search)}`
    search = "";
}
function setToDo(todo) {
    localStorage.setItem("ToDo", `${todo}`);
}
function getToDo(todo) {
    return localStorage.getItem(todo);
}
function updateToDo(action, todo) {
    if(action == "Delete"){
        localStorage.removeItem(todo);
    }
}
function setGoogleCalenderEvent(event) {

}
function lookWordDefination(word) {
    
}