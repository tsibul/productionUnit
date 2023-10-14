// logout_modal.js
const authModal = document.getElementById('authModal');
const closeButtons = document.querySelectorAll('.login__close');
const loginForm = document.getElementById('login-form');
const logoutForm = document.getElementById('logout-form');


function openModal() {
    authModal.style.display = 'block';
}

function closeModal() {
    authModal.style.display = 'none';
    if (document.querySelector("#razvModal") != null) {
        document.querySelector("#razvModal").style.display = 'none';
        document.querySelector('#rzv-quantity').value = 0;
        document.querySelector('#delivered_to_customer').innerHTML = '';
    }
    if (document.querySelector('#deliverModal') != null) {
        document.querySelector("#deliverModal").style.display = 'none';
        document.querySelector('#rzv-return-quantity').value = 0;
        document.querySelector('#to_return_from_customer').innerHTML = '';
    }
    if (document.querySelector('#customerModal') != null) {
        document.querySelector("#customerModal").style.display = 'none';
    }
    if (document.querySelector('#driverModal') != null) {
        document.querySelector("#driverModal").style.display = 'none';
    }
}

closeButtons.forEach(function (row) {
    row.addEventListener("click", () => {
        // Get the data from the clicked row
        closeModal()
    });
});

// При клике на кнопку "вход" отображаем форму входа и скрываем форму выхода
document.getElementById('login-button').addEventListener('click', function () {
    loginForm.style.display = 'block';
    logoutForm.style.display = 'none';
    openModal();
});

// При клике на кнопку "выход" отображаем форму выхода и скрываем форму входа
document.getElementById('logout-button').addEventListener('click', function () {
    logoutForm.style.display = 'block';
    loginForm.style.display = 'none';
    openModal();
});
