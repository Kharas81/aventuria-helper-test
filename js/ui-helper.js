window.UI = {
    toggleSection(id) {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('show');
    },
    showPreview(e, path) {
        const t = document.getElementById('card-tooltip');
        if (!path || !t) return;
        t.innerHTML = `<img src="${path}">`;
        t.style.display = 'block';
        this.movePreview(e);
    },
    movePreview(e) {
        const t = document.getElementById('card-tooltip');
        if (!t) return;
        t.style.left = (e.clientX + 20) + 'px';
        t.style.top = (e.clientY - 200) + 'px';
    },
    hidePreview() {
        const t = document.getElementById('card-tooltip');
        if (t) t.style.display = 'none';
    },
    handleCheck(btn, type, text) {
        let res = btn.parentElement.querySelector('.check-result');
        if (!res) {
            res = document.createElement('div');
            res.className = 'check-result';
            btn.parentElement.appendChild(res);
        }
        res.className = `check-result show ${type}`;
        res.innerHTML = `<strong>${type==='success'?'✅':'❌'}</strong> ${text}`;
    }
};
