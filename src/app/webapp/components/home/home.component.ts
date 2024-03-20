import { Component, OnInit, ElementRef,Renderer2  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { enviroment } from '../../enviroments/enviroment';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  currentPage: number = 0;
  itemsPerPage: number = 9;
  pages: number[] = [];
  totalPages: number = 0;
  totalPagesInit: number = 0;
  visiblePages: number[] = [];
  keyword: string = "";
  selectedCategoryId: number = 0;
  categories: Category[] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService,
    private router: Router, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.getCategories(1, 100);
    this.totalPagesInit = this.getTotalPages(this.keyword, this.selectedCategoryId, 
                                            this.currentPage, this.itemsPerPage);
  }

  getTotalPages(keyword: string, selectedCategoryId: number, page: number, limit: number):number{
    this.productService.getTotalPages(keyword, selectedCategoryId, page, limit).subscribe({
      next: (response: number) => {
        this.totalPages = response;
      },
      complete: () => {

      },
      error: (error: any) => {
        console.error('Error fetching total pages', error);
      }
    }
    );
    return this.totalPages;
  }

  getCategories(page: number, limit: number) {
    this.categoryService.getCategories(page, limit).subscribe({
      next: (categories: Category[]) => {
        this.categories = categories;
      }, complete: () => {

      },
      error: (error: any) => {
        console.error('Error fetching categories', error);
      }
    });
  }
  searchProducts() {
    this.currentPage = 0;
    this.itemsPerPage = 9;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
  }

  getProducts(keyword: string, selectedCategoryId: number, page: number, limit: number) {
    this.productService.getProducts(keyword, selectedCategoryId, page, limit).subscribe(
      {
        next: (response: any) => {
          response.products.forEach((product: Product) => {
            product.url = `${enviroment.apiBaseUrl}/products/images/${product.thumbnail}`;
          });
          this.products = response.products;
          if(keyword.length == 0 && selectedCategoryId == 0) {
            this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPagesInit);
          } else {
            this.totalPages = this.getTotalPages(keyword, selectedCategoryId, page, limit);
            this.visiblePages = this.generateVisiblePageArray(this.currentPage, this.totalPages);
          }
          
          
        },
        complete: () => {

        },
        error: (error: any) => {
          console.error('Error fetching products', error);
        }
      }
    )
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.getProducts(this.keyword, this.selectedCategoryId, this.currentPage, this.itemsPerPage);
    this.scrollToTop();
  }
  scrollToTop() {
    const container = this.el.nativeElement.querySelector('#topOfPageContainer');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
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

  onProductDetail(productId: number) {
    this.router.navigate(['/detail-product', productId]);
  }

  byNow(productId: number) {
    this.router.navigate(['/detail-product', productId]);
  }
}
