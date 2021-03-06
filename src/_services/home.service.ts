import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../environments/environment';
import { ApiService } from './api.service';
import { Iitem } from '../_models/item';
import { IResponse } from '../_models/response';
import { ItemEnum } from '../_enums/item.enum';
import { defer, from, Observable, of } from 'rxjs';
import { HomeDbService } from '../_dbs/home.db.service';
import { ArtsdbService } from '../_dbs/arts.db.service';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiPATH = 'home.json?api-key=';
  private key = environment.apiKey;

  constructor(private api: ApiService, private idbService: HomeDbService) {
    this.idbService.connectToIDB(ItemEnum.Home);
  }

  getAll() {
    if (this.api.getOnlineStatus()) {
      return this.api.get<Iitem[]>(`${this.apiPATH}${this.key}`).pipe(
        map((res) => {
          let x = res as unknown as IResponse;
          this.idbService.deleteAllItems(ItemEnum.Home);
          if(x.results){
             if(x.results.length>0){
              x.results.map((v) => this.idbService.addItems(ItemEnum.Home, v));
             }
          }
          return x.results;
        })
      );
    } else {
      return from(this.idbService.getAllData(ItemEnum.Home));
    }
  }
}
