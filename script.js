const form = document.getElementById("transaction-form");
const typeInput = document.getElementById("type");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const dateInput = document.getElementById("date");
const descriptionInput = document.getElementById("description");

const errorMessage =document.getElementById("error-message");
const submitButton =document.getElementById("submit-button");

const transactionList = document.getElementById("transaction-list");

const typeFilter = document.getElementById("type-filter");
const categoryFilter =document.getElementById("category-filter");

const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const balance = document.getElementById("balance");

const monthFilter = document.getElementById("month-filter");
const monthlyIncome = document.getElementById("monthly-income");
const monthlyExpense = document.getElementById("monthly-expense");
const monthlyBalance = document.getElementById("monthly-balance");

const categoryChart = document.getElementById("category-chart");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;


// set current month 

const today = new Date();
const currentMonth =
    today.getFullYear() + "-" +String(today.getMonth() + 1).padStart(2, "0");
monthFilter.value = currentMonth;


// Add or update transaction 
form.addEventListener("submit", function (e) {
     e.preventDefault();

    const type = typeInput.value;
    const amount = Number(amountInput.value);
    const category = categoryInput.value;
    const date = dateInput.value;
    const description = descriptionInput.value.trim();


    //error messages

    if (type === ""){
        showError("Please select transaction type.");
        return;
    }
    if (amount <= 0){
        showError("Amount must be greater than 0.");
        return;
    }
    if (category === ""){
        showError("Please select a category");
        return;
    }
    if (date === "") {
        showError("Please select a date");
        return;
    }
    if (description === "") {
        showError("Please enter a description.");
        return;
    }

    // Update a transaction 

    if (editId !== null) {

        const transaction = transactions.find(function (item) {
            return item.id === editId;
 });

        transaction.type = type;
        transaction.amount = amount;
        transaction.category = category;
        transaction.date = date;
        transaction.description = description;

        editId = null;
        submitButton.textContent = "Add Transaction";

    } else {

        // Add a new transaction 

        transactions.push({

            id: Date.now(),
            type: type,
            amount: amount,
            category: category,
            date: date,
            description: description
        }); }

    saveTransactions();
    form.reset();
    errorMessage.textContent = "";
    monthFilter.value = currentMonth;
    displayTransactions();
});

//function for saving transaction
function saveTransactions() {
    localStorage.setItem("transactions",JSON.stringify(transactions));
  updateSummarySections();

}
// Display the transactions 
function displayTransactions() {
    transactionList.innerHTML = "";
    const filtered = transactions.filter(function (transaction) {

        if (
            typeFilter.value !== "all" &&
            transaction.type !== typeFilter.value
        ){
            return false;
        }if (
            categoryFilter.value !== "all" &&
            transaction.category !== categoryFilter.value
        ){
            return false;
        } return true;
});
    if (filtered.length === 0) {
        transactionList.innerHTML =
            `<p class="no-transactions">No transactions found.</p>`;

    } else {

        filtered.forEach(function (transaction) {
            const element = document.createElement("div");

            element.className = "transaction";
            const amountClass =
                transaction.type === "income"
                    ? "income"
                    : "expense";

            const sign =
                transaction.type === "income"
                    ? "+"
                    : "-";


            element.innerHTML = `

                <div class="transaction-info">

                    <h3>${transaction.description}</h3>
                    <p>Category: ${transaction.category}</p>
                    <p>Date: ${transaction.date}</p>
                    <p>Type: ${transaction.type}</p>

                </div>
                <div class="transaction-amount ${amountClass}">

                    ${sign} ₹${transaction.amount.toFixed(2)}

                </div>


                <div class="transaction-actions">

                    <button
                        class="edit-button"
                        onclick="editTransaction(${transaction.id})">

                        Edit

                    </button>


                    <button
                        class="delete-button"
                        onclick="deleteTransaction(${transaction.id})">

                        Delete

                    </button>

                </div>

            `;
            transactionList.appendChild(element);

        });}

calculateSummary();
}

// Calculate total income, expenses and balance 

function calculateSummary() {
    let income = 0;
    let expense = 0;
    transactions.forEach(function (transaction) {

        if (transaction.type === "income") {
            income = income + transaction.amount;
        }

        if (transaction.type === "expense") {
            expense = expense + transaction.amount;
        } });
    totalIncome.textContent = "₹" +income.toFixed(2);
    totalExpense.textContent ="₹"+ expense.toFixed(2);
    balance.textContent ="₹" +(income-expense).toFixed(2);
}

// Deleting a transaction 

function deleteTransaction(id) {
    if (
        !confirm(
            "Are you sure you want to delete this transaction?"
        )
    ){
        return;
    }
    transactions= transactions.filter(function (transaction) {
        return transaction.id !== id;

    });
    saveTransactions();
    displayTransactions();
}

// Edit transaction 

function editTransaction(id) {
    const transaction = transactions.find(function (item) {
        return item.id === id;
    });
    if (!transaction) {
        return;
    }

    typeInput.value = transaction.type;
    amountInput.value= transaction.amount;
    categoryInput.value = transaction.category;
    dateInput.value =transaction.date;
    descriptionInput.value =transaction.description;
    editId = id;
    submitButton.textContent = "Update Transaction";

    window.scrollTo({
        top: 0,
        behavior: "smooth"});
}

// Filters 
typeFilter.addEventListener("change", displayTransactions);
categoryFilter.addEventListener("change",displayTransactions);

//  error 

function showError(message) {
    errorMessage.textContent = message;
}

//Monthly summary 

function calculateMonthlySummary() {
    const month = monthFilter.value;

    let income = 0;
    let expense = 0;
    transactions.forEach(function (transaction) {

        if (month === "") {
            return;
        }


        if (transaction.date.startsWith(month)) {

        if (transaction.type === "income") {

                income =income + transaction.amount;

            }if (transaction.type === "expense") {

                expense = expense + transaction.amount;
 } }});

    monthlyIncome.textContent = "₹" + income.toFixed(2);

    monthlyExpense.textContent ="₹" + expense.toFixed(2);

    monthlyBalance.textContent= "₹" +(income - expense).toFixed(2);
}

// Category-wise expense chart 

function displayCategoryChart() {

    categoryChart.innerHTML = "";
  const totals = {};
    transactions.forEach(function (transaction) {
        if (transaction.type === "expense") {
            if (!totals[transaction.category]) {
                totals[transaction.category] = 0;
            }
            totals[transaction.category] =totals[transaction.category] + transaction.amount;
  } });

    const categories = Object.keys(totals);
    if (categories.length === 0) {
        categoryChart.innerHTML =
            `<p class="no-chart-data">
                No expense data available.
            </p>`;

        return;}

    //the highest expense 
    let highest = 0;
    categories.forEach(function (category) {
     if (totals[category] > highest) {
       highest = totals[category];
        }

    });
    // bars 
    categories.forEach(function (category) {
        const amount = totals[category];
        const percent =(amount/highest)*100;
        const row = document.createElement("div");
     row.className = "chart-row";
        row.innerHTML = `
            <div class="chart-category">

                ${category}

            </div>

            <div class="chart-bar-container">

                <div
                    class="chart-bar"
                    style="width: ${percent}%">
                </div>

            </div>

            <div class="chart-amount">

                ₹${amount.toFixed(2)}

            </div>

        `;
        categoryChart.appendChild(row);
 });
}
//changing month
monthFilter.addEventListener("change",calculateMonthlySummary);

function updateSummarySections() {
calculateMonthlySummary();
    displayCategoryChart();

}
displayTransactions();
updateSummarySections();