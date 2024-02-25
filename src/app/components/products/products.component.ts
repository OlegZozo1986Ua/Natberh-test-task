import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/servises/products.service';
import { IProduct } from 'src/app/intrfases/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit{
  public products!: IProduct[];

  constructor(private productsSerVice: ProductsService) {}

  ngOnInit() {
    this.getProducts();
  }

  public getProducts() {
    this.productsSerVice.getProducts().subscribe(
      (products) => {
        this.products = this.productsSerVice.products;
        console.log(this.products);
      }
    )
  }
}
