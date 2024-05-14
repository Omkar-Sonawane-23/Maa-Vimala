const inputtext = document.getElementById('input_text');
const suggestionslist = document.getElementById('suggestionslist');

inputtext.addEventListener('keyup', () => {
    suggestionslist.innerHTML = '';
    let numSuggestions = 5;
    if (inputtext.value) {
        let filteredsuggestions = suggestions.filter((item) => {
            return item.toLowerCase().includes(inputtext.value.toLowerCase())
        })
        // console.log(filteredsuggestions)
        filteredsuggestions.map((item) => {
            if (numSuggestions == 0) {
                return;
            }
            suggestionslist.innerHTML += `<li onclick="fillSerchBox('${item}')">${item}</li>`
            numSuggestions--;
        })
    }
    if (suggestionslist.hasChildNodes()) {
        suggestionslist.style.backgroundColor = 'rgba(255, 255, 255, 0.288)';
    }
    else {
        suggestionslist.style.backgroundColor = '';
    }
})


//function to fill the search box on clicking the suggestion
function fillSerchBox(suggestion) {
    inputtext.value = suggestion;
    suggestionslist.innerHTML = '';
    suggestionslist.style.backgroundColor = '';
}

const suggestions = ['google', 'facebook', 'amazon', 'flipkart', 'zomato', 'captious', 'bibulous', 'malapropism', 'tricorn', 'tenebrous', 'braggadocio', 'bruit', 'embonpoint', 'pabulum', 'parlay', 'pother', 'valetudinarian', 'legerdemai', 'cantle', 'estivation', 'myrmidon', 'regnant', 'terpsichorean', 'clerisy', 'deracinate', 'vuncular', 'resembling ', 'pneumonoconiosis','quiz','quit','quest','queue','quiet','quite','quote','quint','Zoo', 'Zap', 'Zip', 'Zigzag', 'Zebra', 'Zombie', 'Zone', 'Zoom', 'Zest', 'Ziplock', 'Zillion','Wise'	,'Warm','Winner','Witty','Worthy','Well-wisher','Wacky','Well','Wild','Wordsmith','Whoopee','Wildflower','Warmth','Jaded','Jargon','Jettison','Jibe','Jeer','Jeopardize','Jest','Jingoist','Jabber','X-ray','Xerox','Xeric','Xenon','Xylem','Xebec','Xyster','Xylose']