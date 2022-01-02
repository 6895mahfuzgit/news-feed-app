import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ArtsService {
  private apiPATH = 'arts.json?api-key=';
  private key = environment.apiKey;

  constructor(private api: ApiService) {}
  getAll() {
    return this.api
      .get<any>(`${this.apiPATH}${this.key}`)
      .pipe(map((res) => res.results));
  }
}
