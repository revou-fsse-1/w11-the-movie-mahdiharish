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

// REGISTER NEW USER
