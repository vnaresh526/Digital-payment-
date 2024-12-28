document.addEventListener('DOMContentLoaded', function() {
    loadTransactions();

    document.getElementById('payment-form').addEventListener('submit', function(event) {
        event.preventDefault();

        const cardName = document.getElementById('card-name').value;
        const cardNumber = document.getElementById('card-number').value;
        const expiryDate = document.getElementById('expiry-date').value;
        const cvv = document.getElementById('cvv').value;

        if (!cardName || !cardNumber || !expiryDate || !cvv) {
            showMessage("Please fill in all fields.", true);
            return;
        }

        if (!isValidCardNumber(cardNumber)) {
            showMessage("Card number must be 16 digits and contain only numbers.", true);
            return;
        }

        if (!isValidExpiryDate(expiryDate)) {
            showMessage("Expiry date must be in MM/YY format and valid.", true);
            return;
        }

        if (!isValidCVV(cvv)) {
            showMessage("CVV must be 3 digits.", true);
            return;
        }

        showLoading();

        setTimeout(() => {
            addTransaction(cardName, cardNumber, expiryDate);
            saveTransaction(cardName, cardNumber, expiryDate);
            showMessage("Payment method added successfully!");
            hideLoading();
            document.getElementById('payment-form').reset();
        }, 1000);
    });
});

function isValidCardNumber(cardNumber) {
    const regex = /^\d{16}$/; // 16 digits
    return regex.test(cardNumber);
}

function isValidCVV(cvv) {
    const regex = /^\d{3}$/; // 3 digits
    return regex.test(cvv);
}

function isValidExpiryDate(expiryDate) {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // MM/YY format
    if (!regex.test(expiryDate)) {
        return false;
    }

    const [month, year] = expiryDate.split('/').map(Number);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100; // Get last two digits of the year
    const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
        return false; // Expiry date is in the past
    }

    return true;
}

function showLoading() {
    document.getElementById('loading-indicator').style.display = 'block';
}

function hideLoading() {
    document.getElementById('loading-indicator').style.display = 'none';
}

function showMessage(message, isError = false) {
    const messageContainer = document.getElementById('message-container');
    messageContainer.style.display = 'block';
    messageContainer.textContent = message;
    messageContainer.style.color = isError ? 'red' : 'green';
}

function addTransaction(cardName, cardNumber, expiryDate) {
    const transactionList = document.getElementById('transaction-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Card: ${cardName}, Number: **** **** **** ${cardNumber.slice(-4)}, Expiry: ${expiryDate}`;
    transactionList.appendChild(listItem);
}

function saveTransaction(cardName, cardNumber, expiryDate) {
    // Here you can implement saving to local storage or a database
}

function loadTransactions() {
    // Load transactions from local storage or a database if needed
}
