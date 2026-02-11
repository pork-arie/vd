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
const maxMoves = 2;

function playRandomSound() {
    const sounds = ['sound1', 'sound2', 'sound3'];
    const randomId = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = document.getElementById(randomId);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
    }
}

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const mainGif = document.getElementById('mainGif');

    playRandomSound();

    // 1. Change GIF
    mainGif.src = noGifs[messageIndex % noGifs.length];

    // 2. Update Text
    noButton.textContent = messages[messageIndex % messages.length];
    messageIndex++;

    // 3. Make Yes button bigger (Responsive Cap)
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    // Limit growth slightly so it doesn't break the mobile screen entirely
    if (currentSize < 100) { 
        yesButton.style.fontSize = `${currentSize * 1.3}px`;
    }

    // 4. Move logic
    if (moveCount < maxMoves) {
        moveButton(noButton);
        moveCount++;
    }
}

function moveButton(button) {
    button.style.position = 'fixed';
    
    // Ensure the button is always on top of the growing "Yes" button
    button.style.zIndex = "9999";

    // Calculate safe screen area
    const padding = 15;
    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    // Get random coordinates within visible screen
    const x = Math.random() * (window.innerWidth - buttonWidth - (padding * 2)) + padding;
    const y = Math.random() * (window.innerHeight - buttonHeight - (padding * 2)) + padding;

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.querySelector('.no-button');
    const isDesktop = window.matchMedia("(pointer: fine)").matches;

    // Desktop hover dodge
    if (isDesktop) {
        noButton.addEventListener('mouseover', () => {
            if (moveCount < maxMoves) {
                moveButton(noButton);
                moveCount++;
            }
        });
    }

    // Mobile/Resize adjustment
    window.addEventListener('resize', () => {
        if (moveCount > 0) {
            // Re-position button if screen rotates so it's not lost
            moveButton(noButton);
        }
    });
});

function handleYesClick() {
    window.location.href = "yes_page.html";
}

