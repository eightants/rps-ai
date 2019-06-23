/* JS nav scrollto */
        var learnMore = document.querySelector("#think").offsetTop;
        var lmLink = document.querySelector("#learn-more-btn");
        lmLink.addEventListener("click", function(event) {
            event.preventDefault();
            window.scrollTo(0, learnMore);
        });

/* important elements */
const rock = document.querySelector("#rock");
const paper = document.querySelector("#paper");
const scissors = document.querySelector("#scissors");
const userImg = document.querySelector("#user-img");
const aiImg = document.querySelector("#ai-img");
/*scores*/
const aiScrElem = document.querySelector("#ai-score");
const userScrElem = document.querySelector("#user-score");
const tieScrElem = document.querySelector("#tie-score");

/* user and ai move history */
var userHist = "";
var aiHist = "";
var userScore = 0;
var aiScore = 0;
var tieScore = 0;

/* main function that takes userChoice and updates images and receives AI response */
function selection(userChoice) {
        var strUserChoice = ""
        /* ai predicts next move */
        var aiChoice = AiThink(userHist);
        /* updates user-side image */
        if (userChoice == "scissors") {
            userImg.src = "./scissors.svg";
            strUserChoice = "s";
        } else if (userChoice == "rock") {
            userImg.src = "./rock.svg";
            strUserChoice = "r";
        } else {
            userImg.src = "./paper.svg";
            strUserChoice = "p";
        }
        /* update ai image */
        if (aiChoice == "s") {
            aiImg.src = "./scissors.svg";
        } else if (aiChoice == "r") {
            aiImg.src = "./rock.svg";
        } else {
            aiImg.src = "./paper.svg";
        }
        /* updates score and text field on scoreboard */
        updateScore(strUserChoice, aiChoice);
        tieScrElem.innerHTML = tieScore;
        userScrElem.innerHTML = userScore;
        aiScrElem.innerHTML = aiScore;
        /* adds user move to history */
        userHist += strUserChoice
        console.log(userHist);
}

/* updates scoreboard */
function updateScore(userChoice, aiChoice) {
    if (userChoice == aiChoice) {
        tieScore += 1;
    }
    else if ((userChoice == "r" && aiChoice == "s") || (userChoice == "s" && aiChoice == "p") || (userChoice == "p" && aiChoice == "r")) {
        userScore += 1;
    } else {
        aiScore += 1;
    }
}

/* function to find all previous instances of a move pattern, then looking at the next potential move */
function allIndexOf(str, toSearch) {
    var indices = [];
    for(var pos = str.indexOf(toSearch); pos !== -1; pos = str.indexOf(toSearch, pos + 1)) {
        indices.push(pos + toSearch.length); /* next potential move */
    }
    return indices;
}

/* function to find all potential next moves and calculate probability */
/* takes in array of potential next moves, user move history, number of significant occurances */
function probMove(nextMoveIndexes, userHist, signif) {
    var occur = nextMoveIndexes.length;
    var nextMove = {
        pRock: 0, 
        pScissors: 0, 
        pPaper: 0
    };
    for (var i = 0; i < occur; i++) {
        if (occur < signif * 2) {
            var mWeight = 100 * 1.0 / occur;
            /* weight assignment code block */
            if (userHist[nextMoveIndexes[i]] == "r") {
                nextMove.pRock += mWeight;
            } else if (userHist[nextMoveIndexes[i]] == "s") {
                nextMove.pScissors += mWeight;
            } else {
                nextMove.pPaper += mWeight;
            }
        } else {
            /* if more than significant occurances arg, will count the nonsignificant occurances as only half of the weight total */
            if (i < occur - signif) {
                var mWeight = 50 * 1.0 / (occur - signif);
                    /* weight assignment code block */
                    if (userHist[nextMoveIndexes[i]] == "r") {
                        nextMove.pRock += mWeight;
                    } else if (userHist[nextMoveIndexes[i]] == "s") {
                        nextMove.pScissors += mWeight;
                    } else {
                        nextMove.pPaper += mWeight;
                    }
            
            } else {
                var mWeight = 50 * 1.0 / signif;
                    /* weight assignment code block */
                    if (userHist[nextMoveIndexes[i]] == "r") {
                        nextMove.pRock += mWeight;
                    } else if (userHist[nextMoveIndexes[i]] == "s") {
                        nextMove.pScissors += mWeight;
                    } else {
                        nextMove.pPaper += mWeight;
                    }
            }
        }
    }
    return nextMove;
}

/* function for random number */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/* the brain AI thinking algorithm */
function AiThink(userHist) {
    const round = userHist.length;
    /* amount of weight given to analysis of two past moves and previous move */
    var twoWeight = 100;
    var oneWeight = 0;

    if (round < 3) {
        console.log("learning...");
        var randChoice = getRandomInt(3);
        console.log("random", randChoice);
        if (randChoice == 2) {
            return "r";
        } else if (randChoice == 1) {
            return "s";
        }
        else {
            return "p";
        }
    } else {
        const twoHist = userHist.slice(round - 2, round);
        const popHist= userHist.slice(0, round - 1);
        
        /* predictions of next move from the past two moves */
        var twoNextMove = allIndexOf(popHist, twoHist);
        console.log(twoNextMove);
        /* gets nextMove object */
        twoUserMove = probMove(twoNextMove, userHist, 5);
        console.log("paper", twoUserMove.pPaper);
        console.log("rock", twoUserMove.pRock);
        console.log("scissors", twoUserMove.pScissors);
        /* calculates AI next move */
        if (twoUserMove.pRock >= twoUserMove.pPaper && twoUserMove.pRock > twoUserMove.pScissors) {
            return "p";
        } else if (twoUserMove.pScissors > twoUserMove.pPaper && twoUserMove.pScissors >= twoUserMove.pRock) {
            return "r";
        } else if (twoUserMove.pPaper >= twoUserMove.pScissors && twoUserMove.pPaper > twoUserMove.pRock) {
            return "s";
        } else {
            var randChoice = getRandomInt(3);
            console.log("random", randChoice);
            if (randChoice == 2) {
                return "r";
            } else if (randChoice == 1) {
                return "s";
            }
            else {
                return "p";
            }
        }
    }

}

