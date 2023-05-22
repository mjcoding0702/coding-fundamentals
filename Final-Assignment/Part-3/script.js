// Form DOM Elements
const btns = document.querySelectorAll(".btn-group-toggle .btn");
const addBtn = document.querySelector('.plusButton')
const submitBtn = document.getElementById('submitBtn');
const saveBtn = document.getElementById('saveBtn');
const transactionContainer = document.querySelector('.transaction_container');

//Window onload
window.addEventListener('load', function() {
    displayTransactions();
    displayBalance();
})

// Add transaction button
addBtn.addEventListener('click', function() {
    displayModal('add');
})

// Submit Button
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    submitTransaction('submit');
})

// Edit Button
let currentEditItem = null;
transactionContainer.addEventListener('click', (e) => {
    if (e.target.closest('.editButton')){
        let transactions = JSON.parse(localStorage.getItem('transactionItem')) || [];
        const id = e.target.closest('.transaction_item').dataset.id;

        currentEditItem = transactions.find(transaction => transaction.id === id);
        let transactionType = currentEditItem.transactionType;

        displayModal(transactionType,currentEditItem);
    }
})

// Save Button
saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentEditItem !== null) {
        submitTransaction('save', currentEditItem);
    }
})

// Delete Button
transactionContainer.addEventListener('click', (e) => {
    if (e.target.closest('.deleteButton')){
        let transactions = JSON.parse(localStorage.getItem('transactionItem')) || [];
        const id = e.target.closest('.transaction_item').dataset.id;
        const index = transactions.findIndex(transaction => transaction.id === id);

        transactions.splice(index, 1);
        localStorage.setItem('transactionItem', JSON.stringify(transactions));

        displayTransactions();
        displayBalance();
    }
})


//Functions
//User submits a transaction
function submitTransaction(type, transactionItem) {
    let transactions = JSON.parse(localStorage.getItem('transactionItem')) || [];
    // Get all 6 values in form
    const radios = document.getElementsByName('transactionType');
    let transactionType = '';

    for(let i = 0; i < radios.length; i++){
        if (radios[i].checked){
            transactionType = radios[i].value;
        }
    }

    //Get DOM Elements
    let dateEl = document.getElementById("formDate");
    let transactionNameEl = document.getElementById("transactionName");
    let categoryEl = document.getElementById("formCategory");
    let amountEl = document.getElementById("formAmount");
    let noteEl = document.getElementById("formNote");
    
    //Get values from DOM Elements
    let date = dateEl.value;
    let transactionName = transactionNameEl.value;
    let category = categoryEl.value;
    let amount = amountEl.value;
    let note = noteEl.value;

    if (note == ''){
        note = "Add your note"
    }

    console.log(date)
    console.log(transactionName)
    console.log(amount)
    //Check if the form is filled
    let isFilled = (!(date == '' || transactionName == '' || amount == ''))? true : false;

    // Validate the values, return alert if error
    if (!isFilled) {
        alert("Fill in the required field!");
        return;
    } 

    if (isFilled && type == 'submit'){
        console.log("It came to submit")
        // If all ok, add into new transaction
        let newTransaction = {
            "id": uuidv4(), // Unique ID for the transaction
            "transactionType": transactionType,
            "date": date,
            "transactionName": transactionName,
            "category": category,
            "amount": amount,
            "note": note,
        };

        //Update transactions array and local storage
        transactions.push(newTransaction);
        localStorage.setItem('transactionItem', JSON.stringify(transactions));

        //After update, show the latest transactions and balance
        displayTransactions()
        displayBalance()

        //Return all Form's DOM elements value to null
        dateEl.value = '';
        transactionNameEl.value = '';
        categoryEl.value = categoryEl.options[0].value;
        amountEl.value = '';
        noteEl.value = '';

        //Exit the modal
        const  modal = document.getElementById("myModal");
        modal.style.display = "none";

    } 
    
    if (isFilled && type == 'save') {
        console.log("It came to save")
        let id = transactionItem.id;
        let transaction = transactions.find(transaction => transaction.id === id)

        //Update the item
        transaction.transactionType = transactionType;
        transaction.date = date;
        transaction.transactionName = transactionName;
        transaction.category = category;
        transaction.amount = amount;
        transaction.note = note;

        //Update Local Storage
        localStorage.setItem('transactionItem', JSON.stringify(transactions));

        //After update, show the latest transactions and balance
        displayTransactions()
        displayBalance()

        //Return all Form's DOM elements value to null
        dateEl.value = '';
        transactionNameEl.value = '';
        categoryEl.value = categoryEl.options[0].value;
        amountEl.value = '';
        noteEl.value = '';

        //Exit the modal
        const  modal = document.getElementById("myModal");
        modal.style.display = "none";
    }
}

//Display Wallet Total Balance
function displayBalance() {
    let transactions = JSON.parse(localStorage.getItem('transactionItem')) || [];
    let balance = 0;
    const walletBalance = document.querySelector('#walletBalance');

    for (let i = 0; i < transactions.length; i++){
        if (transactions[i].transactionType === 'income'){
            balance += parseFloat(transactions[i].amount);
        } else if (transactions[i].transactionType === 'expense'){
            balance -= parseFloat(transactions[i].amount);
        }
    }

    let isPositive = (balance >= 0);
    let symbol = (balance > 0)? '+' : '';

    if (isPositive) {
        walletBalance.classList.add('positive')
        walletBalance.classList.remove('negative')
    } else {
        walletBalance.classList.add('negative');
        walletBalance.classList.remove('positive');
    }
    balance = balance.toFixed(2);


    walletBalance.innerText = `${symbol}$${balance}`
}

//Updates the transaction list
function displayTransactions() {
    //Get all transaction items from the local storage
    let transactions = JSON.parse(localStorage.getItem('transactionItem')) || [];
    
    //Add or remove border bottom
    const appTitle = document.querySelector('.app_title');
    if (transactions.length == 0) {
        appTitle.style.borderBottom = '1px solid lightgray';
    } else {
        appTitle.style.borderBottom = 'none';
    }

    //Make the transaction container empty
    const transactionContainer = document.querySelector('.transaction_container');
    transactionContainer.innerHTML = ''

    // Add transaction items to the container
    transactions.forEach(transaction => {
        const transactionID = transaction.id;
        const transactionType = transaction.transactionType;
        const date = transaction.date;
        const transactionName = transaction.transactionName;
        const category = transaction.category;
        const amount = transaction.amount;
        const note = transaction.note;
        let symbol = (transactionType === 'income')? '+' : '-';
        let numberPolarity = (transactionType === 'income')? 'positive': 'negative';
        let label = '';

        switch(category) {
            case 'grocery':
                label = 'label-primary';
                break;
            case 'salary':
                label = 'label-info';
                break;
            case 'entertainment':
                label = 'label-warning';
                break;
            case 'dining':
                label = 'label-danger';
                break;
            case 'business':
                label = 'label-success';
                break;
            case 'others':
                label = 'label-default';
                break;
        }

        //Make a transaction item
        const transactionItem = `
        <div class="transaction_item" data-id=${transactionID}>
            <div class="details_1">
                <div class="item_container">
                    <p class="date">${date}</p>
                    <p class="itemName">${transactionName}</p>
                    <p class="itemCategory label ${label} ${category}">${category}</p>
                </div>
                <div class="note_container">
                    <div class="noteContent">
                        <p class="itemNote">${note}</p>
                    </div>
                </div>
            </div>
            
            <div class="details_2">
                <div class="buttons">
                    <button class="editButton">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M12.146 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 4.793 13.5l-2-2L11.207 2.5zm1.586 1.5L10.5 2.793 2.793 10.5l2 2L12.793 4z"/>
                        </svg>
                    </button>

                    <button class="deleteButton">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                        <path d="M2 8.5A.5.5 0 0 1 2.5 8h11a.5.5 0 0 1 0 1h-11A.5.5 0 0 1 2 8.5z"/>
                        </svg>
                    </button>
                </div>
                <div class="amountContainer">
                    <p class="amount ${numberPolarity}">${symbol}$${amount}</p>
                </div>
            </div>
        </div>
        `
        //Append to transaction list
        transactionContainer.innerHTML += transactionItem;
    })
}

//Unique ID for each transaction
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

//Show Modal for user to fill up the form
function displayModal(transactionType, transactionItem) {
    // DOM Elements
    const  modal = document.getElementById("myModal");
    const span = document.getElementsByClassName("close")[0];
    const incomeRadioBtn = document.getElementById("incomeRadioBtn");
    const expenseRadioBtn = document.getElementById("expenseRadioBtn");
    // Show the modal
    modal.style.display = "block";

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Select default transaction type
    const incomeLabel = document.querySelector(".incomeLabel");
    const expenseLabel = document.querySelector(".expenseLabel");
    //Hide category dropdown (DOM Elements)
    const incomeGroup = document.querySelector('.incomeGroup');
    const expenseGroup = document.querySelector('.expenseGroup');

    //Clear all classes first
    incomeLabel.classList.remove('active');
    expenseLabel.classList.remove('active');

    //Get all DOM elements
    let dateEl = document.getElementById("formDate");
    let transactionNameEl = document.getElementById("transactionName");
    let categoryEl = document.getElementById("formCategory");
    let amountEl = document.getElementById("formAmount");
    let noteEl = document.getElementById("formNote");

    // Select income or expense (by default) depends on transactionType
    if (transactionType == 'income' || transactionType == 'expense') {
        if (transactionType == 'income'){
            incomeLabel.classList.add('active');
            saveBtn.style.backgroundColor = 'lightgreen'
            incomeRadioBtn.checked = true;
            //Hide category dropdown (Show income group)
            incomeGroup.style.display = 'block';
            expenseGroup.style.display = 'none';
        } 

        if (transactionType == 'expense'){
            expenseLabel.classList.add('active');
            saveBtn.style.backgroundColor = 'salmon'
            expenseRadioBtn.checked = true;
            //Hide category dropdown (Show expense group)
            incomeGroup.style.display = 'none';
            expenseGroup.style.display = 'block';
            categoryEl.value = categoryEl.options[2].value;
        }
        submitBtn.style.display = 'none';
        saveBtn.style.display = 'block';

        
        // Restore value
        dateEl.value = transactionItem.date;
        transactionNameEl.value = transactionItem.transactionName;
        categoryEl.value = transactionItem.category;
        amountEl.value = transactionItem.amount;
        noteEl.value = transactionItem.note;

    }  else if (transactionType == 'add'){
        expenseLabel.classList.add('active');
        submitBtn.style.backgroundColor = 'salmon'
        saveBtn.style.display = 'none';
        submitBtn.style.display = 'block';
        expenseRadioBtn.checked = true;
        //Hide category dropdown (Show expense group)
        incomeGroup.style.display = 'none';
        expenseGroup.style.display = 'block';

        //Return all Form's DOM elements value to null
        dateEl.value = '';
        transactionNameEl.value = '';
        categoryEl.value = categoryEl.options[2].value;
        amountEl.value = '';
        noteEl.value = '';
    }
}

// [Function] In modal, switch between income and expenses 
btns.forEach(function(btn) {
    btn.addEventListener('click', function(){
        //Hide category dropdown (DOM Elements)
        const incomeGroup = document.querySelector('.incomeGroup');
        const expenseGroup = document.querySelector('.expenseGroup');
        const categoryEl = document.getElementById("formCategory");


        btns.forEach(function(innerBtn){
            innerBtn.classList.remove('active');  //Remove 'active' class from all the buttons
        });
        this.classList.add('active');  //Add 'active' class to the button clicked
    
        // Check the active button and change the submit button color accordingly
        if (this.querySelector('input').value === 'income'){
            submitBtn.style.backgroundColor = 'lightgreen';
            saveBtn.style.backgroundColor = 'lightgreen';

            //Hide category dropdown
            incomeGroup.style.display = 'block';
            expenseGroup.style.display = 'none';
            categoryEl.value = categoryEl.options[0].value;

        } else {
            submitBtn.style.backgroundColor = 'salmon';
            saveBtn.style.backgroundColor = 'salmon';

            //Hide category dropdown
            incomeGroup.style.display = 'none';
            expenseGroup.style.display = 'block';
            categoryEl.value = categoryEl.options[2].value;

        }
    })
})

// Format the amount
document.getElementById('formAmount').addEventListener('input', function (e) {
    if (this.value.includes('.')) {
        let decimalSplit = this.value.split('.');
        if (decimalSplit[1].length > 2) {
            this.value = parseFloat(this.value).toFixed(2);
        }
    }

    if (this.value > 9999.99) {
        alert('Amount cannot exceed 10,000');
        this.value = 9999.99;
    }
});

  
