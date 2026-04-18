import { Component, inject } from '@angular/core';
import { Product } from '../../../core/models/product';
import { ProductsService } from '../../../core/services/products.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-management',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css'
})
export class ProductManagementComponent {
 private productService = inject(ProductsService);
  
  products: Product[] = [];
  showForm = false;
  isEditing = false;
  selectedProduct: Partial<Product> = {};

  ngOnInit() {
    this.productService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  openAddForm() {
    this.isEditing = false;
    this.selectedProduct = {};
    this.showForm = true;
  }

  openEditForm(product: Product) {
    this.isEditing = true;
    this.selectedProduct = { ...product };
    this.showForm = true;
  }

  saveProduct() {
    if (this.isEditing) {
      this.productService.updateProduct(this.selectedProduct.id!, this.selectedProduct as Product)
        .subscribe(res => {
          const index = this.products.findIndex(p => p.id === res.id);
          this.products[index] = res;
          this.showForm = false;
        });
    } else {
      this.productService.addProduct(this.selectedProduct as Product)
        .subscribe(res => {
          this.products.unshift(res);
          this.showForm = false;
        });
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(p => p.id !== id);
    });
  }
}
