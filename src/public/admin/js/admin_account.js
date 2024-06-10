document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('account_change-password-form');
    var newPassword = document.getElementById('new-password');
    var confirmPassword = document.getElementById('confirm-password');

    newPassword.oninvalid = function (event) {
        event.target.setCustomValidity('Vui lòng điền vào trường này');
    };

    confirmPassword.oninvalid = function (event) {
        event.target.setCustomValidity('Vui lòng điền vào trường này');
    };

    newPassword.oninput = function (event) {
        event.target.setCustomValidity('');
    };

    confirmPassword.oninput = function (event) {
        event.target.setCustomValidity('');
    };
});
