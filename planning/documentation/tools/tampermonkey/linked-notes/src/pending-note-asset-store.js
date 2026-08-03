(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  root.ObsLinkedNotes = Object.assign(root.ObsLinkedNotes || {}, api);
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  class PendingNoteAssetStore {
    constructor(options = {}) {
      this.dbName = options.dbName || 'obsLinkedNotesPrototypeAssets';
      this.storeName = options.storeName || 'assets';
      this.version = 1;
      this.indexedDB = Object.prototype.hasOwnProperty.call(options, 'indexedDB')
        ? options.indexedDB
        : (typeof indexedDB !== 'undefined' ? indexedDB : null);
      this.memory = options.memory || new Map();
      this._dbPromise = null;
    }

    open() {
      if (!this.indexedDB) return Promise.resolve(null);
      if (this._dbPromise) return this._dbPromise;
      this._dbPromise = new Promise((resolve, reject) => {
        const request = this.indexedDB.open(this.dbName, this.version);
        request.onerror = () => reject(request.error || new Error('Unable to open pending image storage.'));
        request.onupgradeneeded = () => {
          const db = request.result;
          const store = db.objectStoreNames.contains(this.storeName)
            ? request.transaction.objectStore(this.storeName)
            : db.createObjectStore(this.storeName, { keyPath: 'id' });
          if (!store.indexNames.contains('noteId')) store.createIndex('noteId', 'noteId', { unique: false });
          if (!store.indexNames.contains('updatedAt')) store.createIndex('updatedAt', 'updatedAt', { unique: false });
        };
        request.onsuccess = () => {
          const db = request.result;
          db.onversionchange = () => db.close();
          resolve(db);
        };
      });
      return this._dbPromise;
    }

    async put(asset) {
      const record = { ...asset, bytes: asset.bytes instanceof Uint8Array ? new Uint8Array(asset.bytes) : asset.bytes, updatedAt: new Date().toISOString() };
      const db = await this.open();
      if (!db) { this.memory.set(record.id, record); return record; }
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).put(record);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Unable to store pending image.'));
        tx.onabort = () => reject(tx.error || new Error('Pending image transaction aborted.'));
      });
      return record;
    }

    async get(id) {
      const db = await this.open();
      if (!db) return this.memory.get(String(id)) || null;
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const request = tx.objectStore(this.storeName).get(String(id));
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error || new Error('Unable to read pending image.'));
      });
    }

    async listByNote(noteId) {
      const wanted = String(noteId || '');
      const db = await this.open();
      if (!db) return [...this.memory.values()].filter((asset) => asset.noteId === wanted).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)));
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readonly');
        const index = tx.objectStore(this.storeName).index('noteId');
        const request = index.getAll(wanted);
        request.onsuccess = () => resolve((request.result || []).sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt))));
        request.onerror = () => reject(request.error || new Error('Unable to list pending images.'));
      });
    }

    async delete(id) {
      const key = String(id || '');
      const db = await this.open();
      if (!db) { this.memory.delete(key); return; }
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).delete(key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Unable to delete pending image.'));
      });
    }

    async deleteForNote(noteId) {
      const assets = await this.listByNote(noteId);
      for (const asset of assets) await this.delete(asset.id);
    }

    async clear() {
      const db = await this.open();
      if (!db) { this.memory.clear(); return; }
      await new Promise((resolve, reject) => {
        const tx = db.transaction(this.storeName, 'readwrite');
        tx.objectStore(this.storeName).clear();
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error || new Error('Unable to clear pending images.'));
      });
    }
  }

  return { PendingNoteAssetStore };
});
