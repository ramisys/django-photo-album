(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('[data-photo-form]');

        if (!form) {
            return;
        }

        const fileInput = form.querySelector('[data-photo-input]');
        const captionField = form.querySelector('[name="caption"]');
        const submitButton = form.querySelector('[data-submit-button]');
        const fileLabel = form.querySelector('[data-photo-file-label]');
        const imageError = form.querySelector('[data-field-error="image"]');
        const captionError = form.querySelector('[data-field-error="caption"]');

        function updateFileLabel() {
            if (!fileInput || !fileLabel) {
                return;
            }

            if (fileInput.files && fileInput.files.length > 0) {
                fileLabel.textContent = fileInput.files[0].name;
            }
        }

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
            let isValid = true;
            const fileWrap = form.querySelector('[data-field-wrap="image"]');

            if (fileInput && fileInput.required && !(fileInput.files && fileInput.files.length > 0)) {
                setFieldState(fileWrap, imageError, 'Image is required');
                isValid = false;
            } else {
                setFieldState(fileWrap, imageError, '');
            }

            if (captionField && captionError) {
                setFieldState(form.querySelector('[data-field-wrap="caption"]'), captionError, '');
            }

            return isValid;
        }

        if (fileInput) {
            fileInput.addEventListener('change', updateFileLabel);
        }

        if (captionField && captionError) {
            captionField.addEventListener('input', function () {
                setFieldState(form.querySelector('[data-field-wrap="caption"]'), captionError, '');
            });
        }

        form.addEventListener('submit', function (event) {
            if (!validate()) {
                event.preventDefault();
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