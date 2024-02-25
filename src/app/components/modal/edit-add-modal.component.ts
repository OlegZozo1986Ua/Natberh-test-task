import { AfterViewInit, Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IProduct } from 'src/app/intrfases/product';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ProductsService } from 'src/app/servises/products.service';

@Component({
  selector: 'app-edit-add-modal',
  standalone: true,
  templateUrl: './edit-add-modal.component.html',
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  styleUrls: ['./edit-add-modal.component.scss']
})
export class EditAddModalComponent implements  AfterViewInit{
  @Input() buttonCaption: string = 'Add goods';
  @Input() product: IProduct = {
    id: 0,
    price: 0,
    title: 'Product title',
  };

  @Output() changeProducts = new EventEmitter;

  public form: FormGroup;

  constructor(private modalService: NgbModal, private fb: FormBuilder, private productService: ProductsService) {
    this.form = fb.group({
      title: [''],
      price: [''],
    });
  }

  ngAfterViewInit() {
    this.form.patchValue({title: this.product.title, price: this.product.price});
  }

  public open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {},
      (reason) => {},
    );
  }

  public editProduct() {
    this.productService.editProduct(this.product.id, this.form.value.title, this.form.value.price)
      .subscribe((res) => console.log(res));
    this.changeProducts.emit();

  }

  public addProduct() {
    this.productService.addProduct(this.form.value.title, this.form.value.price)
      .subscribe((res) => console.log(res));
    this.changeProducts.emit();
  }
}
