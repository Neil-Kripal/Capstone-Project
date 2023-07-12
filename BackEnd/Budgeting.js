document.addEventListener("DOMContentLoaded", function() {
    // Variables
    const addExpenseButton = document.querySelector(".add-expense-button");
    const addExpenseModal = document.getElementById("add-expense-modal");
    const closeModal = document.querySelector(".close");
    const expenseForm = document.getElementById("add-expense-form");
    const expenseList = document.querySelector(".expense-list");
    const budgetInput = document.getElementById("budget-input");
    const setBudgetButton = document.getElementById("set-budget-button");
    const budgetRemainingValue = document.getElementById("budget-remaining-value");
    const toggleOptions = document.querySelectorAll(".toggle-option");
  
    // Add Expense Button - Show Modal
    addExpenseButton.addEventListener("click", function() {
      addExpenseModal.style.display = "block";
    });
  
    // Close Modal
    closeModal.addEventListener("click", function() {
      addExpenseModal.style.display = "none";
    });
  
    // Add Expense Form Submission
    expenseForm.addEventListener("submit", function(e) {
      e.preventDefault();
      // Get form values
      const expenseName = document.getElementById("expense-name").value;
      const expenseAmount = parseFloat(document.getElementById("expense-amount").value);
      const expenseDate = document.getElementById("expense-date").value;
      const expenseCategory = document.getElementById("expense-category").value;
  
      // Create expense item
      const expenseItem = document.createElement("div");
      expenseItem.classList.add("expense-item");
      expenseItem.innerHTML = `
        <div class="expense-info">
          <h4>${expenseName}</h4>
          <p>Amount: $${expenseAmount}</p>
          <p>Date: ${expenseDate}</p>
          <p>Category: ${expenseCategory}</p>
        </div>
      `;
  
      // Append expense item to the expense list
      expenseList.appendChild(expenseItem);
  
      // Clear form inputs
      expenseForm.reset();
  
      // Recalculate budget remaining
      calculateBudgetRemaining();
    });
  
    // Set Budget Button
    setBudgetButton.addEventListener("click", function() {
      const budgetValue = parseFloat(budgetInput.value);
      budgetRemainingValue.textContent = budgetValue.toFixed(2);
      calculateBudgetRemaining();
    });
  
    // Toggle Expense Options
    toggleOptions.forEach(function(option) {
      option.addEventListener("click", function() {
        toggleOptions.forEach(function(btn) {
          btn.classList.remove("active");
        });
        this.classList.add("active");
      });
    });
  
    // Calculate Budget Remaining
    function calculateBudgetRemaining() {
      const expenseItems = document.querySelectorAll(".expense-item");
      let totalExpenses = 0;
      expenseItems.forEach(function(item) {
        const expenseAmount = parseFloat(item.querySelector(".expense-info p:nth-child(2)").textContent.split("$")[1]);
        totalExpenses += expenseAmount;
      });
      const budgetValue = parseFloat(budgetRemainingValue.textContent);
      const remainingValue = budgetValue - totalExpenses;
      budgetRemainingValue.textContent = remainingValue.toFixed(2);
    }
  });
  