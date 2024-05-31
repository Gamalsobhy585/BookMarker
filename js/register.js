let userNameInput = document.getElementById("userName");
let emailInput = document.getElementById("email");
let passwordInput = document.getElementById("password");
let confirmPasswordInput = document.getElementById("confirmPassword");
let usersContainer = [];

document.getElementById("registerBtn").addEventListener("click", function () {
    if (validateUser("userName") && validateUser("email") && validateUser("password") && validateUser("confirmPassword")) {
        addUser();
        window.location.href = "login.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<ul>
                <li>Username  contain  3 characters or more </li>
                <li>Email  be valid</li>
                <li>Password  be at least 8 characters long</li>
                <li>Password  contain an upper case letter</li>
                <li>Password  contain a lower case letter</li>
                <li>Password  contain a number</li>
                <li>Password  contain a special character</li>
                <li>Passwords  match</li>
            </ul>`
        });
    }
});

async function addUser() {
    let hashedPassword = await hashPassword(passwordInput.value);
    let user = {
        userName: userNameInput.value,
        email: emailInput.value,
        password: hashedPassword
    };
    usersContainer.push(user);
    localStorage.setItem('bookmarkerUsers', JSON.stringify(usersContainer));
    clearForm();
}

function clearForm() {
    userNameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
}

function validateUser(field) {
    let regex = {
        userName: /^[a-zA-Z0-9_-]{3,15}$/, 
        email: /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/,
        password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
    };

    if (field === 'confirmPassword') {
        if (confirmPasswordInput.value !== passwordInput.value) {
            confirmPasswordInput.classList.add('is-invalid');
            return false;
        } else {
            confirmPasswordInput.classList.remove('is-invalid');
            confirmPasswordInput.classList.add('is-valid');
            return true;
        }
    } else {
        let input = document.getElementById(field);
        if (regex[field].test(input.value)) {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            return true;
        } else {
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        }
    }
}
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hex(hash);
}

function hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}
function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}