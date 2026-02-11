const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
];

const noGifs = [
    "cat-walid.gif",
    "duongcam1621-cat.gif",
    "shocked-cat.gif",
    "shocked-shocked-cat.gif",
    "ami-fat-cat-what.gif",
    "cat-meme.gif"
];

let messageIndex = 0;
let moveCount = 0;

function playRandomSound() {
    const sounds = ['sound1', 'sound2', 'sound3'];
    const randomId = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = document.getElementById(randomId);
    
    audio.currentTime = 0; 
    audio.play().catch(e => console.log("Interaction required for audio"));
}

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const mainGif = document.getElementById('mainGif');
    
    playRandomSound();

    if (messageIndex === 0) {
        mainGif.src = noGifs[Math.floor(Math.random() * noGifs.length)];
    } else {
        mainGif.src = noGifs[messageIndex % noGifs.length];
    }

    noButton.textContent = messages[messageIndex % messages.length];
    messageIndex++;
    
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.4}px`;
    
    // On mobile, the button only moves AFTER it is clicked (via this function)
    if (moveCount < 2) {
        moveButton(noButton);
        moveCount++;
    }
}

function moveButton(button) {
    button.style.position = 'fixed';
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.querySelector('.no-button');

    // Desktop only dodge logic
    // We check if the device has a mouse (hover capability)
    const isDesktop = window.matchMedia("(pointer: fine)").matches;

    if (isDesktop) {
        noButton.addEventListener('mouseover', () => {
            if (moveCount < 2) {
                moveButton(noButton);
                moveCount++;
            }
        });
    }
    
    // Note: 'touchstart' is removed so it doesn't dodge 
    // before the click registers on mobile.
});

function handleYesClick() {
    window.location.href = "yes_page.html";
}
