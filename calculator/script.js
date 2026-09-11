function appendValue(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
}

function calculate() {
    let display = document.getElementById("display");

    try {
        let expression = display.value;
        let result = eval(expression);

        display.value = result;

        let historyList = document.getElementById("historyList");

        let item = document.createElement("li");
        item.innerText = expression + " = " + result;

        historyList.appendChild(item);

    } catch {
        display.value = "Error";
    }
}

function clearHistory() {
    document.getElementById("historyList").innerHTML = "";
}
function toggleTheme() {
    document.body.classList.toggle("light-mode");
    let button = document.getElementById("themebtn");
    if
    (document.body.classList.contains("light-mode")) {
        button.innerText = "Dark Mode";
    } else {
        button.innerText ="Light Mode";
    }
}
function clearHistory() {
    document .getElementById("historyList").innerHTML ="";
}
document.addEventListener("keydown", function(event) {

    let key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "."
    ) {
        appendValue(key);
    }

    else if (key === "Enter") {
        calculate();
    }

    else if (key === "Backspace") {
        deleteLast();
    }

    else if (key === "Escape") {
        clearDisplay();
    }

});
function copyResult() {
    let result = document.getElementById("display").value;

    if (result === "") {
        alert("There is no result to copy!");
        return;
    }

    navigator.clipboard.writeText(result);

    alert("Result copied!");
}