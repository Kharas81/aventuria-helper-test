export const Events = {
    handlers: new Map(),

    on(eventName, handler) {
        const name = String(eventName ?? '').trim();
        if (!name || typeof handler !== 'function') {
            return () => {};
        }

        if (!this.handlers.has(name)) {
            this.handlers.set(name, new Set());
        }

        const set = this.handlers.get(name);
        set.add(handler);

        return () => this.off(name, handler);
    },

    off(eventName, handler) {
        const name = String(eventName ?? '').trim();
        const set = this.handlers.get(name);

        if (!set) return;

        set.delete(handler);

        if (set.size === 0) {
            this.handlers.delete(name);
        }
    },

    once(eventName, handler) {
        if (typeof handler !== 'function') {
            return () => {};
        }

        const unsubscribe = this.on(eventName, payload => {
            unsubscribe();
            handler(payload);
        });

        return unsubscribe;
    },

    emit(eventName, payload = {}) {
        const name = String(eventName ?? '').trim();
        const set = this.handlers.get(name);

        if (!set || set.size === 0) {
            return;
        }

        [...set].forEach(handler => {
            try {
                handler(payload);
            } catch (error) {
                console.error(`Fehler im Event-Handler für "${name}":`, error);
            }
        });
    }
};

export default Events;
