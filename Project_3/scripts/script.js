// Justin Koch. Group 2

let questions = [];
let hintsRemaining = [];

let money;

let quizArea = document.getElementById("question-container");
let scoreArea = document.getElementById("score-board");
let hintArea = document.getElementById("hints-menu");

startQuiz();

function startQuiz() {
    questions = [{
        "id":0,
        "question":"How tall in feet is the White House?",
        "answer":70,
        "possibleAnswers":[50, 60, 70, 80]
    },
    {
        "id":1,
        "question":"When was George Washington Elected President?",
        "answer": 1789,
        "possibleAnswers":[1776, 1789, 1796, 1781]
    },
    {
        "id":2,
        "question":"What is the best programming language?",
        "answer":"Java",
        "possibleAnswers":["JavaScript", "GO", "Python", "Java"]
    },
    {
        "id":3,
        "question":"Who aquired GitHub for $7.5 billion?",
        "answer":"Microsoft",
        "possibleAnswers":["Microsoft", "Google", "Amazon", "IBM"]
    },
    {
        "id":4,
        "question":"Who started the \"Free Software Movement\"?",
        "answer":"Richard Stallman",
        "possibleAnswers":["Linus Torvalds", "Bill Gates", "Richard Stallman", "Steve Jobs"]
    }];

    hintsRemaining = [{
        "id":"popular-opinion",
        "name":"Popular Opinion"
    },
    {
        "id":"remove-two",
        "name":"50 : 50"
    },
    {
        "id":"tell",
        "name":"Ultimate Hint"
    }];

    money = 0;
    
    addToScore();
    showQuestion(0);
}

function showQuestion(index) {
    clear(quizArea);
    
    let question = questions[index];
    drawHints(question.id);

    let questionQEl = document.createElement("h3");
    question.value = (index+1)*100;
    questionQEl.innerHTML = "[" + (index+1) + "/" + questions.length + "] <strong>" + question.question + "<strong> ($" + question.value + ")";
    questionQEl.className += " question";

    quizArea.appendChild(questionQEl);

    for(let i=0; i<question.possibleAnswers.length; i++) {
        let possibleAnswer = question.possibleAnswers[i];

        let possibleAnswerEl = document.createElement("input");
        possibleAnswerEl.type = "radio";
        possibleAnswerEl.name = "quiz-questions";
        possibleAnswerEl.id = possibleAnswer;
        possibleAnswerEl.className += " possible-answer";
        possibleAnswerEl.value = possibleAnswer;

        quizArea.appendChild(possibleAnswerEl);
        quizArea.appendChild(document.createTextNode(possibleAnswer))
        quizArea.appendChild(document.createElement("br"));
    }

    quizArea.appendChild(document.createElement("br"));
    let submitBtn = document.createElement("BUTTON");
    submitBtn.className += " submit-btn";
    submitBtn.innerHTML = "Submit";
    submitBtn.setAttribute("onclick", "submitQuestion("+ index + ")");
    quizArea.appendChild(submitBtn);
}

function submitQuestion(index) {
    let questionsName = document.getElementsByName("quiz-questions");
    let selectedAnswer;
    for(i=0; i<questionsName.length; i++) {
        if(questionsName[i].checked) selectedAnswer = questionsName[i].value;
    }

    if(selectedAnswer === undefined) return;

    let question = questions[index];
    let answer = question.answer;

    if(selectedAnswer == answer) {
        addToScore(question.value);
        
        if(index < questions.length-1) {
            showQuestion(index+1);
        }else {
            showResults(true);
        }
    }else {
        showResults(false, question)
    }
}

function showResults(didWin, question=null) {
    clear(quizArea);
    clear(scoreArea);
    clear(hintArea);

    let winStatusEl = document.createElement("h1");
    didWin ? winStatusEl.innerHTML = "You Won!" : winStatusEl.innerHTML = "Good Try!";
    winStatusEl.style.display = "inline";
    quizArea.appendChild(winStatusEl);

    if(!didWin && question !== null) {
        let answerEl = document.createElement("h2");
        answerEl.innerHTML = " The answer was: " + question.answer;
        answerEl.style.display = "inline";
        quizArea.appendChild(answerEl);
    }

    let resultText = document.createElement("h3");
    resultText.innerHTML = "You ended with: $" + money;

    quizArea.appendChild(resultText);
    quizArea.appendChild(document.createElement("br"));

    let restartBtn = document.createElement("button");
    restartBtn.innerHTML = "Restart";
    restartBtn.setAttribute("onclick", "startQuiz()")

    quizArea.appendChild(restartBtn);
}

function clear(area) {
    while(area.firstChild) {
        area.removeChild(area.firstChild);
    }
}

function addToScore(amount=0) {
    clear(scoreArea);

    money += amount;
    
    let scoreEl = document.createElement("p");
    scoreEl.id = "score";
    scoreEl.innerHTML = "You currently have: $" + money;
    scoreArea.appendChild(scoreEl);
}

function drawHints(questionId) {
    clear(hintArea);
    for(i=0; i<hintsRemaining.length; i++) {
        let hint = hintsRemaining[i];
        
        let btn = document.createElement("BUTTON");
        btn.className += " hint-button";
        btn.id = hint.id;
        btn.setAttribute("onclick", "useHint(\"" + hint.id + "\", " + questionId + ")");
        btn.innerHTML = "Hint: " + hint.name;

        hintArea.appendChild(btn);
    }
}

function useHint(hintId, questionId) {
    let question;
    let questionIndex;

    for(i=0; i<questions.length; i++) {
        if(questions[i].id === questionId) {
            question=questions[i];
            questionIndex = i;
        }
    }
    
    let hint;
    
    for(i=0; i<hintsRemaining.length; i++) {
        hint = hintsRemaining[i];
        if(hint.id === hintId) {
            let left = hintsRemaining.slice(0, i);
            let right = hintsRemaining.slice(i+1);
            hintsRemaining = left.concat(right);
            break;
        }
    }

    switch(hint.id) {
        case "popular-opinion":
            alert("Most people choose " + question.answer);
            break;
        case "remove-two":
            for(i=0; i<2; i++) {
                let answerToRemove;
        
                do {
                    answerToRemove = Math.floor(Math.random() * (question.possibleAnswers.length-1));
                }while(answerToRemove === question.possibleAnswers.indexOf(question.answer));
        
                let left = question.possibleAnswers.slice(0, answerToRemove);
                let right = question.possibleAnswers.slice(answerToRemove+1);
                question.possibleAnswers = left.concat(right);
            }
            break;
        case "tell":
            alert("The answer is " + question.answer);
            break;
    }
    
    showQuestion(questionIndex);
}
