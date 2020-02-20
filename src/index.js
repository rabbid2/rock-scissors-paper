function computerPlay(){
    let randomInteger = getRndInteger(1,3);
    console.log(randomInteger);
    if (randomInteger === 1) return `камень`;
    else if (randomInteger === 2) return `ножницы`;
    return `бумага`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function playRound(playerSelection, computerSelection){
    if (playerSelection === computerSelection) return `Ничья!`;
    let isWinVariant = checkWinVariant(playerSelection,computerSelection);
    return (isWinVariant) ? `Вы выиграли! ` + makeCapitalLetter(playerSelection) + makeEnding(computerSelection)
                        : `Вы проиграли! ` + makeCapitalLetter(computerSelection) + makeEnding(playerSelection);
}

function checkWinVariant(playerSelection,computerSelection){
    return (playerSelection === `камень` && computerSelection === `ножницы` || 
    playerSelection === `бумага` && computerSelection === `камень` || 
    playerSelection ===`ножницы` && computerSelection ===`бумага`);
}

function makeCapitalLetter(str){
    return str[0].toUpperCase() + str.slice(1);
}

function makeEnding(str){
    return (str===`бумага`) ? ` бьют бумагу.`: (` бьет `+str+`.`);
}

function validateForm(playerSelection){
    return (playerSelection === `камень` || playerSelection === `ножницы` || playerSelection === `бумага`);
}

let button=document.querySelector('button');
button.onclick=function(){
    let playerSelection = prompt('Камень, ножницы, бумага?').toLowerCase();
    let result = `Неправильный ответ!`;
    if (validateForm(playerSelection)){
        let computerSelection = computerPlay();
        result = playRound(playerSelection,computerSelection);
        console.log(playerSelection,computerSelection,result);
    }
    alert(result);
}