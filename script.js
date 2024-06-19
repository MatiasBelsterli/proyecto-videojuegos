import { cardLevels } from './resources/cards/actionCards.js';

const player = {
    health: 50,
    attack: 5,
    defense: 5,
    luck: 15,
    fase: 0,
    fightFase: 0,
    temporaryDefense: 0
};

const estados = {
    inicio: Symbol(),
    fases: Symbol(),
    pelea: Symbol(),
    final: Symbol(),
};

let estado = estados.fases;

const maxFases = 1;

function update() {
    if (estado === estados.fases) {
        updateFases(getRandomCardIndex());
    } else if (estado === estados.pelea) {
        updatePelea();
    } else if (estado === estados.final) {
        updateFinal();
    }
}

function updatePelea() {
    updateStatusBoss();
    fightFinalBoss();
}

function updateFinal() {
    alert('¡Has ganado el juego!');
    resetGame();
}

function animateStoryToFinalBoss() {
    document.querySelector('body').style.backgroundImage = "url('resources/images/Arena.png')";
    const options = document.querySelectorAll('.option');
    options[2].style.display = 'none';
    options[3].style.display = 'none';

    document.getElementById('statusFinalBoss').classList.remove('invisible');
    document.getElementById('finalBossEnemy').classList.remove('invisible');
    document.getElementById('finalPlayer').classList.remove('invisible');
    document.getElementById('story').classList.add('move-up');
    document.getElementById('story').style.top="0px";
    document.getElementById('story').style.transform="translate(-50%, 0)";

    document.getElementById('result').style.top="0px";
    document.getElementById('result').style.transform="translate(-50%, 0)";

    setTimeout(() => {
        document.getElementById('story').classList.remove('move-up');
    }, 2000);
}

function updateStatusBoss() {
    document.getElementById('boss-health').textContent = finalBoss.health;
    document.getElementById('boss-attack').textContent = finalBoss.attack;
    document.getElementById('boss-defense').textContent = finalBoss.defense;
}

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
    puntosAtaque: 0,
};

function fightFinalBoss() {
    let texto = "Te encuentras con el jefe final. ¿Qué haces?";
    if (player.fightFase > 0) texto = "¿Cuál es tu siguiente acción?";
    document.getElementById('story-text').textContent = texto;
    const options = document.querySelectorAll('.option');
    options[0].textContent = "Atacar";
    options[0].dataset.action = 'attack';
    options[1].textContent = "Defender";
    options[1].dataset.action = 'defend';

    document.getElementById('story').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    document.getElementById('next-card').style.display = 'none';
    document.getElementById('puntos-ataque').style.opacity = 1;
    let pAtaque = document.getElementById('puntos-ataque');
    finalBoss.puntosAtaque = getRandomInt(3, 15);
    pAtaque.textContent = finalBoss.puntosAtaque;
    document.querySelectorAll('#options .option').forEach(option => {
        option.addEventListener('click', handleBossFight);
    });
}

function handleOptionClick(event) {
    const healthChange = parseInt(event.target.dataset.health);
    const attackChange = parseInt(event.target.dataset.attack);
    const defenseChange = parseInt(event.target.dataset.defense);
    const resultText = event.target.dataset.result;

    updateStats('health', healthChange);
    updateStats('attack', attackChange);
    updateStats('defense', defenseChange);
    player.fase++;

    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (player.fase >= maxFases) {
        estado = estados.pelea;
        animateStoryToFinalBoss();
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

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function animateResultText() {
    const resultText = document.getElementById('result-text');
    resultText.classList.add('animateFightText');
    setTimeout(() => {
        resultText.classList.remove('animateFightText');
    }, 3000);
}

function handleBossFight(event) {
    const action = event.target.dataset.action;
    document.getElementById('next-card').style.display = 'none';
    player.fightFase++;
    const luckFactor = getLuckFactor(player.luck);

    if (action === 'attack') {
        const attackStrength = Math.ceil(player.attack * (1 + luckFactor));

        if (finalBoss.defense > 0) {
            updateBossStats('defense', -1);
        }

        if (attackStrength - finalBoss.defense > 0) {
            updateBossStats('health', -(attackStrength - finalBoss.defense));
        }

        if (player.defense > 0) {
            updateStats('defense', -1);
        }

        const bossAttackStrength = Math.ceil(finalBoss.puntosAtaque * (1 + luckFactor));

        if (bossAttackStrength - player.defense > 0) {
            const damage = bossAttackStrength - player.defense;
            updateStats('health', -damage);
        }

        document.getElementById('result-text').textContent = "Atacas al jefe final y él te ataca a ti.";
    } else if (action === 'defend') {
        const defenseBoost = Math.ceil(getRandomInt(2, 5) * (1 + luckFactor));
        player.temporaryDefense = defenseBoost;
        updateStats('defense', defenseBoost);

        const bossAttackStrength = Math.ceil(finalBoss.puntosAtaque * (1 + luckFactor));

        if (bossAttackStrength - player.defense > 0) {
            const damage = bossAttackStrength - player.defense;
            updateStats('health', -damage);
        }

        document.getElementById('result-text').textContent = "Te defiendes del ataque del jefe final.";
    }

    animateResultText();
    updateStatus();

    if (player.health <= 0) {
        alert('Has perdido el juego.');
        resetGame();
    } else if (finalBoss.health <= 0) {
        estado = estados.final;
        update();
    } else {
        const options = document.querySelectorAll('.option');
        options[0].style.display = 'none';
        options[1].style.display = 'none';
        document.getElementById('story').style.display = 'none';
        document.getElementById('result').style.display = 'block';
        document.getElementById('next-card').style.display = 'inline-block';
        document.getElementById('puntos-ataque').style.opacity = 1;
    }
}

function resetGame() {
    player.health = 50;
    player.attack = 5;
    player.defense = 5;
    player.luck = 15;
    player.fase = 1;
    player.fightFase = 0;
    player.temporaryDefense = 0;
    finalBoss.health = 10;
    finalBoss.attack = 10;
    finalBoss.defense = 10;
    finalBoss.puntosAtaque = 0;
    estado = estados.fases;
    updateStatus();
    updateStatusBoss();
    update();
}

function getLuckFactor(playerLuck) {
    return Math.random() * (playerLuck / 100);
}

function updateStats(stat, value) {
    if (value === 0) return;

    const statElement = document.getElementById(stat);
    player[stat] += value;
    updateStatus();

    const animClass = value > 0 ? 'stat-increase' : 'stat-decrease';
    statElement.classList.add(animClass);
    setTimeout(() => {
        statElement.classList.remove(animClass);
    }, 1000);
}

function updateBossStats(stat, value) {
    if (value === 0) return;

    const statElement = document.getElementById(`boss-${stat}`);
    finalBoss[stat] += value;
    updateStatusBoss();

    const animClass = value > 0 ? 'stat-increase' : 'stat-decrease';
    statElement.classList.add(animClass);
    setTimeout(() => {
        statElement.classList.remove(animClass);
    }, 1000);
}

document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', (event) => {
        if (estados.fases === estado) {
            handleOptionClick(event);
        }
    })
});

document.getElementById('next-card').addEventListener('click', () => {
    if (estados.pelea === estado && player.temporaryDefense > 0) {
        updateStats('defense', -player.temporaryDefense);
        player.temporaryDefense = 0;
    }

    if (estados.fases === estado) {
        const nextCard = getRandomCardIndex();
        updateFases(nextCard);
    } else if (estados.pelea === estado) {
        const options = document.querySelectorAll('.option');
        options[0].style.display = 'inline-block';
        options[1].style.display = 'inline-block';
        updatePelea();
    }
});

updateStatus();
update();