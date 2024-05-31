document.getElementById('logoutLink').addEventListener('click', function () {
    localStorage.removeItem('loggedInUser'); // Assuming you store the logged-in user info in local storage
    window.location.href = 'login.html';
});
