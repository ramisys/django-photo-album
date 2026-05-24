(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var toggle = document.querySelector('[data-password-toggle]');
        var passwordField = document.querySelector('.password-field');
        var passwordInput = document.getElementById('id_password');

        if (!toggle || !passwordField || !passwordInput) {
            return;
        }

        toggle.addEventListener('click', function () {
            var isHidden = passwordInput.type === 'password';

            passwordInput.type = isHidden ? 'text' : 'password';
            passwordField.classList.toggle('is-visible', isHidden);
            toggle.setAttribute('aria-pressed', String(isHidden));
            toggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
            passwordInput.focus();
        });
    });
})();