import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

import { environment } from '../environments/environment';
import { ApiService } from './api.service';
import { Iitem } from '../_models/item';
import { IResponse } from '../_models/response';
import { IdbService } from 'src/_dbs/idb.service';
import { ItemEnum } from './../_enums/item.enum';
import { ArtsdbService } from 'src/_dbs/arts.db.service';

@Injectable({
  providedIn: 'root',
})
export class ArtsService {
  private apiPATH = 'arts.json?api-key=';
  private key = environment.apiKey;

  constructor(private api: ApiService, private idbService: ArtsdbService) {
    this.idbService.connectToIDB(ItemEnum.Arts);
  }

  getAll() {
    if (this.api.getOnlineStatus()) {
      return this.api.get<Iitem[]>(`${this.apiPATH}${this.key}`).pipe(
        map((res) => {
          let x = res as unknown as IResponse;
          this.idbService.deleteAllItems(ItemEnum.Arts);
          if(x.results){
            if(x.results.length>0){
             x.results.map((v) => this.idbService.addItems(ItemEnum.Arts, v));
            }
         }
          return x.results;
        })
      );
    } else {
      return from(this.idbService.getAllData(ItemEnum.Arts));
    }
  }
}
