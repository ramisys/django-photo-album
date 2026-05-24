(function () {
    document.addEventListener('DOMContentLoaded', function () {
        var toggles = document.querySelectorAll('[data-password-toggle]');

        toggles.forEach(function (toggle) {
            var fieldId = toggle.getAttribute('data-password-toggle');
            var passwordField = toggle.closest('.password-field');
            var passwordInput = fieldId ? document.getElementById('id_' + fieldId) : null;

            if (!passwordField || !passwordInput) {
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
    });
})();