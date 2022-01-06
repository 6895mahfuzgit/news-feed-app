import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemService {

  private urlSubject = new BehaviorSubject<string>('');
  url$ = this.urlSubject.asObservable();

  constructor() {}

  changeURL(url:string){
    this.urlSubject.next(url);
   }
}
