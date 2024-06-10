import { cardLevels } from './resources/cards/actionCards.js';

const player = {
    health: 5,
    attack: 5,
    defense: 5,
    fase: 1,
};

const estados = {
    inicio: Symbol(),
    fases: Symbol(),
    pelea: Symbol(),
    final: Symbol(),
};

let estado = estados.fases;

const maxFases = 3;

function updateStatus() {
    document.getElementById('health').textContent = player.health;
    document.getElementById('attack').textContent = player.attack;
    document.getElementById('defense').textContent = player.defense;
    if (player.fase < maxFases) {
        document.getElementById('fase').textContent = `Fase: ${player.fase} / ${maxFases}`;
    } else {
        document.getElementById('fase').textContent = `Final Boss`;
    }
}

function updateFases(cardIndex) {
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

const finalBoss = {
    health: 10,
    attack: 10,
    defense: 10,
};

function fightFinalBoss() {
    document.querySelector('body').style.backgroundImage = "url('images/boss.webp')";
    document.getElementById('story-text').textContent = "Te encuentras con el jefe final. ¿Qué haces?";
    const options = document.querySelectorAll('.option');
    options[0].textContent = "Atacar";
    options[0].dataset.action = 'attack';
    options[1].textContent = "Defender";
    options[1].dataset.action = 'defend';
    options[2].style.display = 'none';
    options[3].style.display = 'none';
    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('next-card').style.display = 'none';

    document.querySelectorAll('#options .option').forEach(option => {
        option.style.display = 'inline-block';
        option.addEventListener('click', handleBossFight);
    });
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
        resetGame();
    } else if (player.fase >= maxFases) {
        estado = estados.pelea;
        update();
    } else {
        document.getElementById('result-text').textContent = resultText;
        document.querySelectorAll('#options .option').forEach(option => {
            option.style.display = 'none';
        });
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
    }
}

function handleBossFight(event) {
    const action = event.target.dataset.action;

    if (action === 'attack') {
        finalBoss.health -= player.attack;
        player.health -= finalBoss.attack;
        document.getElementById('result-text').textContent = "Atacas al jefe final y él te ataca a ti.";
    } else if (action === 'defend') {
        const damage = Math.max(0, finalBoss.attack - player.defense);
        player.health -= damage;
        document.getElementById('result-text').textContent = "Te defiendes del ataque del jefe final.";
    }

    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (finalBoss.health <= 0) {
        estado = estados.final;
        update();
    } else {
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
    }
}

function resetGame() {
    player.health = 5;
    player.attack = 5;
    player.defense = 5;
    player.fase = 1;
    estado = estados.fases;
    updateStatus();
    update();
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', handleOptionClick);
});

document.getElementById('next-card').addEventListener('click', () => {
    const nextCard = getRandomCardIndex();
    updateFases(nextCard);
});

updateStatus();
update();