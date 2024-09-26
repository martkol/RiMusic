y=0
z=0
init = false

function reveal() {
    w = window.innerHeight
    fO = document.getElementsByClassName("feature-extended")
    rO = document.getElementsByClassName("is-revealing")
    if (!init){
        console.log("init")
        for (let x = y; x < fO.length; x++){
            if(w > (document.body.getBoundingClientRect().height - (200))){
                fO[y].classList.remove("d-0")
                y = y + 1
            } else {
                init = true
                break;
            }
        }
    }
    if (y < fO.length){
        bfO = fO[y].parentElement.getBoundingClientRect();
        if ((bfO.bottom < (w * 2))){
            fO[y].classList.remove("d-0")
            y = y+1
        }
    } 
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
