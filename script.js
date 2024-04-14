let questions = [  
        {
          "id": 1,
          "question": "What does HTML stand for?",
          "options": ["Hyper Text Markup Language", "Hyperlinks and Text Markup Language", "Home Tool Markup Language", "Hyperlinks Text Management Language"],
          "answer": "Hyper Text Markup Language"
        },
        {
          "id": 2,
          "question": "What is the purpose of HTML?",
          "options": ["To define the structure of web pages", "To style web pages", "To create dynamic interactions on web pages", "To perform server-side operations"],
          "answer": "To define the structure of web pages"
        },
        {
          "id": 3,
          "question": "What is the structure of an HTML document?",
          "options": ["DOCTYPE declaration, html, head, title, body", "html, body, head, title, DOCTYPE declaration", "title, body, html, DOCTYPE declaration, head", "head, body, html, DOCTYPE declaration, title"],
          "answer": "DOCTYPE declaration, html, head, title, body"
        },
        {
          "id": 4,
          "question": "Explain the difference between block-level and inline elements in HTML.",
          "options": ["Block-level elements start on a new line and take up the full width available, while inline elements do not start on a new line and only take up as much width as necessary.", "Block-level elements cannot contain other elements, while inline elements can.", "Block-level elements have a fixed width, while inline elements have a flexible width.", "Block-level elements are displayed vertically, while inline elements are displayed horizontally."],
          "answer": "Block-level elements start on a new line and take up the full width available, while inline elements do not start on a new line and only take up as much width as necessary."
        }
]

/* START BUTTON  */

const start = document.querySelector(".start-button");
const info = document.querySelector(".guidelines-container");
const startQuiz = info.querySelector(".button-container .start");
const quit = info.querySelector(".button-container .quit");
const quizContainer = document.querySelector(".quiz-container");
const nextButton = document.querySelector("footer .nextQuestio");


start.addEventListener('click',function(){
    info.classList.add("active"); //since 4 containers are placed one above , make each container opacity to be 0 initially and on click of the button make opacity 1 to show 
});

quit.addEventListener('click',function(){
    info.classList.remove("active");
});

startQuiz.addEventListener('click',function(){
    info.classList.remove("active"); /* opacity becomes 0 */
    quizContainer.classList.add("active");/* opacity becomes 1 */
    showQuizQuestion(0);
    questionCounter(1);
    startTimer(15);
    startTimerLine(0);
    
})

/* QUIZ CONTAINER */

const totalQuestion = document.querySelector("footer .total-question");
const question = document.querySelector(".question");
const options = document.querySelector(".options");


/* PREPARE QUESTION AND OPTIONS */


function  showQuizQuestion(index){
  /* take the index and then select the question and make the HTML template  */ 
  let questionSpan = '<span>' + questions[index].id + " . " + questions[index].question + '</span>';

  /* take the index and select options makes the HTML template and put it in innerHTML */
  let optionsSpan = '<div class="option"><span>'+ questions[index].options[0] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[1] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[2] +'</span></div>'
  + '<div class="option"><span>'+ questions[index].options[3] +'</span></div>';
  question.innerHTML = questionSpan;
  options.innerHTML= optionsSpan;

  const option = options.querySelectorAll(".option");
  const length = option.length;
  for(let i=0;i<length;i++)
  {
    console.log(option[i]);
    /* addd click function to each div element  so when option is selected to verify the answer*/
    option[i].setAttribute("onclick","optionSelected(this)");
  }
}

/* SHOW CURRENT QUESTION  INDEX  */

let timerValue = 15;
let questionCount=0;
let questionNo = 1;
let total =0;
let counter ;
let counterLine ;

const timeLine = document.querySelector(" .time-progress-bar");
const timerSecond = document.querySelector(".time .second");
const timeRemainin = document.querySelector(".time .time-left");

function questionCounter(index)
{
    let totalQuestionHTML = '<span><p>'+ index +'</p> of' + '<p>' + questions.length + '</p> Questions </span>';
    totalQuestion.innerHTML = totalQuestionHTML;
}


function  startTimer(secondsPerQuestion){
   counter = setInterval(startTimerForQuiz,1000); /* calls function  startTimerForQuiz for every one second and sets the content of second container in HTML to the current second (150,140) */
  
   function startTimerForQuiz(){
     timerSecond.textContent = secondsPerQuestion;
     secondsPerQuestion--;
     if(secondsPerQuestion < 9)
     {
      let currentHTMLValueForTimer = timerSecond.textContent;
      timerSecond.textContent = '0' + currentHTMLValueForTimer ;
     }
     if(secondsPerQuestion < 0)
     {
      clearInterval(counter); //once the seconds is less than 0 then clearInterval because 15 seconds was completed , <0 because first the second is decremented and then the function is called by the setInterval
      timeRemainin.textContent = "Time Completed";
      timerSecond.style.display="none";
      const getOptions = options.childElementCount;
      let correct = questions[questionCount].answer;

      for(let i=0;i<getOptions ; i++)
      {
        if(options.children[i].textContent == correct)
        {
          options.children[i].classList.add("correct");
        }
      }

      for(let i=0;i<getOptions ; i++)
      {
          options.children[i].classList.add("disabled"); //after answer selection disable options 
      }
      nextButton.classList.add("show");
     }}
}

function startTimerLine(startIndex){
   counterLine = setInterval (setWidthOfTimeSpent , 23); 
   function setWidthOfTimeSpent(){
    startIndex+=1;
    timeLine.style.width = startIndex+"px";
    if(startIndex > 690) /* here 690 refers to total width of the quiz container */
    {
       clearInterval(counterLine);
    }
   }
}



/* on click of NEXT BUTTON TO SHOW NEXT QUESTION */

nextButton.addEventListener('click',function(){
   if(questionCount < questions.length -1)
   {
    questionCount++;
    questionNo++;
    showQuizQuestion(questionCount);
    questionCounter(questionNo);
    clearInterval(counter); /* if user submits before 15 second end then clearInterval set for the global variable */
    clearInterval(counterLine);
    startTimer(timerValue);
    startTimerLine(0);
    timeRemainin.textContent = "Time left";
    nextButton.classList.remove("show");
    timerSecond.style.display="block";
   }
   else{
    clearInterval(counter);
    clearInterval(counterLine);
    showResult();
   }
});


/* OPTION WHEN SELECTED BEFORE TIMER */

let score = 0;

function optionSelected(event)
{
    clearInterval(counter); /* if user submits before 15 second end then clearInterval set for the global variable */
    clearInterval(counterLine);
    let answer = event.textContent;
    let correct = questions[questionCount].answer;
    const getOptions = options.childElementCount;
    if(answer == correct)
    {
      score+=5;
      event.classList.add("correct");
    }
    else{
      event.classList.add("incorrect");

      for(let i=0;i<getOptions ; i++)
      {
        if(options.children[i].textContent == correct)
        {
          options.children[i].classList.add("correct");
        }
      }

      for(let i=0;i<getOptions ; i++)
      {
          options.children[i].classList.add("disabled"); //after answer selection disable options 
      }
    }
    nextButton.classList.add("show");
    if(questionCount == questions.length -1)
    {
      nextButton.textContent = "Show Result";
    }

}
const resultContainer = document.querySelector(".result-container");
const content = document.querySelector(".result-container .content");
const retryButton = document.querySelector(".retry");
function showResult(){
   quizContainer.classList.remove("active");
   info.classList.remove("active");
   resultContainer.classList.add("active");
   retryButton.classList.add("show");
   const total = questions.length*5;
   const text = '<h2>Congrats !! You scored ' + score + ' out of ' + total +'</ph2>'
  content.innerHTML = text;

}

retryButton.addEventListener('click',function(){
  info.classList.add("active");
  resultContainer.classList.remove("active");
  retryButton.classList.remove("show");
  timerValue = 15;
  questionCount=0;
  questionNo = 1;
  total =0;
  nextButton.textContent = "Next Question";
  nextButton.classList.remove("show");

})