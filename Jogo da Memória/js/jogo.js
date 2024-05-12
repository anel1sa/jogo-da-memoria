const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const fotos = [
    'foto1',
    'foto3',
    'foto4',
    'foto5',
    'foto6',
    'foto8',
    'foto10',
    'foto11',
    'foto12',
    'foto14'
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disabledCards = document.querySelectorAll('.disabled-card');
    if(disabledCards.length == 20){
        clearInterval(this.loop);
        alert(`Parabéns ${spanPlayer.innerHTML}!`);
    }
}

const checkCards = () => {
    const firstFoto = firstCard.getAttribute('data-foto');
    const secondFoto = secondCard.getAttribute('data-foto');

    if(firstFoto == secondFoto){
        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');
        
        firstCard = '';
        secondCard = '';

        checkEndGame();

    }
    else{
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        }, 500);

    }

}

const revealCard = ({target}) => {

    if(target.parentNode.className.includes('reveal-card')){
        return;
    }

    if(firstCard == ''){
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }
    else if(secondCard == ''){

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

    target.parentNode.classList.add('reveal-card');    
}


const createCard = (foto) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../imagens/${foto}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-foto', foto)

    return card;
    
}

const loadGame = () =>{

    const duplicateFotos = [ ...fotos, ...fotos];

    const shuffleArray = duplicateFotos.sort( () => Math.random() - 0.5 );


    shuffleArray.forEach((foto) => {

        const card = createCard(foto);
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {
        
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;

    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}
