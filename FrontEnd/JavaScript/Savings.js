document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const addGoalButton = document.querySelector(".add-goal-button");
  const addGoalModal = document.getElementById("add-goal-modal");
  const closeModal = document.querySelector(".close");
  const goalForm = document.getElementById("add-goal-form");
  const goalList = document.getElementById("goal-list");

  let Goals = [];

  let fundsToAdd = 0;

  let goalIndex = 0;

  // Function to add funds to a goal item
  function addFundsToGoal(goalItem, goalName, goalAmount, goalDueDate, goalInvitePeople) {
    const addFundsButton = goalItem.querySelector(".goal-add-funds-button");
    const progressBar = goalItem.querySelector(".goal-progress-bar");
    const progressText = goalItem.querySelector(".goal-progress-text");
    const goalFunds = goalItem.querySelector(".goal-funds");

    // Find the corresponding goal in the Goals array
   goalIndex = Goals.findIndex((g) => g.name === goalName);
    

    addFundsButton.addEventListener("click", function () {
      goalIndex = Goals.findIndex((g) => g.name === goalName);
      //alert(goalIndex);
      const currentWidth = parseFloat(progressBar.style.width);
      //alert(prompt("Enter the amount to add:"));
      fundsToAdd = parseFloat(prompt("Enter the amount to add:"));

      if (isNaN(fundsToAdd) || fundsToAdd <= 0) {
        alert("Please enter a valid amount.");
        return;
      }

      const newWidth = currentWidth + (fundsToAdd / goalAmount) * 100;
      progressBar.style.width = `${newWidth}%`;
      progressText.textContent = `${newWidth.toFixed(2)}%`;

      // Update the fundsAdded value in the Goals array
      if (goalIndex !== -1) {
        Goals[goalIndex].fundsAdded += fundsToAdd;
        // Update the displayed total funds
        goalFunds.textContent = `Total Funds: $${isNaN(Goals[goalIndex].fundsAdded) ? 0 : Goals[goalIndex].fundsAdded}`;
        console.log(fundsToAdd)
        //console.log(fundsAdded)
        

        // Call the updateFundsAddedInDatabase function to update the fundsAdded value in the database
        updateFundsAddedInDatabase(goalName, Goals[goalIndex].fundsAdded);
      }
    });
  }

  // Close Modal
  closeModal.addEventListener("click", function () {
    addGoalModal.style.display = "none";
  });

   // Show Modal when "Add Saving Goal" button is clicked
   addGoalButton.addEventListener("click", function () {
    addGoalModal.style.display = "block";
  });

  // Fetch user data and render saving goals on page load or refresh
  function fetchUserData() {
    const userId = localStorage.getItem("userId");

    // Check if userId exists before making AJAX request
    if (!userId) {
      alert("User ID not found.");
      return;
    }

    // Fetch user data from the server
    $.ajax({
      url: "http://127.0.0.1:3000/user",
      type: "POST",
      data: JSON.stringify({ userId: userId }),
      contentType: "application/json",
      success: function (response) {
        // Store the fetched saving goals
        Goals = response.savingGoals;

        // Render the saving goals
        renderSavingGoals();
      },
      error: function (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data");
      },
    });
  }

  // Function to update fundsAdded value in the database
  function updateFundsAddedInDatabase(goalName, fundsAdded) {
    const userId = localStorage.getItem("userId");

    // Send the updated fundsAdded value to the server to update it in the database
    $.ajax({
      url: "http://127.0.0.1:3000/updateFundsAdded",
      type: "POST",
      data: JSON.stringify({ userId: userId, goalName: goalName, fundsAdded: fundsAdded }),
      contentType: "application/json",
      success: function (response) {
        console.log("FundsAdded updated successfully!");
        console.log(fundsToAdd);
      },
      error: function (error) {
        console.error("Error updating fundsAdded:", error);
        alert("Error updating fundsAdded");
      },
    });
  }

  // Function to render saving goals
  function renderSavingGoals() {
    // Clear existing goals
    goalList.innerHTML = "";

    // Iterate over saving goals and create goal items
    Goals.forEach((goal) => {
      // Calculate the initial progress based on the funds already added
      const initialProgress = (goal.fundsAdded / goal.amount) * 100 || 0;

      const goalItem = document.createElement("div");
      goalItem.classList.add("goal-item");
      goalItem.innerHTML = `
        <div class="goal-info" style="background-color: #D0FFD7; border-radius:10px; padding: 10px;">
          <h4>${goal.name}</h4>
          <p>Amount: $${goal.amount}</p>
          <p>Due Date: ${new Date(goal.dueDate).toLocaleDateString("en-US")}</p>
          <p>Invite People: ${goal.participants.length > 0 ? goal.participants.join(", ") : "None"}</p>
        </div>
        <div class="goal-progress">
          <div class="goal-progress-bar" style="width: ${initialProgress}%;"></div>
          <span class="goal-progress-text">${initialProgress.toFixed(2)}%</span>
        </div>
        <div class="goal-funds">
          <p>Total Funds: $${isNaN(goal.fundsAdded) ? 0 : goal.fundsAdded}</p>
        </div>
        <button class="goal-add-funds-button" style="padding: 5px 10px; margin-top: 10px;">Add Funds</button>
      `;

      // Append goal item to the goal list
      goalList.appendChild(goalItem);

      // Add Funds Button
      addFundsToGoal(goalItem, goal.name, goal.amount);
    });
  }

  // Add Goal Form Submission
  goalForm.addEventListener("submit", async function (e) {
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
        <p>Due Date: ${new Date(goalDueDate).toLocaleDateString("en-US")}</p>
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

     // Add Funds Button
     addFundsToGoal(goalItem, goalName, goalAmount, goalDueDate, goalInvitePeople);

     // Clear form inputs
     goalForm.reset();

    // Set progress bar width based on initial goal amount
    const progressBar = goalItem.querySelector(".goal-progress-bar");
    const progressText = goalItem.querySelector(".goal-progress-text");
    progressBar.style.width = "0%";
    progressText.textContent = "0%";

    // Push the new goal to the Goals array and then save it
    Goals.push({ name: goalName, amount: goalAmount, dueDate: goalDueDate, participants: goalInvitePeople.split(","), fundsAdded:0 });
    saveSavingGoal(goalName, goalAmount, goalDueDate, goalInvitePeople, 0);
  });

  function saveSavingGoal(goalName, goalAmount, goalDueDate, goalInvitePeople, fundsAdded) {
    return new Promise((resolve, reject) => {
      const userId = localStorage.getItem("userId");
      const participants = goalInvitePeople.split(",").map((participant) => participant.trim());

      const dueDate = new Date(goalDueDate);

      const savingGoal = {
        name: goalName,
        amount: goalAmount,
        dueDate: dueDate.toLocaleDateString("en-US", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        }),
        participants: participants,
        fundsAdded: fundsAdded,
      };

      // Send the savingGoal data to the server to update it in the database
      $.ajax({
        url: "http://127.0.0.1:3000/saveSavingGoal",
        type: "POST",
        data: JSON.stringify({ userId: userId, savingGoal: savingGoal }),
        contentType: "application/json",
        success: function (response) {
          console.log(savingGoal);
          alert("Saving goal saved successfully!");
          resolve(); // Resolve the promise when the update is successful
        },
        error: function (error) {
          alert("Error saving saving goal.");
          reject(error); // Reject the promise if there's an error
        },
      });
    });
  }

  // Call fetchUserData when the page loads or refreshes
  fetchUserData();
});