
$(document).ready(function() {

//defining all global variables
var currentScore = 0;
var right_answers = 0; var wrong_answers = 0;
var answered_right = "";
var quiz_ended = "false";
var current_question = 0;
var countdown;
var countdown_number;
var answered_timeout = false;

var trivia_array = [{
        question : "What color is a black bear?",
        answers : ["Black", "Yellow", "Blue", "Red"],
        correctAnswer : "Black"
    },{
        question : "What color is a brown bear?",
        answers : ["Brown", "Orange", "Pink", "White"],
        correctAnswer : "Brown"
    },{
        question : "What color is a purple bear?",
        answers : ["Purple", "Gray", "Green", "Purple bears don't exist"],
        correctAnswer : "Purple bears don't exist"
    }
    ];

function countdown_init() {
    answered_timeout = false;
    countdown_number = 4;
    $("#countdown-text").html("Time remaining: ")
    countdown_trigger();
}

function countdown_trigger(){
    if (countdown_number > 0) {
        countdown_number--;
        $("#countdown-text-time").html(countdown_number);
        if(countdown_number > 0) {
            countdown = setTimeout(countdown_trigger, 1000);
        }
    } 
    if (countdown_number === 0) {
        answered_right = "wrong";
        answered_timeout = true;
        countdown_clear();
        answer_page();
    }
}

function countdown_clear(){
    clearTimeout(countdown);
    $("#countdown-text").empty();
    $("#countdown-text-time").empty();
}


function next_question(){
    if (current_question === trivia_array.length){
        game_end();
    } else {
    $("#game-information").empty();
    $("#game-information").html(trivia_array[current_question].question)
        for (var i = 0; i < trivia_array[current_question].answers.length; i++) {
            var a = $("<button>");
            // Adding a class
            a.addClass("answer_button btn-primary btn-md");
            // Added a data-attribute
            if (trivia_array[current_question].answers[i] === trivia_array[current_question].correctAnswer){
                a.attr("data-answer", "correct");
            } else{
            a.attr("data-answer", "wrong");
            }
            // Provided the initial button text
            a.text(trivia_array[current_question].answers[i]);
            // Added the button to the HTML
            $("#game-answer-buttons").append(a);
        }
        countdown_init();

    }
};

function answer_page() {
    $("#game-information").empty();
    $("#game-questions").empty();
    $("#game-answer-buttons").empty();
    if (answered_right === "correct"){
        right_answers++;
        $(".win").html(right_answers);
        $(".loss").html(wrong_answers);
        $("#game-information").html("Congratulations!  That was the right answer!")
        setTimeout(next_question, 3000);   
    } else if (answered_timeout === true) {
        wrong_answers++;
        $(".win").html(right_answers);
        $(".loss").html(wrong_answers);
        $("#game-information").html("Sorry, you failed to answer the question in time.  The correct answer was: " + trivia_array[current_question].correctAnswer)
        setTimeout(next_question, 3000);   
    } else {
        wrong_answers++;
        $(".win").html(right_answers);
        $(".loss").html(wrong_answers);
        $("#game-information").html("Sorry, you failed to answer correctly.  The correct answer was: " + trivia_array[current_question].correctAnswer)
        setTimeout(next_question, 3000);   
    }     
    current_question++;
}

function game_end() {
    $("#game-information").html("Phew, that's all the questions for today.  Thanks for playing!  If you'd like to play again, please press press any key.");
    $("#game-questions").empty();
    document.onkeyup = function(event) {
        var quiz_ended = "false";
        current_question = 0;
        answered_timeout = false;
        next_question();
    }
}    

//running the start of game function
//TODO: Add document.onkeyup to start when user presses a key?
setTimeout(next_question,3000);

//on-click functions for each of the four crystals, which reset the start function if game is won/lost
$("#game-answer-buttons").on("click", ".answer_button", function() {
    countdown_clear();
    // console.log("this button worked")
    answered_right = $(this).attr("data-answer")
    answer_page();
    });


});

