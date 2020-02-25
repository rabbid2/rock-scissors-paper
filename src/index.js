let playerSelection = ``;
let computerSelection = ``;
let resultGame = ``;
let end = true;
let playerScore = 0;
let computerScore = 0;
let win=false;

function clickButton(form) {
    if (end) {
        clearForm();
        return;
    }
    playerSelection = form.playerInput.value.toLowerCase();
    if (validateForm(playerSelection) || end) game();
    else alert(`Неправильный ответ!`);
}

function clearForm() {
    changeButton(`50px`,`inline-block`);
    document.getElementById('btn').value = `Ответить`;
    resultGame = ``;
    computerScore = 0;
    playerScore = 0;
    end = false;
    createOutput(resultGame);
}

function changeButton(height,display) {
    document.getElementById(`playerInput`).style.display = display;
    document.getElementById(`btn`).style.height = height;
}

function game() {
    computerSelection = computerPlay();
    let resultRound = playRound(playerSelection,computerSelection);
    createOutput(resultRound);
    console.log(resultRound);
    createResultGame();
}

function createResultGame() {
    if (playerScore === 3) {
        end = true;
        win = true;
        resultGame = `Поздравляю с победой!`;
        createOutput(resultGame);
    } else if (computerScore === 3) {
        end = true;
        win = false;
        resultGame = `Поражение :(`;
        createOutput(resultGame);
    };
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) return `Ничья!`
    let isWinVariant = checkWinVariant(playerSelection,computerSelection);
    (isWinVariant) ? ++playerScore : ++computerScore;
    return createResultRoundMessage(isWinVariant);
}

function computerPlay() {
    let randomInteger = getRndInteger(1,3);
    if (randomInteger === 1) return `камень`;
    else if (randomInteger === 2) return `ножницы`;
    return `бумага`;
}

function getRndInteger(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateForm(playerSelection) {
    return (playerSelection === `камень` || playerSelection === `ножницы` || playerSelection === `бумага`);
}

function checkWinVariant(playerSelection,computerSelection) {
    return (playerSelection === `камень` && computerSelection === `ножницы` || 
            playerSelection === `бумага` && computerSelection === `камень` || 
            playerSelection ===`ножницы` && computerSelection ===`бумага`);
}

function createResultRoundMessage(isWinVariant) {
    if (isWinVariant) return `Вы выиграли раунд! ` + createCapitalLetter(playerSelection) + createEnding(computerSelection);
    return `Вы проиграли раунд! ` + createCapitalLetter(computerSelection) + createEnding(playerSelection);
}

function createCapitalLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}

//Выбор окончания слова
function createEnding(str) {
    return (str === `бумага`) ? ` бьют бумагу.` : (` бьёт ` + str + `.`);
}

//Вывод результатов
function createOutput(resultRound){
    document.getElementById(`playerSelection`).textContent = `Вы: ` + playerSelection;
    document.getElementById(`computerSelection`).textContent = `Компьютер: ` + computerSelection;
    document.getElementById(`computerScore`).textContent = `Счет компьютера: ` + computerScore;
    document.getElementById(`playerScore`).textContent = `Ваш счет: ` + playerScore;

    let resultOutput = document.getElementById(`result`);
    resultOutput.textContent = resultRound;

    if (end) {
        resultOutput.textContent = resultGame;
        (win) ? resultOutput.style.color = `teal` : resultOutput.style.color = `crimson`;
        changeButton(`100px`,`none`);
        document.getElementById(`btn`).value = `Начать новую игру!`;
    }
    else resultOutput.style.color = `#1e1e1e`;
}