//jshint esversion:6
let character = document.getElementById("character");
let block = document.getElementById("block");

function jump() {
  if (!character.classList.contains("animate")) {
    character.classList.add("animate");
    setTimeout(function () {
      character.classList.remove("animate");
    }, 500);
  }
}

let = checkDead = setInterval(() => {
  let characterTop = parseInt(
    window.getComputedStyle(character).getPropertyValue("top")
  );
  let blockLeft = parseInt(
    window.getComputedStyle(block).getPropertyValue("left")
  );
  if (blockLeft < 20 && blockLeft > 0) {
    if (characterTop >= 140) {
      block.style.animation = "none";
      block.style.display = "none";
      alert("You are dead");
      clearInterval(checkDead);
    }
  }
}, 10);
