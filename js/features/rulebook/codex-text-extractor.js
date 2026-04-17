import Utils from '../../core/utils.js';

export const RulebookCodexTextExtractor = {
    htmlToPlainText(html) {
        const temp = document.createElement('div');
        temp.innerHTML = String(html ?? '');
        return String(temp.textContent ?? temp.innerText ?? '')
            .replace(/\s+/g, ' ')
            .trim();
    },

    collectBlockText(rulebook, block) {
        let combinedText = '';

        const push = value => {
            const normalized = rulebook.stripCitationMarkers(String(value ?? '')).trim();
            if (normalized) {
                combinedText += ` ${normalized}`;
            }
        };

        push(block?.text);
        push(block?.action);
        push(block?.title);
        push(block?.header);

        if (block?.results) {
            Utils.normalizeArray(block.results).forEach(result => {
                push(result?.outcome);
                push(result?.text);
            });
        }

        if (block?.elements) {
            Utils.normalizeArray(block.elements).forEach(push);
        }

        if (block?.items) {
            Utils.normalizeArray(block.items).forEach(item => {
                if (typeof item === 'string') {
                    push(item);
                    return;
                }

                push(item?.label);
                push(item?.text);

                if (item?.page) {
                    push(`Seite ${item.page}`);
                }
            });
        }

        if (block?.headers) {
            Utils.normalizeArray(block.headers).forEach(push);
        }

        if (block?.rows) {
            Utils.normalizeArray(block.rows).forEach(row => {
                Utils.normalizeArray(row).forEach(push);
            });
        }

        return combinedText.trim();
    },

    extractPlainText(rulebook, content) {
        if (!content) return '';

        if (typeof content === 'string') {
            return this.htmlToPlainText(rulebook.stripCitationMarkers(content));
        }

        const blocks = Utils.normalizeArray(content);

        return blocks
            .map(block => this.collectBlockText(rulebook, block))
            .filter(Boolean)
            .join(' ');
    }
};

export default RulebookCodexTextExtractor;
