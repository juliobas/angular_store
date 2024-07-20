import { Routes } from '@angular/router';

//Layout
import { LayoutComponent } from '@shared/components/layout/layout.component';
//Pages
import { ListComponent } from '@products/pages/list/list.component';
import { AboutComponent } from '@info/pages/about/about.component';
import { NotFoundComponent } from '@info/pages/not-found/not-found.component';
import { ProductDetailComponent } from '@products/pages/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
