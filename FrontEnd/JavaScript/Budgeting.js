document.addEventListener('DOMContentLoaded', function () {
  // Variables
  const addExpenseButton = document.querySelector('.add-expense-button');
  const expenseForm = document.getElementById('add-expense-form');
  const expenseList = document.querySelector('.expense-list');
  const budgetInput = document.getElementById('budget-input');
  const setBudgetButton = document.getElementById('set-budget-button');
  const budgetRemainingValue = document.getElementById('budget-remaining-value');
  const toggleOptions = document.querySelectorAll('.toggle-option');
  const addCategoryButton = document.getElementById('add-category-button');
  const categoryList = document.getElementById('category-list');

  // Expense Categories
  let expenseCategories = [];

  // Expenses array
  let expenses = [];

  // Add Category Modal
  const addCategoryModal = document.getElementById('add-category-modal');
  const closeCategoryModal = addCategoryModal.querySelector('.close');
  const addCategoryForm = document.getElementById('add-category-form');

  // Render Category Options
  function renderCategories() {
    categoryList.innerHTML = ''; // Clear the category list

    expenseCategories.forEach((category) => {
      const categoryItem = document.createElement('li');
      categoryItem.classList.add('category-item');

      const categoryColor = document.createElement('span');
      categoryColor.classList.add('category-color');
      categoryColor.style.backgroundColor = category.color;

      const categoryName = document.createElement('span');
      categoryName.classList.add('category-name');
      categoryName.textContent = category.name;

      categoryItem.appendChild(categoryColor);
      categoryItem.appendChild(categoryName);
      categoryList.appendChild(categoryItem);

      // Add category to expense form options
      const expenseCategoryOption = document.createElement('option');
      expenseCategoryOption.textContent = category.name;
      document.getElementById('expense-category').appendChild(expenseCategoryOption);
    });
  }

  // Add Category Button - Show Modal
  addCategoryButton.addEventListener('click', function () {
    addCategoryModal.style.display = 'block';
  });

  closeCategoryModal.addEventListener('click', function () {
    addCategoryModal.style.display = 'none';
  });

  // Add Category Form Submission
  addCategoryForm.addEventListener('submit', function (e) {
    e.preventDefault();
    saveCategories();
    const categoryName = document.getElementById('category-name').value;
    const categoryColor = document.getElementById('category-color').value;

    // Check if category already exists
    console.log(expenseCategories)
    const categoryExists = expenseCategories.find(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase(),
    );

    if (categoryExists) {
      alert('Category already exists!');
      return;
    }

    expenseCategories.push({ name: categoryName, color: categoryColor });
    renderCategories();
    addCategoryModal.style.display = 'none';
    addCategoryForm.reset();
  });

  const addExpenseModal = document.getElementById('add-expense-modal');
  const closeModal = document.querySelector('#add-expense-modal .modal-content .close');

  // Add Expense Button - Show Modal
  addExpenseButton.addEventListener('click', function () {
    addExpenseModal.style.display = 'block';
  });

  // Close Modal
  closeModal.addEventListener('click', function () {
    addExpenseModal.style.display = 'none';
  });

  // Add Expense Form Submission
  expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();
    saveExpense();
    renderExpenses();
  });

  function renderExpenses() {
    // Clear the existing expense items
    const expensesList = document.getElementById('expensesList');
    expenseList.innerHTML = '';
  
    // Loop through the expenses array and create expense items
    expenses.forEach((expense) => {
      const selectedCategory = expenseCategories.find(
        (category) => category.name === expense.category
      );
  
      const expenseItem = document.createElement('div');
      expenseItem.classList.add('expense-item');
  
      const expenseInfo = document.createElement('div');
      expenseInfo.classList.add('expense-info');
  
      const expenseNameElement = document.createElement('h4');
      const expenseNameColor = document.createElement('span');
      expenseNameColor.classList.add('category-color-circle');
      expenseNameColor.style.backgroundColor = selectedCategory.color;
      expenseNameElement.appendChild(expenseNameColor);
      const expenseNameText = document.createElement('span');
      expenseNameText.textContent = expense.name;
      expenseNameElement.appendChild(expenseNameText);
  
      const expenseAmountElement = document.createElement('p');
      expenseAmountElement.textContent = `Amount: $${expense.amount}`;
  
      const expenseDateElement = document.createElement('p');
      const expenseDate = new Date(expense.date);
      const formattedDate = expenseDate.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
      expenseDateElement.textContent = `Date: ${formattedDate}`;
  
      const expenseCategoryElement = document.createElement('p');
      expenseCategoryElement.innerHTML = `Category:<span class="category-color" style="background-color: ${selectedCategory.color}"></span>${selectedCategory.name}`;
      
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = 'Delete';
      console.log(expense._id)
      deleteButton.addEventListener('click', function () {
        deleteExpense(expense._id);
      });

      expenseInfo.appendChild(expenseNameElement);
      expenseInfo.appendChild(expenseAmountElement);
      expenseInfo.appendChild(expenseDateElement);
      expenseInfo.appendChild(expenseCategoryElement);
      expenseItem.appendChild(expenseInfo);
      expenseList.appendChild(expenseItem);
      expenseInfo.appendChild(deleteButton);
    });
  
    // Recalculate budget remaining
    calculateBudgetRemaining();
  }  

    // Function to delete an expense
    function deleteExpense(expenseId) {
      const userId = localStorage.getItem('userId');
  
      $.ajax({
        url: 'http://127.0.0.1:3000/deleteExpense',
        type: 'POST',
        data: JSON.stringify({ userId: userId, expenseId: expenseId }),
        contentType: 'application/json',
        success: function (response) {
          // Remove the deleted expense from the expenses array
          expenses = expenses.filter((expense) => expense._id !== expenseId);
  
          // Render the updated expenses
          renderExpenses();
          
          console.log(expenses)
          alert('Expense deleted successfully!');
        },
        error: function (error) {
          alert('Error deleting expense.');
        },
      });
    }

  // Set Budget Button
setBudgetButton.addEventListener('click', function () {
  const budgetValue = parseFloat(budgetInput.value);
  saveBudget(budgetValue); // Call the saveBudget function
  budgetRemainingValue.textContent = budgetValue.toFixed(2);
  calculateBudgetRemaining();
});

// Update the saveBudget function
function saveBudget(budgetValue) { 
  const userId = localStorage.getItem('userId');

  $.ajax({
    url: 'http://127.0.0.1:3000/saveBudget',
    type: 'POST',
    data: JSON.stringify({ userId: userId, budget: budgetValue }), 
    contentType: 'application/json',
    success: function (response) {
      console.log(response); 
      //alert('Budget saved successfully!');
    },
    error: function (error) {
      alert('Error saving budget.');
    },
  });
}

function displaySavedBudget() {
  const userId = localStorage.getItem('userId');

  $.ajax({
    url: 'http://127.0.0.1:3000/getBudget',
    type: 'POST',
    data: JSON.stringify({ userId: userId }),
    contentType: 'application/json',
    success: function (response) {
      const budget = parseFloat(response.budget);
      if (!isNaN(budget)) {
        const budgetInput = document.getElementById('budget-input');
        budgetInput.value = budget.toFixed(2); // Display the fetched budget value in the input field

        const budgetRemainingValue = document.getElementById('budget-remaining-value');
        budgetRemainingValue.textContent = budget.toFixed(2); // Update the "Budget Remaining" section with the fetched budget value
        updateBudgetRemainingColor();

        calculateBudgetRemaining();
      } else {
        //alert('Error: Budget value is invalid');
      }
    },
    error: function (error) {
      alert('Error fetching budget.');
    },
  });
}

// Function to change the color of the "Budget Remaining" section based on the value
function updateBudgetRemainingColor() {
  const budgetRemainingValue = document.getElementById('budget-remaining-value');
  const dollarSign = document.getElementById('dollar-sign');
  const remainingValue = parseFloat(budgetRemainingValue.textContent);

  if (remainingValue >= 0) {
    // If the remaining value is non-negative, set the color to green
    budgetRemainingValue.style.color = 'green';
    dollarSign.style.color = 'green';
  } else {
    // If the remaining value is negative, set the color to red
    budgetRemainingValue.style.color = 'red';
    dollarSign.style.color = 'red';
  }
}

// Add an event listener to call the displaySavedBudget function when the page is loaded
window.addEventListener('load', function () {
  displaySavedBudget();
});

 // Calculate Budget Remaining
 function calculateBudgetRemaining() {
  const expenseItems = document.querySelectorAll('.expense-item');
  let totalExpenses = 0;
  expenseItems.forEach(function (item) {
    const expenseAmount = parseFloat(
      item.querySelector('.expense-info p:nth-child(2)').textContent.split('$')[1]
    );
    totalExpenses += expenseAmount;
  });
  const budgetValue = parseFloat(budgetRemainingValue.textContent);
  const remainingValue = budgetValue - totalExpenses;
  budgetRemainingValue.textContent = remainingValue.toFixed(2);
  updateBudgetRemainingColor();
}

  // Toggle Expense Options
  toggleOptions.forEach(function (option) {
    option.addEventListener('click', function () {
      toggleOptions.forEach(function (btn) {
        btn.classList.remove('active');
      });
      this.classList.add('active');
    });
  });

 

  function saveCategories() {
    const userId = localStorage.getItem('userId');
    const categoryName = document.getElementById('category-name').value;
    const categoryColor = document.getElementById('category-color').value;

    const category = {
      name: categoryName,
      color: categoryColor,
    };
    console.log(category)

    $.ajax({
      url: 'http://127.0.0.1:3000/saveCategories', 
      type: 'POST',
      data: JSON.stringify({ userId: userId, category: category }),
      contentType: 'application/json',
      success: function (response) {

        //alert('Category saved successfully!');
      },
      error: function (error) {
        alert('Error saving category.');
      },
    });
  }

  // Function to save an expense
function saveExpense() {
  const userId = localStorage.getItem('userId');
  const expenseName = document.getElementById('expense-name').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  const expenseDate = document.getElementById('expense-date').value;
  const expenseCategory = document.getElementById('expense-category').value;

  const expense = {
    name: expenseName,
    amount: expenseAmount,
    date: expenseDate,
    category: expenseCategory,
  };

  $.ajax({
    url: 'http://127.0.0.1:3000/saveExpense',
    type: 'POST',
    data: JSON.stringify({ userId: userId, expense: expense }),
    contentType: 'application/json',
    success: function (response) {
      //alert('Expense saved successfully!');
      fetchUserData();
    },
    error: function (error) {
      alert('Error saving expense.');
    },
  });

  // Call renderExpenses to refresh the list of expenses
}

  function fetchUserData() {
    const userId = localStorage.getItem('userId');
    $.ajax({
      url: 'http://127.0.0.1:3000/user',
      type: 'POST',
      data: JSON.stringify({ userId: userId }),
      contentType: 'application/json',
      success: function (response) {
        // Assign the fetched expenses and categories to the respective arrays
        expenses = response.expenses;
        expenseCategories = response.categories;
  
        // Render categories, expenses, and budget remaining
        renderCategories();
        renderExpenses();
        displaySavedBudget();
        calculateBudgetRemaining();
        
        // Check if the budget exists and is a number
        if (typeof response.budget === 'number') {
          budgetInput.value = response.budget.toFixed(2);
        }
      },
      error: function (error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data');
      },
    });
  }

  // Call fetchUserData when the page loads
  fetchUserData();

  // Render Categories on Page Load
  renderCategories();
});