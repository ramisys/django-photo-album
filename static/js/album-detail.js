(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const detail = document.querySelector('[data-album-detail]');

        if (!detail) {
            return;
        }

        const shareButton = detail.querySelector('[data-share-button]');
        const downloadButton = detail.querySelector('[data-download-button]');
        const deleteModal = detail.querySelector('[data-delete-modal]');
        const openDeleteButton = detail.querySelector('[data-open-delete-modal]');
        const lightbox = detail.querySelector('[data-lightbox]');
        const lightboxImage = detail.querySelector('[data-lightbox-image]');
        const lightboxTitle = detail.querySelector('[data-lightbox-title]');
        const lightboxCaption = detail.querySelector('[data-lightbox-caption]');
        const lightboxDate = detail.querySelector('[data-lightbox-date]');
        const photoCards = detail.querySelectorAll('[data-photo-card]');

        function openLightbox(card) {
            if (!lightbox || !lightboxImage || !lightboxTitle || !lightboxCaption || !lightboxDate) {
                return;
            }

            lightboxImage.src = card.dataset.photoSrc || '';
            lightboxImage.alt = card.dataset.photoAlt || card.dataset.photoTitle || '';
            lightboxTitle.textContent = card.dataset.photoTitle || '';
            lightboxCaption.textContent = card.dataset.photoCaption || 'No caption provided.';
            lightboxDate.textContent = card.dataset.photoUploaded || '';
            lightbox.hidden = false;
            document.body.classList.add('modal-open');

            const closeButton = lightbox.querySelector('[data-lightbox-close]');
            if (closeButton) {
                closeButton.focus();
            }
        }

        function closeLightbox() {
            if (!lightbox || lightbox.hidden) {
                return;
            }

            lightbox.hidden = true;
            document.body.classList.remove('modal-open');

            if (lightboxImage) {
                lightboxImage.src = '';
                lightboxImage.alt = '';
            }
        }

        function openDeleteModal() {
            if (!deleteModal) {
                return;
            }

            deleteModal.hidden = false;
            document.body.classList.add('modal-open');

            const cancelButton = deleteModal.querySelector('[data-delete-cancel]');
            if (cancelButton) {
                cancelButton.focus();
            }
        }

        function closeDeleteModal() {
            if (!deleteModal || deleteModal.hidden) {
                return;
            }

            deleteModal.hidden = true;
            document.body.classList.remove('modal-open');
        }

        function triggerFileDownload(filename, content) {
            const blob = new Blob([content], { type: 'application/json;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');

            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
        }

        photoCards.forEach(function (card) {
            card.addEventListener('click', function () {
                openLightbox(card);
            });
        });

        if (lightbox) {
            lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (button) {
                button.addEventListener('click', closeLightbox);
            });

            lightbox.addEventListener('click', function (event) {
                if (event.target === lightbox) {
                    closeLightbox();
                }
            });
        }

        if (openDeleteButton) {
            openDeleteButton.addEventListener('click', openDeleteModal);
        }

        if (deleteModal) {
            deleteModal.querySelectorAll('[data-delete-cancel]').forEach(function (button) {
                button.addEventListener('click', closeDeleteModal);
            });

            deleteModal.addEventListener('click', function (event) {
                if (event.target === deleteModal) {
                    closeDeleteModal();
                }
            });
        }

        if (shareButton) {
            shareButton.addEventListener('click', async function () {
                const shareData = {
                    title: document.title,
                    text: 'View this album in Photo Album.',
                    url: window.location.href,
                };

                if (navigator.share) {
                    try {
                        await navigator.share(shareData);
                        return;
                    } catch (error) {
                        // Fall through to clipboard copy.
                    }
                }

                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(window.location.href);
                    return;
                }

                window.prompt('Copy album link', window.location.href);
            });
        }

        if (downloadButton) {
            downloadButton.addEventListener('click', function () {
                const photos = Array.from(photoCards).map(function (card) {
                    return {
                        title: card.dataset.photoTitle || '',
                        caption: card.dataset.photoCaption || '',
                        uploaded_at: card.dataset.photoUploaded || '',
                        image_url: card.dataset.photoSrc || '',
                    };
                });

                const payload = {
                    album: document.title.replace(' | Photo Album', ''),
                    url: window.location.href,
                    photos: photos,
                };

                triggerFileDownload('album-export.json', JSON.stringify(payload, null, 2));
            });
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closeLightbox();
                closeDeleteModal();
            }
        });
    });
})();