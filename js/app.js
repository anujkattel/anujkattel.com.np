const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

const words = [
    'javascript', 'coding', 'challenge', 'developer', 'keyboard',
    'function', 'variable', 'array', 'object', 'syntax', 'debug',
    'compile', 'execute', 'loop', 'condition', 'constant','python', 'java', 'csharp', 'ruby', 'php', 'swift', 'typescript', 
    'go', 'kotlin', 'rust', 'perl', 'scala', 'r', 'matlab','git', 'docker', 'jenkins', 'vscode', 'sublime', 'webstorm', 
    'postman', 'swagger', 'webpack', 'babel', 'eslint', 'prettier', 
    'vagrant', 'ansible', 'puppet','stack', 'queue', 'linkedlist', 'tree', 'graph', 'hashmap', 
    'set', 'heap', 'trie', 'deque', 'priorityqueue', 'arraylist'
];

let time = 60;
let score = 0;
let gameInterval;
let wordsArray = [];
const typingInput = document.getElementById('typingInput');
const restartButton = document.getElementById('restartButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScore = document.getElementById('finalScore');

class Word {
    constructor(word, x, y, speed) {
        this.word = word;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }

    draw() {
        ctx.fillStyle = 'white';
        ctx.font = '20px Arial';
        ctx.fillText(this.word, this.x, this.y);
    }

    update() {
        this.y += this.speed;
    }
}

function init() {
    gameInterval = setInterval(gameLoop, 1000 / 60);
    setInterval(addWord, 2000);
    setInterval(countdown, 1000);
    typingInput.addEventListener('input', checkInput);
    gameOverScreen.style.display = 'none'; // Hide the game over screen at the start
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    wordsArray.forEach((word, index) => {
        word.update();
        word.draw();
        if (word.y > canvas.height) {
            wordsArray.splice(index, 1);
            endGame();
        }
    });
}

function addWord() {
    const word = words[Math.floor(Math.random() * words.length)];
    const x = Math.random() * (canvas.width - 100);
    const y = -20;
    const speed = Math.random() * 1 + 0.5; // Adjusted speed for slower falling words
    wordsArray.push(new Word(word, x, y, speed));
}

function checkInput() {
    const input = typingInput.value.trim();
    wordsArray.forEach((word, index) => {
        if (input === word.word) {
            score++;
            document.getElementById('score').textContent = `Score: ${score}`;
            wordsArray.splice(index, 1);
            typingInput.value = '';
        }
    });
}

function countdown() {
    if (time > 0) {
        time--;
        document.getElementById('timer').textContent = `Time left: ${time}s`;
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(gameInterval);
    typingInput.removeEventListener('input', checkInput);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = '50px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 150, canvas.height / 2);
    finalScore.textContent = `Final Score: ${score}`;
    gameOverScreen.style.display = 'block'; // Show the game over screen
}

function restartGame() {
    time = 60;
    score = 0;
    wordsArray = [];
    document.getElementById('score').textContent = `Score: ${score}`;
    document.getElementById('timer').textContent = `Time left: ${time}s`;
    gameOverScreen.style.display = 'none'; // Hide the game over screen
    typingInput.value = '';
    typingInput.focus();
    init();
}

init();
