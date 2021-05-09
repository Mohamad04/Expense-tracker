var yourInput = 0,
    transactions = [],
    yourText ,
    yourInput;


const btn = document.querySelector('#transaction');

btn.addEventListener('click', () => {

    yourText = document.getElementById("text").value;
        yourInput = parseInt(document.getElementById("input").value);

    checkInput(yourText);
});



function checkInput(name1) {
    if (name1.trim() == "") {
        alert("add your description text ");
    } else {
        addToArray(yourInput);
        historyList(yourText, yourInput);
        document.getElementById("input").innerHTML = "";
        document.getElementById("text").innerHTML  = "";
    }
}


function addToArray(yourInput) {
    var balance = 0,
        income = 0,
        expense = 0;

    transactions.push(yourInput);

    if (yourInput > 0) {
        document.getElementById("money-income").innerHTML = "+$" + yourInput
        document.getElementById("money-expense").innerHTML = "$0.00";

    } else {
        document.getElementById("money-expense").innerHTML = "$" + yourInput;
        document.getElementById("money-income").innerHTML = "$0.00";
    }

    transactions.forEach(element => {
        balance += element;
        document.getElementById("balance").innerHTML = "$" + balance;
    })
}




function historyList(yourText, yourInput) {

    var todo = document.querySelector('#list');
    todo.innerHTML += '<li class="mylist"> ' + yourText + ' <button class="delete-btn"> x </button>' + '<span class="text">' + yourInput + '</span></li>';
    
    var historyItems = document.querySelectorAll(".mylist");

    for (var index = 0; index < historyItems.length; index++) {
        historyItems[index].querySelector("button").addEventListener("click",function () {
                this.closest(".mylist").remove();
            });
    }
}
