$(document).ready(function () {

 
    var question = [{
        q: "Who invented Penicillin?",
        options: ["Alexandra Fleming", "Marie Curie", "George Orwell", "Thomas Edison"],
        answer: 0,
    },
    {
        q: "What is the largest country in the world?",
        options: ["Brazil", "United States", "Russia", "China"],
        answer: 2,
    },
    {
        q: "Refined sugar increases your risk for which of the following?",
        options: ["Obesity", "Cardiovascular Diseases", "Alzheimers", "All of the Above"],
        answer: 2,
    },
    {
        q: "What is the longest river in the world?",
        options: ["Tibet and Nepal", "Bhutan and Nepal", "Tibet and India", "India and Nepal"],
        answer: 0,
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
        q: "What is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mekong"],
        answer: 0,
    },
    {
        q: "One mile is how many kilometers?",
        options: ["0.6", "1.2", "1.4", "1.6"],
        answer: 3,
    },
    ];


    var timeLeft = 15;
    var answered = true;
    var intervalId;
    var currentQuestionNum = 0;
    var correctAnswer = 0;
    var IncorrectAnswer = 0;
    var unanswered = 0;
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
        $("#CorrectAnswers").empty();
        $("#IncorrectAnswers").empty();
        $("#unanswered").empty();

        currentQuestionNum;
        correctAnswer;
        IncorrectAnswer;
        unanswered;
        newQuestion();
    }


    // Coundown Function 
    function timer() {
        timeLeft = 15;
        $("#timerDisplay").html("<h3>Time Remaining: " + timeLeft + "</h3>");
        answered;
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

    //Display a new question
    function newQuestion() {
        $("#message").empty();
        $("correctAnswer").empty();
        answered = true;


        $("#questionNum").html("Question: " + (currentQuestionNum + 1) + " out of " + (question.length));
        $("#question").html("<h2>" + question[currentQuestionNum].q + "</h2><br>");
        for (var i = 0; i < 4; i++) {
            var option1 = $("<div>");
            option1.html(question[currentQuestionNum].options[i]);
            option1.attr({ "option-index": i });
            option1.addClass("choice");
            $("#options").append(option1);
        }
        timer();
        $(".choice").click(function () {
            userAnswer = $(this).data("index");
            clearInterval(intervalId);
            answered = false;
            answerPage();
        })
    }

    function answerPage() {
        $(".choice").empty();
        $("#questionNum").empty();
        $("#question").empty();

        var correctAnswer = question[currentQuestionNum].options[question[currentQuestionNum].answer];
        var correctanswerIndex = question[currentQuestionNum].answer;
        if ((userAnswer === correctanswerIndex) && (answered === true)) {
            correctAnswer++;
            $("message").html("Correct");
        }
        else if ((userAnswer !== correctanswerIndex) && (answered === true)) {
            IncorrectAnswer++;
            $("message").html("Wrong");
            $("correctAnswer").html("The correct answer was: " + correctAnswer);
        }
        else {
            unanswered++;
            $("correctAnswer").html("The correct answer was: " + correctAnswer);
            answered = true;
        }
        if (currentQuestionNum == (question.length - 1)) {
            setTimeout(score, 3000);
        }
        else {
            currentQuestionNum++;
            setTimeout(newQuestion, 3000);
        }

    }

    function score() {
        $('#timerDisplay').empty();
        $('#message').empty();
        $('#correctAnswer').empty();

        $("#finalMessage").html("All done, heres how you did!");
        $("#CorrectAnswers").html("Correct Answers: " + correctAnswer);
        $("#IncorrectAnswers").html("Incorrect Answers: " + IncorrectAnswer);
        $("#unanswered").html("Unanswered: " + unanswered);
        $("#startOver").show();
        $("#startOver").html("Start Over");
    }

})