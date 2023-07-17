document.addEventListener("DOMContentLoaded", function() {
  // Variables
  const addGoalButton = document.querySelector(".add-goal-button");
  const addGoalModal = document.getElementById("add-goal-modal");
  const closeModal = document.querySelector(".close");
  const goalForm = document.getElementById("add-goal-form");
  const goalList = document.getElementById("goal-list");

  // Add Goal Button - Show Modal
  addGoalButton.addEventListener("click", function() {
    addGoalModal.style.display = "block";
  });

  // Close Modal
  closeModal.addEventListener("click", function() {
    addGoalModal.style.display = "none";
  });

  // Add Goal Form Submission
  goalForm.addEventListener("submit", function(e) {
    e.preventDefault();
    // Get form values
    const goalName = document.getElementById("goal-name").value;
    const goalAmount = parseFloat(document.getElementById("goal-amount").value);
    const goalDueDate = document.getElementById("goal-due-date").value;
    const goalInvitePeople = document.getElementById("invite-people").value;

    // Create goal item
    const goalItem = document.createElement("div");
    goalItem.classList.add("goal-item");
    goalItem.innerHTML = `
      <div class="goal-info" style="background-color: #D0FFD7; border-radius:10px; padding: 10px;">
        <h4>${goalName}</h4>
        <p>Amount: $${goalAmount}</p>
        <p>Due Date: ${goalDueDate}</p>
        <p>Invite People: ${goalInvitePeople}</p>
      </div>
      <div class="goal-progress">
        <div class="goal-progress-bar"></div>
        <span class="goal-progress-text">0%</span>
      </div>
      <div class="goal-funds">
        <p>Total Funds: $0</p>
      </div>
      <button class="goal-add-funds-button" style="padding: 5px 10px; margin-top: 10px;">Add Funds</button>
    `;

    // Append goal item to the goal list
    goalList.appendChild(goalItem);

    // Clear form inputs
    goalForm.reset();

    // Set progress bar width based on initial goal amount
    const progressBar = goalItem.querySelector(".goal-progress-bar");
    const progressText = goalItem.querySelector(".goal-progress-text");
    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    // Add Funds Button
    const addFundsButton = goalItem.querySelector(".goal-add-funds-button");
    addFundsButton.addEventListener("click", function() {
      const currentWidth = parseFloat(progressBar.style.width);
      const fundsToAdd = parseFloat(prompt("Enter the amount to add:"));
      const newWidth = currentWidth + (fundsToAdd / goalAmount) * 100;
      progressBar.style.width = `${newWidth}%`;
      progressText.textContent = `${newWidth.toFixed(2)}%`;

      // Update total funds
      const goalFunds = goalItem.querySelector(".goal-funds");
      const totalFunds = parseFloat(goalFunds.textContent.replace("Total Funds: $", ""));
      const newTotalFunds = totalFunds + fundsToAdd;
      goalFunds.textContent = `Total Funds: $${newTotalFunds}`;
    });
  });

  function saveSavingGoal() {
    const userId = localStorage.getItem("userId");
    const username = document.getElementById("login-username").value;
    const goalName = document.getElementById("goal-name").value;
    const goalAmount = parseFloat(document.getElementById("goal-amount").value);
    const goalDueDate = document.getElementById("goal-due-date").value;
    const invitePeople = document.getElementById("invite-people").value;
    const participants = invitePeople.split(",").map((participant) => participant.trim());
  
    const savingGoal = {
      name: goalName,
      amount: goalAmount,
      dueDate: goalDueDate,
      participants: participants,
    };
  
    $.ajax({
      url: "http://127.0.0.1:3000/saveSavingGoal",
      type: "POST",
      data: { userId: userId, savingGoal: savingGoal },
      success: function (response) {
        alert("Saving goal saved successfully!");
      },
      error: function (error) {
        alert("Error saving saving goal.");
      },
    });
  

     // Fetch user data
  function fetchUserData() {
    const username = document.getElementById('login-username').value;

    $.ajax({
      url: 'http://127.0.0.1:3000/login',
      type: 'POST',
      data: { username: username },
      success: function (response) {
        // Render saving goals
        renderSavingGoals(response.savingGoals);
      },
      error: function (error) {
        console.error('Error fetching user data:', error);
        alert('Error fetching user data');
      },
    });
  }

  // Call fetchUserData when the page loads
  fetchUserData();
}});
