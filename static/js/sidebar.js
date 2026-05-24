(function () {
    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.querySelector('[data-sidebar]');
        const sidebarToggle = document.querySelector('[data-sidebar-toggle]');
        const sidebarClose = document.querySelector('[data-sidebar-close]');
        const sidebarOverlay = document.querySelector('[data-sidebar-overlay]');
        const sidebarItems = document.querySelectorAll('[data-close-navbar]');

        if (!sidebar || !sidebarToggle) {
            return;
        }

        function setSidebarOpen(isOpen) {
            document.body.classList.toggle('sidebar-open', isOpen);
            sidebarToggle.setAttribute('aria-expanded', String(isOpen));

            if (sidebarOverlay) {
                sidebarOverlay.hidden = !isOpen;
            }
        }

        sidebarToggle.addEventListener('click', function () {
            const isOpen = !document.body.classList.contains('sidebar-open');
            setSidebarOpen(isOpen);
        });

        if (sidebarClose) {
            sidebarClose.addEventListener('click', function () {
                setSidebarOpen(false);
            });
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function () {
                setSidebarOpen(false);
            });
        }

        sidebarItems.forEach(function (item) {
            item.addEventListener('click', function () {
                setSidebarOpen(false);
            });
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                setSidebarOpen(false);
            }
        });

        setSidebarOpen(false);
    });
})();