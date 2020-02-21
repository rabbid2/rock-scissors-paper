let playerSelection = ``;
let computerSelection = ``;
let resultGame = ``;
let end = true;
let playerScore = 0;
let computerScore = 0;

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
        resultGame = `Поздравляю с победой!`;
        createOutput(resultGame);
    } else if (computerScore === 3) {
        end = true;
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

function generateOutputCode(param) {
    return "let " + param + "Output = document.getElementById('" + param + "');" + param;
}

function createOutput(resultRound){
    eval(generateOutputCode(`playerSelection`) + `Output.textContent = 'Вы: ' + ` + `playerSelection;`);
    eval(generateOutputCode(`computerSelection`) + `Output.textContent = 'Компьютер: ' + ` + `computerSelection;`);
    eval(generateOutputCode(`computerScore`) + `Output.textContent = 'Счет компьютера: ' + ` + `computerScore;`);
    eval(generateOutputCode(`playerScore`) + `Output.textContent = 'Ваш счет: ' + ` + `playerScore;`);
    let resultOutput = document.getElementById(`resultRound`);
    resultOutput.textContent = resultRound;
    if (end) {
        let result = (computerScore < 3) ? `Поздравляю с победой!` : `Поражение :(`;
        resultOutput.textContent = result;
        changeButton(`100px`,`none`);
        document.getElementById(`btn`).value = `Начать новую игру!`;
    }
}