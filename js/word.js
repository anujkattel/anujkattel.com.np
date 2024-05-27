// word.js
document.addEventListener('DOMContentLoaded', () => {
    const levels = {
        1: "The code with bard is one of the popular ways to learn coding",
        2: "A journey of a thousand miles begins with a single step.",
        3: "To be or not to be, that is the question.",
        4: "To be , that is the question."
    };

    const levelSelector = document.getElementById('levelSelector');
    const textToType = document.getElementById('textToType');
    const typedText = document.getElementById('typedText');
    const startButton = document.getElementById('startButton');
    const accuracyDisplay = document.getElementById('accuracy');
    const timeTakenDisplay = document.getElementById('timeTaken');

    let startTime, endTime, selectedText;

    function initializeText() {
        selectedText = levels[levelSelector.value];
        textToType.textContent = selectedText;
    }

    levelSelector.addEventListener('change', () => {
        console.log("Level changed to:", levelSelector.value);
        initializeText();
    });

    startButton.addEventListener('click', () => {
        console.log("Start button clicked");
        typedText.value = '';
        typedText.disabled = false;
        typedText.focus();
        startTime = new Date();
        initializeText();
    });

    typedText.addEventListener('input', () => {
        const typedTextValue = typedText.value;
        let correctChars = 0;
        for (let i = 0; i < typedTextValue.length; i++) {
            if (typedTextValue[i] === selectedText[i]) {
                correctChars++;
            }
        }
        const accuracy = (correctChars / selectedText.length) * 100;
        accuracyDisplay.textContent = accuracy.toFixed(2);

        if (typedText.value === selectedText) {
            endTime = new Date();
            typedText.disabled = true;
            calculateResults();
        }
    });

    function calculateResults() {
        const totalTime = (endTime - startTime) / 1000;
        timeTakenDisplay.textContent = totalTime.toFixed(2);
    }

    // Initialize with the first level text
    initializeText();
});
