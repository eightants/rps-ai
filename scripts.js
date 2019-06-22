const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const userImg = document.querySelector("#user-img");
const aiImg = document.querySelector("#ai-img");

/* user and ai move history */
var userHist = "";
var aiHist = "";

function selection(userChoice) {
        if (userChoice == "scissors") {
            userImg.src = "./scissors.svg";
            userHist += "s";
        } else if (userChoice == "rock") {
            userImg.src = "./rock.svg";
            userHist += "r";
        } else {
            userImg.src = "./paper.svg";
            userHist += "p";
        }
}

/* AI thinking algorithm */


