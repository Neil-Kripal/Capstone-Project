// Function to fetch user data and update the page
function fetchUserData() {
  // Retrieve the userId from localStorage
  const userId = localStorage.getItem('userId');

  // Make an AJAX request to fetch data from the database based on the userId
  $.ajax({
    url: 'http://127.0.0.1:3000/user',
    type: 'POST', // Use POST instead of GET
    data: JSON.stringify({ userId: userId }), // Pass the userId as a parameter
    contentType: 'application/json',
    success: function (response) {
      const expenseCategories = response.categories; // Update the property name
      const expenses = response.expenses;
      console.log(expenseCategories);

      // Update the pie chart and expense list
      updatePieChart(expenseCategories, expenses);
      renderExpenseList(expenses, expenseCategories);
    },
    error: function (error) {
      console.error('Error fetching user data:', error);
      alert('Error fetching user data');
    },
  });
}


// Function to update the pie chart
function updatePieChart(expenseCategories, expenses) {
    const ctx = document.getElementById('expense-chart').getContext('2d');
    const expenseData = [];
    const categoryColors = [];
  
    expenseCategories.forEach((category) => {
      const categoryExpenses = expenses.filter((expense) => expense.category === category.name);
      const totalAmount = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      expenseData.push(totalAmount);
      categoryColors.push(category.color);
    });
  
    // Ensure the previous chart is destroyed before creating a new one
    if (window.expenseChart) {
      window.expenseChart.destroy();
    }
  
    window.expenseChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: expenseCategories.map((category) => category.name),
        datasets: [{
          data: expenseData,
          backgroundColor: categoryColors,
          borderColor: '#ffffff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
  
  // Function to render the expense list
  function renderExpenseList(expenses, expenseCategories) {
    const expenseListElement = document.getElementById('expense-list');
    expenseListElement.innerHTML = '';
  
    expenses.forEach((expense) => {
      const selectedCategory = expenseCategories.find((category) => category.name === expense.category);
  
      const expenseItem = document.createElement('li');
      expenseItem.textContent = expense.name;
  
      const categoryColorCircle = document.createElement('span');
      categoryColorCircle.classList.add('category-color-circle');
      categoryColorCircle.style.backgroundColor = selectedCategory.color;
  
      expenseItem.prepend(categoryColorCircle);
  
      expenseListElement.appendChild(expenseItem);
    });
  }

  fetchUserData();

  

  