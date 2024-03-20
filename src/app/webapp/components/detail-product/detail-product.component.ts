import { Component, OnInit, ElementRef,Renderer2  } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { enviroment } from '../../enviroments/enviroment';
import { ProductImage } from '../../models/product.image';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [NavbarComponent, FooterComponent, CommonModule, FormsModule],
  templateUrl: './detail-product.component.html',
  styleUrl: './detail-product.component.scss'
})
export class DetailProductComponent implements OnInit {
  product?: Product;
  currentImageIndex: number = 0;
  productId: number = 0;
  quantity: number = 0;
  showAddToCartMessage: boolean = false;

  constructor(private productService: ProductService, private cartService: CartService
    , private route: ActivatedRoute, private router: Router, 
    private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit() {
    this.scrollToTop();
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam !== null) {
        this.productId = +idParam;
      } else {
        console.error('Invalid productId:', idParam);
      }
    });
    if (!isNaN(this.productId)) {
      this.productService.getDetailProduct(this.productId).subscribe({
        next: (response: any) => {
          if (response.product_images && response.product_images.length > 0) {
            response.product_images.forEach((product_image: ProductImage) => {
              if (!product_image.imageUrl.startsWith(`${enviroment.apiBaseUrl}/products/images/`)) {
                product_image.imageUrl = `${enviroment.apiBaseUrl}/products/images/${product_image.imageUrl}`;
              }
            });
          }
          this.product = response;
          this.showImage(0);
        }, complete: () => {

        }, error: (error: any) => {
          console.error('error fetching image', error);
        }
      });
    } else {
      console.error('error fetching detail');
    }
  }
  scrollToTop() {
    const container = this.el.nativeElement.querySelector('#topOfPageContainer');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  }

  showImage(index: number) {
    if (this.product && this.product.product_images && this.product.product_images.length > 0) {
      if (index < 0) {
        index = this.product.product_images.length - 1;
      } else if (index >= this.product.product_images.length) {
        index = 0;
      }

      this.currentImageIndex = index;
    }
  }

  thumbnailClick(index: number) {
    this.currentImageIndex = index;
  }

  nextImage() {
    this.showImage(this.currentImageIndex + 1);
  }

  prevImage() {
    this.showImage(this.currentImageIndex - 1);
  }

  addToCart() {
    if (this.product) {
      if (this.quantity != 0) {
        this.cartService.addToCart(this.productId, this.quantity);
        this.quantity = 0;
        this.showAddToCartMessage = true;
        setTimeout(() => {
          this.showAddToCartMessage = false;
      }, 2000);
      }
    } else {
      console.error('product null');
    }
    
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  byNow() {
    this.quantity ++;
    this.addToCart();
    this.router.navigate(['/order']);
  }
}
