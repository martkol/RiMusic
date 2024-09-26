z=0
init = false
function reveal() {
    w = window.innerHeight
    rO = document.getElementsByClassName("is-revealing")
    for (let a = Math.max(z-1,0); a < Math.min(z+1,rO.length); a++) {
        b = rO[a].parentElement.getBoundingClientRect();
        if (b.height > 1){
            if (b.top > w && !rO[a].classList.contains("o-0")){
                rO[a].classList.add("o-0") 
                z = z - 1
            } 
            if (b.top < (w - (b.height * 0.4)) && rO[a].classList.contains("o-0")){
                rO[a].classList.remove("o-0")
                z = z + 1
            }
        }
    }
}
window.onscroll = function (e) {
    reveal()
}
window.onresize = function (e) {
    reveal()
}
reveal()
