import { Component, OnInit, OnDestroy, signal, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { trigger, state, style, transition, animate, query, stagger } from '@angular/animations';
import homeData from '@data/home.json';
import { CartService } from '../services/cart.service';

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
  styleUrl: './home.scss',
  animations: [
    trigger('fadeUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', animate('600ms ease-out')),
      transition('void => *', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('0ms')
      ])
    ]),
    trigger('zoomOut', [
      state('hidden', style({ opacity: 0, transform: 'scale(1.1)' })),
      state('visible', style({ opacity: 1, transform: 'scale(1)' })),
      transition('hidden => visible', animate('800ms ease-out')),
      transition('void => *', [
        style({ opacity: 1, transform: 'scale(1)' }),
        animate('0ms')
      ])
    ]),
    trigger('fadeIn', [
      state('hidden', style({ opacity: 0 })),
      state('visible', style({ opacity: 1 })),
      transition('hidden => visible', animate('600ms ease-out')),
      transition('void => *', [
        style({ opacity: 1 }),
        animate('0ms')
      ])
    ]),
    trigger('staggerItems', [
      transition('* => *', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(30px)' }),
          stagger(300, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private cartService = inject(CartService);
  
  bannerItems = signal<BannerItem[]>(homeData.bannerItems);

  featureItems = signal<FeatureItem[]>(homeData.featureItems);

  categoryItems = signal<CategoryItem[]>(homeData.categoryItems);

  newArrivals = signal<ProductItem[]>(homeData.newArrivals);

  bestSellers = signal<ProductItem[]>(homeData.bestSellers);

  relatedProducts = signal<ProductItem[]>(homeData.relatedProducts);

  blogPosts = signal<BlogItem[]>(homeData.blogPosts);

  testimonials = signal<TestimonialItem[]>(homeData.testimonials);

  instagramItems = signal<InstagramItem[]>(homeData.instagramItems);

  // Animation states - initialize visible for above-the-fold content
  sectionAnimationStates = signal({
    billboard: 'visible',
    features: 'hidden',
    categories: 'hidden',
    'new-arrival': 'visible',
    'best-sellers': 'visible',
    collection: 'hidden',
    video: 'hidden',
    testimonials: 'hidden',
    'related-products': 'visible',
    blog: 'hidden',
    newsletter: 'hidden'
  });

  private swipers: any[] = [];
  private intersectionObserver?: IntersectionObserver;

  ngOnInit() {
    // Component initialization
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initializeSwipers();
        this.initializeIntersectionObserver();
      }, 50);
    }
  }

  ngOnDestroy() {
    this.swipers.forEach(swiper => {
      if (swiper) {
        swiper.destroy();
      }
    });
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
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

  private initializeIntersectionObserver() {
    // Delay to ensure DOM is ready
    setTimeout(() => {
      this.intersectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            if (sectionId) {
              this.triggerAnimation(sectionId);
            }
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      // Observe all sections
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        this.intersectionObserver?.observe(section);
      });
    }, 100);
  }

  private triggerAnimation(sectionId: string) {
    const currentStates = this.sectionAnimationStates();
    const validSectionIds = Object.keys(currentStates);
    
    if (validSectionIds.includes(sectionId) && currentStates[sectionId as keyof typeof currentStates] === 'hidden') {
      this.sectionAnimationStates.update(states => ({
        ...states,
        [sectionId]: 'visible'
      }));
    }
  }

  addToCart(product: ProductItem) {
    this.cartService.addToCart(product);
  }

}
