let infos;
let clicked;
window.addEventListener("load", () => {
    infos = document.querySelectorAll('.info-div');
    for (let i=1; i<=3; i++) {
        document.getElementById(`call${i}`).addEventListener("click", openInfo);
    };
    clicked = 0;
});

const openInfo = (event) => {
    for (let i=1; i<=3; i++) {
        document.getElementById(`info${i}`).style.height = "0vh";
    };
    if (clicked === event.target.id.slice(-1)) {
        clicked = event.target.id.slice(-1);
        document.getElementById(`info${clicked}`).style.height = "0vh";
        document.getElementById(`call${clicked}`).style.backgroundColor = "#f4f6f9";
        clicked = 0;
    } else {
        if (clicked > 0) {
            document.getElementById(`call${clicked}`).style.backgroundColor = "#f4f6f9";
        };
        clicked = event.target.id.slice(-1);
        document.getElementById(`info${clicked}`).style.height = "12vh";
        document.getElementById(`call${clicked}`).style.backgroundColor = "#c9dde6";
        clicked = event.target.id.slice(-1);
    }
}