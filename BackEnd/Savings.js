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
        <div class="goal-info">
          <h4>${goalName}</h4>
          <p>Amount: $${goalAmount}</p>
          <p>Due Date: ${goalDueDate}</p>
          <p>Invite People: ${goalInvitePeople}</p>
        </div>
        <div class="goal-progress">
          <div class="goal-progress-bar"></div>
          <span class="goal-progress-text"></span>
        </div>
        <button class="goal-add-funds-button">Add Funds</button>
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
      });
    });
  });
  