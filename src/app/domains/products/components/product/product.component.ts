import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {
  //img = 'https://picsum.photos/640/640?r=' + Math.random();
  @Input({required: true}) product!: Product;

  @Output() addToCart = new EventEmitter();

  addToCartHandler() {
    this.addToCart.emit(this.product);
  }
}
