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
    
    // Reset sound to start if it's already playing
    audio.currentTime = 0; 
    audio.play().catch(e => console.log("Interaction required for audio"));
}

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    const mainGif = document.getElementById('mainGif');
    
    // Play a random sound effect
    playRandomSound();

    // 1. Change GIF (Random on first click, cycle after)
    if (messageIndex === 0) {
        mainGif.src = noGifs[Math.floor(Math.random() * noGifs.length)];
    } else {
        mainGif.src = noGifs[messageIndex % noGifs.length];
    }

    // 2. Update text
    noButton.textContent = messages[messageIndex % messages.length];
    messageIndex++;
    
    // 3. Make Yes button bigger
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.4}px`;
    
    // 4. Move the button ONLY if it has moved less than 2 times
    if (moveCount < 2) {
        moveButton(noButton);
        moveCount++;
    }
}

function moveButton(button) {
    button.style.position = 'fixed';
    // Calculate random coordinates while staying within the viewport
    const x = Math.random() * (window.innerWidth - button.offsetWidth);
    const y = Math.random() * (window.innerHeight - button.offsetHeight);
    
    button.style.left = `${x}px`;
    button.style.top = `${y}px`;
}

document.addEventListener('DOMContentLoaded', () => {
    const noButton = document.querySelector('.no-button');

    // Helper function to trigger the dodge
    const triggerDodge = () => {
        if (moveCount < 2) {
            moveButton(noButton);
            moveCount++;
        }
    };

    // Desktop dodge (hover)
    noButton.addEventListener('mouseover', triggerDodge);

    // Mobile dodge (instant touch)
    noButton.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents "ghost clicks" on mobile
        triggerDodge();
    });
});

function handleYesClick() {
    window.location.href = "yes_page.html";
}
