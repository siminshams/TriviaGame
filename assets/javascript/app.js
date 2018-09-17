$(document).ready(function () {


    var question = [{
        q: "Who invented Penicillin?",
        options: ["Alexander Fleming", "Marie Curie", "George Orwell", "Thomas Edison"],
        answer: 0,
    },
    {
        q: "What is the largest country in the world?",
        options: ["Brazil", "United States", "Russia", "China"],
        answer: 2,
    },
    {
        q: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mekong"],
        answer: 0,
    },
    {
        q: "Refined sugar increases your risk for which of the following?",
        options: ["Obesity", "Cardiovascular Diseases", "Alzheimers", "All of the Above"],
        answer: 2,
    },  
    {
        q: "What is the currency of Brazil?",
        options: ["Dollar", "Real", "The Bhat", "Krona"],
        answer: 1,
    },
    {
        q: "What date was President John F Kennedy assassinated?",
        options: ["November 22 1962", "November 22 1963", "October 29 1964", "November 24 1962"],
        answer: 1,
    },
    {
        q: "Which is the largest planet in the solar system?",
        options: ["Neptune", "Earth", "Mars", "Jupiter"],
        answer: 3,
    },
    {
        q: "Who has won the most Academy Awards?",
        options: ["James cameron", "Walt Disney", "Katherine Hepburn", "Steven Spielberg"],
        answer: 1,
    },
    {
        q: "When light passes from air into glass it experiences change of",
        options:["frequency and wavelength", "frequency and speed", "wavelength and speed", "frequency, wavelength and speed"],
        answer: 2,
    },   
    {
        q: "One mile is how many kilometers?",
        options: ["0.6", "1.2", "1.4", "1.6"],
        answer: 3,
    }];

    var gifArray = ["Q1","Q2","Q3","Q4","Q5","Q6","Q7","Q8","Q9","Q10"];


    var timeLeft;
    var answered;
    var intervalId;
    var currentQuestionNum;
    var correctAnswerCount;
    var IncorrectAnswer;
    var unanswered;
    var userAnswer;

    //When click on the start button it hide
    $("#btn1").click(function () {
        $(this).hide();
        startGame();
    });

    $("#startOver").click(function () {
        $(this).hide();
        startGame();
    });


    function startGame() {
        $("#finalMessage").empty();
        $("#correctAnswers").empty();
        $("#incorrectAnswers").empty();
        $("#unanswered").empty();
        currentQuestionNum = 0;
        correctAnswerCount = 0;
        IncorrectAnswer = 0;
        unanswered = 0;
        newQuestion();
    }

    //Display a new question
    function newQuestion() {
        $("#message").empty();
        $("#correctAnswer").empty();
        $("#image").empty();
        answered = true;


        $("#questionNum").html("Question: " + (currentQuestionNum + 1) + " out of " + (question.length));
        $("#question").html("<h2>" + question[currentQuestionNum].q + "</h2><br>");
        for (var i = 0; i < 4; i++) {
            var option1 = $("<div>");
            option1.text(question[currentQuestionNum].options[i]);
            option1.attr( {"data-index":i });
            option1.addClass("choice");
            $("#options").append(option1);
        }
        timer();
        $(".choice").on("click",function () {
            userAnswer = $(this).data("index");
            // console.log(userAnswer);
            clearInterval(intervalId);
            answerPage();
        });
    }
    // Coundown Function 
    function timer() {
        timeLeft = 15;
        $("#timerDisplay").html("<h3>Time Remaining: " + timeLeft + "</h3>");
        answered = true;
        intervalId = setInterval(count, 1000);
    }
    //Function that will be executd every second
    function count() {
        timeLeft--;
        $("#timerDisplay").html("<h3>Time Remaining: " + timeLeft + "</h3>");
        if (timeLeft == 0) {
            clearInterval(intervalId);
            answered = false;
            answerPage();
        }
    }

    function answerPage() {
        $(".choice").empty();
        $("#questionNum").empty();
        $("#question").empty();
        
        var correctAnswer = question[currentQuestionNum].options[question[currentQuestionNum].answer];
        var correctAnswerIndex = question[currentQuestionNum].answer;
        $("#image").html('<img src = "assets/images/'+ gifArray[currentQuestionNum] +'.gif" width = "400px" height = "300px">');
       
        if ((userAnswer == correctAnswerIndex) && (answered == true)) {
            correctAnswerCount++;            
            $("#message").html("Correct");
        }
        else if ((userAnswer != correctAnswerIndex) && (answered == true)) {
            IncorrectAnswer++;
            $("#message").html("Wrong");
            $("#correctAnswer").html("The correct answer was: " + correctAnswer);
        }
        else {
            unanswered++;
            $("#message").html("Time Up!");
            $("#correctAnswer").html("The correct answer was: " + correctAnswer);
            answered = true;
        }
        if (currentQuestionNum == (question.length - 1)) {
            setTimeout(score, 2000);
        }
        else {
            currentQuestionNum++;
            setTimeout(newQuestion, 3000);
        }
    }

    function score() {
        $("#timerDisplay").empty();
        $("#message").empty();
        $("#correctAnswer").empty();
        $("#image").empty();

        $("#finalMessage").html("All done, heres how you did!");
        $("#correctAnswers").html("Correct Answers: " + correctAnswerCount);
        $("#incorrectAnswers").html("Incorrect Answers: " + IncorrectAnswer);
        $("#unanswered").html("Unanswered: " + unanswered);
        $("#startOver").show();
        $("#startOver").html("Start Over");
    }

})