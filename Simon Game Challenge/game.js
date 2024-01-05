var buttonColours = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var userChosenColour;
var randomChosenColour;

var level = 0;
var started = false;
// console.log(level+ " level")

$(document).on("keydown", nextSequence)

$(".btn").on("click", function () {

    if (started == true) {
        userChosenColour = $(this).attr("id")
        console.log(userChosenColour + " : user chosen colour")

        userClickedPattern.push(userChosenColour)
        console.log("user array:------ " + userClickedPattern)

        animatePress(userChosenColour);

        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(nextSequence, 500);
            // // nextSequence();
        }
    }
})

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
    if (currentColour == gamePattern[userClickedPattern.length - 1]) {
        switch (currentColour) {
            case "red":
                var audio = new Audio("./sounds/red.mp3");
                audio.play();
                break;
            case "blue":
                var audio = new Audio("./sounds/blue.mp3");
                audio.play();
                break;
            case "green":
                var audio = new Audio("./sounds/green.mp3");
                audio.play();
                break;
            case "yellow":
                var audio = new Audio("./sounds/yellow.mp3");
                audio.play();
        }
    } else {
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();

        $('#level-title').text("game over");
        started = false;
        $("body").css("background-color", "red");
        setTimeout(function () {
            $("body").css("background-color", "#011F3F");
        }, 100)
        setTimeout(reStart, 2000)

    }
}


function nextSequence() {
    started = true;
    level = gamePattern.length;
    console.log(level + " level")
    console.log(JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern))

    if (level == 0 || JSON.stringify(gamePattern) === JSON.stringify(userClickedPattern)) {
        userClickedPattern = [];
        $('#level-title').text("level  " + level);
        var randomNumber = Math.floor(Math.random() * 4);
        console.log(randomNumber + " : random number")

        randomChosenColour = buttonColours[randomNumber];
        console.log(randomChosenColour + " : random chosen colour")

        gamePattern.push(randomChosenColour)
        console.log("random array:--------- " + gamePattern)


        // $("#" + randomChosenColour).on("click", function () {
        $("#" + randomChosenColour).fadeOut().fadeIn();

        switch (randomChosenColour) {
            case "red":
                var audio = new Audio("./sounds/red.mp3");
                audio.play();
                break;
            case "blue":
                var audio = new Audio("./sounds/blue.mp3");
                audio.play();
                break;
            case "green":
                var audio = new Audio("./sounds/green.mp3");
                audio.play();
                break;
            case "yellow":
                var audio = new Audio("./sounds/yellow.mp3");
                audio.play();
                break;
            default:
                var audio = new Audio("./sounds/wrong.mp3");
                audio.play();

        }
        // userClickedPattern = [];
        // })
    } else {
        $('#level-title').text("game over");
        started = false;
        $("body").css("background-color", "red");
        setTimeout(function () {
            $("body").css("background-color", "#011F3F");
        }, 100)
        setTimeout(reStart, 2000)
    }

}


function reStart() {
    $('#level-title').text("Press Any Key to Restart the game");
    gamePattern = [];
    userClickedPattern = [];
}
    // function playSound(name) {
    //     nextSequence()
    // }

