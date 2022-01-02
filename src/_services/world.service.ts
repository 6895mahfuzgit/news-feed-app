import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';
import { Iitem } from '../_models/item';
import { IResponse } from '../_models/response';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  private apiPATH = 'world.json?api-key=';
  private key = environment.apiKey;

  constructor(private api: ApiService) {}

  getAll() {
    return this.api.get<Iitem[]>(`${this.apiPATH}${this.key}`).pipe(
      map((res) => {
        let x = res as unknown as IResponse;
        return x.results;
      })
    );
  }
}
