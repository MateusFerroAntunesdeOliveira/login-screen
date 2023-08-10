const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const togglePassword = document.getElementById('togglePassword');

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;
        
        try {
            const response = await fetch("users.json");
            const data = await response.json();
            const users = data.users.find(user => user.username === username && user.password === password);

            if (users) {
                alert("Usuario logado com sucesso");
            } else {
                alert("Usuario ou senha incorretos, tente novamente mais tarde!");
            }
        } catch (error) {
            console.log("Erro: ", error);
        }
    });
});

togglePassword.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        togglePassword.textContent = 'Ocultar';
    } else {
        passwordInput.type = 'password';
        togglePassword.textContent = 'Mostrar';
    }
});
