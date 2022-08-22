const result = document.querySelector(".result");
const prev = document.querySelector(".prev");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equal = document.querySelector(".equal");
let currentOperator = null;

function calculate(op) {
  if (result.innerText === "" || prev.innerText === "") return;
  let a = parseFloat(prev.innerText.split(" ")[0]);
  let b = parseFloat(result.innerText);
  if (op) {
    switch (currentOperator) {
      case "sum":
        prev.innerText = a + b;
        break;
      case "sub":
        prev.innerText = a - b;
        break;
      case "mul":
        prev.innerText = a * b;
        break;
      case "div":
        prev.innerText = a / b;
        break;
    }
    currentOperator = op;
    switch (op) {
      case "sum":
        prev.innerText = `${prev.innerText} +`;
        break;
      case "sub":
        prev.innerText = `${prev.innerText} -`;
        break;
      case "mul":
        prev.innerText = `${prev.innerText} *`;
        break;
      case "div":
        prev.innerText = `${prev.innerText} /`;
        break;
    }
    result.innerText = "";
  } else {
    prev.innerText = "";
    switch (currentOperator) {
      case "sum":
        result.innerText = a + b;
        break;
      case "sub":
        result.innerText = a - b;
        break;
      case "mul":
        result.innerText = a * b;
        break;
      case "div":
        result.innerText = a / b;
        break;
    }
  }
}

function calc(op) {
  if (prev.innerText === "") {
    prev.innerText = `${result.innerText} ${op.innerText}`;
    result.innerText = "";
    currentOperator = op.id;
  } else {
    calculate(op.id);
  }
}

numbers.forEach((num) => {
  num.addEventListener("click", function () {
    if (num.id === "C") {
      if (result.innerText === "") prev.innerText = "";
      result.innerText = result.innerText.slice(0, -1);
    } else if (num.id === ".") {
      if (result.innerText.includes(".")) return;
      result.innerText += num.id;
    } else if (num.id === "0") {
      if (result.innerText === "0") return;
      result.innerText += num.id;
    } else {
      if (result.innerText[0] === "0" && result.innerText.length === 1) {
        result.innerText = num.id;
      } else {
        result.innerText += num.id;
      }
    }
  });
});

operators.forEach((op) => {
  op.addEventListener("click", () => {
    if (prev.innerText === "") {
      prev.innerText = `${result.innerText} ${op.innerText}`;
      result.innerText = "";
      currentOperator = op.id;
    } else {
      calculate(op.id);
    }
  });
});

equal.addEventListener("click", () => {
  calculate();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculate();
  } else if (e.key === "+") {
    calc(operators[0]);
  } else if (e.key === "-") {
    calc(operators[1]);
  } else if (e.key === "*") {
    calc(operators[2]);
  } else if (e.key === "/") {
    calc(operators[3]);
  } else if (e.key === "Backspace" || e.key === "Delete") {
    if (result.innerText === "") prev.innerText = "";
    result.innerText = result.innerText.slice(0, -1);
  } else if (e.key === ".") {
    if (result.innerText.includes(".")) return;
    result.innerText += e.key;
  } else if (
    ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.key)
  ) {
    if (result.innerText[0] === "0" && result.innerText.length === 1) {
      result.innerText = e.key;
    } else {
      result.innerText += e.key;
    }
  }
});
