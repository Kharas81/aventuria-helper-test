window.App = {
    async init() {
        document.getElementById('adventurePicker').addEventListener('change', () => this.handleUpdate());
        document.getElementById('heroCount').addEventListener('change', () => this.handleUpdate());
        Combat.updateDashboard();
    },
    async handleUpdate() {
        const picker = document.getElementById('adventurePicker');
        if (!picker.value) return;
        const id = picker.value.split('/').pop();
        const [advData, cardData] = await Promise.all([API.getAdventure(picker.value), API.getCards(id)]);
        Renderer.renderSetup(advData, cardData.cards);
        Narrative.renderStory(advData);
        document.getElementById('setup-display').classList.remove('hidden');
        Combat.updateDashboard();
    }
};
document.addEventListener('DOMContentLoaded', () => App.init());
