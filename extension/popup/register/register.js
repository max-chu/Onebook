const registerForm = document.getElementById("register-form");
const registerButton = document.getElementById("register-form-submit");

registerButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = registerForm.username.value;
    const password = registerForm.password.value;
    console.log("username: " + username + "\npassword: " + password);
})