import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from '../../components/product/product.component';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { Product } from '../../../shared/models/product.model';
import { CartService } from '../../../shared/services/cart.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {

  products = signal<Product[]>([]);
  private cartService = inject(CartService);

  constructor() {
    const initProducts: Product[] = [
      {
        id: Date.now(),
        title: 'Product 1',
        price: 100,
        image: 'https://picsum.photos/640/640?r=1',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product 2',
        price: 200,
        image: 'https://picsum.photos/640/640?r=2',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product 3',
        price: 300,
        image: 'https://picsum.photos/640/640?r=3',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product 4',
        price: 150,
        image: 'https://picsum.photos/640/640?r=4',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product 5',
        price: 350,
        image: 'https://picsum.photos/640/640?r=5',
        creationAt: new Date().toISOString()
      },
      {
        id: Date.now(),
        title: 'Product 6',
        price: 280,
        image: 'https://picsum.photos/640/640?r=6',
        creationAt: new Date().toISOString()
      }
    ];

    this.products.set(initProducts);
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
