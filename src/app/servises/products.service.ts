import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first, Observable, tap } from 'rxjs';
import { IProduct } from 'src/app/intrfases/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public products: IProduct[] = [];

  constructor(private http: HttpClient) {}

  public getProducts(): Observable<any> {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products')
      .pipe(
        first(),
        tap((res) => this.products = res)
      )
  }

  public deleteProducts(id: number): Observable<any> {
    return this.http.delete(`https://fakestoreapi.com/products/${id}`).pipe(first());
  }

  public editProduct(id: number, title: string, price: number) {
    return this.http.patch(`https://fakestoreapi.com/products/${id}`, {title: title, price: price}).pipe(first());
  }

  public  addProduct(title: string, price: number) {
    return this.http.post('https://fakestoreapi.com/products', {title: title, price: price});
  }
}
