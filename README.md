# Expense Tracker

A simple and responsive Expense Tracker web application built using HTML, CSS, and JavaScript.

The application allows users to manage income and expenses, view their financial balance, filter transactions, and store transaction data using browser Local Storage.

## Features

* Add income transactions
* Add expense transactions
* Enter amount, category, date, and description
* Edit transactions
* Delete transactions
* View total income
* View total expenses
* View current balance
* Filter transactions by type
* Filter transactions by category
* Store transactions using Local Storage
* Data remains available after refreshing the browser
* Responsive design for desktop and mobile devices
* Input validation and error messages

## Bonus Features

* Monthly expense summary
* Category-wise expense summary
* Visual expense chart

## Technologies Used

* HTML5
* CSS3
* JavaScript
* Browser Local Storage

## Project Structure

```text
expense-tracker-Vishnupriya-R/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

## How to Run

1. Clone or download this repository.

2. Open the project folder.

3. Open `index.html` in a web browser.

No server or additional installation is required.

## How It Works

Transactions are stored as JavaScript objects and saved in the browser's Local Storage.

When the application loads, the saved transactions are retrieved from Local Storage and displayed on the page.

The application automatically calculates:

* Total income
* Total expenses
* Current balance
* Monthly income
* Monthly expenses
* Monthly balance
* Category-wise expenses

## Local Storage

The application uses the browser's Local Storage to save transaction data.

This allows transactions to remain available even after refreshing or reopening the page in the same browser.

## Responsive Design

The application is designed to work on:

* Desktop
* Laptop
* Tablet
* Mobile devices

## Author

Vishnupriya R
