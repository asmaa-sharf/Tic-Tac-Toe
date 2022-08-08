let selectitem = document.querySelector(".select-item"),
selectBtnX = selectitem.querySelector(".options .playerX"),
selectBtnO = selectitem.querySelector(".options .playerO"),
playBoard = document.querySelector(".play-board"),
players = document.querySelector(".players"),
allitem = document.querySelectorAll("section span"),
resultitem = document.querySelector(".result-item"),
wonText = resultitem.querySelector(".won-text"),
replayBtn = resultitem.querySelector("button");

window.onload = ()=>{ 
    for (let i = 0; i < allitem.length; i++) { 
       allitem[i].setAttribute("onclick", "clickeditem(this)");
    }
}

selectBtnX.onclick = ()=>{
    selectitem.classList.add("hide"); 
    playBoard.classList.add("show"); 
}

selectBtnO.onclick = ()=>{ 
    selectitem.classList.add("hide"); 
    playBoard.classList.add("show"); 
    players.setAttribute("class", "players active player"); 
}

let playerXIcon = "fas fa-times"; 
let playerOIcon = "far fa-circle"; 
let playerSign = "X"; 
let runBot = true; 


function clickeditem(element){
    if(players.classList.contains("player")){
        playerSign = "O"; 
        element.innerHTML = `<i class="${playerOIcon}"></i>`; 
        players.classList.remove("active"); 
        element.setAttribute("id", playerSign); 
    }else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; 
        element.setAttribute("id", playerSign); 
        players.classList.add("active"); 
    }
    selectWinner(); 
    element.style.pointerEvents = "none"; 
    playBoard.style.pointerEvents = "none"; 
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed(); 
    setTimeout(()=>{
        bot(runBot); 
    }, randomTimeDelay); 
}


function bot(){
    let array = []; 
    if(runBot){ 
        playerSign = "O"; 
        for (let i = 0; i < allitem.length; i++) {
            if(allitem[i].childElementCount == 0){ 
                array.push(i); 
            }
        }
        let randomitem = array[Math.floor(Math.random() * array.length)]; 
        if(array.length > 0){ 
            if(players.classList.contains("player")){ 
                playerSign = "X"; 
                allitem[randomitem].innerHTML = `<i class="${playerXIcon}"></i>`; 
                allitem[randomitem].setAttribute("id", playerSign); 
                players.classList.add("active"); 
            }else{
                allitem[randomitem].innerHTML = `<i class="${playerOIcon}"></i>`; 
                players.classList.remove("active"); 
                allitem[randomitem].setAttribute("id", playerSign); 
            }
            selectWinner(); 
        }
        allitem[randomitem].style.pointerEvents = "none"; 
        playBoard.style.pointerEvents = "auto"; 
        playerSign = "X"; 
    }
}

function getIdVal(classname){
    return document.querySelector(".item" + classname).id; 
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}
function selectWinner(){ 
    if(checkIdSign(1,2,3,playerSign)||
     checkIdSign(4,5,6, playerSign) || 
     checkIdSign(7,8,9, playerSign) || 
     checkIdSign(1,4,7, playerSign) || 
     checkIdSign(2,5,8, playerSign) || 
     checkIdSign(3,6,9, playerSign) ||
      checkIdSign(1,5,9, playerSign)||
       checkIdSign(3,5,7, playerSign)){
        runBot = false; 
        bot(runBot); 
        setTimeout(()=>{ 
            resultitem.classList.add("show");
            playBoard.classList.remove("show");
        }, 700); 
        wonText.innerHTML = `<p>${playerSign}</p>'s Won`; 
    }else{ 
        if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
            runBot = false; 
            bot(runBot); 
            setTimeout(()=>{ 
                resultitem.classList.add("show");
                playBoard.classList.remove("show");
            }, 700); 
            wonText.textContent = "Do it again?"; 
        }
    }
}

replayBtn.onclick = ()=>{
    window.location.reload(); 
}
