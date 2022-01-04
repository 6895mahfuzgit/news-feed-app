import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

import { environment } from '../environments/environment';
import { ApiService } from './api.service';
import { Iitem } from '../_models/item';
import { IResponse } from '../_models/response';
import { IdbService } from '../_dbs/idb.service';
import { ItemEnum } from './../_enums/item.enum';
import { UsDbService } from 'src/_dbs/us.db.service';

@Injectable({
  providedIn: 'root',
})
export class UsService {
  private apiPATH = 'us.json?api-key=';
  private key = environment.apiKey;

  constructor(private api: ApiService, private idbService: UsDbService) {
    this.idbService.connectToIDB(ItemEnum.Us);
  }

  getAll() {
    if (this.api.getOnlineStatus()) {
      return this.api.get<Iitem[]>(`${this.apiPATH}${this.key}`).pipe(
        map((res) => {
          let x = res as unknown as IResponse;
          this.idbService.deleteAllItems(ItemEnum.Us);
          if(x.results){
            if(x.results.length>0){
             x.results.map((v) => this.idbService.addItems(ItemEnum.Us, v));
            }
         }
          return x.results;
        })
      );
    } else {
      return from(this.idbService.getAllData(ItemEnum.Us));
    }
  }
}
