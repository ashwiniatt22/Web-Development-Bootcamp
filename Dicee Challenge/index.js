var randomNumber1;
randomNumber1 = Math.floor(Math.random(randomNumber1) * 6) + 1;
console.log(randomNumber1)
var randomNumber2;
randomNumber2 = Math.floor(Math.random(randomNumber2) * 6) + 1;
console.log(randomNumber2)

document.querySelector(".img1").setAttribute("src", "./images/dice" + randomNumber1 + ".png");
document.querySelector(".img2").setAttribute("src", "./images/dice" + randomNumber2 + ".png");


// setTimeout(
//     function () {
        if (randomNumber1 > randomNumber2) {
            console.log("setTimeout running")
            document.querySelector("h1").innerHTML = "<i>Player 1 Wins!</i>"
        } else if (randomNumber1 < randomNumber2) {
            document.querySelector("h1").innerHTML = "<i>Player 2 Wins!</i>"
        } else {
            document.querySelector("h1").innerHTML = "<i>Draw!</i>"
        }
    // }, 50000)