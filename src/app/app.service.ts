import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const baseUrl = 'https://egghead-products-api.now.sh/api/products';

export class Product {
  public id: string;
  public name: string;
  public description: string;
  public image: string;
  public price: number;
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  public getItems(config: any = {}): Observable<Product[]> {
    const limit = config.limit || 10;
    const offset = config.offset || 0;
    const sort = config.sort || '';

    const paramsLimit = `filter[limit]=${limit}`;
    const paramsOffset = `filter[offset]=${offset}`;
    const paramsOrder = `filter[order]=${sort.active} ${sort.direction}`;

    const params = `?${paramsLimit}&${paramsOffset}&${paramsOrder}`;

    return this.http.get<Product[]>(`${baseUrl}${params}`);
  }

  public countItems(): Observable<number> {
    return this.http.get<any>(`${baseUrl}/count`)
      .pipe(map(res => <number>res.count));
  }
}
