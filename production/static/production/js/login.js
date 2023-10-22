// logout_modal.js
const authModal = document.getElementById('authModal');
const closeButtons = document.querySelectorAll('.login__close');
const loginForm = document.getElementById('login-form');
const logoutForm = document.getElementById('logout-form');


function openModal(modal) {
    modal.style.display = 'block';
}

function closeModal(click) {
    const modal = click.closest('.login');
    const inputs = modal.querySelectorAll('input');
    const textAreas = modal.querySelectorAll('textarea');
    [...inputs].forEach(e => {e.value = null});
    [...textAreas].forEach(e => {e.textContent = ''});
    modal.style.display = 'none';
}

closeButtons.forEach(row => {
    row.addEventListener("click", (e) => {
        closeModal(e.target);
    });
});

// При клике на кнопку "вход" отображаем форму входа и скрываем форму выхода
document.getElementById('login-button').addEventListener('click', function () {
    loginForm.style.display = 'block';
    logoutForm.style.display = 'none';
    openModal(authModal);
});

// При клике на кнопку "выход" отображаем форму выхода и скрываем форму входа
document.getElementById('logout-button').addEventListener('click', function () {
    logoutForm.style.display = 'block';
    loginForm.style.display = 'none';
    openModal(authModal);
});
