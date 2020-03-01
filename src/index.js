const resultMessageSpan = document.createElement(`span`);
const selectionsDiv = document.createElement(`div`);
const computerSelectionSpan = document.createElement(`span`);
const playerSelectionSpan = document.createElement(`span`);
const playerScoreSpan = document.createElement(`span`);
const computerScoreSpan = document.createElement(`span`);

const container = document.querySelector(`.container`);
const gameBtns = document.querySelector(`.game-btns`);
const newGameBtn = document.querySelector(`.new-game-btn`);

newGameBtn.addEventListener(`click`, game);

function game() {
    insertOutputElements();
    let playerScore = 0;
    let computerScore = 0;
    let resultGame = ``;

    toogleButtons();
    gameBtns.childNodes.forEach(btn => btn.addEventListener('click', playRound));
    createOutput(`Игра до 5 очков`, ``, ``, playerScore, computerScore);

    function playRound(e) {
        let playerSelection = ``;
        let computerSelection = ``;
        let result = ``;

        playerSelection = this.textContent.toLowerCase();
        computerSelection = computerPlay();

        result = createResultRound(playerSelection, computerSelection);
        if (result.includes(`выиграли`)) ++playerScore;
        if (result.includes(`проиграли`)) ++computerScore;

        let resultGame = createResultGame(playerScore, computerScore);
        if (resultGame) {
            gameBtns.childNodes.forEach(btn => btn.removeEventListener(`click`, playRound));
            toogleButtons();
            result = resultGame;
        }

        createOutput(result, playerSelection, computerSelection, playerScore, computerScore);
    }
}

function toogleButtons() {
    if (newGameBtn.textContent) {
        newGameBtn.textContent = ``;
        newGameBtn.classList.toggle(`hide`);
    } else {
        newGameBtn.classList.toggle(`hide`);
        setTimeout(() => { 
            newGameBtn.textContent=`Начать игру!`; }, 100);
    };
}

function computerPlay() {
    let randomInteger = getRndInteger(1, 3);
    if (randomInteger === 1) return `камень`;
    else if (randomInteger === 2) return `ножницы`;
    return `бумага`;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createResultRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) return `Ничья!`;
    if (playerSelection === `камень` && computerSelection === `ножницы` || 
            playerSelection === `бумага` && computerSelection === `камень` || 
            playerSelection ===`ножницы` && computerSelection ===`бумага`)
            return `Вы выиграли раунд! ` + createCapitalLetter(playerSelection) + createEnding(computerSelection);
    return `Вы проиграли раунд! ` + createCapitalLetter(computerSelection) + createEnding(playerSelection);
}

function createCapitalLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}

//Выбор окончания слова
function createEnding(str) {
    return (str === `бумага`) ? ` бьют бумагу.` : (` бьёт ` + str + `.`);
}

function createResultGame(playerScore, computerScore) {
    if (playerScore === 5) {
        return `Поздравляю с победой! :)`;
    } else if (computerScore === 5) {
        return `Поражение :(`;
    };
}

function createOutput(result,playerSelection, computerSelection, playerScore, computerScore) {
    resultMessageSpan.textContent = result;
    if(result.includes(`:)`)) resultMessageSpan.classList.add(`win`);
    else if(result.includes(`:(`)) resultMessageSpan.classList.add(`lose`);
    else {
        resultMessageSpan.classList.remove(`win`);
        resultMessageSpan.classList.remove(`lose`);
    }

    playerSelectionSpan.textContent = `Вы: ` + playerSelection;
    computerSelectionSpan.textContent = `Компьютер: ` + computerSelection;
    playerScoreSpan.textContent = `Ваш счет: ` + playerScore;
    computerScoreSpan.textContent = `Счет компьютера: ` + computerScore;
}

function insertOutputElements() {
    resultMessageSpan.classList.add(`result`);
    selectionsDiv.classList.add(`selections`);
    playerSelectionSpan.classList.add(`player-selection`);
    computerSelectionSpan.classList.add(`computer-selection`);
    computerScoreSpan.classList.add(`computer-score`);
    playerScoreSpan.classList.add(`player-score`);

    selectionsDiv.appendChild(playerSelectionSpan);
    selectionsDiv.appendChild(computerSelectionSpan);
    
    container.appendChild(resultMessageSpan);
    container.appendChild(selectionsDiv);
    container.appendChild(computerScoreSpan);
    container.appendChild(playerScoreSpan);
}