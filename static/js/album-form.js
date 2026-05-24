(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('[data-album-form]');

        if (!form) {
            return;
        }

        const titleField = form.querySelector('[name="title"]');
        const descriptionField = form.querySelector('[name="description"]');
        const submitButton = form.querySelector('[data-submit-button]');
        const titleError = form.querySelector('[data-field-error="title"]');
        const descriptionError = form.querySelector('[data-field-error="description"]');

        function setFieldState(fieldWrap, errorElement, message) {
            if (!fieldWrap || !errorElement) {
                return;
            }

            const hasMessage = Boolean(message);
            fieldWrap.classList.toggle('has-error', hasMessage);
            errorElement.textContent = message || '';
            errorElement.hidden = !hasMessage;
        }

        function validate() {
            const titleValue = titleField ? titleField.value.trim() : '';
            const titleWrap = form.querySelector('[data-field-wrap="title"]');
            let isValid = true;

            if (!titleValue) {
                setFieldState(titleWrap, titleError, 'Title is required');
                isValid = false;
            } else {
                setFieldState(titleWrap, titleError, '');
            }

            if (descriptionField && descriptionError) {
                setFieldState(form.querySelector('[data-field-wrap="description"]'), descriptionError, '');
            }

            return isValid;
        }

        if (titleField) {
            titleField.addEventListener('input', function () {
                if (titleField.value.trim()) {
                    setFieldState(form.querySelector('[data-field-wrap="title"]'), titleError, '');
                }
            });
        }

        if (descriptionField && descriptionError) {
            descriptionField.addEventListener('input', function () {
                setFieldState(form.querySelector('[data-field-wrap="description"]'), descriptionError, '');
            });
        }

        form.addEventListener('submit', function (event) {
            if (!validate()) {
                event.preventDefault();

                if (titleField) {
                    titleField.focus();
                }

                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = form.dataset.submitLabel || 'Saving...';
            }

            form.classList.add('is-submitting');
        });
    });
})();