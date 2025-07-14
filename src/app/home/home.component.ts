import { Component, OnInit, OnDestroy, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

interface BannerItem {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

interface ProductItem {
  id: number;
  image: string;
  title: string;
  price: string;
  link: string;
}

interface CategoryItem {
  id: number;
  image: string;
  title: string;
  buttonText: string;
  link: string;
}

interface BlogItem {
  id: number;
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  link: string;
}

interface TestimonialItem {
  id: number;
  text: string;
  author: string;
}

interface InstagramItem {
  id: number;
  image: string;
  link: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Billboard Section -->
    <section id="billboard" class="bg-light py-5">
      <div class="container">
        <div class="row justify-content-center">
          <h1 class="section-title text-center mt-4" data-aos="fade-up">New Collections</h1>
          <div class="col-md-6 text-center" data-aos="fade-up" data-aos-delay="300">
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe voluptas ut dolorum consequuntur, adipisci
              repellat! Eveniet commodi voluptatem voluptate, eum minima, in suscipit explicabo voluptatibus harum,
              quibusdam ex repellat eaque!</p>
          </div>
        </div>
        <div class="row">
          <div class="swiper main-swiper py-4" data-aos="fade-up" data-aos-delay="600">
            <div class="swiper-wrapper d-flex border-animation-left">
              <div class="swiper-slide" *ngFor="let banner of bannerItems()">
                <div class="banner-item image-zoom-effect">
                  <div class="image-holder">
                    <a [href]="banner.link">
                      <img [src]="banner.image" alt="product" class="img-fluid">
                    </a>
                  </div>
                  <div class="banner-content py-4">
                    <h5 class="element-title text-uppercase">
                      <a [href]="banner.link" class="item-anchor">{{ banner.title }}</a>
                    </h5>
                    <p>{{ banner.description }}</p>
                    <div class="btn-left">
                      <a [href]="banner.link" class="btn-link fs-6 text-uppercase item-anchor text-decoration-none">Discover Now</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <div class="icon-arrow icon-arrow-left"><svg width="50" height="50" viewBox="0 0 24 24">
              <use xlink:href="#arrow-left"></use>
            </svg></div>
          <div class="icon-arrow icon-arrow-right"><svg width="50" height="50" viewBox="0 0 24 24">
              <use xlink:href="#arrow-right"></use>
            </svg></div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features py-5">
      <div class="container">
        <div class="row">
          <div class="col-md-3 text-center" 
               *ngFor="let feature of featureItems(); let i = index"
               [attr.data-aos]="'fade-in'" 
               [attr.data-aos-delay]="i * 300">
            <div class="py-5">
              <svg width="38" height="38" viewBox="0 0 24 24">
                <use [attr.xlink:href]="'#' + feature.icon"></use>
              </svg>
              <h4 class="element-title text-capitalize my-3">{{ feature.title }}</h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories overflow-hidden">
      <div class="container">
        <div class="open-up" data-aos="zoom-out">
          <div class="row">
            <div class="col-md-4" *ngFor="let category of categoryItems()">
              <div class="cat-item image-zoom-effect">
                <div class="image-holder">
                  <a [href]="category.link">
                    <img [src]="category.image" alt="categories" class="product-image img-fluid">
                  </a>
                </div>
                <div class="category-content">
                  <div class="product-button">
                    <a [href]="category.link" class="btn btn-common text-uppercase">{{ category.buttonText }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New Arrival Products Section -->
    <section id="new-arrival" class="new-arrival product-carousel py-5 position-relative overflow-hidden">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 class="text-uppercase">Our New Arrivals</h4>
          <a href="index.html" class="btn-link">View All Products</a>
        </div>
        <div class="swiper product-swiper open-up" data-aos="zoom-out">
          <div class="swiper-wrapper d-flex">
            <div class="swiper-slide" *ngFor="let product of newArrivals()">
              <div class="product-item image-zoom-effect link-effect">
                <div class="image-holder position-relative">
                  <a [href]="product.link">
                    <img [src]="product.image" alt="product" class="product-image img-fluid">
                  </a>
                  <a [href]="product.link" class="btn-icon btn-wishlist">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <use xlink:href="#heart"></use>
                    </svg>
                  </a>
                  <div class="product-content">
                    <h5 class="element-title text-uppercase fs-5 mt-3">
                      <a [href]="product.link">{{ product.title }}</a>
                    </h5>
                    <a [href]="product.link" class="text-decoration-none" data-after="Add to cart"><span>{{ product.price }}</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="icon-arrow icon-arrow-left"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-left"></use>
          </svg></div>
        <div class="icon-arrow icon-arrow-right"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-right"></use>
          </svg></div>
      </div>
    </section>

    <!-- Collection Section -->
    <section class="collection bg-light position-relative py-5">
      <div class="container">
        <div class="row">
          <div class="title-xlarge text-uppercase txt-fx domino">Collection</div>
          <div class="collection-item d-flex flex-wrap my-5">
            <div class="col-md-6 column-container">
              <div class="image-holder">
                <img src="images/single-image-2.jpg" alt="collection" class="product-image img-fluid">
              </div>
            </div>
            <div class="col-md-6 column-container bg-white">
              <div class="collection-content p-5 m-0 m-md-5">
                <h3 class="element-title text-uppercase">Classic winter collection</h3>
                <p>Dignissim lacus, turpis ut suspendisse vel tellus. Turpis purus, gravida orci, fringilla a. Ac sed eu
                  fringilla odio mi. Consequat pharetra at magna imperdiet cursus ac faucibus sit libero. Ultricies quam
                  nunc, lorem sit lorem urna, pretium aliquam ut. In vel, quis donec dolor id in. Pulvinar commodo mollis
                  diam sed facilisis at cursus imperdiet cursus ac faucibus sit faucibus sit libero.</p>
                <a href="#" class="btn btn-dark text-uppercase mt-3">Shop Collection</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Best Sellers Products Section -->
    <section id="best-sellers" class="best-sellers product-carousel py-5 position-relative overflow-hidden">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 class="text-uppercase">Best Selling Items</h4>
          <a href="index.html" class="btn-link">View All Products</a>
        </div>
        <div class="swiper product-swiper open-up" data-aos="zoom-out">
          <div class="swiper-wrapper d-flex">
            <div class="swiper-slide" *ngFor="let product of bestSellers()">
              <div class="product-item image-zoom-effect link-effect">
                <div class="image-holder position-relative">
                  <a [href]="product.link">
                    <img [src]="product.image" alt="product" class="product-image img-fluid">
                  </a>
                  <a [href]="product.link" class="btn-icon btn-wishlist">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <use xlink:href="#heart"></use>
                    </svg>
                  </a>
                  <div class="product-content">
                    <h5 class="element-title text-uppercase fs-5 mt-3">
                      <a [href]="product.link">{{ product.title }}</a>
                    </h5>
                    <a [href]="product.link" class="text-decoration-none" data-after="Add to cart"><span>{{ product.price }}</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="icon-arrow icon-arrow-left"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-left"></use>
          </svg></div>
        <div class="icon-arrow icon-arrow-right"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-right"></use>
          </svg></div>
      </div>
    </section>

    <!-- Video Section -->
    <section class="video py-5 overflow-hidden">
      <div class="container-fluid">
        <div class="row">
          <div class="video-content open-up" data-aos="zoom-out">
            <div class="video-bg">
              <img src="images/video-image.jpg" alt="video" class="video-image img-fluid">
            </div>
            <div class="video-player">
              <a class="youtube" href="https://www.youtube.com/embed/pjtsGzQjFM4">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <use xlink:href="#play"></use>
                </svg>
                <img src="images/text-pattern.png" alt="pattern" class="text-rotate">
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials py-5 bg-light">
      <div class="section-header text-center mt-5">
        <h3 class="section-title">WE LOVE GOOD COMPLIMENT</h3>
      </div>
      <div class="swiper testimonial-swiper overflow-hidden my-5">
        <div class="swiper-wrapper d-flex">
          <div class="swiper-slide" *ngFor="let testimonial of testimonials()">
            <div class="testimonial-item text-center">
              <blockquote>
                <p>"{{ testimonial.text }}"</p>
                <div class="review-title text-uppercase">{{ testimonial.author }}</div>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
      <div class="testimonial-swiper-pagination d-flex justify-content-center mb-5"></div>
    </section>

    <!-- Related Products Section -->
    <section id="related-products" class="related-products product-carousel py-5 position-relative overflow-hidden">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 class="text-uppercase">You May Also Like</h4>
          <a href="index.html" class="btn-link">View All Products</a>
        </div>
        <div class="swiper product-swiper open-up" data-aos="zoom-out">
          <div class="swiper-wrapper d-flex">
            <div class="swiper-slide" *ngFor="let product of relatedProducts()">
              <div class="product-item image-zoom-effect link-effect">
                <div class="image-holder position-relative">
                  <a [href]="product.link">
                    <img [src]="product.image" alt="product" class="product-image img-fluid">
                  </a>
                  <a [href]="product.link" class="btn-icon btn-wishlist">
                    <svg width="24" height="24" viewBox="0 0 24 24">
                      <use xlink:href="#heart"></use>
                    </svg>
                  </a>
                  <div class="product-content">
                    <h5 class="element-title text-uppercase fs-5 mt-3">
                      <a [href]="product.link">{{ product.title }}</a>
                    </h5>
                    <a [href]="product.link" class="text-decoration-none" data-after="Add to cart"><span>{{ product.price }}</span></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
        <div class="icon-arrow icon-arrow-left"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-left"></use>
          </svg></div>
        <div class="icon-arrow icon-arrow-right"><svg width="50" height="50" viewBox="0 0 24 24">
            <use xlink:href="#arrow-right"></use>
          </svg></div>
      </div>
    </section>

    <!-- Blog Section -->
    <section class="blog py-5">
      <div class="container">
        <div class="d-flex flex-wrap justify-content-between align-items-center mt-5 mb-3">
          <h4 class="text-uppercase">Read Blog Posts</h4>
          <a href="index.html" class="btn-link">View All</a>
        </div>
        <div class="row">
          <div class="col-md-4" *ngFor="let blog of blogPosts()">
            <article class="post-item">
              <div class="post-image">
                <a [href]="blog.link">
                  <img [src]="blog.image" alt="image" class="post-grid-image img-fluid">
                </a>
              </div>
              <div class="post-content d-flex flex-wrap gap-2 my-3">
                <div class="post-meta text-uppercase fs-6 text-secondary">
                  <span class="post-category">{{ blog.category }} /</span>
                  <span class="meta-day"> {{ blog.date }}</span>
                </div>
                <h5 class="post-title text-uppercase">
                  <a [href]="blog.link">{{ blog.title }}</a>
                </h5>
                <p>{{ blog.excerpt }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Logo Bar Section -->
    <section class="logo-bar py-5 my-5">
      <div class="container">
        <div class="row">
          <div class="logo-content d-flex flex-wrap justify-content-between">
            <img src="images/logo1.png" alt="logo" class="logo-image img-fluid">
            <img src="images/logo2.png" alt="logo" class="logo-image img-fluid">
            <img src="images/logo3.png" alt="logo" class="logo-image img-fluid">
            <img src="images/logo4.png" alt="logo" class="logo-image img-fluid">
            <img src="images/logo5.png" alt="logo" class="logo-image img-fluid">
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter bg-light" style="background: url(images/pattern-bg.png) no-repeat;">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-8 py-5 my-5">
            <div class="subscribe-header text-center pb-3">
              <h3 class="section-title text-uppercase">Sign Up for our newsletter</h3>
            </div>
            <form id="form" class="d-flex flex-wrap gap-2">
              <input type="text" name="email" placeholder="Your Email Addresss" class="form-control form-control-lg">
              <button class="btn btn-dark btn-lg text-uppercase w-100">Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Instagram Section -->
    <section class="instagram position-relative">
      <div class="d-flex justify-content-center w-100 position-absolute bottom-0 z-1">
        <a href="https://www.instagram.com/templatesjungle/" class="btn btn-dark px-5">Follow us on Instagram</a>
      </div>
      <div class="row g-0">
        <div class="col-6 col-sm-4 col-md-2" *ngFor="let insta of instagramItems()">
          <div class="insta-item">
            <a [href]="insta.link" target="_blank">
              <img [src]="insta.image" alt="instagram" class="insta-image img-fluid">
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- SVG Icons Definition -->
    <svg style="display: none;">
      <symbol id="arrow-left" viewBox="0 0 24 24">
        <path fill="currentColor" d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
      </symbol>
      <symbol id="arrow-right" viewBox="0 0 24 24">
        <path fill="currentColor" d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
      </symbol>
      <symbol id="calendar" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
      </symbol>
      <symbol id="shopping-bag" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12z"/>
      </symbol>
      <symbol id="gift" viewBox="0 0 24 24">
        <path fill="currentColor" d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
      </symbol>
      <symbol id="arrow-cycle" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>
      </symbol>
      <symbol id="heart" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </symbol>
      <symbol id="play" viewBox="0 0 24 24">
        <path fill="currentColor" d="M8 5v14l11-7z"/>
      </symbol>
    </svg>
  `,
  styles: [`
    .banner-item {
      position: relative;
      overflow: hidden;
    }
    
    .image-zoom-effect:hover .image-holder img {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
    
    .categories-banner {
      position: relative;
      overflow: hidden;
    }
    
    .categories-content {
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(255, 255, 255, 0.9);
    }
    
    .swiper-slide {
      height: auto;
    }
    
    .icon-arrow {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      z-index: 10;
      cursor: pointer;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    .icon-arrow-left {
      left: 20px;
    }
    
    .icon-arrow-right {
      right: 20px;
    }
    
    .btn-link {
      color: #8C907E;
      text-decoration: none;
      position: relative;
    }
    
    .btn-link::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background: #8C907E;
      transition: width 0.3s ease;
    }
    
    .btn-link:hover::after {
      width: 100%;
    }

    .product-item {
      transition: transform 0.3s ease;
    }

    .product-item:hover {
      transform: translateY(-5px);
    }

    .btn-wishlist {
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .product-item:hover .btn-wishlist {
      opacity: 1;
    }

    .video-content {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 600px;
      overflow: hidden;
    }

    .video-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1;
    }

    .video-bg img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .video-player {
      position: absolute;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .video-player a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 80px;
      height: 80px;
      background: rgba(255, 255, 255, 0.9);
      border-radius: 50%;
      color: #000;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .video-player a:hover {
      background: #fff;
      transform: scale(1.1);
    }

    .text-rotate {
      animation: rotation 10s infinite linear;
      position: absolute;
      top: -20px;
      left: -20px;
      width: 120px;
      height: 120px;
      z-index: -1;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }

    .testimonial-item blockquote {
      font-size: 1.5rem;
      font-style: italic;
      margin-bottom: 1rem;
    }

    .testimonial-item .review-title {
      font-size: 0.9rem;
      font-weight: 600;
      color: #666;
    }

    .post-item {
      transition: transform 0.3s ease;
    }

    .post-item:hover {
      transform: translateY(-5px);
    }

    .post-item img {
      transition: transform 0.3s ease;
    }

    .post-item:hover img {
      transform: scale(1.05);
    }

    .logo-image {
      opacity: 0.6;
      transition: opacity 0.3s ease;
    }

    .logo-image:hover {
      opacity: 1;
    }

    .newsletter {
      background-size: cover;
      background-position: center;
    }

    .insta-item {
      position: relative;
      overflow: hidden;
    }

    .insta-item::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .insta-item:hover::after {
      opacity: 1;
    }

    .insta-item img {
      transition: transform 0.3s ease;
    }

    .insta-item:hover img {
      transform: scale(1.1);
    }

    .btn-common {
      background: #8C907E;
      border: none;
      color: white;
      padding: 0.75rem 1.5rem;
      text-decoration: none;
      transition: all 0.3s ease;
    }

    .btn-common:hover {
      background: #5e624e;
      transform: translateY(-2px);
    }

    .cat-item {
      position: relative;
      overflow: hidden;
      margin-bottom: 2rem;
    }

    .category-content {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.95);
      transform: translateY(100%);
      transition: transform 0.3s ease;
    }

    .cat-item:hover .category-content {
      transform: translateY(0);
    }

    .title-xlarge {
      font-size: calc(2rem + 10vw);
      font-family: var(--heading-font);
      color: rgba(0, 0, 0, 0.1);
      position: absolute;
      top: -40px;
      left: 0;
      z-index: 0;
      pointer-events: none;
    }

    .collection-item {
      position: relative;
      z-index: 1;
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  
  bannerItems = signal<BannerItem[]>([
    {
      id: 1,
      image: 'images/banner-image-6.jpg',
      title: 'Soft leather jackets',
      description: 'Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.',
      link: '#'
    },
    {
      id: 2,
      image: 'images/banner-image-1.jpg',
      title: 'Soft leather jackets',
      description: 'Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.',
      link: '#'
    },
    {
      id: 3,
      image: 'images/banner-image-2.jpg',
      title: 'Soft leather jackets',
      description: 'Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.',
      link: '#'
    },
    {
      id: 4,
      image: 'images/banner-image-3.jpg',
      title: 'Soft leather jackets',
      description: 'Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.',
      link: '#'
    },
    {
      id: 5,
      image: 'images/banner-image-4.jpg',
      title: 'Out crop sweater',
      description: 'Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.',
      link: '#'
    },
    {
      id: 6,
      image: 'images/banner-image-5.jpg',
      title: 'Soft leather jackets',
      description: 'Scelerisque duis aliquam qui lorem ipsum dolor amet, consectetur adipiscing elit.',
      link: '#'
    }
  ]);

  featureItems = signal<FeatureItem[]>([
    {
      id: 1,
      icon: 'calendar',
      title: 'Book An Appointment',
      description: 'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.'
    },
    {
      id: 2,
      icon: 'shopping-bag',
      title: 'Pick up in store',
      description: 'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.'
    },
    {
      id: 3,
      icon: 'gift',
      title: 'Special packaging',
      description: 'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.'
    },
    {
      id: 4,
      icon: 'arrow-cycle',
      title: 'free global returns',
      description: 'At imperdiet dui accumsan sit amet nulla risus est ultricies quis.'
    }
  ]);

  categoryItems = signal<CategoryItem[]>([
    {
      id: 1,
      image: 'images/cat-item1.jpg',
      title: 'Men',
      buttonText: 'Shop for men',
      link: '#'
    },
    {
      id: 2,
      image: 'images/cat-item2.jpg',
      title: 'Women',
      buttonText: 'Shop for women',
      link: '#'
    },
    {
      id: 3,
      image: 'images/cat-item3.jpg',
      title: 'Accessories',
      buttonText: 'Shop accessories',
      link: '#'
    }
  ]);

  newArrivals = signal<ProductItem[]>([
    {
      id: 1,
      image: 'images/product-item-1.jpg',
      title: 'Dark florish onepiece',
      price: '$95.00',
      link: '#'
    },
    {
      id: 2,
      image: 'images/product-item-2.jpg',
      title: 'Baggy Shirt',
      price: '$55.00',
      link: '#'
    },
    {
      id: 3,
      image: 'images/product-item-3.jpg',
      title: 'Cotton Off-White Shirt',
      price: '$65.00',
      link: '#'
    },
    {
      id: 4,
      image: 'images/product-item-4.jpg',
      title: 'Handmade crop sweater',
      price: '$50.00',
      link: '#'
    },
    {
      id: 5,
      image: 'images/product-item-5.jpg',
      title: 'Elegant blue dress',
      price: '$85.00',
      link: '#'
    }
  ]);

  bestSellers = signal<ProductItem[]>([
    {
      id: 1,
      image: 'images/product-item-4.jpg',
      title: 'Handmade crop sweater',
      price: '$50.00',
      link: '#'
    },
    {
      id: 2,
      image: 'images/product-item-6.jpg',
      title: 'Classic white shirt',
      price: '$45.00',
      link: '#'
    },
    {
      id: 3,
      image: 'images/product-item-7.jpg',
      title: 'Summer dress',
      price: '$75.00',
      link: '#'
    },
    {
      id: 4,
      image: 'images/product-item-8.jpg',
      title: 'Casual jacket',
      price: '$95.00',
      link: '#'
    },
    {
      id: 5,
      image: 'images/product-item-9.jpg',
      title: 'Formal blazer',
      price: '$120.00',
      link: '#'
    }
  ]);

  relatedProducts = signal<ProductItem[]>([
    {
      id: 1,
      image: 'images/product-item-5.jpg',
      title: 'Elegant blue dress',
      price: '$85.00',
      link: '#'
    },
    {
      id: 2,
      image: 'images/product-item-10.jpg',
      title: 'Casual top',
      price: '$40.00',
      link: '#'
    },
    {
      id: 3,
      image: 'images/product-item-1.jpg',
      title: 'Dark florish onepiece',
      price: '$95.00',
      link: '#'
    },
    {
      id: 4,
      image: 'images/product-item-2.jpg',
      title: 'Baggy Shirt',
      price: '$55.00',
      link: '#'
    }
  ]);

  blogPosts = signal<BlogItem[]>([
    {
      id: 1,
      image: 'images/post-image1.jpg',
      title: 'How to look outstanding in pastel',
      category: 'Fashion',
      date: 'jul 11, 2022',
      excerpt: 'Dignissim lacus,turpis ut suspendisse vel tellus.Turpis purus,gravida orci,fringilla...',
      link: '#'
    },
    {
      id: 2,
      image: 'images/post-image2.jpg',
      title: 'Top 10 fashion trends',
      category: 'Style',
      date: 'jul 18, 2022',
      excerpt: 'Dignissim lacus,turpis ut suspendisse vel tellus.Turpis purus,gravida orci,fringilla...',
      link: '#'
    },
    {
      id: 3,
      image: 'images/post-image3.jpg',
      title: 'Seasonal wardrobe tips',
      category: 'Fashion',
      date: 'jul 25, 2022',
      excerpt: 'Dignissim lacus,turpis ut suspendisse vel tellus.Turpis purus,gravida orci,fringilla...',
      link: '#'
    }
  ]);

  testimonials = signal<TestimonialItem[]>([
    {
      id: 1,
      text: 'More than expected crazy soft, flexible and best fitted white simple denim shirt.',
      author: 'casual way'
    },
    {
      id: 2,
      text: 'Best fitted white denim shirt more than expected crazy soft, flexible',
      author: 'uptop'
    },
    {
      id: 3,
      text: 'Amazing quality and perfect fit. Highly recommend this product!',
      author: 'fashion lover'
    }
  ]);

  instagramItems = signal<InstagramItem[]>([
    {
      id: 1,
      image: 'images/insta-item1.jpg',
      link: 'https://www.instagram.com/templatesjungle/'
    },
    {
      id: 2,
      image: 'images/insta-item2.jpg',
      link: 'https://www.instagram.com/templatesjungle/'
    },
    {
      id: 3,
      image: 'images/insta-item3.jpg',
      link: 'https://www.instagram.com/templatesjungle/'
    },
    {
      id: 4,
      image: 'images/insta-item4.jpg',
      link: 'https://www.instagram.com/templatesjungle/'
    },
    {
      id: 5,
      image: 'images/insta-item5.jpg',
      link: 'https://www.instagram.com/templatesjungle/'
    },
    {
      id: 6,
      image: 'images/insta-item6.jpg',
      link: 'https://www.instagram.com/templatesjungle/'
    }
  ]);

  private swipers: any[] = [];

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeSwipers();
      this.initializeAOS();
    }
  }

  ngOnDestroy() {
    this.swipers.forEach(swiper => {
      if (swiper) {
        swiper.destroy();
      }
    });
  }

  private async initializeSwipers() {
    try {
      // Dynamic import for Swiper
      const { default: Swiper } = await import('swiper');
      const { Navigation, Pagination, EffectCoverflow } = await import('swiper/modules');
      
      // Main banner swiper
      const mainSwiper = new Swiper('.main-swiper', {
        slidesPerView: 3,
        spaceBetween: 80,
        speed: 700,
        loop: true,
        modules: [Navigation, Pagination],
        navigation: {
          nextEl: '.main-swiper .icon-arrow-right',
          prevEl: '.main-swiper .icon-arrow-left',
        },
        pagination: {
          el: '.main-swiper .swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          300: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 80,
          }
        }
      });

      // Product swipers
      const productSwipers = document.querySelectorAll('.product-swiper');
      productSwipers.forEach(swiperEl => {
        const productSwiper = new Swiper(swiperEl as HTMLElement, {
          slidesPerView: 4,
          spaceBetween: 20,
          modules: [Navigation, Pagination],
          navigation: {
            nextEl: swiperEl.closest('section')?.querySelector('.icon-arrow-right') as HTMLElement,
            prevEl: swiperEl.closest('section')?.querySelector('.icon-arrow-left') as HTMLElement,
          },
          pagination: {
            el: swiperEl.querySelector('.swiper-pagination') as HTMLElement,
            clickable: true,
          },
          breakpoints: {
            0: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 20,
            }
          }
        });
        this.swipers.push(productSwiper);
      });

      // Testimonial swiper
      const testimonialSwiper = new Swiper('.testimonial-swiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        loop: true,
        slidesPerView: 'auto',
        modules: [EffectCoverflow, Pagination],
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2,
          slideShadows: true,
        },
        pagination: {
          el: '.testimonial-swiper-pagination',
          clickable: true,
        },
      });

      this.swipers.push(mainSwiper, testimonialSwiper);
    } catch (error) {
      console.error('Error initializing Swiper:', error);
    }
  }

  private async initializeAOS() {
    try {
      // Dynamic import for AOS
      const AOS = await import('aos');
      AOS.init({
        duration: 1200,
        once: true
      });
    } catch (error) {
      console.error('Error initializing AOS:', error);
    }
  }
}