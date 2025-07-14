import { Component, OnInit, OnDestroy, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

// Interfaces
export interface BannerItem {
  id: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

export interface FeatureItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface ProductItem {
  id: number;
  image: string;
  title: string;
  price: string;
  link: string;
}

export interface CategoryItem {
  id: number;
  image: string;
  title: string;
  buttonText: string;
  link: string;
}

export interface BlogItem {
  id: number;
  image: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  link: string;
}

export interface TestimonialItem {
  id: number;
  text: string;
  author: string;
}

export interface InstagramItem {
  id: number;
  image: string;
  link: string;
}

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
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
