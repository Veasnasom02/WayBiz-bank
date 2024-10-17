console.log("Script started loading");

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
    console.log("Displaying balances");
    const balancesContainer = document.getElementById('balances');
    if (!balancesContainer) {
        console.error("Balances container not found");
        return;
    }
    balancesContainer.innerHTML = balances.map(balance => `
        <div class="balance-card">
            <h3><i class="fas fa-${balance.icon}"></i> <span class="currency-flag">${balance.flag}</span>${balance.currency}</h3>
            <div class="balance-amount">${balance.currency} ${balance.amount.toFixed(2)}</div>
            <div class="balance-equivalent">KHR ${balance.equivalent.toFixed(2)}</div>
        </div>
    `).join('');
}

function displayActivities() {
    console.log("Displaying activities");
    const activitiesContainer = document.getElementById('activities');
    if (!activitiesContainer) {
        console.error("Activities container not found");
        return;
    }
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
    console.log("Displaying jars");
    const jarsContainer = document.getElementById('jars');
    if (!jarsContainer) {
        console.error("Jars container not found");
        return;
    }
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
    console.log("Refreshing dashboard");
    displayBalances();
    displayActivities();
    displayJars();
}

// Modal functionality
let sendMoneyBtn, recipientsBtn, sendMoneyModal, recipientsModal, closeBtns;

function initializeModalElements() {
    console.log("Initializing modal elements");
    sendMoneyBtn = document.getElementById("sendMoneyBtn");
    recipientsBtn = document.getElementById("recipientsBtn");
    sendMoneyModal = document.getElementById("sendMoneyModal");
    recipientsModal = document.getElementById("recipientsModal");
    closeBtns = document.getElementsByClassName("close");

    if (!sendMoneyBtn) console.error("Send Money button not found");
    if (!recipientsBtn) console.error("Recipients button not found");
    if (!sendMoneyModal) console.error("Send Money modal not found");
    if (!recipientsModal) console.error("Recipients modal not found");
    if (closeBtns.length === 0) console.error("Close buttons not found");
}

function openModal(modal) {
    if (modal) modal.style.display = "block";
}

function closeModal(modal) {
    if (modal) modal.style.display = "none";
}

function closeAllModals() {
    if (sendMoneyModal) sendMoneyModal.style.display = "none";
    if (recipientsModal) recipientsModal.style.display = "none";
}

// Simple Password Authentication
function createAuthModal() {
    console.log("Creating Auth Modal");
    const authModal = document.createElement('div');
    authModal.id = 'authModal';
    authModal.className = 'modal';
    authModal.innerHTML = `
        <div class="modal-content">
            <h2 class="section-title">Login</h2>
            <div class="input-group">
                <label for="password">Enter Password:</label>
                <input type="password" id="passwordInput" placeholder="Enter your password">
            </div>
            <button class="button" id="submitPassword">Login</button>
        </div>
    `;
    document.body.appendChild(authModal);
    return authModal;
}

function showAuthModal(modal) {
    console.log("Showing Auth Modal");
    if (modal) modal.style.display = "block";
}

function hideAuthModal(modal) {
    console.log("Hiding Auth Modal");
    if (modal) modal.style.display = "none";
}

function validatePassword(password) {
    // For demo purposes, let's use a simple password
    return password === "Strong123$&@";
}

function initializeDashboard() {
    console.log("Initializing dashboard");
    refreshDashboard();
}

// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    initializeModalElements();
    const authModal = createAuthModal();
    
    showAuthModal(authModal);

    if (sendMoneyBtn) sendMoneyBtn.onclick = () => openModal(sendMoneyModal);
    if (recipientsBtn) recipientsBtn.onclick = () => openModal(recipientsModal);

    for (let closeBtn of closeBtns) {
        closeBtn.onclick = closeAllModals;
    }

    window.onclick = function(event) {
        if (event.target == sendMoneyModal || event.target == recipientsModal) {
            closeAllModals();
        }
    }

    const submitPasswordBtn = document.getElementById('submitPassword');
    if (submitPasswordBtn) {
        submitPasswordBtn.addEventListener('click', function() {
            const password = document.getElementById('passwordInput').value;
            if (validatePassword(password)) {
                hideAuthModal(authModal);
                initializeDashboard();
            } else {
                alert("Invalid password. Please try again.");
            }
        });
    } else {
        console.error("Submit Password button not found");
    }
});

console.log("Script finished loading");
