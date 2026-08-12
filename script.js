/* =========================================================
   ELEMENTS
========================================================= */

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const finalScreen = document.getElementById("final-screen");
const letterScreen = document.getElementById("letter-screen");

const backgroundMusic = document.getElementById("background-music");

const startButton = document.getElementById("start-button");

const foundCount = document.getElementById("found-count");

const gameBoard = document.getElementById("game-board");

const memoryPopup = document.getElementById("memory-popup");
const memoryImage = document.getElementById("memory-image");
const memoryText = document.getElementById("memory-text");

const continueButton =
    document.getElementById("continue-button");


/* =========================================================
   GAME VARIABLES
========================================================= */

let matchedPairs = 0;

let firstCard = null;

let secondCard = null;

let lockBoard = false;


/* =========================================================
   INITIAL SCREEN STATE
========================================================= */

gameScreen.style.display = "none";

finalScreen.style.display = "none";

letterScreen.style.display = "none";


/* =========================================================
   START BUTTON
========================================================= */

startButton.addEventListener("click", () => {

    startScreen.style.display = "none";

    gameScreen.style.display = "flex";

    backgroundMusic.volume = 0.25;

    backgroundMusic.play().catch(() => {
        console.log("Music playback was blocked.");
    });

});


/* =========================================================
   CARD VALUES
========================================================= */

const cardValues = [

    "images/photo1.jpg",
    "images/photo1.jpg",

    "images/photo2.jpg",
    "images/photo2.jpg",

    "images/photo3.jpg",
    "images/photo3.jpg",

    "images/photo4.jpg",
    "images/photo4.jpg"

];


/* =========================================================
   MEMORY TEXTS
========================================================= */

const memories = {

    "images/photo1.jpg": {
        text: "One of the memories I'll always keep."
    },

    "images/photo2.jpg": {
        text: "A little moment that made this year special."
    },

    "images/photo3.jpg": {
        text: "Some moments are simply worth remembering."
    },

    "images/photo4.jpg": {
        text: "Thank you for being part of this journey."
    }

};


/* =========================================================
   SHUFFLE CARDS
========================================================= */

cardValues.sort(() => Math.random() - 0.5);


/* =========================================================
   CREATE CARDS
========================================================= */

cardValues.forEach((value) => {

    const card = document.createElement("div");

    card.classList.add("card");

    card.dataset.value = value;


    /* FRONT */

    const front = document.createElement("div");

    front.classList.add("card-front");

    front.textContent = "?";


    /* BACK */

    const back = document.createElement("div");

    back.classList.add("card-back");


    /* IMAGE */

    const image = document.createElement("img");

    image.src = value;

    image.alt = "Memory";


    back.appendChild(image);


    card.appendChild(front);

    card.appendChild(back);


    gameBoard.appendChild(card);

});


/* =========================================================
   GET ALL CARDS
========================================================= */

const allCards =
    document.querySelectorAll(".card");


/* =========================================================
   CARD CLICK
========================================================= */

allCards.forEach((card) => {

    card.addEventListener("click", () => {

        /* Board locked? */

        if (lockBoard) {
            return;
        }


        /* Same card clicked twice? */

        if (card === firstCard) {
            return;
        }


        /* Already matched? */

        if (card.classList.contains("matched")) {
            return;
        }


        /* Flip card */

        card.classList.add("flipped");


        /* First card */

        if (firstCard === null) {

            firstCard = card;

            return;
        }


        /* Second card */

        secondCard = card;


        /* Check pair */

        checkMatch();

    });

});


/* =========================================================
   CHECK MATCH
========================================================= */

function checkMatch() {

    lockBoard = true;


    const isMatch =
        firstCard.dataset.value ===
        secondCard.dataset.value;


    /* =====================================================
       MATCH
    ===================================================== */

    if (isMatch) {

        matchedPairs++;


        foundCount.textContent =
            matchedPairs;


        firstCard.classList.add("matched");

        secondCard.classList.add("matched");


        /* Show unlocked memory */

        showMemory(
            firstCard.dataset.value
        );


        resetCards();


        return;
    }


    /* =====================================================
       NOT A MATCH
    ===================================================== */

    setTimeout(() => {

        firstCard.classList.remove("flipped");

        secondCard.classList.remove("flipped");


        resetCards();

    }, 900);

}


/* =========================================================
   SHOW MEMORY POPUP
========================================================= */

function showMemory(imagePath) {

    memoryImage.src = imagePath;


    if (memories[imagePath]) {

        memoryText.textContent =
            memories[imagePath].text;

    }


    memoryPopup.style.display = "flex";

}


/* =========================================================
   CONTINUE BUTTON
========================================================= */

continueButton.addEventListener("click", () => {

    memoryPopup.style.display = "none";


    /*
       Əgər bütün 4 memory tapılıbsa,
       artıq final screen-ə keçirik.
    */

    if (matchedPairs === 4) {

        setTimeout(() => {

            showFinalScreen();

        }, 400);

    }

});


/* =========================================================
   RESET CARD VARIABLES
========================================================= */

function resetCards() {

    firstCard = null;

    secondCard = null;

    lockBoard = false;

}


/* =========================================================
   FINAL SCREEN
========================================================= */

function showFinalScreen() {

    /*
       Game screen-i yavaş-yavaş gizlət
    */

    gameScreen.style.opacity = "0";


    setTimeout(() => {

        gameScreen.style.display = "none";


        /*
           Final screen-i göstər
        */

        finalScreen.style.display = "flex";

        finalScreen.classList.add("show");


        /*
           Bir neçə saniyə final screen qalır
        */

        setTimeout(() => {

            goToLetter();

        }, 4500);


    }, 1000);

}


/* =========================================================
   GO TO LETTER
========================================================= */

function goToLetter() {

    /*
       Final screen-i fade out et
    */

    finalScreen.classList.remove("show");


    setTimeout(() => {

        finalScreen.style.display = "none";


        /*
           Letter screen-i göstər
        */

        letterScreen.style.display = "flex";


        /*
           Fade in
        */

        setTimeout(() => {

            letterScreen.classList.add("show");


            /*
               Məktubu başlat
            */

            revealLetter();

        }, 50);


    }, 1200);

}


/* =========================================================
   REVEAL LETTER
========================================================= */

function revealLetter() {

    const paragraphs =
        document.querySelectorAll(
            "#letter-screen .letter-content p"
        );


    const ending =
        document.querySelector(
            "#letter-screen .letter-ending"
        );


    /*
       Əvvəl hamısını gizlədirik
    */

    paragraphs.forEach((paragraph) => {

        paragraph.classList.remove(
            "show-letter"
        );

    });


    if (ending) {

        ending.classList.remove(
            "show-letter"
        );

    }


    /*
       Abzasları bir-bir göstər
    */

    paragraphs.forEach((paragraph, index) => {

        setTimeout(() => {

            paragraph.classList.add(
                "show-letter"
            );

        }, index * 1200);

    });


    /*
       Bütün abzaslar bitəndən sonra
       imza gəlir.
    */

    if (ending) {

        const endingDelay =
            paragraphs.length * 1200 + 1000;


        setTimeout(() => {

            ending.classList.add(
                "show-letter"
            );

        }, endingDelay);

    }

}