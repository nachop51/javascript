let clock = document.createElement("div");
clock.classList.add("clock");
document.querySelector("body").appendChild(clock);
clock.innerHTML = new Date().toLocaleTimeString();
setInterval(() => {
  clock.innerHTML = new Date().toLocaleTimeString();
}, 1000);
