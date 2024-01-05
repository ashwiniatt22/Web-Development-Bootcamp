noOfDrums = document.querySelectorAll(".drum").length;
console.log(noOfDrums);

for (i = 0; i < noOfDrums; i++) {
    
    document.querySelectorAll(".drum")[i].addEventListener('click', function () {
        
        var buttonInnerHTML = this.innerHTML;
        switch (buttonInnerHTML) {
            case "w":
                var audio = new Audio("./sounds/tom-1.mp3");
                audio.play();
                break;
            case "a":
                var audio = new Audio("./sounds/tom-2.mp3");
                audio.play();
                break;
            case "s":
                var audio = new Audio("./sounds/tom-3.mp3");
                audio.play();
                break;
            case "d":
                var audio = new Audio("./sounds/tom-4.mp3");
                audio.play();
                break;
            case "j":
                var audio = new Audio("./sounds/snare.mp3");
                audio.play();
                break;
            case "k":
                var audio = new Audio("./sounds/crash.mp3");
                audio.play();
                break;
            case "l":
                var audio = new Audio("./sounds/kick-bass.mp3");
                audio.play();
                break;
            default:
                alert("Something Went Wrong");
        }
        addAnime(buttonInnerHTML) ;
    })
}
document.addEventListener("keydown", function (e) {
    console.log(e.key);
    switch (e.key) {
        case "w":
            var audio = new Audio("./sounds/tom-1.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("./sounds/tom-2.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("./sounds/tom-3.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("./sounds/tom-4.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("./sounds/snare.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("./sounds/crash.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("./sounds/kick-bass.mp3");
            audio.play();
            break;
        default:
            console.log("Something Went Wrong");
    }
    addAnime(e.key) ;

})

function addAnime(input) {
    document.querySelector("." + input).classList.add("pressed")

    setTimeout(function(){
        document.querySelector("." + input).classList.remove("pressed")},200)

}
