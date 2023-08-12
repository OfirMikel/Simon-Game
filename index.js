var correctSq = [];
var playerSq = [];

const buttonColors = ["red", "yellow" , "blue" , "green"];
var audioElement = document.createElement('audio');
var level = 0;
var pause = true;
var lost = 0;

function getRandomNum() {
   return Math.floor(Math.random() * 4);  
}

$(document).bind('keypress', function (e) {
    if (e != 0 && pause) {
       pause = false;
       playerSq = [];
       correctSq = [];
       $("h1").text(level);
       addToSequence(correctSq);
       showSequence();
    }
});

function addToSequence(sequence) {
   sequence.push(buttonColors[getRandomNum()]);
   $("h1").text(level);
}

function loser() {
   $("h1").text("YOU LOST");
   lost++;
   pause == true;
   correctSq = [];
   level = 0;

   if (lost == 1) {
      var newDiv = $("<div>").addClass("you-lost container").text("Refresh To Restart");
      $("body").append(newDiv);
   }


}


function isPlayerClickedOnCorrectBox(color) {
   playerSq.push(color);
   var isCurrentClickCorrect = playerSq[playerSq.length - 1] == correctSq[playerSq.length - 1];
   if (correctSq.length != 0 &&  playerSq.length == correctSq.length && isCurrentClickCorrect) {
      addToSequence(correctSq);
      $("h1").text(level);
      showSequence();
      level++;
      playerSq = [];
      return true;
   }
   if (isCurrentClickCorrect) {
      return true;
   }
   loser();
   return false;
}

function print() {
   console.log(correctSq);
   console.log(playerSq);
}

function showSequence() {
   let index = correctSq.length - 1;
   setTimeout(() => {
      playSound(correctSq[index]);
      $("." + correctSq[index] + "-box").fadeOut(150).fadeIn(150);
   }, 800);
}

function playSound(color){
   audioElement.setAttribute('src', '.\\sounds\\' + color + '.mp3');
   audioElement.play();
}


$(".red-box").click(function () {
   playSound("red");
   $(".red-box").fadeOut(50).fadeIn(150);
   isPlayerClickedOnCorrectBox("red");
});

$(".blue-box").click(function () {
   playSound("blue");
   $(".blue-box").fadeOut(50).fadeIn(150);
   isPlayerClickedOnCorrectBox("blue");
});

$(".yellow-box").click(function () {
   playSound("yellow");
   $(".yellow-box").fadeOut(50).fadeIn(150);
   isPlayerClickedOnCorrectBox("yellow");
});

$(".green-box").click(function () {
   playSound("green");
   $(".green-box").fadeOut(50).fadeIn(150);
   isPlayerClickedOnCorrectBox("green");
});


