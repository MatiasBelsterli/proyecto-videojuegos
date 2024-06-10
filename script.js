import { cardLevels } from './resources/cards/actionCards.js';

const player = {
    health: 5,
    attack: 5,
    defense: 5,
    fase: 0,
};

const maxFases = 15;

function updateStatus() {
    document.getElementById('health').textContent = player.health;
    document.getElementById('attack').textContent = player.attack;
    document.getElementById('defense').textContent = player.defense;
}

function displayCard(cardIndex) {
    const card = cardLevels[cardIndex];
    document.getElementById('story-text').textContent = card.text;
    const options = document.querySelectorAll('.option');
    card.options.forEach((option, index) => {
        options[index].textContent = option.text;
        options[index].dataset.health = option.health;
        options[index].dataset.attack = option.attack;
        options[index].dataset.defense = option.defense;
        options[index].dataset.result = option.result;
    });
    document.querySelectorAll('#options .option').forEach(option => {
        option.style.display = 'inline-block';
    });
    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('next-card').style.display = 'none';

}

function getRandomCardIndex() {
    return Math.floor(Math.random() * cardLevels.length);
}

const fightFinalBoss = () => {
    const finalBoss = {
        health: 10,
        attack: 10,
        defense: 10,
    };
}

function handleOptionClick(event) {
    const healthChange = parseInt(event.target.dataset.health);
    const attackChange = parseInt(event.target.dataset.attack);
    const defenseChange = parseInt(event.target.dataset.defense);
    const resultText = event.target.dataset.result;

    player.health += healthChange;
    player.attack += attackChange;
    player.defense += defenseChange;
    player.fase++;

    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        player.health = 5;
        player.attack = 5;
        player.defense = 5;
        updateStatus();
    }

    if (player.fase >= maxFases) {
        fightFinalBoss();
    }

    document.getElementById('result-text').textContent = resultText;
    document.querySelectorAll('#options .option').forEach(option => {
        option.style.display = 'none';
    });
    document.getElementById('story').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('next-card').style.display = 'inline-block';
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', handleOptionClick);
});

document.getElementById('next-card').addEventListener('click', () => {
    const nextCard = getRandomCardIndex();
    displayCard(nextCard);
});

updateStatus();
displayCard(getRandomCardIndex());