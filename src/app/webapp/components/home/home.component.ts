import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductSerVice } from '../../services/product.service';
import { Product } from '../models/product';
import { enviroment } from '../../enviroments/enviroment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages: number = 0;
  visiblePages: number[] = [];

  constructor(private productService: ProductSerVice) {}
  
  ngOnInit() {
    this.getProducts(this.currentPage, this.itemsPerPage);
  }

  getProducts(page:number, limit:number) {
    this.productService.getProducts(page, limit).subscribe(
      {
        next: (response: any) => {
          response.products.forEach((product: Product) => {
            product.url = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
          });
          this.products = response.products;
          this.totalPages = response.totalPages;
          this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
        },
        complete: () => {

        },
        error: (error:any) => {
          console.error('Error fetching products', error);
        }
      }
    )
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.currentPage, this.itemsPerPage);
  }

  generateVisiblePageArray(currentPage: number, totalPages: number): number[] {
    const maxVisiblePage = 5;
    const halfVisiblePage = Math.floor(maxVisiblePage / 2);
  
    let startPage = Math.max(currentPage - halfVisiblePage, 1);
    let endPage = Math.min(startPage + maxVisiblePage - 1, totalPages);
  
    if (endPage - startPage + 1 < maxVisiblePage) {
      startPage = Math.max(endPage - maxVisiblePage + 1, 1);
    }
  
    endPage = Math.max(endPage, startPage); // Ensure endPage is not less than startPage
  
    return new Array(endPage - startPage + 1).fill(0).map((_, index) => startPage + index);
  }
}
