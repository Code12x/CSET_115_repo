// Justin Koch. Group 2

let questions = [
    {
        "question":"How tall is the White House in feet?",
        "answer":70,
        "possibleAnswers":[50, 60, 70, 80]
    },
    {
        "question":"When was George Washington Elected President?",
        "answer": 1789,
        "possibleAnswers":[1776, 1789, 1796, 1781]
    },
    {
        "question":"What is the best programming language?",
        "answer":"Java",
        "possibleAnswers":["JavaScript", "GO", "Python", "Java"]
    },
    {
        "question":"Who aquired GitHub for $7.5 billion?",
        "answer":"Microsoft",
        "possibleAnswers":["Microsoft", "Google", "Amazon", "IBM"]
    },
    {
        "question":"Who started the \"Free Software Movement\"?",
        "answer":"Richard Stallman",
        "possibleAnswers":["Linus Torvalds", "Bill Gates", "Richard Stallman", "Steve Jobs"]
    }
];

let results = [];

startQuiz();

function startQuiz() {
    showQuestion(0);
}

function showQuestion(index) {
    clear();
    
    let question = questions[index];

    let questionQEl = document.createElement("h3");
    questionQEl.innerHTML = "<strong>" + question.question + "<strong>";
    questionQEl.className += " question";
    document.body.appendChild(questionQEl);

    for(let i=0; i<question.possibleAnswers.length; i++) {
        let possibleAnswer = question.possibleAnswers[i];

        let possibleAnswerEl = document.createElement("input");
        possibleAnswerEl.type = "radio";
        possibleAnswerEl.name = "quiz-questions";
        possibleAnswerEl.id = possibleAnswer;
        possibleAnswerEl.className += " possible-answer";
        possibleAnswerEl.value = possibleAnswer;

        document.body.appendChild(possibleAnswerEl);
        document.body.appendChild(document.createTextNode(possibleAnswer))
        document.body.appendChild(document.createElement("br"));
    }

    document.body.appendChild(document.createElement("br"));
    let submitBtn = document.createElement("BUTTON");
    submitBtn.className += " submit-btn";
    submitBtn.innerHTML = "Submit";
    submitBtn.setAttribute("onclick", "submitQuestion("+ index + ")");
    document.body.appendChild(submitBtn);
}

function submitQuestion(index) {
    let questionsName = document.getElementsByName("quiz-questions");
    let selectedAnswer;
    for(i=0; i<questionsName.length; i++) {
        if(questionsName[i].checked) selectedAnswer = questionsName[i].value;
    }

    if(selectedAnswer === undefined) return;

    let answer = questions[index].answer;

    if(selectedAnswer == answer) {
        results[index] = true;
    }else {
        results[index] = false;
    }

    if(index < questions.length-1) {
        showQuestion(index+1);
    }else {
        showResults();
    }
}

function showResults() {
    clear();

    let correct = 0;

    for(i=0; i<results.length; i++) {
        if(results[i]) correct++;
    }

    let score = (correct/results.length) * 100;

    let resultText = document.createElement("h1");
    resultText.innerHTML = "Your score: " + score + "%";

    document.body.appendChild(resultText);

    document.body.appendChild(document.createElement("br"));

    let restartBtn = document.createElement("button");
    restartBtn.innerHTML = "Restart";
    restartBtn.setAttribute("onclick", "startQuiz()")

    document.body.appendChild(restartBtn);
}

function clear() {
    while(document.body.firstChild) {
        document.body.removeChild(document.body.firstChild);
    }
}