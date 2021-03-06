import { WorldDbService } from './../_dbs/world.db.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';

import { environment } from '../environments/environment';
import { ApiService } from './api.service';
import { Iitem } from '../_models/item';
import { IResponse } from '../_models/response';
import { ItemEnum } from './../_enums/item.enum';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  private apiPATH = 'world.json?api-key=';
  private key = environment.apiKey;

  constructor(private api: ApiService, private idbService: WorldDbService) {
    this.idbService.connectToIDB(ItemEnum.World);
  }

  getAll() {
    if (this.api.getOnlineStatus()) {
      return this.api.get<Iitem[]>(`${this.apiPATH}${this.key}`).pipe(
        map((res) => {
          let x = res as unknown as IResponse;
          this.idbService.deleteAllItems(ItemEnum.World);
          if(x.results){
            if(x.results.length>0){
             x.results.map((v) => this.idbService.addItems(ItemEnum.World, v));
            }
         }
          return x.results;
        })
      );
    } else {
      return from(this.idbService.getAllData(ItemEnum.World));
    }
  }
}
