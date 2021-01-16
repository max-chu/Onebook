const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");



loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value;
    const password = loginForm.password.value;
    console.log("username: " + username + "\npassword: " + password);
})

chrome.identity.getAuthToken({ 'interactive': true }, function(token) {
    console.log(token);
  });

