document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const cardName = document.getElementById('card-name').value;
    const cardNumber = document.getElementById('card-number').value;
    const expiryDate = document.getElementById('expiry-date').value;
    const cvv = document.getElementById('cvv').value;

   
    const transactionList = document.getElementById('transaction-list');
    const listItem = document.createElement('li');
    listItem.textContent = `Added payment method: ${cardName} - ${cardNumber} (Expires: ${expiryDate})`;
    transactionList.appendChild(listItem);

    
    document.getElementById('payment-form').reset();
});