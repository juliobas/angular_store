import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { ProductComponent } from '@products/components/product/product.component';
import { HeaderComponent } from '@shared/components/header/header.component';
import { Product } from '@shared/models/product.model';
import { CartService } from '@shared/services/cart.service';
import { ProductService } from '@shared/services/product.service';
import { CategoryService } from '@shared/services/category.service';
import { Category } from '@shared/models/category.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export default class ListComponent {

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  private cartService = inject(CartService);
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  @Input() category_id?: string;

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes: SimpleChanges) {
    this.getProducts();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  getProducts() {
    this.productService.getProducts(this.category_id).subscribe(res => {
      const products = res.map(product => {
        if (product.images && product.images.length > 0) {
          const jsonString = product.images[0];
          try {
            const urlArray = JSON.parse(jsonString);
            if (urlArray && urlArray.length > 0) {
              product.images = urlArray;
            }
          }
          catch (e) {
            console.error('Error al parsear JSON', e);
          }
        }
        return product;
      });
      this.products.set(products);
    });
  }

  getCategories() {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }
}
