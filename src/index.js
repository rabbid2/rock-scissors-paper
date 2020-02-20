let playerSelection = ``;
let computerSelection = computerPlay();
let round = 0;
let score = 0;
let isEnd = true;

function clickButton(form){
    playerSelection = form.playerInput.value.toLowerCase();
    game();
}

function game(){
    if (isEnd) {
        document.getElementById('btn').value = `Ответить!`;
        round = 0;
        score = 0;
        isEnd = false;
        return;
    }
    if (validateForm(playerSelection)){
        computerSelection = computerPlay();
        let result = playRound(playerSelection,computerSelection);
        console.log(result);
        createOutput(result);
        console.log(round);
    } else alert(`Неправильный ответ!`);
    if(round === 5){
        isEnd = true;
        createOutput('');
    }
}

function playRound(playerSelection, computerSelection){
    if (playerSelection === computerSelection) return `Ничья!`;
    let isWinVariant = checkWinVariant(playerSelection,computerSelection);
    if (isWinVariant){ 
        ++score;
        ++round;
        return `Вы выиграли раунд! ` + createCapitalLetter(playerSelection) + createEnding(computerSelection);
    }
    else{
        ++round;
        return `Вы проиграли раунд! ` + createCapitalLetter(computerSelection) + createEnding(playerSelection);
    }
}

function computerPlay(){
    let randomInteger = getRndInteger(1,3);
    if (randomInteger === 1) return `камень`;
    else if (randomInteger === 2) return `ножницы`;
    return `бумага`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateForm(playerSelection){
    return (playerSelection === `камень` || playerSelection === `ножницы` || playerSelection === `бумага`);
}

function checkWinVariant(playerSelection,computerSelection){
    return (playerSelection === `камень` && computerSelection === `ножницы` || 
            playerSelection === `бумага` && computerSelection === `камень` || 
            playerSelection ===`ножницы` && computerSelection ===`бумага`);
}

function createCapitalLetter(str){
    return str[0].toUpperCase() + str.slice(1);
}

function createEnding(str){
    return (str === `бумага`) ? ` бьют бумагу.` : (` бьет ` + str + `.`);
}

function createOutputCode(param){
    return "let " + param + "Output = document.getElementById('" + param + "');" + param;
}

function createOutput(resultRound){
    eval(createOutputCode('playerSelection') + "Output.textContent = 'Вы: ' + " + 'playerSelection;');
    eval(createOutputCode('computerSelection') + "Output.textContent = 'Компьютер: ' + " + 'computerSelection;');
    eval(createOutputCode('round') + "Output.textContent = 'Раунд: ' + " + 'round;');
    eval(createOutputCode('score') + "Output.textContent = 'Очки: ' + " + 'score;');
    let resultOutput = document.getElementById('resultRound');
    resultOutput.textContent = resultRound;
    if (isEnd){
        let result = ((round-score) < 3) ? 'Поздравляю с победой!' : 'Поражение :(';
        resultOutput.textContent = result;
        document.getElementById('btn').value = "Начать новую игру!";
    }
}