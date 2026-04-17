export const RulebookReaderActions = {
    bindInlinePageActions(scope, rulebook) {
        if (!scope) return;

        scope.querySelectorAll('[data-rulebook-page]').forEach(button => {
            if (button.dataset.boundRulebookPage === 'true') return;

            button.addEventListener('click', () => {
                const page = Number(button.dataset.rulebookPage);
                if (page > 0) {
                    rulebook.jumpToPage(page);
                }
            });

            button.dataset.boundRulebookPage = 'true';
        });
    }
};

export default RulebookReaderActions;
