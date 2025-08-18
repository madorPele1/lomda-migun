const CHAPTERS_PART = [
    [],   //מסך פתיחה
    ['ruler', 'intro', 'lomda-info', 'migun-exp'],        //מבוא
    ['start-chap1', 'chap1-page'],        //פרק 1
    ['start-chap2', 'chap2-page1', 'chap2-page2', 'chap2-page3'],
    ['start-chap3', 'chap3-page1', 'chap3-page2', 'chap3-page3', 'chap3-page4', 'chap3-page5', 'chap3-page6', 'chap3-page7', 'chap3-page8'],
    ['start-chap4', 'chap4-page1', 'chap4-page2', 'chap4-page3', 'chap4-page4', 'chap4-page5', 'chap4-page6', 'chap4-page7'],
    ['start-chap5', 'chap5-page1', 'chap5-page2', 'chap5-page3', 'chap5-page4', 'chap5-page5', 'chap5-page6', 'chap5-page7', 'chap5-page8', 'chap5-page9'],
    ['start-chap6', 'chap6-page1', 'chap6-page2', 'chap6-page3', 'chap6-page4', 'chap6-fin']
];
const QUES_ANSWERS = ['ques1-ans1', 'ques2-ans3', 'ques3-ans2', 'ques4-ans1', 'ques5-ans3', 'ques6-ans2', 'ques7-ans2'];
const NUM_OF_CHAPS = 7;
const PROGRESS_CHANGE = [['5vh', '55vh solid #2f3043'], ['14vh', '46vh solid #2f3043'], ['23vh', '37vh solid #2f3043'], ['32vh', '28vh solid #2f3043'], ['41vh', '19vh solid #2f3043'], ['50vh', '10vh solid #2f3043'], ['60vh', '.5vh solid #2f3043']];
const QUESTIONS_PAGES = ["chap3-page6", "chap3-page7", "chap4-page5", "chap4-page6", "chap6-page2", "chap6-page3", "chap6-page4"];
let questionsSolved = [false, false, false, false, false, false, false];
let currentPart;
let page;
let infos;
let clicked;
let extra;
let ansOptions;
let currentQues;

window.addEventListener("load", () => {
    currentPart = 0;
    page = 1;
    document.getElementById('back-button').addEventListener("click",lastPart);
    document.getElementById('next-button').addEventListener("click",nextpart);
    infos = document.querySelectorAll('.info-div');
    for (let i=1; i<=3; i++) {
        document.getElementById(`call${i}`).addEventListener("click", openInfo);
    };
    clicked = 0;
    extra = true;
    ansOptions = document.getElementsByClassName("ans-option");
    document.getElementById("makbil-button").addEventListener("click", chap2Manager);
    for (i = 0; i < ansOptions.length; i++) {
        ansOptions[i].addEventListener('click', quesManager)
    };

    increaseOptions = document.getElementsByClassName("expand-size-icon");
    for (i = 0; i < increaseOptions.length; i++) {
        increaseOptions[i].addEventListener('click', increaseSizeImage);
    };
    document.getElementById(`chap-num1`).addEventListener("mouseenter", openChap);
    document.getElementById(`chap-num1`).addEventListener("mouseleave", closeChap);
    document.getElementById(`chap-num1`).addEventListener("click", manageChap);
});

const nextpart = () => {
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="none";
    if (currentPart >= CHAPTERS_PART[page].length - 1 || page === 0) {
        document.getElementById(`chap-num${page}`).style.color="#2f3043";
        page++;
        document.getElementById(`chap-num${page}`).style.color="#396c84";
        document.getElementById(`chap-num${page}`).addEventListener("mouseenter", openChap);
        document.getElementById(`chap-num${page}`).addEventListener("mouseleave", closeChap);
        document.getElementById(`chap-num${page}`).addEventListener("click", manageChap);
        if (page < 7) {
            document.getElementById("invisible-num-div").style.height = `${100 - page * 14.38}%`;
        } else {
            document.getElementById("invisible-num-div").style.height = `0`;
        }
        currentPart = 0;
        document.getElementById("progress").style.height = `${PROGRESS_CHANGE[page-1][0]}`;
        document.getElementById("progress").style.borderBottom = `${PROGRESS_CHANGE[page-1][1]}`;
    } else {
        currentPart++;
    };
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="block";
    if (QUESTIONS_PAGES.includes(CHAPTERS_PART[page][currentPart])) {
        if (questionsSolved[QUESTIONS_PAGES.indexOf(CHAPTERS_PART[page][currentPart])] === false) {
            document.getElementById("next-button").style.display = "none";
        } else {
            document.getElementById("next-button").style.display = "block";
        };
        console.log(QUESTIONS_PAGES.indexOf(CHAPTERS_PART[page][currentPart]))
        console.log(questionsSolved);
    };
    if (CHAPTERS_PART[page][currentPart] === "chap6-fin") {
            document.getElementById("next-button").style.display = "none";
    };
};

const lastPart = () => {
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="none";
    if (currentPart <= 0) {
        document.getElementById(`chap-num${page}`).style.color="#2f3043";
        page--;
        if (page >= 1) {
            document.getElementById("progress").style.height = `${PROGRESS_CHANGE[page-1][0]}`;
            document.getElementById("progress").style.borderBottom = `${PROGRESS_CHANGE[page-1][1]}`;
            document.getElementById(`chap-num${page}`).style.color="#396c84";
        }
        if (page === 0) {
            window.location.href=`page0.html`;
        }
        currentPart = (CHAPTERS_PART[page].length) - 1;
    } else {
        currentPart--;
    };
    
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="block";
    if (CHAPTERS_PART[page][currentPart] !== "chap6-fin") {
        document.getElementById("next-button").style.display = "block";
    };
    if (page === 0 && currentPart === 0) {
        window.location.href=`page0.html`;
    }
};

const openInfo = (event) => {
    for (let i=1; i<=3; i++) {
        document.getElementById(`info${i}`).style.height = "0vh";
        document.getElementById(`down-arrow${i}`).style.rotate = "0deg";
    };
    if (clicked === event.target.id.slice(-1)) {
        clicked = event.target.id.slice(-1);
        document.getElementById(`info${clicked}`).style.height = "0vh";
        document.getElementById(`down-arrow${clicked}`).style.rotate = "0deg";
        document.getElementById(`call${clicked}`).style.backgroundColor = "#f4f6f9";
        clicked = 0;
    } else {
        if (clicked > 0) {
            document.getElementById(`call${clicked}`).style.backgroundColor = "#f4f6f9";
        };
        clicked = event.target.id.slice(-1);
        document.getElementById(`info${clicked}`).style.height = "fit-content";
        document.getElementById(`call${clicked}`).style.backgroundColor = "#c9dde6";
        document.getElementById(`down-arrow${clicked}`).style.rotate = "180deg";
        clicked = event.target.id.slice(-1);
    };
};

const chap2Manager = () => {
    if (extra) {
        document.getElementById("makbil-button").setAttribute("src", "assets/chap2/side-makbil-button.svg");
        document.getElementById("chap2-info1-extra1").setAttribute("src", "assets/chap2/chap2-info1-extra2.svg");
        extra = false;
    } else {
        document.getElementById("makbil-button").setAttribute("src", "assets/chap2/makbil-button.svg");
        document.getElementById("chap2-info1-extra1").setAttribute("src", "assets/chap2/chap2-info1-extra1.svg");
        extra = true;
    };
};

const quesManager = (event) => {
    clickedAns = event.target.id;
    currentQues = clickedAns.split("-", 1);
    currentQues = currentQues[0];
    for (i = 1; i <= 4; i++) {
        document.getElementById(`${currentQues}-ans${i}`).style.backgroundColor = "";
    };
    document.getElementById(clickedAns).style.backgroundColor = "#bfe1f1";
    document.getElementById(`${currentQues}-send-ans`).style.display = "block";
    document.getElementById(`${currentQues}-send-ans`).addEventListener('click', checkAns);
};

const checkAns = () => {
    document.getElementById(`${currentQues}-send-ans`).style.display = "none";
    if (clickedAns === QUES_ANSWERS[currentQues.substr(currentQues.length - 1) - 1]) {
        document.getElementById(clickedAns).style.backgroundColor = "#81ef85";
        document.getElementById(`checked-ans-text-${currentQues}`).innerText = "כל הכבוד! תשובה נכונה!";
    } else {
        document.getElementById(clickedAns).style.backgroundColor = "#ef8192";
        document.getElementById(`checked-ans-text-${currentQues}`).innerText = `טעות, התשובה הנכונה היא: ${document.getElementById(QUES_ANSWERS[currentQues.substr(currentQues.length - 1) - 1]).innerText} `;
    };
    document.getElementById(`checked-ans-text-${currentQues}`).style.opacity = "1";
    document.getElementById(`invisible-div-${currentQues}`).style.display="block";
    document.getElementById("next-button").style.display="block";
    questionsSolved[(currentQues.charAt(currentQues.length - 1))-1] = true;
    console.log(questionsSolved);

};

const increaseSizeImage = (event) => {
    let wantedIncrease = event.target.id;
    wantedIncrease = wantedIncrease.split("-");
    wantedIncrease = `${wantedIncrease[0]}-${wantedIncrease[1]}`;
    document.getElementById("wanted-increase-image").setAttribute('src', `assets/chap${page - 1}/${wantedIncrease}.svg`);
    document.getElementById("wanted-increase-image").style.height = "70vh";
    document.getElementById("increase-image-div").style.display = "flex";
};

const openChap = (event) => {
    document.getElementById(`${event.target.id}-text`).style.width="120%";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="10%";
    document.getElementById(`${event.target.id}-text`).style.padding="1%";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="10%";
    document.getElementById(`${event.target.id}-text`).style.borderTopLeftRadius="1vh";
    document.getElementById(`${event.target.id}-text`).style.borderBottomLeftRadius="1vh";
    document.getElementById("chap-text-boxes").style.width="13%";
};

const closeChap = (event) => {
    document.getElementById(`${event.target.id}-text`).style.width="0";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="0";
    document.getElementById(`${event.target.id}-text`).style.padding="0";
    document.getElementById(`${event.target.id}-text`).style.paddingLeft="0";
    document.getElementById(`${event.target.id}-text`).style.borderTopLeftRadius="0";
    document.getElementById(`${event.target.id}-text`).style.borderBottomLeftRadius="0";
    document.getElementById("chap-text-boxes").style.width="0";
};

const manageChap = (event) => {
    for (let i=1; i<=NUM_OF_CHAPS; i++) {
        document.getElementById(`chap-num${i}`).style.color="#2f3043";
    };
    document.getElementById(event.target.id).style.color="#396c84";
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="none";
    page = event.target.id;
    page = page.charAt(page.length - 1);
    currentPart = 0;
    document.getElementById(CHAPTERS_PART[page][currentPart]).style.display="block";
    document.getElementById("progress").style.height = `${PROGRESS_CHANGE[page-1][0]}`;
    document.getElementById("progress").style.borderBottom = `${PROGRESS_CHANGE[page-1][1]}`;
};