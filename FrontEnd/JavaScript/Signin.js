document.addEventListener("DOMContentLoaded", () => {
    const formContainer = document.querySelector(".form-container");
  
    formContainer.addEventListener("submit", async (e) => {
      e.preventDefault();
      const targetForm = e.target;
  
      if (targetForm.id === "signup-form") {
        const username = document.getElementById("signup-username").value;
        const password = document.getElementById("signup-password").value;
  
        const response = await fetch("/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (response.ok) {
          alert("User created successfully");
          // Clear form inputs
          targetForm.reset();
        } else {
          const data = await response.json();
          alert(data.error);
        }
      }
    });
  });
  
  async function login() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
  
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    if (response.ok) {
      alert("Login successful");
      window.location.href = "HomePage.html";
    } else {
      const data = await response.json();
      alert(data.error);
    }
  }
  
  function toggleSignupForm() {
    var signupForm = document.getElementById("signup-form-container");
    signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
  }
  