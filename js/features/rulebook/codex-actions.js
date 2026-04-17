export const RulebookCodexActions = {
    bindPageJumpActions(scope, rulebook) {
        if (!scope) return;

        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.bound === 'true') return;

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) {
                    rulebook.jumpToPage(page);
                }
            });

            button.dataset.bound = 'true';
        });
    }
};

export default RulebookCodexActions;
