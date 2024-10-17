// Sample data (all set to zero)
const balances = [
    { currency: 'USD', amount: 0.00, equivalent: 0.00, icon: 'dollar-sign', flag: '🇺🇸' },
    { currency: 'NZD', amount: 0.00, equivalent: 0.00, icon: 'dollar-sign', flag: '🇳🇿' },
    { currency: 'AUD', amount: 0.00, equivalent: 0.00, icon: 'dollar-sign', flag: '🇦🇺' }
];

const activities = [
    // Empty array as there are no activities
];

const jars = [
    { name: 'Savings', currency: 'USD', amount: 0.00, equivalent: 0.00, icon: 'piggy-bank', flag: '🇺🇸' },
    { name: 'My Party', currency: 'NZD', amount: 0.00, equivalent: 0.00, icon: 'glass-cheers', flag: '🇳🇿' }
];

function displayBalances() {
    const balancesContainer = document.getElementById('balances');
    balancesContainer.innerHTML = balances.map(balance => `
        <div class="balance-card">
            <h3><i class="fas fa-${balance.icon}"></i> <span class="currency-flag">${balance.flag}</span>${balance.currency}</h3>
            <div class="balance-amount">${balance.currency} ${balance.amount.toFixed(2)}</div>
            <div class="balance-equivalent">KHR ${balance.equivalent.toFixed(2)}</div>
        </div>
    `).join('');
}

function displayActivities() {
    const activitiesContainer = document.getElementById('activities');
    if (activities.length === 0) {
        activitiesContainer.innerHTML = '<p>No recent activities</p>';
    } else {
        activitiesContainer.innerHTML = activities.map(activity => `
            <div class="activity-item ${activity.status === 'delayed' ? 'delayed' : ''}">
                <span>${activity.description}</span>
                <span class="activity-amount ${activity.type === 'Sent' ? 'delayed' : ''}">
                    <span class="currency-flag">${getFlagForCurrency(activity.currency)}</span>${activity.currency} ${activity.amount.toFixed(2)}
                </span>
            </div>
        `).join('');
    }
}

function displayJars() {
    const jarsContainer = document.getElementById('jars');
    jarsContainer.innerHTML = jars.map(jar => `
        <div class="jar-card">
            <h3><i class="fas fa-${jar.icon}"></i> ${jar.name}</h3>
            <div class="jar-amount"><span class="currency-flag">${jar.flag}</span>${jar.currency} ${jar.amount.toFixed(2)}</div>
            <div class="jar-equivalent">KHR ${jar.equivalent.toFixed(2)}</div>
        </div>
    `).join('');
}

function getFlagForCurrency(currency) {
    const balance = balances.find(b => b.currency === currency);
    return balance ? balance.flag : '';
}

function refreshDashboard() {
    displayBalances();
    displayActivities();
    displayJars();
}

// Modal functionality
const sendMoneyBtn = document.getElementById("sendMoneyBtn");
const recipientsBtn = document.getElementById("recipientsBtn");
const sendMoneyModal = document.getElementById("sendMoneyModal");
const recipientsModal = document.getElementById("recipientsModal");
const closeBtns = document.getElementsByClassName("close");

function openModal(modal) {
    modal.style.display = "block";
}

function closeModal(modal) {
    modal.style.display = "none";
}

function closeAllModals() {
    sendMoneyModal.style.display = "none";
    recipientsModal.style.display = "none";
}

sendMoneyBtn.onclick = () => openModal(sendMoneyModal);
recipientsBtn.onclick = () => openModal(recipientsModal);

for (let closeBtn of closeBtns) {
    closeBtn.onclick = closeAllModals;
}

window.onclick = function(event) {
    if (event.target == sendMoneyModal || event.target == recipientsModal) {
        closeAllModals();
    }
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', function() {
    refreshDashboard();

    // Add any additional initialization code here
    // For example, you could set up event listeners for other interactive elements
    
    // Example: Add event listener for the "Continue" button in the Send Money modal
    const continueBtn = document.querySelector('#sendMoneyModal .button');
    if (continueBtn) {
        continueBtn.addEventListener('click', function() {
            const recipientInput = document.getElementById('recipientInput');
            console.log('Sending money to:', recipientInput.value);
            // Add your logic here for handling the money sending process
            closeModal(sendMoneyModal);
        });
    }
});

// You can add more functions here as needed for additional functionality
// For example, functions to handle actual money transfers, update balances, etc.

function updateBalance(currency, amount) {
    const balance = balances.find(b => b.currency === currency);
    if (balance) {
        balance.amount += amount;
        balance.equivalent = balance.amount * 4069.70; // Using the rate from the HTML
        refreshDashboard();
    }
}

function addActivity(description, currency, amount, type, status = 'completed') {
    activities.unshift({
        description,
        currency,
        amount,
        type,
        status
    });
    refreshDashboard();
}

// Example usage:
// updateBalance('USD', 100);
// addActivity('Received payment', 'USD', 100, 'Received');
