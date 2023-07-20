async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("http://127.0.0.1:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    const data = await response.json();
    const userId = data.username;
  
    localStorage.setItem("userId", userId);
    
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

async function signup() {
  
    const username = document.getElementById("signup-username").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch("http://127.0.0.1:3000/signup", {
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
