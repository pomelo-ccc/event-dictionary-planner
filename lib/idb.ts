export function openDB(name: string, version: number) {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(name, version);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('keyval')) {
        db.createObjectStore('keyval');
      }
    };
  });
}

export async function get<T>(key: string): Promise<T | undefined> {
  const db = await openDB('event-dictionary-db', 1);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('keyval', 'readonly');
    const store = transaction.objectStore('keyval');
    const request = store.get(key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

export async function set<T>(key: string, value: T): Promise<void> {
  const db = await openDB('event-dictionary-db', 1);
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('keyval', 'readwrite');
    const store = transaction.objectStore('keyval');
    const request = store.put(value, key);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}
