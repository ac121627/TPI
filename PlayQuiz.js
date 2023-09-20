// Getting references to HTML elements using querySelector
const startBtn = document.querySelector('.start-btn'); // Start button
const popupInfo = document.querySelector('.popup-info'); // Popup info container
const exitBtn = document.querySelector('.exit-btn'); // Exit button in the popup
const main = document.querySelector('.main'); // Main content container
const continueBtn = document.querySelector('.continue-btn'); // Continue button in the popup
const quizSection = document.querySelector('.quiz-section'); // Quiz section container
const quizBox = document.querySelector('.quiz-box'); // Quiz box container
const resultBox = document.querySelector('.result-box'); // Result box container
const tryAgainBtn = document.querySelector('.tryAgain-btn'); // Try again button in the result box
const goHomeBtn = document.querySelector('.goHome-btn'); // Go home button in the result box
const levelBtns = document.querySelector('.level-buttons');
const easyBtn = document.querySelector('.easy-btn');
const mediumBtn = document.querySelector('.medium-btn');
const hardBtn = document.querySelector('.hard-btn');

let questionsSelected; // Used for the questions and changes depending on the level selected

// Event handler for the start button click
startBtn.onclick = () => {
    // Show popup info and activate the main content
    popupInfo.classList.add('active');
    main.classList.add('active');
}

// Event handler for the exit button click in the popup
exitBtn.onclick = () => {
    // Hide popup info and deactivate the main content
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}

// Each event changes the questionsSelected variable depending on the level chosen
easyBtn.onclick = () => {
    questionsSelected = easyQuestions;
    continueBtn.classList.add('active');
}

mediumBtn.onclick = () => {
    questionsSelected = mediumQuestions;
    continueBtn.classList.add('active');
}

hardBtn.onclick = () => {
    questionsSelected = hardQuestions;
    continueBtn.classList.add('active');
}

// Event handler for the continue button click
continueBtn.onclick = () => {
    // Activate the quiz section and deactivate popup info and main content
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    levelBtns.style = "display: none;" // Hides the level buttons

    // Show the first question and update question counter and header score
    showQuestions(0);
    questionCounter(1);
    headerScore();
}

// Event handler for the try again button click
tryAgainBtn.onclick = () => {
    // Activate the quiz box, deactivate the next button and result box
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    // Reset question count, question number, and user score
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    // Show the first question, update question counter and header score
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

// Event handler for the go home button click
goHomeBtn.onclick = () => {
    // Deactivate the quiz section, next button, and result box
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');

    levelBtns.style = "display: block;" // Shows the level buttons

    // Reset question count, question number, and user score
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;

    // Show the first question, update question counter and header score
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
}

// Initialize variables to keep track of quiz progress
let questionCount = 0; // Index of the current question
let questionNumb = 1; // Number of the current question
let userScore = 0; // User's score

// Reference to the next button
const nextBtn = document.querySelector('.next-btn');

// Event handler for the next button click
nextBtn.onclick = () => {
    if (questionCount < questionsSelected.length - 1) {
        // If there are more questions, move to the next question
        questionCount++;
        showQuestions(questionCount);

        // Update question number and counter
        questionNumb++;
        questionCounter(questionNumb);

        // Deactivate the next button
        nextBtn.classList.remove('active');
    } else {
        // If there are no more questions, show the result box
        showResultBox();
    }
}

// Reference to the option list container
const optionList = document.querySelector('.option-list');

// Function to display questions and options from the questions array
function showQuestions(index) {
    // Select the HTML element where the question text will be displayed
    const questionText = document.querySelector('.question-text');

    // Set the question text with the question number and content from the questions array
    questionText.textContent = `${questionsSelected[index].numb}. ${questionsSelected[index].question}`;

    // Generate HTML for answer options based on the questions array
    let optionTag = `<div class="option"><span>${questionsSelected[index].options[0]}</span></div>
    <div class="option"><span>${questionsSelected[index].options[1]}</span></div>
    <div class="option"><span>${questionsSelected[index].options[2]}</span></div>
    <div class="option"><span>${questionsSelected[index].options[3]}</span></div>`;

    // Inject the generated HTML into the optionList element
    optionList.innerHTML = optionTag;

    // Select all option elements for click event handling
    const option = document.querySelectorAll('.option');

    // Add a click event listener to each option to handle user selection
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

// Function to handle user's option selection
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questionsSelected[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        // If the user's answer is correct, update the UI and user score
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        // If the user's answer is incorrect, update the UI and show the correct answer
        answer.classList.add('incorrect');

        // Auto-select the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent == correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct')
            }
        }
    }
    
    // Disable all options after user selection
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }   

    // Activate the next button
    nextBtn.classList.add('active');
}

// Function to update the question counter in the header
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questionsSelected.length} Questions`;
}

// Function to update the header score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questionsSelected.length}`;
}

// Function to display the result box
function showResultBox() {
    // Deactivate the quiz box and activate the result box
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    // Display the user's score and animate the circular progress bar
    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your score ${userScore} out of ${questionsSelected.length}`;

    // References to the circular progress bar elements
    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');

    // Initialize variables for progress animation
    let progressStartValue = -1; // Initial progress value
    let progressEndValue = (userScore / questionsSelected.length) * 100; // End progress value based on user's score
    let speed = 20; // Speed of the animation

    // Create an interval to animate the progress bar
    let progress = setInterval(() => {
        progressStartValue++; // Increment the progress value

        // Update the displayed progress value and the progress bar background
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        // Check if the animation has reached the end value
        if (progressStartValue == progressEndValue) {
            clearInterval(progress); // Stop the animation interval
        }
    }, speed); // Set the animation speed
}