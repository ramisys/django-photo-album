(function () {
    const themeKey = 'photo-album-theme';
    const root = document.documentElement;

    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const storedTheme = window.localStorage.getItem(themeKey);
    const initialTheme = storedTheme || (prefersDarkMode ? 'dark' : 'light');

    root.dataset.theme = initialTheme;

    document.addEventListener('DOMContentLoaded', function () {
        const navbar = document.querySelector('[data-navbar]');
        const navbarPanel = document.querySelector('[data-navbar-panel]');
        const navbarToggle = document.querySelector('[data-navbar-toggle]');
        const themeButtons = document.querySelectorAll('[data-theme-toggle]');
        const themeIcon = document.querySelector('[data-theme-icon]');
        const userMenu = document.querySelector('[data-user-menu]');
        const userMenuToggle = document.querySelector('[data-user-menu-toggle]');
        const userMenuPanel = document.querySelector('[data-user-menu-panel]');
        const closeableLinks = document.querySelectorAll('[data-close-navbar]');

        function getTheme() {
            return root.dataset.theme === 'dark' ? 'dark' : 'light';
        }

        function applyTheme(theme) {
            root.dataset.theme = theme;
            window.localStorage.setItem(themeKey, theme);

            themeButtons.forEach(function (button) {
                button.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
            });

            if (themeIcon) {
                themeIcon.textContent = theme === 'dark' ? '☀' : '☾';
            }
        }

        function setNavOpen(isOpen) {
            document.body.classList.toggle('nav-open', isOpen);

            if (navbarToggle) {
                navbarToggle.setAttribute('aria-expanded', String(isOpen));
            }

            if (!isOpen) {
                closeUserMenu();
            }
        }

        function closeUserMenu() {
            if (!userMenu || !userMenuToggle || !userMenuPanel) {
                return;
            }

            userMenu.classList.remove('is-open');
            userMenuToggle.setAttribute('aria-expanded', 'false');
            userMenuPanel.hidden = true;
        }

        function toggleUserMenu() {
            if (!userMenu || !userMenuToggle || !userMenuPanel) {
                return;
            }

            const isOpen = userMenu.classList.toggle('is-open');
            userMenuToggle.setAttribute('aria-expanded', String(isOpen));
            userMenuPanel.hidden = !isOpen;
        }

        applyTheme(getTheme());

        themeButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
            });
        });

        if (navbarToggle && navbarPanel) {
            navbarToggle.addEventListener('click', function () {
                const isOpen = !document.body.classList.contains('nav-open');
                setNavOpen(isOpen);
            });
        }

        if (userMenuToggle) {
            userMenuToggle.addEventListener('click', function (event) {
                event.stopPropagation();
                toggleUserMenu();
            });
        }

        closeableLinks.forEach(function (link) {
            link.addEventListener('click', function () {
                setNavOpen(false);
                closeUserMenu();
            });
        });

        document.addEventListener('click', function (event) {
            if (!navbar || navbar.contains(event.target)) {
                return;
            }

            setNavOpen(false);
            closeUserMenu();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setNavOpen(false);
                closeUserMenu();
            }
        });
    });
})();