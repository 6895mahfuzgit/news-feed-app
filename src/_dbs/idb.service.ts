import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import idb from 'idb';

import { Iitem } from './../_models/item';

@Injectable({
  providedIn: 'root',
})
export class IdbService {
  private _dataChange: Subject<Iitem> = new Subject<Iitem>();
  private _dbPromise;

  constructor() {}

  connectToIDB(table: string) {
    this._dbPromise = idb.open('pwa-database', 1, (UpgradeDB) => {
      if (!UpgradeDB.objectStoreNames.contains(table)) {
        UpgradeDB.createObjectStore(table, {
          keyPath: 'id',
          autoIncrement: true,
        });
      }
    });
  }

  addItems(target: string, value: Iitem) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      tx.objectStore(target).put(value);
      this.getAllData(target).then((items: Iitem) => {
        this._dataChange.next(items);
      });
      return tx.complete;
    });
  }

  deleteItems(target: string, value: Iitem) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      const store = tx.objectStore(target);
      store.delete(value);
      this.getAllData(target).then((items: Iitem) => {
        this._dataChange.next(items);
      });
      return tx.complete;
    });
  }

  deleteAllItems(target: string) {
    this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readwrite');
      tx.objectStore(target).clear();
      return tx.complete;
    });
  }

  getAllData(target: string) {
    return this._dbPromise.then((db: any) => {
      const tx = db.transaction(target, 'readonly');
      const store = tx.objectStore(target);
      return store.getAll();
    });
  }

  dataChanged(): Observable<Iitem> {
    return this._dataChange;
  }
}
