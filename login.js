const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

let errorCounter = 1;

let data = {};

document.addEventListener('DOMContentLoaded', async function () {
    const response = await fetch("users.json");
    data = await response.json();
});

// Evento executado ao clicar no botão de Login
loginBtn.addEventListener('click', function (event) {
    event.preventDefault();
    const username = usernameInput.value;
    const password = passwordInput.value;
    try {
        const user = data.users.find(user => user.username === username);
        if (user) {
            if (user.blocked) {
                enableErrorArea("Muitas tentativas erradas. Conta Bloqueada");
            }
            else if (user.password === password) {
                document.body.style.backgroundColor = "#57ff56";
                alert("Bem vindo, usuário");
                document.getElementById('errorMessageDiv').style.display = "none";
                errorCounter = 0;
            } else {
                if (errorCounter++ < 5) {
                    console.log(errorCounter);
                    document.body.style.backgroundColor = "#ff5556";
                    var message = "Login ou senha incorreto, tente novamente mais tarde.";
                    if (errorCounter > 1) {
                        message = message.concat(" Tentativas restantes ").concat(5 - errorCounter + 1);
                    }
                    enableErrorArea(message);
                } else {
                    data.users.find(user => user.username === username).blocked = true;
                    enableErrorArea("Muitas tentativas erradas. Conta Bloqueada");
                }
            }
        } else {
            enableErrorArea("Usuário não encontrado.");
        }
    } catch (error) {
        console.log("Erro: ", error);
    }
});

// Evento ao clicar no botão de mostrar/ocultar a senha
togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'Mostrar';
    }
});

function enableErrorArea(message) {
    document.getElementById('errorMessageDiv').style.display = "block";
    document.getElementById('errorMessage').innerText = message;
}
