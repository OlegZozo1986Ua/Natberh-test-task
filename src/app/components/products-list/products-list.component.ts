import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/intrfases/product';
import { ProductsService } from 'src/app/servises/products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  @Input() product!: IProduct;

  @Output() changeProducts = new EventEmitter;

  constructor(private productService: ProductsService) {}

  public deleteProduct() {
    this.productService.deleteProducts(this.product.id).subscribe((res) => console.log(res));
    this.changeProducts.emit();
  }

  public emitEditEvent() {
    this.changeProducts.emit();
  }
}
