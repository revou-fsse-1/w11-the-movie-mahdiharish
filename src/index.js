// CHECK USERNAME BY INPUT
const checkLoginUsername = () => {
  const usernameRegister = document.getElementById("loginUsername").value;
  const usernameRegex = /^[a-zA-Z]{6,}$/;
  if (!usernameRegex.test(usernameRegister)) {
    document.getElementById("usernameValidation").innerHTML =
      "Minimum 6 characters";
  } else {
    document.getElementById("usernameValidation").innerHTML = "";
  }
};
document
  .getElementById("loginUsername")
  .addEventListener("input", checkLoginUsername);

// CHECK PASSWORD BY INPUT
const checkLoginPassword = () => {
  const passwordRegister = document.getElementById("loginPassword").value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(passwordRegister)) {
    document.getElementById("passwordValidation").innerHTML =
      "Must contain at least 8 characters, one uppercase, lowercase, and number!";
  } else {
    document.getElementById("passwordValidation").innerHTML = "";
  }
};
document
  .getElementById("loginPassword")
  .addEventListener("input", checkLoginPassword);

// USER LOGIN
const API_USER_ENDPOINT = "http://localhost:3000/users";
document
  .getElementById("loginBtn")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const username = document.getElementById("loginUsername");
    const password = document.getElementById("loginPassword");
    let validUsername = true;
    let validPassword = true;
    checkLoginUsername();
    checkLoginPassword();
    if (document.getElementById("usernameValidation").innerHTML !== "") {
      validUsername = false;
    }
    if (document.getElementById("passwordValidation").innerHTML !== "") {
      validPassword = false;
    }
    if (validUsername && validPassword) {
      try {
        const response = await fetch(API_USER_ENDPOINT);
        const users = await response.json();
        const registeredUser = users.find(
          (user) => username.value === user.username
        );
        if (!registeredUser) {
          document.getElementById("userValidation").innerHTML =
            "User is not registered yet";
        } else if (password.value !== registeredUser.password) {
          document.getElementById("userValidation").innerHTML =
            "Password is incorrect!";
        } else {
          alert("Login successful! Redirecting...");
          window.location.href = "./homepage.html";
        }
      } catch (error) {
        console.error(error);
        document.getElementById("userValidation").innerHTML =
          "Failed to fetch user data. Please try again later.";
      }
    }
  });
