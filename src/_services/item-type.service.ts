import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemTypeService {
  private itemTypeSubject = new BehaviorSubject<string>('Home');
  itemType$ = this.itemTypeSubject.asObservable();

  constructor() {}

  changeSelectedItemType(itemType: string) {
    this.itemTypeSubject.next(itemType);
  }
}
