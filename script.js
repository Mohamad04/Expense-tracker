const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];


function changeColor() {
  let hexColor = "#";
  for (let i = 0; i < 6; i++) {
    hexColor += hex[getRandomNumber()];
  }

  document.body.style.backgroundColor = hexColor;
}

function getRandomNumber() {
  return Math.floor(Math.random() * hex.length);
}



var yourInput = 0,
  transactions = [],
  yourText,
  yourInput,
  income = 0,
  expense = 0;

const chartValues1 = [];
const chartValues2 = [];



const btn = document.querySelector("#transaction");

btn.addEventListener("click", () => {
  yourText = document.getElementById("text").value;
  yourInput = parseInt(document.getElementById("input").value);

  if (yourText.trim() === "" || document.getElementById("input").value === "")
    alert("add your description text, or number to your input ");
  else checkInput(yourText, yourInput);

  changeColor();
});


const incomeBtn = document.querySelector("#income-button");
incomeBtn.addEventListener("click", () => {
  if (chartValues1.length === 0) alert("enter data ");
  else{
    document.getElementById("css-chart").classList.remove("makeItDisappear");
    render(
      formatLineChartData(chartValues1, 200),
      document.getElementById("line-chart-1")
    );

    }
    changeColor();
});


const expenseBtn = document.querySelector("#expense-button");
expenseBtn.addEventListener("click", () => {
  if (chartValues2.length === 0) alert("enter data ");
  else{
    document.getElementById("css-chart2").classList.remove("makeItDisappear");
    render(
      formatLineChartData(chartValues2, 200),
      document.getElementById("line-chart-2")
    );
  }
    changeColor();
});


function checkInput(text, input) {
  addToArray(input);
  historyList(text, input);

  text = "";
  input = "";
}

function addToArray(yourInput) {
  let balance = 0;

  transactions.push(yourInput);

  if (yourInput > 0) {
    income += yourInput;
    chartValues1.push({ value: yourInput });
    document.getElementById("money-income").innerHTML = "+ $" + income;
  } else {
    expense += yourInput;
    console.log(expense);
    chartValues2.push({ value: yourInput });
    document.querySelector("#money-expense").innerHTML = " $" + expense;
    document.querySelector("#money-expense2").innerHTML = " $" + expense;
  }

  transactions.forEach((element) => {
    balance += element;
    document.getElementById("balance").innerHTML = "$ " + balance;
  });

}

function historyList(yourText, yourInput) {
  var todo = document.querySelector("#list");
  let color = "";

  if (yourInput > 0) color = "green";
  else color = "red";

  todo.innerHTML +=
    '<li class="mylist"> ' +
    yourText +
    ' <button class="delete-btn"> x </button>' +
    `<span class="text" style="color:${color}" >` +
    yourInput +
    "</span></li>";

  var historyItems = document.querySelectorAll(".mylist");

  for (var index = 0; index < historyItems.length; index++) {
    historyItems[index]
      .querySelector("button")
      .addEventListener("click", function () {
        this.closest(".mylist").remove();
      });
  }
}

function formatLineChartData(values, chartHeight) {
  //divide chart size by total number of points to get length of triangle base. That becomes the left offset for each new point
  //subtract previous point height from new point height to get the rise of the triangle. That becomes the bottom offset for the new point.
  //use base squared + rise squared to find the length of the hypotenuse. That becomes the width of the line to draw.
  //use Math.asin(base / hypotenuse) [then convert the radians to degrees] to find the degree angle to rotate the line to.
  //Multiply the rotation angle by -1 if it needs to rise to meet the next point.

  const widgetSize = chartHeight;
  const pointSize = 16;

  const base = (widgetSize - pointSize / 2) / values.length;

  let sortedValues = sortValues([...values]);

  const topMostPoint = sortedValues[0].value;
  let leftOffset = pointSize; //padding for left axis labels
  let nextPoint = 0;
  let rise = 0;
  let cssValues = [];

  for (var i = 0, len = values.length - 1; i < len; i++) {
    var currentValue = {
      left: 0,
      bottom: 0,
      hypotenuse: 0,
      angle: 0,
      value: 0,
    };

    currentValue.value = values[i].value;
    currentValue.left = leftOffset;
    leftOffset += base;

    currentValue.bottom =
      (widgetSize - pointSize) * (currentValue.value / topMostPoint);
    nextPoint = (widgetSize - pointSize) * (values[i + 1].value / topMostPoint);

    rise = currentValue.bottom - nextPoint;
    currentValue.hypotenuse = Math.sqrt(base * base + rise * rise);
    currentValue.angle = radiansToDegrees(
      Math.asin(rise / currentValue.hypotenuse)
    );

    cssValues.push(currentValue);
  }

  var lastPoint = {
    left: leftOffset,
    bottom:
      (widgetSize - pointSize) *
      (values[values.length - 1].value / topMostPoint),
    hypotenuse: 0,
    angle: 0,
    value: values[values.length - 1].value,
  };

  cssValues.push(lastPoint);

  return cssValues;
}

const sortValues = (values) => values.sort((a, b) => b.value - a.value);

const radiansToDegrees = (rads) => rads * (180 / Math.PI);

const sum = (total, value) => total + value.value;

function render(data, container) {
  data.forEach((item) => {
    let markup = createListItem(item);
    let listItem = document.createElement("li");
    listItem.style.cssText = `--x: ${item.left}px; --y: ${item.bottom}px`;
    listItem.innerHTML = markup;
    container.appendChild(listItem);
  });
}

function createListItem(item) {
  return `
  <div class="data-point" data-value="${item.value}"></div>
  <div class="line-segment" style="--hypotenuse: ${item.hypotenuse}; --angle:${item.angle};"></div>
  `;
}
