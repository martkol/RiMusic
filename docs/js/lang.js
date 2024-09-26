// select Language
var navigatorLang = (navigator.language || navigator.userLanguage).split("-")[0];
const language = localStorage.getItem("languageX");
if (language){
    navigatorLang = language
}

var translateStrings = document.getElementsByClassName("translate");
var languages = {}
var selectedStrings = {};   

function loadLang(lang){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            langSelect.childNodes[0].textContent = languages[lang]
            showResult(xhttp.responseXML.getElementsByTagName("string"));
        } 
        if (this.readyState == 4 && this.status != 200) {
            alert("an error occurred while loading the language")
            contentLoaded(10);
        } 
    };
    xhttp.open("GET", "res/values-" + lang + "/strings.xml", true);
    xhttp.send(); 
}
function showResult(xml) {
    for(const strings of xml){
        selectedStrings[strings.getAttribute("name")] = strings.innerHTML
    }
    for (let x = 0; x < translateStrings.length; x++){
        translateStrings[x].innerHTML = selectedStrings[translateStrings[x].getAttribute("name")]
    } 
    contentLoaded(200);
}
function grabLanguages(){
    for(const lang of langOption.children){
        languages[lang.getAttribute("lang")] = lang.innerHTML
    }
}
function updateLanguage(el) {
    contentUnload()
    localStorage.setItem("languageX", el);
    loadLang(el)
    setTimeout(() => {
        document.getElementsByTagName("a")[0].focus() 
    },100);
}
grabLanguages();  
loadLang(navigatorLang);
