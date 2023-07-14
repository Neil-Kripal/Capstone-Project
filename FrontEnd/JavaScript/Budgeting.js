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
    const addCategoryButton = document.getElementById("add-category-button");
    const categoryList = document.getElementById("category-list");
    
    // Expense Categories
    const expenseCategories = [
      { name: "Food", color: "#ff6384" },
      { name: "Transportation", color: "#36a2eb" },
      { name: "Entertainment", color: "#ffcd56" },
      { name: "Utilities", color: "#4bc0c0" },
      { name: "Others", color: "#e7e9ed" }
    ];
    
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
    
    // Add Category Button - Show Modal
    addCategoryButton.addEventListener("click", function() {
      const categoryName = prompt("Enter the name of the category:");
      const categoryColor = prompt("Enter the color of the category (in HEX format):");
    
      if (categoryName && categoryColor) {
        const categoryItem = document.createElement("div");
        categoryItem.classList.add("category-item");
        categoryItem.innerHTML = `
          <div class="category-info">
            <span class="category-color" style="background-color: ${categoryColor}"></span>
            <span class="category-name">${categoryName}</span>
          </div>
        `;
        categoryList.appendChild(categoryItem);
      }
    });
  });
  