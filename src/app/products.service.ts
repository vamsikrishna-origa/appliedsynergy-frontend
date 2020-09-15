import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(public httpClient: HttpClient) { }

  getProducts(url, body): Observable<any> {
    return this.httpClient.post(url, body).pipe(map(results => results));
  }
}
