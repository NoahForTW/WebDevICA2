//target all elements to save to constants
const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
const page4btn=document.querySelector("#page4btn");
const page5btn=document.querySelector("#page5btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
console.log(allpages);
hideall();
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
//show the page
onepage.style.display="block";
}

show(4)

/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
page4btn.addEventListener("click", function () {
show(4);
});
page5btn.addEventListener("click", function () {
show(5);
});

// Quiz code

// Quiz questions and answers
const question = [
    {
        question: "When did the Western Roman Empire fall?",
        answer: ["476 AD", "1453 AD", "509 BC", "27 BC"],
        Correct: 0,
    },
    {
        question: "What marked the transition of the Roman government from a kingdom to a Republic?",
        answer: ["The fall of the Roman Empire", "The establishment of the Republic in 509 BC","The coronation of the first Roman Emperor","The founding of Rome in 753 BC"],
        Correct: 1,
    },
    {
        question: "What were the Romans known for in terms of architecture and construction?",
        answer: [
          "Inventing the steam engine",
          "Developing the printing press",
          "Engineering the arch, dome, aqueducts, and durable concrete",
          "Pioneering space travel",
        ],
        Correct: 2,
    },
    {
        question: "What was a significant form of entertainment in Roman culture?",
        answer: [
          "Football matches",
          "Cooking shows",
          "Gladiator fights and chariot races at the Colosseum",
          "Video games",
        ],
        Correct: 2,
    },
    {
        question: "Who was the first emperor of Rome?",
        answer: [
          "Julius Caesar",
          "Augustus (formerly known as Octavian)",
          "Nero",
          "Cleopatra",
        ],
        Correct: 1,
    },
    {
        question: "Who were the twin brothers in Roman mythology who founded Rome?",
        answer: [
          "Romulus and Julius",
          "Romulus and Maximus",
          "Remus and Augustus",
          "Romulus and Remus",
        ],
        Correct: 3,
    },
    {
        question: "What event traditionally marks the end of the Western Roman Empire?",
        answer: [
          "The fall of the Byzantine Empire",
          "The Battle of Hastings",
          "The fall of Rome to Germanic chieftain Odoacer in 476 AD",
          "The signing of the Magna Carta",
        ],
        Correct: 2,
    },
];

// Declaring variables
var QuestionLeft = [];
var score = 0;
var scoreText = document.querySelector(".score");
var questionText = document.querySelector(".question");
var ansBox = document.querySelectorAll(".box");
var ansBoxText = document.querySelectorAll(".text");
var pressd = false;

var Retry = document.querySelector(".start");

var RetryText = document.querySelector(".StartRetry");
var QuestionText = document.querySelector(".hide");

// Event listener for Retry button
Retry.addEventListener("click", function (e) { start(); });

// Loop to set up answer box event listeners
for (i = 0; i < 4; i++)
{
    CheckQuestionsLeft(i);
}

// Initialize the quiz
function start() 
{
    Retry.classList.toggle("hide");
    RetryText.innerHTML = "Retry";
    QuestionText.classList.remove("hide");
    score = 0;
    for (i = 0; i < question.length; i++)
    {
        QuestionLeft.push(i);
    }
    var RandomQuestion = 0;
    scoreText.firstElementChild.innerHTML = "Score : " + score;

    getQuestion();
}

// Set up answer box event listeners
function CheckQuestionsLeft(i)
{
    ansBox[i].addEventListener("click", (e) => {CheckAnswer(i);});
}

// Update the score
function updateScore() 
{
    score++;
    scoreText.firstElementChild.innerHTML = "Score : " + score;
}

// Get a new question
function getQuestion()
{
    pressed = false;
    if (QuestionLeft.length > 0)
    {
        var rng = 0;
        rng = Math.floor(Math.random() * QuestionLeft.length);
        RandomQuestion = QuestionLeft[rng];
        questionText.firstElementChild.innerHTML = question[RandomQuestion].question;
        setAnswer();
    }

    var index = QuestionLeft.indexOf(QuestionLeft[rng]);
    if (index > -1)
    {
        QuestionLeft.splice(index, 1);
    }
    else
    {
        questionText.firstElementChild.innerHTML = "Score : " + score + " Out of " + question.length;
        Retry.classList.toggle("hide");
        Retry.style.top = "65%";
        RetryText.innerHTML = "Retry";

        setAnswer();
    }
}

// Set the answer choices
function setAnswer()
{
    if(QuestionLeft.length > 0) 
    {
        var ansToGive = [];
        for (i = 0; i < question[RandomQuestion].answer.length; i++)
        {
            ansToGive.push(i);
        }
        var rng = 0;

        for (i = 0; i < 4; i++)
        {
            ansBox[i].parentElement.classList.remove("hide");
            ansBox[i].classList.remove("green")
            ansBox[i].classList.remove("red");

            if (ansToGive.length > 0)
            {
                rng = Math.floor(Math.random() * ansToGive.length);
                var giveThis = ansToGive[rng];
                ansBoxText[i].innerHTML = question[RandomQuestion].answer[giveThis];

                var index = ansToGive.indexOf(giveThis);
                if (index > -1) 
                {
                    ansToGive.splice(index, 1);
                }
            }
            else 
            {
                ansBox[i].parentElement.classList.add("hide");
            }
        }
    }
}

// Check the selected answer
function CheckAnswer(i)
{   
    console.log(pressed);
    if (pressed === true) 
    {
        return;
    }
    pressed = true;
    if(ansBoxText[i].innerHTML == question[RandomQuestion].answer[question[RandomQuestion].Correct]) 
    {
        ansBox[i].classList.add("green");
        updateScore();
    }
    else 
    {
        ansBox[i].classList.add("red");
    }
    for (var g = 0; g < ansBox.length; g++) 
    {
        if (ansBoxText[g].innerHTML == question[RandomQuestion].answer[question[RandomQuestion].Correct]) 
        {
            ansBox[g].classList.add("green");
        }
    }

    if (ansBox[i].classList.contains("green")) 
    {
        questionText.firstElementChild.innerHTML += "<br> Correct!";

        setTimeout(() => getQuestion(), 800);
    }
    else
    {
        questionText.firstElementChild.innerHTML += "<br> Wrong!";
        setTimeout(() => getQuestion(), 1700);
    }
}
// Quiz code ends here

/*for hamMenu */
const hamBtn=document.querySelector("#hamIcon");
hamBtn.addEventListener("click",toggleMenus);
const menuItemsList=document.querySelector("nav ul");
function toggleMenus(){ /*open and close menu*/
if(menuItemsList.style.display=="block")
menuItemsList.style.display="none";
else menuItemsList.style.display="block";
}//can optimize using toggle class with css transitions
