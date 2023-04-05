// CHECK USERNAME BY INPUT
const checkRegisterUsername = () => {
  const usernameRegister = document.getElementById("registerUsername").value;
  const usernameRegex = /^[a-zA-Z]{6,}$/;
  if (!usernameRegex.test(usernameRegister)) {
    document.getElementById("usernameValidation").innerHTML =
      "Minimum 6 characters";
  } else {
    document.getElementById("usernameValidation").innerHTML = "";
  }
};
document
  .getElementById("registerUsername")
  .addEventListener("input", checkRegisterUsername);

// CHECK EMAIL BY INPUT
const checkRegisterEmail = () => {
  const emailRegister = document.getElementById("registerEmail").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailRegister)) {
    document.getElementById("emailValidation").innerHTML = "Invalid Email";
  } else {
    document.getElementById("emailValidation").innerHTML = "";
  }
};
document
  .getElementById("registerEmail")
  .addEventListener("input", checkRegisterEmail);

// CHECK PASSWORD BY INPUT
const checkRegisterPassword = () => {
  const passwordRegister = document.getElementById("registerPassword").value;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(passwordRegister)) {
    document.getElementById("passwordValidation").innerHTML =
      "Must contain at least 8 characters, one uppercase, lowercase, and number!";
  } else {
    document.getElementById("passwordValidation").innerHTML = "";
  }
};
document
  .getElementById("registerPassword")
  .addEventListener("input", checkRegisterPassword);

// CHECK CONFIRM PASSWORD BY INPUT
const checkConfirmPassword = () => {
  const passwordConfirmation = document.getElementById("passwordConfirm").value;
  const passwordRegistration =
    document.getElementById("registerPassword").value;
  if (passwordConfirmation !== passwordRegistration) {
    document.getElementById("confirmPasswordValidation").innerHTML =
      "Password does not match";
  } else {
    document.getElementById("confirmPasswordValidation").innerHTML = "";
  }
};
document
  .getElementById("passwordConfirm")
  .addEventListener("input", checkConfirmPassword);

const API_USER_ENDPOINT = "http://localhost:3000/users";

// REGISTER NEW USER TO API USER ENDPOINT
let registerNewUser = async () => {
  try {
    const response = await fetch(API_USER_ENDPOINT, {
      method: "POST",
      body: JSON.stringify({
        username: `${document.getElementById("registerUsername").value}`,
        email: `${document.getElementById("registerEmail").value}`,
        password: `${document.getElementById("registerPassword").value}`,
        id: ``,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const user = await response.json();
    console.log(user);
  } catch (error) {
    console.error(error);
  }
};

// REGISTER NEW USER AND REDIRECT TO LOGIN PAGE
const usernameInput = document.getElementById("registerUsername");
const emailInput = document.getElementById("registerEmail");
const passwordInput = document.getElementById("registerPassword");
document
  .getElementById("registerBtn")
  .addEventListener("click", async function (e) {
    e.preventDefault();
    const username = usernameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    try {
      const response = await fetch(API_USER_ENDPOINT);
      const users = await response.json();
      const isUserRegistered = users.some((user) => user.username === username);
      if (isUserRegistered) {
        document.getElementById("userValidation").innerHTML =
          "User is already registered!";
        return;
      }
      const newUser = { username, email, password };
      const createUserResponse = await fetch(API_USER_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!createUserResponse.ok) {
        throw new Error("Failed to create user");
      }
      window.location.href = "./index.html";
    } catch (error) {
      console.error(error);
      document.getElementById("userValidation").innerHTML =
        "Failed to register user. Please try again later.";
    }
  });
