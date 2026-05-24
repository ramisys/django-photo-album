(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const form = document.querySelector('[data-photo-form]');

        if (!form) {
            return;
        }

        const imageInput = form.querySelector('[name="image"]');
        const captionField = form.querySelector('[name="caption"]');
        const submitButton = form.querySelector('[data-submit-button]');
        const imageError = form.querySelector('[data-field-error="image"]');
        const captionError = form.querySelector('[data-field-error="caption"]');

        function setFieldState(fieldWrap, errorElement, message) {
            if (!fieldWrap || !errorElement) {
                return;
            }

            const hasMessage = Boolean(message);
            fieldWrap.classList.toggle('has-error', hasMessage);
            errorElement.textContent = message || '';
            errorElement.hidden = !hasMessage;
        }

        form.addEventListener('submit', function (event) {
            let isValid = true;

            if (!imageInput || !imageInput.value) {
                event.preventDefault();
                setFieldState(form.querySelector('[data-field-wrap="image"]'), imageError, 'Photo is required');
                isValid = false;
            } else {
                setFieldState(form.querySelector('[data-field-wrap="image"]'), imageError, '');
            }

            if (captionField && captionError) {
                setFieldState(form.querySelector('[data-field-wrap="caption"]'), captionError, '');
            }

            if (!isValid) {
                return;
            }

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = form.dataset.submitLabel || 'Saving...';
            }
        });

        if (imageInput) {
            imageInput.addEventListener('change', function () {
                if (imageInput.value) {
                    setFieldState(form.querySelector('[data-field-wrap="image"]'), imageError, '');
                }
            });
        }

        if (captionField && captionError) {
            captionField.addEventListener('input', function () {
                setFieldState(form.querySelector('[data-field-wrap="caption"]'), captionError, '');
            });
        }
    });
})();