window.UI = {
    toggleSection(id) {
        const el = document.getElementById(id);
        if (!el) return;
        el.classList.toggle('show');
    },

    showPreview(event, imageSrc) {
        const tooltip = document.getElementById('card-tooltip');
        if (!tooltip || !imageSrc) return;

        tooltip.innerHTML = `<img src="${imageSrc}" alt="Kartenvorschau">`;
        tooltip.style.display = 'block';
        tooltip.classList.remove('is-mobile-center');

        if (window.innerWidth <= 900) {
            tooltip.classList.add('is-mobile-center');
            tooltip.style.left = '50%';
            tooltip.style.top = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
            return;
        }

        tooltip.style.transform = 'none';
        this.movePreview(event);
    },

    movePreview(event) {
        const tooltip = document.getElementById('card-tooltip');
        if (!tooltip || tooltip.style.display !== 'block') return;
        if (window.innerWidth <= 900) return;

        const offsetX = 20;
        const offsetY = 20;
        const margin = 16;

        const tooltipWidth = tooltip.offsetWidth || 450;
        const tooltipHeight = tooltip.offsetHeight || 320;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = event.clientX + offsetX;
        let top = event.clientY + offsetY;

        if (left + tooltipWidth + margin > viewportWidth) {
            left = event.clientX - tooltipWidth - offsetX;
        }

        if (left < margin) {
            left = margin;
        }

        if (top + tooltipHeight + margin > viewportHeight) {
            top = viewportHeight - tooltipHeight - margin;
        }

        if (top < margin) {
            top = margin;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
        tooltip.style.transform = 'none';
    },

    hidePreview() {
        const tooltip = document.getElementById('card-tooltip');
        if (!tooltip) return;

        tooltip.style.display = 'none';
        tooltip.classList.remove('is-mobile-center');
        tooltip.style.transform = 'none';
    },

    handleCheck(btn, type, text) {
        const probeItem = btn.closest('.probe-item');
        if (!probeItem) return;

        let result = probeItem.querySelector('.check-result');

        if (!result) {
            result = document.createElement('div');
            result.className = 'check-result';
            probeItem.appendChild(result);
        }

        result.className = `check-result show ${type}`;
        result.innerHTML = `<strong>${type === 'success' ? '✅' : '❌'}</strong> ${text}`;
    }
};
