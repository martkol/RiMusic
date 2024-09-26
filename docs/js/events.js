function contentLoaded(t) {
  const loadingScreen = document.querySelector(".loadingScreen");
  setTimeout(() => {
    loadingScreen.style.opacity = "0";
    document.body.classList.add("is-loaded")
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 400);
  }, t);
}
function contentUnload(){
  const loadingScreen = document.querySelector(".loadingScreen");
  loadingScreen.style.opacity = "1";
  loadingScreen.style.display = "flex";
  document.body.classList.remove("is-loaded")
}

// Dark Mode
var dark = localStorage.getItem("dark");
if (!dark && window.matchMedia) {
  dark = window.matchMedia("(prefers-color-scheme: dark)").matches
} else {
  dark = dark == "true"
} 
if (dark == true){
  document.body.classList.add("dark");
}
function toggleDark() {
  dark = !dark
  document.body.classList.toggle("dark");
  localStorage.setItem("dark", dark);
}

// Detect Touch to prevent colouring Dark/Light Button
function detecttouch() {
  document.documentElement.classList.add("touch");
}

document.onmousedown = function (e) {
  langEvent(e)
}
document.onkeyup = function (e) {
  if (e.target.parentElement.id != "langOption" || e.keyCode == 27){
    document.body.classList.remove("visible")
  }
  if (e.keyCode == 13){
    langEvent(e)
    document.getElementById("langOption").firstElementChild.focus() 
  }
}

var langSelect = document.getElementById("langSelect");
var langSel = langSelect
var langOption = document.getElementById("langOption");

function langEvent(e) {
  if (e.target.id == langSelect.id) {
    document.body.classList.toggle("visible");
    return;
  }
  if (e.target.parentElement){
    if (e.target.id == "globe" || e.target.parentElement.id == "globe"){
      document.body.classList.add("visible");
      if (window.innerWidth > 640)
        langSelect.focus()
      return;
    }
  }
  if (e.target.id == langOption.id) {
    return;
  }
  if (e.target.parentElement) {
    if (e.target.parentElement.id == langOption.id) {
      updateLanguage(e.target.attributes.lang.value);
    }
  }
  if (document.body.classList.contains("visible")){
    document.body.classList.remove("visible");
  }
};
onwheel = window.onwheel = function (e) {
  if (e.target.id == langOption.id || e.target.attributes.lang) {
    return;
  }
  document.body.classList.remove("visible");
}
