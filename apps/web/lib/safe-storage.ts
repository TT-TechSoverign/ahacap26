/**
 * Safe Browser Storage Utility
 * Provides hardened, exception-proof wrappers around localStorage and sessionStorage.
 * Includes an in-memory fallback store for iOS Safari / Chrome Incognito mode
 * where storage access throws SecurityError / DOMException.
 */

const memoryStore = new Map<string, string>();

function isStorageAvailable(type: 'localStorage' | 'sessionStorage'): boolean {
    if (typeof window === 'undefined') return false;
    try {
        const storage = window[type];
        if (!storage) return false;
        const testKey = '__storage_test__';
        storage.setItem(testKey, testKey);
        storage.removeItem(testKey);
        return true;
    } catch (e) {
        return false;
    }
}

export const safeStorage = {
    getItem: (key: string, type: 'local' | 'session' = 'local'): string | null => {
        try {
            if (typeof window === 'undefined') return null;
            const storageKey = type === 'local' ? 'localStorage' : 'sessionStorage';
            if (isStorageAvailable(storageKey)) {
                return window[storageKey].getItem(key);
            }
            return memoryStore.get(`${type}:${key}`) ?? null;
        } catch (e) {
            return memoryStore.get(`${type}:${key}`) ?? null;
        }
    },

    setItem: (key: string, value: string, type: 'local' | 'session' = 'local'): boolean => {
        try {
            // Always update memory fallback
            memoryStore.set(`${type}:${key}`, value);

            if (typeof window === 'undefined') return false;
            const storageKey = type === 'local' ? 'localStorage' : 'sessionStorage';
            if (isStorageAvailable(storageKey)) {
                window[storageKey].setItem(key, value);
                return true;
            }
            return true;
        } catch (e) {
            // Silently fall back to in-memory store in private/incognito mode
            return true;
        }
    },

    removeItem: (key: string, type: 'local' | 'session' = 'local'): boolean => {
        try {
            memoryStore.delete(`${type}:${key}`);

            if (typeof window === 'undefined') return false;
            const storageKey = type === 'local' ? 'localStorage' : 'sessionStorage';
            if (isStorageAvailable(storageKey)) {
                window[storageKey].removeItem(key);
                return true;
            }
            return true;
        } catch (e) {
            return true;
        }
    }
};
