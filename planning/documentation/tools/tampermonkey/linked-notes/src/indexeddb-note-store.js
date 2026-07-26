(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class IndexedDbNoteStore {
    constructor(options = {}) {
      this.dbName = options.dbName || 'obsLinkedNotesPrototype';
      this.storeName = options.storeName || 'notes';
      this.version = 1;
      this.indexedDB = options.indexedDB || (typeof indexedDB !== 'undefined' ? indexedDB : null);
      this._dbPromise = null;
    }

    open() {
      if (!this.indexedDB) return Promise.reject(new Error('IndexedDB is not available.'));
      if (this._dbPromise) return this._dbPromise;
      this._dbPromise = new Promise((resolve, reject) => {
        const request = this.indexedDB.open(this.dbName, this.version);
        request.onerror = () => reject(request.error || new Error('Unable to open IndexedDB.'));
        request.onupgradeneeded = () => {
          const db = request.result;
          let store;
          if (!db.objectStoreNames.contains(this.storeName)) {
            store = db.createObjectStore(this.storeName, { keyPath: 'id' });
          } else {
            store = request.transaction.objectStore(this.storeName);
          }
          if (!store.indexNames.contains('updatedAt')) store.createIndex('updatedAt', 'updatedAt', { unique: false });
          if (!store.indexNames.contains('titleNormalized')) store.createIndex('titleNormalized', 'titleNormalized', { unique: false });
        };
        request.onsuccess = () => {
          const db = request.result;
          db.onversionchange = () => db.close();
          resolve(db);
        };
      });
      return this._dbPromise;
    }

    async _transaction(mode, operation) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, mode);
        const store = tx.objectStore(this.storeName);
        let value;
        try {
          value = operation(store, tx);
        } catch (error) {
          reject(error);
          return;
        }
        tx.oncomplete = () => resolve(value);
        tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction failed.'));
        tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted.'));
      });
    }

    async put(note) {
      const record = JSON.parse(JSON.stringify(note));
      record.titleNormalized = String(record.title || '').toLocaleLowerCase();
      await this._transaction('readwrite', (store) => store.put(record));
      return note;
    }

    async get(id) {
      const db = await this.open();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const request = tx.objectStore(this.storeName).get(id);
        request.onsuccess = () => {
          const result = request.result || null;
          if (result) delete result.titleNormalized;
          resolve(result);
        };
        request.onerror = () => reject(request.error || new Error('Unable to read Note.'));
      });
    }

    async delete(id) {
      await this._transaction('readwrite', (store) => store.delete(id));
    }

    async list() {
      const db = await this.open();
      const notes = await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const request = tx.objectStore(this.storeName).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error || new Error('Unable to list Notes.'));
      });
      return notes
        .map((record) => {
          const copy = { ...record };
          delete copy.titleNormalized;
          return copy;
        })
        .sort((a, b) => String(b.updatedAt || '').localeCompare(String(a.updatedAt || '')));
    }

    async search(query) {
      const wanted = String(query || '').trim().toLocaleLowerCase();
      const notes = await this.list();
      if (!wanted) return notes;
      return notes.filter((note) => `${note.title || ''}\n${note.body || ''}`.toLocaleLowerCase().includes(wanted));
    }

    async clear() {
      await this._transaction('readwrite', (store) => store.clear());
    }
  }

  return { IndexedDbNoteStore };
});
