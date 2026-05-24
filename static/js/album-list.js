(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const browser = document.querySelector('[data-album-browser]');
        const dataElement = document.getElementById('album-data');

        if (!browser || !dataElement) {
            return;
        }

        const searchInput = browser.querySelector('[data-album-search]');
        const albumList = browser.querySelector('[data-album-list]');
        const viewButtons = browser.querySelectorAll('[data-view-mode]');
        const createUrl = browser.dataset.createUrl || '/albums/create/';

        let albums = [];
        let viewMode = 'grid';
        let searchQuery = '';

        try {
            albums = JSON.parse(dataElement.textContent || '[]');
        } catch (error) {
            albums = [];
        }

        function formatDate(value) {
            const date = new Date(value);

            if (Number.isNaN(date.getTime())) {
                return '';
            }

            return new Intl.DateTimeFormat('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }).format(date);
        }

        function getPhotoLabel(count) {
            return count === 1 ? '1 photo' : count + ' photos';
        }

        function createCoverIcon() {
            const coverIcon = document.createElement('span');
            coverIcon.className = 'album-cover-icon';
            coverIcon.innerHTML = '<svg viewBox="0 0 24 24" focusable="false" aria-hidden="true"><path d="M4 5.75A1.75 1.75 0 0 1 5.75 4h12.5A1.75 1.75 0 0 1 20 5.75v12.5A1.75 1.75 0 0 1 18.25 20H5.75A1.75 1.75 0 0 1 4 18.25V5.75Zm2 .25v11.5l3.1-3.1a1 1 0 0 1 1.42 0l1.98 1.98 3.08-3.08a1 1 0 0 1 1.42 0L18 15.83V6a.5.5 0 0 0-.5-.5h-11A.5.5 0 0 0 6 6ZM9 8.25A1.25 1.25 0 1 1 9 5.75a1.25 1.25 0 0 1 0 2.5Z" fill="currentColor"/></svg>';
            return coverIcon;
        }

        function setActiveViewButton(nextViewMode) {
            viewButtons.forEach(function (button) {
                const isActive = button.dataset.viewMode === nextViewMode;
                button.classList.toggle('is-active', isActive);
                button.setAttribute('aria-pressed', String(isActive));
            });
        }

        function renderAlbums() {
            const query = searchQuery.trim().toLowerCase();
            const filteredAlbums = albums.filter(function (album) {
                return album.title.toLowerCase().includes(query);
            });

            albumList.className = 'album-list is-' + viewMode;
            albumList.innerHTML = '';

            const summary = browser.querySelector('[data-album-summary]');

            if (summary) {
                summary.textContent = albums.length + (albums.length === 1 ? ' album in your collection' : ' albums in your collection');
            }

            if (filteredAlbums.length === 0) {
                const emptyState = document.createElement('article');
                emptyState.className = 'card panel empty-state album-empty-state';

                const heading = document.createElement('h2');
                heading.textContent = 'No albums found';

                const message = document.createElement('p');
                message.textContent = searchQuery ? 'Try a different search term.' : 'Create your first album to get started.';

                emptyState.appendChild(heading);
                emptyState.appendChild(message);

                if (!searchQuery) {
                    const action = document.createElement('a');
                    action.className = 'button button-dark';
                    action.href = createUrl;
                    action.textContent = 'Create album';
                    emptyState.appendChild(action);
                }

                albumList.appendChild(emptyState);
                return;
            }

            const fragment = document.createDocumentFragment();

            filteredAlbums.forEach(function (album) {
                const albumLink = document.createElement('a');
                albumLink.className = 'card album-card is-' + viewMode;
                albumLink.href = album.detail_url;

                const cover = document.createElement('div');
                cover.className = 'album-cover';

                if (album.latest_photo_url) {
                    const coverImage = document.createElement('img');
                    coverImage.className = 'album-cover-image';
                    coverImage.src = album.latest_photo_url;
                    coverImage.alt = album.title;
                    coverImage.loading = 'lazy';
                    coverImage.decoding = 'async';
                    cover.appendChild(coverImage);
                } else {
                    cover.appendChild(createCoverIcon());
                }

                const body = document.createElement('div');
                body.className = 'album-card-body';

                const title = document.createElement('h2');
                title.textContent = album.title;

                const description = document.createElement('p');
                description.className = 'album-description';
                description.textContent = album.description || 'No description yet.';

                const footer = document.createElement('div');
                footer.className = 'card-footer';

                const photos = document.createElement('span');
                photos.textContent = getPhotoLabel(Number(album.photo_count) || 0);

                const created = document.createElement('span');
                created.textContent = formatDate(album.created_at);

                footer.appendChild(photos);
                footer.appendChild(created);

                body.appendChild(title);
                body.appendChild(description);
                body.appendChild(footer);

                albumLink.appendChild(cover);
                albumLink.appendChild(body);
                fragment.appendChild(albumLink);
            });

            albumList.appendChild(fragment);
        }

        if (searchInput) {
            searchInput.addEventListener('input', function (event) {
                searchQuery = event.target.value;
                renderAlbums();
            });
        }

        viewButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                viewMode = button.dataset.viewMode || 'grid';
                setActiveViewButton(viewMode);
                renderAlbums();
            });
        });

        setActiveViewButton(viewMode);
        renderAlbums();
    });
})();
