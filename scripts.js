function togglePassword() {
    var passwordInput = document.getElementById('password');
    var passwordType = passwordInput.getAttribute('type');
    passwordInput.setAttribute('type', passwordType === 'password' ? 'text' : 'password');
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    window.location.href = `welcome.html?username=${encodeURIComponent(username)}`;
});
